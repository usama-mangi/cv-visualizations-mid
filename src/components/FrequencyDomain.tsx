import { useState } from 'react';
import Flashcards from './Flashcards';

const TOPIC_FLASHCARDS = [
  { front: "What does the Frequency Domain represent?", back: "An image represented by sinusoidal components (sine/cosine waves) reflecting brightness variations." },
  { front: "What is the Discrete Fourier Transform (DFT)?", back: "The mathematical tool to convert an image from the Spatial (pixels) to Frequency (waves) domain." },
  { front: "Where are Low Frequencies located in a shifted spectrum?", back: "At the center of the image. They correspond to smooth areas and gradual changes." },
  { front: "Where are High Frequencies located in a shifted spectrum?", back: "At the edges. They correspond to sharp details, edges, and noise." },
  { front: "What is the effect of a Low-Pass Filter (LPF) in the frequency domain?", back: "It passes the center (low frequencies) and blocks the edges (high frequencies), resulting in a blurred image." },
  { front: "What is the effect of a High-Pass Filter (HPF) in the frequency domain?", back: "It blocks the center and passes the edges, resulting in a sharpened image or edge map." },
  { front: "Name two applications of Frequency Domain analysis in CV.", back: "Image compression (JPEG) and global image filtering (denoising/sharpening)." }
];

export default function FrequencyDomain() {
  const [filterType, setFilterType] = useState<'low' | 'high'>('low');

  return (
    <>
      <div className="header-meta">
        <span className="topic-badge" style={{ background: '#e0f2fe', color: '#075985' }}>Module 6</span>
        <h2>Frequency Domain & Transforms</h2>
        <p className="description">Analyzing images as a sum of sinusoidal waves to isolate patterns, textures, and noise.</p>
      </div>

      <div className="card">
        <div className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9z"/><path d="M12 8v4l3 3"/></svg>
          Frequency Domain Visualization Guide
        </div>
        <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px dashed var(--border)', padding: '16px', textAlign: 'center', marginBottom: '24px' }}>
          <img 
            src="assets/infographic_frequency.png" 
            alt="Frequency Domain Infographic" 
            style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'contain' }}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-title">1. Spatial vs. Frequency Domain</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>Spatial Domain</h4>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>Direct pixel intensities <i>f(x, y)</i>. Local operations (Convolutions) happen here.</p>
          </div>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>Frequency Domain</h4>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>Sinusoidal components <i>F(u, v)</i>. Global operations (FFT) happen here. Enables better texture and noise analysis.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">2. Interactive Spectrum Mask Lab</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <button className={`btn-primary`} onClick={() => setFilterType('low')} style={{ background: filterType === 'low' ? '' : '#f1f5f9', color: filterType === 'low' ? '' : '#64748b' }}>Low-Pass Filter (Blur)</button>
            <button className={`btn-primary`} onClick={() => setFilterType('high')} style={{ background: filterType === 'high' ? '#ef4444' : '#f1f5f9', color: filterType === 'high' ? '' : '#64748b' }}>High-Pass Filter (Sharpen)</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', background: '#f8fafc', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '16px' }}>SPECTRUM MASK</div>
              <div style={{ position: 'relative', width: '140px', height: '140px', background: '#0f172a', borderRadius: '50%', margin: '0 auto', overflow: 'hidden', border: '4px solid #1e293b' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '25px', height: '25px', background: '#fff', borderRadius: '50%', boxShadow: '0 0 30px 15px rgba(255,255,255,0.4)' }} />
                {filterType === 'low' ? (
                  <div style={{ position: 'absolute', inset: 0, border: '40px solid rgba(15, 23, 42, 0.95)' }} />
                ) : (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70px', height: '70px', background: '#0f172a', borderRadius: '50%' }} />
                )}
              </div>
              <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{filterType === 'low' ? 'Keeping Center' : 'Keeping Edges'}</div>
            </div>

            <div style={{ padding: '0 30px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '16px' }}>RESULT (SIMULATED)</div>
              <div style={{ 
                width: '140px', height: '140px', borderRadius: '20px', margin: '0 auto',
                background: filterType === 'low' ? '#94a3b8' : 'transparent',
                border: filterType === 'low' ? 'none' : '2px solid #475569',
                filter: filterType === 'low' ? 'blur(6px)' : 'none',
                position: 'relative'
              }}>
                {filterType === 'high' && <div style={{ position: 'absolute', inset: '15px', border: '2px solid #94a3b8', borderRadius: '10px', opacity: 0.4 }} />}
              </div>
              <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{filterType === 'low' ? 'Blurred Background' : 'Isolated Edges'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">3. Mathematical Core: DFT Formula</div>
        <div className="math-formula">
          F(u, v) = Σₓ Σᵧ f(x, y) · e^(-j 2π (ux/M + vy/N))
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="retention-card" style={{ background: '#f0fdf4', color: '#166534', borderColor: '#bbf7d0' }}>
            <h4 style={{ margin: '0 0 8px' }}>Variable Key</h4>
            <p style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.4' }}><b>f(x,y):</b> Spatial pixel. <b>F(u,v):</b> Freq component. <b>e^...:</b> Sinusoidal basis wave. <b>j:</b> Img unit √-1.</p>
          </div>
          <div className="retention-card" style={{ background: '#fdf2f8', color: '#9d174d', borderColor: '#fbcfe8' }}>
            <h4 style={{ margin: '0 0 8px' }}>Target Analogy</h4>
            <p style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.4' }}>Center = Bullseye = Bass (Low Freq). Edges = Outer Rings = Treble (High Freq/Noise).</p>
          </div>
        </div>
      </div>

      <Flashcards cards={TOPIC_FLASHCARDS} />
    </>
  );
}