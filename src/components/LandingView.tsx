import { ArrowRight } from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
}

export function LandingView({ onStart }: LandingViewProps) {
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
          <button className="btn-primary" onClick={onStart}>
            CREATE MY FRAME <ArrowRight size={20} />
          </button>
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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-muted)' }}>HH GOA 2026 // ID</div>
            <div style={{ width: '100%', height: '140px', backgroundColor: '#1e293b', borderRadius: '12px', marginTop: '1rem', border: '1px solid var(--color-border)' }} />
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
