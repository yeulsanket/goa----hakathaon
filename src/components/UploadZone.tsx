import { useRef, useState } from 'react';
import { Upload, Camera } from 'lucide-react';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  isUploading?: boolean;
}

export function UploadZone({ onUpload, isUploading }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex-col gap-4 animate-fade-in">
      <div 
        className={`upload-zone ${isDragActive ? 'drag-active' : ''} ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-zone-content">
          <div className="upload-icon-container">
            <Upload size={32} />
          </div>
          <h3 className="section-title">SHOW US THE BUILDER.</h3>
          <p className="metadata-text">Portrait, landscape, selfie, whatever.<br/>We'll handle the crop.</p>
        </div>

        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/jpeg,image/png,image/heic,image/heif" 
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>

      <div className="flex-center" style={{ marginTop: '1rem' }}>
        <button 
          className="btn-secondary" 
          style={{ width: '100%', fontSize: '1rem' }}
          onClick={() => cameraInputRef.current?.click()}
        >
          <Camera size={20} />
          TAKE PHOTO
        </button>
        <input 
          ref={cameraInputRef}
          type="file" 
          accept="image/*" 
          capture="user"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
