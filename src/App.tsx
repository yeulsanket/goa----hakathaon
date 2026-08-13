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
import './index.css';

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
            <div style={{ position: 'sticky', top: '2rem', display: 'flex', justifyContent: 'center' }}>
              <div ref={containerRef} style={{ width: '100%', maxWidth: '432px', aspectRatio: data.format === 'BUILDER_ID' ? '1080/1620' : '1080/1080', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '1080px', height: data.format === 'BUILDER_ID' ? '1620px' : '1080px', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                  {data.format === 'BUILDER_ID' ? (
                    <BuilderCard data={data} ref={cardRef} />
                  ) : (
                    <PfpFrame data={data} ref={cardRef} />
                  )}
                </div>
              </div>
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
          <div className="flex-center flex-col gap-4" style={{ height: '50vh' }}>
            <div className="animate-spin-slow" style={{ width: '48px', height: '48px', border: '4px solid var(--color-border)', borderTopColor: 'var(--color-primary)', borderRadius: '50%' }} />
            <h3 className="section-title">BUILDING YOUR ID...</h3>
          </div>
        )}

        {state === 'RESULT' && (
          <div className="grid-layout" style={{ minHeight: 'auto', gap: '4rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <div ref={containerRef} style={{ width: '100%', maxWidth: '432px', aspectRatio: data.format === 'BUILDER_ID' ? '1080/1620' : '1080/1080', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '1080px', height: data.format === 'BUILDER_ID' ? '1620px' : '1080px', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                  {data.format === 'BUILDER_ID' ? (
                    <BuilderCard data={data} ref={cardRef} />
                  ) : (
                    <PfpFrame data={data} ref={cardRef} />
                  )}
                  </div>
                </div>
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
