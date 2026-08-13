import type { BuilderData } from '../types/builder';
import { ENERGY_OPTIONS } from '../types/builder';
import { getRandomTitle } from '../lib/builderTitles';
import { RefreshCw, ArrowRight } from 'lucide-react';

interface BuilderFormProps {
  data: BuilderData;
  updateData: (updates: Partial<BuilderData>) => void;
  onGenerate: () => void;
}

export function BuilderForm({ data, updateData, onGenerate }: BuilderFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.format === 'BUILDER_ID' && data.name && data.stack && data.title) {
      onGenerate();
    } else if (data.format === 'PFP' && data.title) {
      onGenerate();
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} className="flex-col gap-6">
        <h3 className="section-title text-center" style={{ marginBottom: '2rem' }}>YOUR BUILDER ID.</h3>
        
        {data.format === 'BUILDER_ID' && (
          <>
            <div className="form-group">
              <label className="form-label">NAME</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Your name" 
                value={data.name}
                onChange={(e) => updateData({ name: e.target.value })}
                required
                maxLength={25}
              />
            </div>

            <div className="form-group">
              <label className="form-label">STACK / ROLE</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. AI Engineer · React · Solidity" 
                value={data.stack}
                onChange={(e) => updateData({ stack: e.target.value })}
                required
                maxLength={40}
              />
            </div>

            <div className="form-group">
              <label className="form-label">LOCATION / VIBE (OPTIONAL)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Goa, Ship Mode" 
                value={data.location}
                onChange={(e) => updateData({ location: e.target.value })}
                maxLength={20}
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label className="form-label">BUILDER TITLE</label>
          <div className="flex-between gap-4">
            <input 
              type="text" 
              className="form-input" 
              value={data.title}
              onChange={(e) => updateData({ title: e.target.value })}
              required
              maxLength={25}
            />
            <button 
              type="button" 
              className="btn-icon" 
              onClick={() => updateData({ title: getRandomTitle() })}
              title="Generate new title"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {data.format === 'BUILDER_ID' && (
          <>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label">SOCIAL (OPTIONAL)</label>
              <div className="flex-col gap-2">
                <input type="text" className="form-input" placeholder="X (Twitter) Handle" value={data.twitter || ''} onChange={(e) => updateData({ twitter: e.target.value })} maxLength={30} />
                <input type="text" className="form-input" placeholder="GitHub Handle" value={data.github || ''} onChange={(e) => updateData({ github: e.target.value })} maxLength={40} />
                <input type="text" className="form-input" placeholder="LinkedIn Handle" value={data.linkedin || ''} onChange={(e) => updateData({ linkedin: e.target.value })} maxLength={40} />
                <input type="text" className="form-input" placeholder="Instagram Handle" value={data.instagram || ''} onChange={(e) => updateData({ instagram: e.target.value })} maxLength={30} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">QUOTE (OPTIONAL)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="A short builder quote..." 
                value={data.quote || ''}
                onChange={(e) => updateData({ quote: e.target.value })}
                maxLength={60}
              />
            </div>
          </>
        )}

        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label className="form-label" style={{ marginBottom: '1rem' }}>BUILDER ENERGY</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {ENERGY_OPTIONS.map((energy) => (
              <button
                key={energy.id}
                type="button"
                onClick={() => updateData({ energy: energy.id })}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: `1px solid ${data.energy === energy.id ? energy.color : 'var(--color-border)'}`,
                  backgroundColor: data.energy === energy.id ? `${energy.color}20` : 'rgba(0,0,0,0.2)',
                  color: data.energy === energy.id ? energy.color : 'var(--color-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  transition: 'all 0.2s'
                }}
              >
                {energy.icon} {energy.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%' }}
            disabled={data.format === 'BUILDER_ID' ? (!data.name || !data.stack || !data.title) : !data.title}
          >
            {data.format === 'BUILDER_ID' ? 'BUILD MY ID' : 'DOWNLOAD FRAME'} <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
