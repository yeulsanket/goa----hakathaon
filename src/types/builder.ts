export type AppState =
  | 'IDLE'
  | 'UPLOADING'
  | 'PHOTO_READY'
  | 'CONFIGURING'
  | 'GENERATING'
  | 'RESULT'
  | 'ERROR';

export type BuilderEnergy =
  | 'SHIPPER'
  | 'ARCHITECT'
  | 'CHAOS_BUILDER'
  | 'CREATIVE_CODER'
  | 'AI_NATIVE'
  | 'PROTOCOL_BUILDER'
  | 'COASTAL_HACKER'
  | null;

export type Format = 'PFP' | 'BUILDER_ID';

export interface BuilderData {
  image: string | null; // Data URL
  format: Format;
  name: string;
  stack: string;
  location: string;
  title: string;
  energy: BuilderEnergy;
  builderId: string; // E.g., HH-042
  twitter?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  quote?: string;
}

export const ENERGY_OPTIONS: { id: BuilderEnergy; label: string; icon: string; color: string }[] = [
  { id: 'SHIPPER', label: 'SHIPPER', icon: '⚡', color: '#facc15' },
  { id: 'ARCHITECT', label: 'ARCHITECT', icon: '🧠', color: '#60a5fa' },
  { id: 'CHAOS_BUILDER', label: 'CHAOS BUILDER', icon: '🔥', color: '#ef4444' },
  { id: 'CREATIVE_CODER', label: 'CREATIVE CODER', icon: '🎨', color: '#d946ef' },
  { id: 'AI_NATIVE', label: 'AI NATIVE', icon: '🤖', color: '#00e5ff' },
  { id: 'PROTOCOL_BUILDER', label: 'PROTOCOL BUILDER', icon: '⛓️', color: '#94a3b8' },
  { id: 'COASTAL_HACKER', label: 'COASTAL HACKER', icon: '🌊', color: '#10b981' },
];
