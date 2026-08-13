import { useState } from 'react';
import { Download, ExternalLink, RefreshCw, Copy, Check } from 'lucide-react';
import { shareToX, SHARE_TEXT } from '../lib/share';

interface ResultActionsProps {
  onDownload: () => Promise<void>;
  imageBlob: Blob | null;
  onReset: (keepPhoto: boolean) => void;
}

export function ResultActions({ onDownload, imageBlob, onReset }: ResultActionsProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleShare = async () => {
    if (!imageBlob) return;
    await shareToX(imageBlob);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SHARE_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadClick = async () => {
    setDownloading(true);
    try {
      await onDownload();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex-col gap-6 animate-fade-in" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      
      <div className="flex-col gap-4 text-center" style={{ marginBottom: '1rem' }}>
        <h3 className="section-title">YOU'RE IN SHIP MODE.</h3>
        <p className="metadata-text">FRAME READY.</p>
      </div>

      <button 
        className="btn-primary" 
        onClick={handleDownloadClick}
        disabled={downloading}
      >
        <Download size={20} />
        {downloading ? 'SAVING...' : 'DOWNLOAD IMAGE'}
      </button>

      <button className="btn-secondary" onClick={handleShare}>
        <ExternalLink size={20} />
        POST TO X
      </button>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          className="btn-secondary" 
          style={{ flex: 1, fontSize: '0.875rem', padding: '0.75rem' }} 
          onClick={handleCopy}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          COPY CAPTION
        </button>
        <button 
          className="btn-secondary" 
          style={{ flex: 1, fontSize: '0.875rem', padding: '0.75rem' }} 
          onClick={() => onReset(true)}
        >
          <RefreshCw size={16} />
          MAKE ANOTHER
        </button>
      </div>
      
      <div className="text-center" style={{ marginTop: '1rem' }}>
        <button 
          onClick={() => onReset(false)}
          style={{ 
            color: 'var(--color-muted)', 
            textDecoration: 'underline', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.75rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          START OVER WITH NEW PHOTO
        </button>
      </div>

    </div>
  );
}
