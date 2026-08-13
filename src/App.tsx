import { useRef, useState, useEffect } from 'react';
import { useBuilderGenerator } from './hooks/useBuilderGenerator';
import { LandingView } from './components/LandingView';
import { UploadZone } from './components/UploadZone';
import { FormatSelector } from './components/FormatSelector';
import { BuilderForm } from './components/BuilderForm';
import { BuilderCard } from './components/BuilderCard';
import { PfpFrame } from './components/PfpFrame';
import { ResultActions } from './components/ResultActions';
import { toPng } from 'html-to-image';
import Tilt from 'react-parallax-tilt';
import './index.css';

// Simple web audio synth for UI sounds
const playSound = (type: 'boot' | 'success') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'boot') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1200, ctx.currentTime + 0.1);
      osc2.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.3);
      osc2.connect(gain);
      osc2.start(ctx.currentTime + 0.1);
      osc2.stop(ctx.currentTime + 0.5);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (e) {
    console.error('Audio failed', e);
  }
};

function App() {
  const {
    state,
    error,
    data,
    handleUpload,
    proceedToConfigure,
    updateData,
    generate,
    reset,
    setState
  } = useBuilderGenerator();

  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  const [exportedImageBlob, setExportedImageBlob] = useState<Blob | null>(null);
  const [loadingText, setLoadingText] = useState('INITIALIZING BUILDER PROTOCOL...');

  // Terminal loader sequence
  useEffect(() => {
    if (state === 'GENERATING') {
      playSound('boot');
      const sequence = [
        'INITIALIZING BUILDER PROTOCOL...',
        'UPLOADING IDENTITY TO GOA MAINFRAME...',
        'SYNTHESIZING TROPICAL VIBES...',
        'ID SECURED.'
      ];
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i < sequence.length) {
          setLoadingText(sequence[i]);
          playSound('boot');
        } else {
          clearInterval(interval);
        }
      }, 600);
      return () => clearInterval(interval);
    } else if (state === 'RESULT') {
      playSound('success');
    }
  }, [state]);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / 1080);
      }
    };
    
    // Initial scale
    updateScale();
    
    // Observe resize
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [state, data.format]);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, {
          cacheBust: true,
          quality: 1,
          pixelRatio: 1 // Keep it exactly 1080x1350 or 1080x1080
        });
        
        // Convert dataUrl to blob for sharing if needed, and for downloading
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        setExportedImageBlob(blob);

        const link = document.createElement('a');
        link.download = `HH-GOA-${data.builderId}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Error generating image', err);
        alert('Failed to generate image. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="noise-overlay" />
      
      <header style={{ padding: '1.5rem', position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 }}>
        <div className="container flex-between" style={{ padding: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
            FRAME<span style={{ color: 'var(--color-primary)' }}>_IN_</span>GOA
          </div>
          {state !== 'IDLE' && (
            <button 
              onClick={() => reset(false)} 
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
            >
              [RESET]
            </button>
          )}
        </div>
      </header>

      <main className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '4rem' }}>
        
        {error && (
          <div style={{ 
            backgroundColor: 'var(--color-error)', 
            color: 'white', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '2rem',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)'
          }}>
            {error}
          </div>
        )}

        {state === 'IDLE' && (
          <LandingView onStart={() => setState('UPLOADING')} />
        )}

        {(state === 'UPLOADING' || state === 'ERROR') && (
          <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <UploadZone onUpload={handleUpload} isUploading={state === 'UPLOADING'} />
          </div>
        )}

        {state === 'PHOTO_READY' && data.image && (
          <FormatSelector onSelect={proceedToConfigure} imageUrl={data.image} />
        )}

        {state === 'CONFIGURING' && (
          <div className="grid-layout" style={{ minHeight: 'auto', gap: '4rem', alignItems: 'start' }}>
            <div className="desktop-sticky" style={{ display: 'flex', justifyContent: 'center' }}>
              <Tilt 
                tiltMaxAngleX={5} 
                tiltMaxAngleY={5} 
                perspective={1000}
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="#ffffff"
                glarePosition="all"
                scale={1.02}
                transitionSpeed={2500}
                style={{ width: '100%', maxWidth: '432px', cursor: 'grab' }}
              >
                <div ref={containerRef} style={{ width: '100%', aspectRatio: data.format === 'BUILDER_ID' ? '1080/1620' : '1080/1080', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '1080px', height: data.format === 'BUILDER_ID' ? '1620px' : '1080px', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                    {data.format === 'BUILDER_ID' ? (
                      <BuilderCard data={data} ref={cardRef} />
                    ) : (
                      <PfpFrame data={data} ref={cardRef} />
                    )}
                  </div>
                </div>
              </Tilt>
            </div>
            
            <div style={{ padding: '2rem 0' }}>
              <BuilderForm 
                data={data} 
                updateData={updateData} 
                onGenerate={generate} 
              />
            </div>
          </div>
        )}

        {state === 'GENERATING' && (
          <div className="flex-center flex-col gap-4" style={{ height: '50vh', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ 
              backgroundColor: 'rgba(10, 13, 10, 0.8)', 
              padding: '2rem', 
              borderRadius: '12px', 
              border: '1px solid #006e33',
              width: '100%',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#fff200',
              boxShadow: '0 0 20px rgba(0, 110, 51, 0.3)'
            }}>
              <div style={{ marginBottom: '1rem', color: '#ff0055' }}>[SYSTEM] ACCESSING FRAME_IN_GOA</div>
              <div className="animate-pulse">{`> ${loadingText}`}</div>
              <div style={{ marginTop: '1rem', height: '4px', width: '100%', backgroundColor: '#004d22', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', backgroundColor: '#fff200', width: loadingText === 'ID SECURED.' ? '100%' : '60%', transition: 'width 0.5s ease-in-out' }} />
              </div>
            </div>
          </div>
        )}

        {state === 'RESULT' && (
          <div className="grid-layout" style={{ minHeight: 'auto', gap: '4rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Tilt 
                tiltMaxAngleX={5} 
                tiltMaxAngleY={5} 
                perspective={1000}
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="#ffffff"
                glarePosition="all"
                scale={1.02}
                transitionSpeed={2500}
                style={{ width: '100%', maxWidth: '432px', cursor: 'grab' }}
              >
               <div ref={containerRef} style={{ width: '100%', aspectRatio: data.format === 'BUILDER_ID' ? '1080/1620' : '1080/1080', position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '1080px', height: data.format === 'BUILDER_ID' ? '1620px' : '1080px', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                  {data.format === 'BUILDER_ID' ? (
                    <BuilderCard data={data} ref={cardRef} />
                  ) : (
                    <PfpFrame data={data} ref={cardRef} />
                  )}
                  </div>
                </div>
              </Tilt>
            </div>
            
            <div style={{ paddingTop: '2rem' }}>
              <ResultActions 
                onDownload={handleDownload} 
                imageBlob={exportedImageBlob}
                onReset={reset}
              />
            </div>
          </div>
        )}

      </main>
      
      <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
        Built for builders. #FrameInGoa
      </footer>
    </>
  );
}

export default App;
