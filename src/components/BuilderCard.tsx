import { forwardRef } from 'react';
import type { BuilderData } from '../types/builder';
import { MapPin } from 'lucide-react';

const TwitterIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const GithubIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const LinkedinIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const InstagramIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;

interface BuilderCardProps {
  data: BuilderData;
}

export const BuilderCard = forwardRef<HTMLDivElement, BuilderCardProps>(({ data }, ref) => {
  return (
    <div 
      ref={ref}
      style={{
        width: '1080px',
        height: '1620px', // Using a taller aspect ratio (2:3) to fit the uploaded poster perfectly
        backgroundColor: '#006e33',
        backgroundImage: 'url(/poster-bg.jpg)',
        backgroundSize: '100% 100%', // Stretch exactly to fit 1080x1620
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Photo Upload Area Overwrite */}
      {/* Approximated coordinates based on the poster image */}
      <div style={{
        position: 'absolute',
        top: '22.5%',
        left: '10.5%',
        width: '38.5%',
        height: '48.5%',
        borderRadius: '70px',
        backgroundColor: '#0a0d0a',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {data.image ? (
          <img src={data.image} alt="Builder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: '#a3e6b5', textAlign: 'center', fontSize: '1.5rem' }}>Upload<br/>Photo</div>
        )}
      </div>

      {/* Name Label & Box */}
      <div style={{ position: 'absolute', top: '24.9%', left: '51%', display: 'flex', flexDirection: 'column', gap: '8px', width: '38%' }}>
        <div style={{ backgroundColor: '#ff0055', color: '#000', padding: '4px 12px', width: 'fit-content', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 'bold' }}>USERNAME / HACKER NAME</div>
        <div style={{
          width: '100%',
          height: '46px',
          backgroundColor: '#0a0d0a',
          border: '2px solid #fff200',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px'
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#fff200', fontSize: '24px', fontWeight: 'bold' }}>
            {data.name || 'YOUR NAME'}
          </span>
        </div>
      </div>

      {/* ID Label & Box */}
      <div style={{ position: 'absolute', top: '32.1%', left: '51%', display: 'flex', flexDirection: 'column', gap: '8px', width: '38%' }}>
        <div style={{ backgroundColor: '#ff0055', color: '#000', padding: '4px 12px', width: 'fit-content', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 'bold' }}>UNIQUE ID / CODE</div>
        <div style={{
          width: '100%',
          height: '46px',
          backgroundColor: '#0a0d0a',
          border: '2px solid #fff200',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px'
        }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#fff200', fontSize: '24px', fontWeight: 'bold' }}>
            {data.builderId}
          </span>
        </div>
      </div>

      {/* Location Label & Box */}
      <div style={{ position: 'absolute', top: '39.3%', left: '51%', display: 'flex', flexDirection: 'column', gap: '8px', width: '38%' }}>
        <div style={{ backgroundColor: '#ff0055', color: '#000', padding: '4px 12px', width: 'fit-content', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 'bold' }}>LOCATION</div>
        <div style={{
          width: '100%',
          height: '46px',
          backgroundColor: '#0a0d0a',
          border: '2px solid #fff200',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '15px',
          gap: '10px'
        }}>
          <MapPin color="#fff200" size={24} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#fff200', fontSize: '24px', fontWeight: 'bold' }}>
            {data.location || 'GOA, INDIA'}
          </span>
        </div>
      </div>

      {/* Bio Label & Box */}
      <div style={{ position: 'absolute', top: '46.5%', left: '51%', display: 'flex', flexDirection: 'column', gap: '8px', width: '38%' }}>
        <div style={{ backgroundColor: '#ff0055', color: '#000', padding: '4px 12px', width: 'fit-content', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 'bold' }}>SHORT BIO</div>
        <div style={{
          width: '100%',
          height: '180px',
          backgroundColor: '#0a0d0a',
          border: '2px solid #fff200',
          borderRadius: '16px',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: '#fff', fontSize: '18px', lineHeight: '1.4' }}>
            {`> ${data.stack || 'Code enthusiast.'}`}<br/><br/>
            {`> Building things that break limits.`}<br/><br/>
            {`> ${data.title || 'Obsessed with solving real-world problems.'}`}
          </div>
        </div>
      </div>

      {/* Social 1: Twitter */}
      <div style={{ position: 'absolute', top: '61.5%', left: '51%', width: '38%', height: '40px', backgroundColor: '#0a0d0a', border: '2px solid #fff200', borderRadius: '50px', display: 'flex', alignItems: 'center', paddingLeft: '20px', gap: '15px' }}>
        <div style={{ color: '#fff200', transform: 'scale(0.8)' }}><TwitterIcon /></div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#fff200', fontSize: '20px' }}>{data.twitter || '@hackr_goa'}</span>
      </div>

      {/* Social 2: GitHub */}
      <div style={{ position: 'absolute', top: '65%', left: '51%', width: '38%', height: '40px', backgroundColor: '#0a0d0a', border: '2px solid #fff200', borderRadius: '50px', display: 'flex', alignItems: 'center', paddingLeft: '20px', gap: '15px' }}>
        <div style={{ color: '#fff200', transform: 'scale(0.8)' }}><GithubIcon /></div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#fff200', fontSize: '20px' }}>{data.github || 'github/hackerhouse'}</span>
      </div>

      {/* Social 3: LinkedIn */}
      <div style={{ position: 'absolute', top: '68.5%', left: '51%', width: '38%', height: '40px', backgroundColor: '#0a0d0a', border: '2px solid #fff200', borderRadius: '50px', display: 'flex', alignItems: 'center', paddingLeft: '20px', gap: '15px' }}>
        <div style={{ color: '#fff200', transform: 'scale(0.8)' }}><LinkedinIcon /></div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#fff200', fontSize: '20px' }}>{data.linkedin || 'linkedin/hackerhouse'}</span>
      </div>

      {/* Social 4: Instagram */}
      <div style={{ position: 'absolute', top: '72%', left: '51%', width: '38%', height: '40px', backgroundColor: '#0a0d0a', border: '2px solid #fff200', borderRadius: '50px', display: 'flex', alignItems: 'center', paddingLeft: '20px', gap: '15px' }}>
        <div style={{ color: '#fff200', transform: 'scale(0.8)' }}><InstagramIcon /></div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#fff200', fontSize: '20px' }}>{data.instagram || '@hackerhousegoa'}</span>
      </div>

      {/* Quote Box */}
      <div style={{
        position: 'absolute',
        top: '73%',
        left: '10%',
        width: '40%',
        height: '100px',
        backgroundColor: '#fff200',
        border: '6px solid #ff0055',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'rotate(-4deg)',
        boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
        padding: '10px 20px',
        boxSizing: 'border-box'
      }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", color: '#000', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', lineHeight: '1.2' }}>
          {`> "${data.quote || 'Truth can only be found in one place: the code.'}"`}
        </div>
        {/* Palm tree decorative on quote */}
        <div style={{ position: 'absolute', right: '10px', bottom: '10px', fontSize: '24px' }}>🌴</div>
      </div>
    </div>
  );
});

BuilderCard.displayName = 'BuilderCard';
