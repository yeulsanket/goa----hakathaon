import { forwardRef } from 'react';
import type { BuilderData } from '../types/builder';
import { ENERGY_OPTIONS } from '../types/builder';

interface PfpFrameProps {
  data: BuilderData;
}

export const PfpFrame = forwardRef<HTMLDivElement, PfpFrameProps>(({ data }, ref) => {
  const energyDetails = ENERGY_OPTIONS.find(e => e.id === data.energy) || ENERGY_OPTIONS[0];
  const primaryColor = energyDetails.color;

  return (
    <div 
      ref={ref}
      style={{
        width: '1080px',
        height: '1080px',
        backgroundColor: '#0d0f12',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Background / Main Photo */}
      {data.image && (
        <img 
          src={data.image} 
          alt="PFP" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }} 
        />
      )}

      {/* Frame Elements Overlay */}
      <img 
        src="/pfp-frame.jpg"
        alt="Frame Overlay"
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.95,
          transform: 'scale(1.4)'
        }}
      />

      {/* Top Left Label */}
      <div style={{
        position: 'absolute',
        top: '70px', left: '70px',
        backgroundColor: '#0d0f12',
        color: '#f5f5f5',
        padding: '12px 24px',
        borderRadius: '999px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '24px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 2,
        border: `2px solid ${primaryColor}`
      }}>
        <div style={{ width: '12px', height: '12px', backgroundColor: primaryColor, borderRadius: '50%' }} />
        HH GOA 2026
      </div>

      {/* Bottom Right Label */}
      <div style={{
        position: 'absolute',
        bottom: '70px', right: '70px',
        backgroundColor: primaryColor,
        color: '#0d0f12',
        padding: '16px 32px',
        borderRadius: '999px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '28px',
        fontWeight: 'bold',
        zIndex: 2,
        textTransform: 'uppercase'
      }}>
        {energyDetails.icon} {data.title}
      </div>

      {/* Bottom Left Small Meta */}
      <div style={{
        position: 'absolute',
        bottom: '80px', left: '70px',
        color: '#fff',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '24px',
        fontWeight: 'bold',
        textShadow: '0 4px 12px rgba(0,0,0,0.5)',
        zIndex: 2
      }}>
        #FrameInGoa // {data.builderId}
      </div>
    </div>
  );
});

PfpFrame.displayName = 'PfpFrame';
