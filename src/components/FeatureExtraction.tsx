import { useState } from 'react';
import Flashcards from './Flashcards';

const TOPIC_FLASHCARDS = [
  { front: "What is the primary difference between Global and Local features?", back: "Global features describe the entire image (statistics), while Local features are specific keypoints (Corners, Blobs) that preserve spatial location." },
  { front: "What is the Aperture Problem?", back: "The ambiguity of matching 1D edge structures compared to 2D corner structures, as edges look similar along their length." },
  { front: "State the 4 steps of SIFT.", back: "1. Scale-space extrema (DoG), 2. Keypoint localization (Taylor expansion), 3. Orientation assignment, 4. Descriptor generation (128-D)." },
  { front: "How does the FAST algorithm achieve high speed?", back: "By testing a 16-pixel ring and using early rejection if specific pixels (1, 5, 9, 13) don't match the threshold." },
  { front: "What distance metric is used for binary descriptors like ORB/BRIEF?", back: "Hamming Distance (Popcount of bitwise XOR)." },
  { front: "What is David Lowe's Ratio Test?", back: "Comparing the distance of the best match to the second-best match to filter out ambiguous points." },
  { front: "What are the characteristics of a 'good' feature?", back: "Invariance, Repeatability, Distinctiveness, and Efficiency." }
];

export default function FeatureExtraction() {
  const [l1, setL1] = useState(1200);
  const [l2, setL2] = useState(1000);
  
  const k = 0.05;
  const detM = l1 * l2;
  const traceM = l1 + l2;
  const R = detM - k * Math.pow(traceM, 2);

  let classification = "FLAT";
  let color = "#94a3b8";
  if (R > 50000) { classification = "CORNER"; color = "#10b981"; }
  else if (R < -50000) { classification = "EDGE"; color = "#f59e0b"; }

  return (
    <>
      <div className="header-meta">
        <span className="topic-badge" style={{ background: '#ecfdf5', color: '#065f46' }}>Module 4</span>
        <h2>Feature Extraction</h2>
        <p className="description">From low-level gradients to scale-invariant descriptors and robust keypoint matching.</p>
      </div>

      <div className="card">
        <div className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9z"/><path d="M12 8v4l3 3"/></svg>
          Algorithm Cheat Sheet
        </div>
        <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px dashed var(--border)', padding: '16px', textAlign: 'center', marginBottom: '24px' }}>
          <img 
            src="assets/infographic_features.png" 
            alt="Algorithm Comparison Infographic" 
            style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'contain' }}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-title">1. Fundamentals & The Aperture Problem</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>Global vs. Local</h4>
            <p style={{ margin: 0, fontSize: '0.8rem' }}><b>Global:</b> Entire image statistics (Histograms, GLCM). Low spatial info. <b>Local:</b> Keypoints (SIFT, Harris). Robust to occlusion.</p>
          </div>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>Aperture Ambiguity</h4>
            <p style={{ margin: 0, fontSize: '0.8rem' }}>Matching a point on a line is ambiguous. Corners solve this by providing gradients in multiple directions.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">2. Interactive Harris Lab</div>
        <div className="interactive-grid">
          <div className="slider-container">
            <div className="slider-row">
              <div className="slider-label">λ₁ (X Change) <span className="slider-value">{l1}</span></div>
              <input type="range" min="0" max="2000" value={l1} onChange={e => setL1(Number(e.target.value))} />
            </div>
            <div className="slider-row">
              <div className="slider-label">λ₂ (Y Change) <span className="slider-value">{l2}</span></div>
              <input type="range" min="0" max="2000" value={l2} onChange={e => setL2(Number(e.target.value))} />
            </div>
            <div style={{ marginTop: '20px', background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>RESULT</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: color }}>{classification}</div>
            </div>
          </div>

          <div style={{ background: '#0f172a', borderRadius: '24px', padding: '24px', color: '#fff' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '16px' }}>MATH BUFFER</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', lineHeight: '1.8' }}>
              <div>det(M) = λ₁λ₂ = {detM.toLocaleString()}</div>
              <div>trace(M) = λ₁+λ₂ = {traceM.toLocaleString()}</div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '12px 0' }} />
              <div style={{ color: color, fontWeight: 'bold' }}>R = det - k(trace)² = {R.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">3. Algorithm Deep Dive</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>SIFT (Invariant)</h4>
            <p style={{ margin: 0, fontSize: '0.75rem' }}>Scale & Rotation invariant. Uses 128-D floating-point descriptors.</p>
          </div>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>ORB (Efficient)</h4>
            <p style={{ margin: 0, fontSize: '0.75rem' }}>Binary descriptors (256 bits). FAST + Rotated BRIEF. Free alternative to SIFT.</p>
          </div>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>SURF & FAST</h4>
            <p style={{ margin: 0, fontSize: '0.75rem' }}>SURF: Speeded up SIFT. FAST: Real-time keypoint detection via pixel circles.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Mathematical Foundation: Hessian & Centroid</div>
        <div className="math-formula">
          Hessian (SIFT/SURF): det(H) = IₓₓIᵧᵧ - (Iₓᵧ)² <br/>
          Centroid (ORB): C = (Σ x·I(x,y) / Σ I(x,y), Σ y·I(x,y) / Σ I(x,y))
        </div>
      </div>

      <Flashcards cards={TOPIC_FLASHCARDS} />
    </>
  );
}