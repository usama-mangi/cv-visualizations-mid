import { useState } from 'react';
import Flashcards from './Flashcards';

const TOPIC_FLASHCARDS = [
  { front: "What are the two core Linearity Principles?", back: "Additivity (H(f+g) = H(f)+H(g)) and Homogeneity (H(kf) = kH(f))." },
  { front: "What is the key difference between Convolution and Cross-Correlation?", back: "Convolution flips the kernel horizontally and vertically before sliding; correlation does not." },
  { front: "Which filter is best for removing salt-and-pepper noise?", back: "The Median Filter (Non-Linear)." },
  { front: "State the 5 steps of Canny Edge Detection.", back: "1. Gaussian Noise Reduction, 2. Gradient Calculation, 3. Non-Maximum Suppression, 4. Double Thresholding, 5. Edge Tracking by Hysteresis." },
  { front: "What is a Laplacian of Gaussian (LoG) filter used for?", back: "Edge detection via zero-crossing detection, combining smoothing and second-order derivatives." },
  { front: "Why is a Gaussian filter preferred over a Box filter?", back: "It provides a softer blur that preserves edges better by weighting pixels closer to the center more heavily." }
];

export default function Filtering() {
  const [valLeft] = useState(10);
  const [valRight, setValRight] = useState(100);
  const [kernelType, setKernelType] = useState<'sobelX' | 'blur' | 'median'>('sobelX');
  
  const kernel = kernelType === 'sobelX' 
    ? [-1, 0, 1, -2, 0, 2, -1, 0, 1] 
    : [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9];
    
  const patch = [
    valLeft, valRight, valRight, 
    valLeft, valRight, valRight, 
    valLeft, valRight, valRight
  ];
  
  let result = 0;
  if (kernelType === 'median') {
    const sorted = [...patch].sort((a, b) => a - b);
    result = sorted[4];
  } else {
    result = patch.reduce((acc, p, i) => acc + (p * kernel[i]), 0);
  }

  return (
    <>
      <div className="header-meta">
        <span className="topic-badge" style={{ background: '#fef3c7', color: '#92400e' }}>Module 3</span>
        <h2>Filtering & Convolution</h2>
        <p className="description">Mastering spatial kernels, linearity, and advanced edge detection pipelines.</p>
      </div>

      <div className="card">
        <div className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
          Filtering Mechanics Guide
        </div>
        <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px dashed var(--border)', padding: '16px', textAlign: 'center', marginBottom: '24px' }}>
          <img 
            src="assets/infographic_filtering.png" 
            alt="Filtering Infographic" 
            style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'contain' }}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-title">1. Interactive Filter Lab</div>
        <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '16px' }}>IMAGE PATCH</div>
              <div className="grid-container" style={{ width: '120px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {patch.map((p, i) => (
                  <div key={i} className="grid-cell" style={{ background: `rgb(${p},${p},${p})`, color: p > 128 ? '#000' : '#fff' }}>{p}</div>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>{kernelType === 'median' ? '➔' : '×'}</div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '16px' }}>KERNEL / RULE</div>
              {kernelType === 'median' ? (
                <div style={{ width: '120px', height: '120px', background: '#1e293b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>MEDIAN()</div>
              ) : (
                <div className="grid-container" style={{ width: '120px', gridTemplateColumns: 'repeat(3, 1fr)', background: '#1e293b' }}>
                  {kernel.map((k, i) => (
                    <div key={i} className="grid-cell" style={{ background: '#334155', color: '#fff', fontSize: '10px' }}>{k < 1 && k !== 0 ? k.toFixed(2) : k}</div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>=</div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '16px' }}>RESULT</div>
              <div style={{ 
                width: '100px', height: '100px', background: kernelType === 'sobelX' ? '#ef4444' : '#3b82f6', 
                borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', 
                fontSize: '1.5rem', fontWeight: '800', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
              }}>
                {result.toFixed(0)}
              </div>
            </div>
          </div>
        </div>

        <div className="interactive-grid">
          <div className="slider-container">
            <div className="slider-row">
              <div className="slider-label">Edge Contrast (Right) <span className="slider-value">{valRight}</span></div>
              <input type="range" min="0" max="255" value={valRight} onChange={e => setValRight(Number(e.target.value))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <button className="btn-primary" style={{ fontSize: '0.6rem', padding: '8px' }} onClick={() => setKernelType('sobelX')}>Sobel X</button>
              <button className="btn-primary" style={{ fontSize: '0.6rem', padding: '8px' }} onClick={() => setKernelType('blur')}>Box Blur</button>
              <button className="btn-primary" style={{ fontSize: '0.6rem', padding: '8px' }} onClick={() => setKernelType('median')}>Median</button>
            </div>
          </div>
          <div className="retention-card">
            <div className="retention-header">Memory: The Convo-Flip</div>
            <p style={{ margin: 0, fontSize: '0.85rem' }}><b>Convolution</b> = Flip the kernel twice. <b>Correlation</b> = Direct sliding. They are identical for symmetric kernels!</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">2. Mathematical Foundations</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="retention-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#166534' }}>
            <h4 style={{ margin: '0 0 8px' }}>Linearity Principles</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', lineHeight: '1.6' }}>
              <li><b>Additivity:</b> H(f + g) = H(f) + H(g)</li>
              <li><b>Homogeneity:</b> H(kf) = k · H(f)</li>
            </ul>
          </div>
          <div className="retention-card" style={{ background: '#fff7ed', borderColor: '#ffedd5', color: '#9a3412' }}>
            <h4 style={{ margin: '0 0 8px' }}>Canny Pipeline (5 Steps)</h4>
            <p style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.4' }}>1. Blur → 2. Sobel Grad → 3. Non-Max Suppress (Thinning) → 4. Double Threshold → 5. Hysteresis (Linking).</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Mathematical Derivation: Filtering</div>
        <div className="math-formula">
          Linear: S(x,y) = Σ Σ K(i,j) · I(x+i, y+j) <br/>
          DFT (Freq): F(u,v) = Σ Σ f(x,y) · e^(-j 2π (ux/M + vy/N))
        </div>
      </div>

      <Flashcards cards={TOPIC_FLASHCARDS} />
    </>
  );
}