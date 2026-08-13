import { useState, useEffect } from 'react';
import { ArrowRight, Quote } from 'lucide-react';

const CAPTIONS = [
  "Swapped the desk for the beach. 🌴💻 Building the future from the coast.",
  "2:47 PM STUDIO mode activated. ⚡️ Ready to break limits in Goa.",
  "Truth can only be found in one place: the code. 🌊🔥",
  "Code, coconuts, and shipping real-world solutions. 🥥✨"
];

const FLOAT_STYLES = `
  @keyframes float-1 { 0% { transform: translateY(0px) rotate(-10deg); } 50% { transform: translateY(-20px) rotate(-5deg); } 100% { transform: translateY(0px) rotate(-10deg); } }
  @keyframes float-2 { 0% { transform: translateY(0px) rotate(15deg); } 50% { transform: translateY(-30px) rotate(20deg); } 100% { transform: translateY(0px) rotate(15deg); } }
  @keyframes float-3 { 0% { transform: translateY(0px) rotate(-45deg); } 50% { transform: translateY(-15px) rotate(-40deg); } 100% { transform: translateY(0px) rotate(-45deg); } }
  @keyframes float-4 { 0% { transform: translateY(0px) rotate(5deg); } 50% { transform: translateY(-25px) rotate(0deg); } 100% { transform: translateY(0px) rotate(5deg); } }
`;

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
    <div className="grid-layout animate-fade-in" style={{ position: 'relative' }}>
      <style>{FLOAT_STYLES}</style>
      
      {/* Sleek UI Asset Containers (Professional Vertical Sidebar) */}
      <div className="hide-on-mobile" style={{ position: 'absolute', top: '15%', left: '2%', width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.2)', animation: 'float-1 8s ease-in-out infinite', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 0 }}>
        <img src="/palm.jpg" style={{ width: '140%', opacity: 0.7, mixBlendMode: 'screen', pointerEvents: 'none' }} alt="" />
      </div>
      
      <div className="hide-on-mobile" style={{ position: 'absolute', top: '30%', left: '2%', width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.2)', animation: 'float-2 7s ease-in-out infinite', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 0 }}>
        <img src="/energy_drink.jpg" style={{ width: '180%', opacity: 0.8, mixBlendMode: 'screen', pointerEvents: 'none' }} alt="" />
      </div>
      
      <div className="hide-on-mobile" style={{ position: 'absolute', top: '45%', left: '2%', width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.2)', animation: 'float-4 9s ease-in-out infinite', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 0 }}>
        <img src="/laptop.jpg" style={{ width: '150%', opacity: 0.7, mixBlendMode: 'screen', pointerEvents: 'none' }} alt="" />
      </div>

      <div className="hide-on-mobile" style={{ position: 'absolute', top: '60%', left: '2%', width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.2)', animation: 'float-1 10s ease-in-out infinite', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 0 }}>
        <img src="/plane.jpg" style={{ width: '160%', opacity: 0.6, mixBlendMode: 'screen', pointerEvents: 'none' }} alt="" />
      </div>

      <div className="hide-on-mobile" style={{ position: 'absolute', top: '75%', left: '2%', width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.2)', animation: 'float-2 8s ease-in-out infinite', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 0 }}>
        <img src="/pizza.jpg" style={{ width: '160%', opacity: 0.8, mixBlendMode: 'screen', pointerEvents: 'none' }} alt="" />
      </div>
      


      {/* Floating Particles (Digital Sparks) */}
      <div className="particle" style={{ top: '30%', left: '20%', width: '4px', height: '4px', animation: 'float-1 4s infinite alternate' }} />
      <div className="particle" style={{ top: '70%', right: '25%', width: '6px', height: '6px', backgroundColor: 'var(--color-secondary)', animation: 'float-2 6s infinite alternate' }} />
      <div className="particle" style={{ top: '40%', right: '15%', width: '3px', height: '3px', backgroundColor: 'var(--color-success)', animation: 'float-3 3s infinite alternate' }} />

      <div className="flex-col" style={{ gap: '2rem' }}>
        <div>
          <div className="glitch-hover" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '1rem', cursor: 'default' }}>
            HH GOA 2026
          </div>
          <h1 className="hero-text text-gradient-animated">
            YOUR BUILDER ID.<br/>
            READY TO SHIP.
          </h1>
          <p className="hero-subtext">
            Drop your photo. Pick your builder energy. Leave Goa with something worth posting.
          </p>
        </div>
        
        <div>
          <button className="btn-primary pulse-glow" onClick={onStart} style={{ marginBottom: '2.5rem' }}>
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

      <div className="flex-center" style={{ position: 'relative', alignSelf: 'flex-start', marginTop: '4rem' }}>
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
