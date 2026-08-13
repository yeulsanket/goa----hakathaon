import type { Format } from '../types/builder';

interface FormatSelectorProps {
  onSelect: (format: Format) => void;
  imageUrl: string;
}

export function FormatSelector({ onSelect, imageUrl }: FormatSelectorProps) {
  return (
    <div className="flex-col gap-6 animate-fade-in">
      <h3 className="section-title text-center">CHOOSE YOUR VIBE.</h3>
      
      <div className="grid-layout" style={{ minHeight: 'auto', gap: '2rem' }}>
        {/* PFP Option */}
        <div 
          className="format-option"
          onClick={() => onSelect('PFP')}
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--border-radius-lg)',
            padding: '2rem',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s',
            backgroundColor: 'rgba(255, 255, 255, 0.02)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-fg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
          }}
        >
          <div className="flex-center flex-col gap-4">
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid var(--color-primary)'
            }}>
              <img src={imageUrl} alt="PFP Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h4 className="section-title" style={{ fontSize: '1.25rem', marginBottom: 0 }}>PFP FRAME</h4>
            <p className="metadata-text">For your X profile picture.</p>
          </div>
        </div>

        {/* Builder ID Option */}
        <div 
          className="format-option"
          onClick={() => onSelect('BUILDER_ID')}
          style={{
            border: '2px solid var(--color-primary)',
            borderRadius: 'var(--border-radius-lg)',
            padding: '2rem',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s',
            backgroundColor: 'rgba(255, 69, 0, 0.05)',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 69, 0, 0.2)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '20px',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-bg)',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-mono)'
          }}>
            RECOMMENDED
          </div>
          <div className="flex-center flex-col gap-4">
            <div style={{
              width: '120px',
              height: '160px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid var(--color-primary)'
            }}>
              <img src={imageUrl} alt="ID Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h4 className="section-title" style={{ fontSize: '1.25rem', marginBottom: 0 }}>BUILDER ID</h4>
            <p className="metadata-text">For your next post.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
