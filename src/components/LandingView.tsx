import { useState, useEffect } from 'react';
import { ArrowRight, Quote } from 'lucide-react';

const CAPTIONS = [
  "Swapped the desk for the beach. 🌴💻 Building the future from the coast.",
  "2:47 PM STUDIO mode activated. ⚡️ Ready to break limits in Goa.",
  "Truth can only be found in one place: the code. 🌊🔥",
  "Code, coconuts, and shipping real-world solutions. 🥥✨"
];

interface LandingViewProps {
  onStart: () => void;
}

export function LandingView({ onStart }: LandingViewProps) {
  const [captionIndex, setCaptionIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % CAPTIONS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="grid-layout animate-fade-in">
      <div className="flex-col" style={{ gap: '2rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '1rem' }}>
            HH GOA 2026
          </div>
          <h1 className="hero-text">
            YOUR BUILDER ID.<br/>
            READY TO SHIP.
          </h1>
          <p className="hero-subtext">
            Drop your photo. Pick your builder energy. Leave Goa with something worth posting.
          </p>
        </div>
        
        <div>
          <button className="btn-primary" onClick={onStart} style={{ marginBottom: '2.5rem' }}>
            CREATE MY FRAME <ArrowRight size={20} />
          </button>
          
          {/* Rotating Captions Section */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'rgba(255, 242, 0, 0.05)',
            borderLeft: '4px solid #ff0055',
            borderRadius: '0 8px 8px 0',
            maxWidth: '500px',
            position: 'relative'
          }}>
            <Quote size={20} color="#ff0055" style={{ position: 'absolute', top: '-10px', left: '-12px', fill: '#0a0d0a', strokeWidth: 3 }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
              Caption Inspo:
            </div>
            <div 
              key={captionIndex} 
              className="animate-fade-in"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', color: '#fff200', fontStyle: 'italic', minHeight: '3em' }}
            >
              "{CAPTIONS[captionIndex]}"
            </div>
          </div>
        </div>
      </div>

      <div className="flex-center" style={{ position: 'relative' }}>
        {/* Decorative elements for the preview side */}
        <div 
          className="animate-spin-slow"
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, transparent, var(--color-primary), transparent 40%)',
            opacity: 0.1,
            zIndex: 0
          }}
        />
        
        {/* Mock card preview */}
        <div style={{
          width: '300px',
          height: '375px',
          border: '2px solid var(--color-border)',
          borderRadius: 'var(--border-radius-lg)',
          backgroundColor: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          position: 'relative',
          zIndex: 1,
          transform: 'rotate(2deg)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>GOA HACKER HOUSE</div>
            <div style={{ width: '100%', height: '140px', backgroundColor: '#006e33', borderRadius: '12px', marginTop: '1rem', border: '1px solid var(--color-primary)', backgroundImage: 'url(/poster-bg.jpg)', backgroundSize: 'cover' }} />
          </div>
          <div>
            <div style={{ width: '60%', height: '1.5rem', backgroundColor: 'var(--color-primary)', borderRadius: '4px', marginBottom: '0.5rem' }} />
            <div style={{ width: '40%', height: '1rem', backgroundColor: 'var(--color-border)', borderRadius: '4px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
