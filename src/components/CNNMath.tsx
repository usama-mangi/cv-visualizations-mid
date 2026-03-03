import { useState } from 'react';
import Flashcards from './Flashcards';

const TOPIC_FLASHCARDS = [
  { front: "Which region of the visual cortex is responsible for high-level object recognition?", back: "The Inferotemporal Cortex (IT)." },
  { front: "What is the key advantage of Convolutional layers over Dense layers?", back: "Translation invariance and the ability to learn spatial hierarchies of features." },
  { front: "How many trainable parameters does a Pooling layer have?", back: "Zero. It only aggregates inputs using fixed functions like Max or Average." },
  { front: "State the output dimension formula for a pooling layer.", back: "Output = ((W - F) / S) + 1" },
  { front: "What was the first CNN to stack convolutional layers directly on top of each other?", back: "AlexNet (2012)." },
  { front: "What is the primary function of skip connections in ResNet?", back: "To solve the vanishing gradient and degradation problems in extremely deep networks." },
  { front: "What is an Inception Module (GoogLeNet)?", back: "A block that applies multiple kernel sizes (1x1, 3x3, 5x5) simultaneously to capture multi-scale patterns." }
];

export default function CNNMath() {
  const [W, setW] = useState(28);
  const [F, setF] = useState(3);
  const [S, setS] = useState(1);
  const [P, setP] = useState(0);
  const [inC, setInC] = useState(1);
  const [outC, setOutC] = useState(32);

  const outSize = Math.floor((W - F + 2 * P) / S) + 1;
  const weights = F * F * inC * outC;
  const totalParams = weights + outC;

  return (
    <>
      <div className="header-meta">
        <span className="topic-badge" style={{ background: '#eef2ff', color: '#4338ca' }}>Module 5</span>
        <h2>CNN Architectural Math</h2>
        <p className="description">From biological inspiration to deep residual learning mechanics.</p>
      </div>

      <div className="card">
        <div className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9z"/><path d="M12 8v4l3 3"/></svg>
          Neural Network Math Guide
        </div>
        <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px dashed var(--border)', padding: '16px', textAlign: 'center', marginBottom: '24px' }}>
          <img 
            src="/assets/infographic_cnn.png" 
            alt="CNN Math Infographic" 
            style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'contain' }}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-title">1. Biological Inspiration & Foundations</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>The Visual Cortex</h4>
            <p style={{ margin: 0, fontSize: '0.8rem' }}><b>V1:</b> Edges. <b>V2:</b> Patterns. <b>V4:</b> Shapes. <b>IT:</b> Objects. CNNs mirror this hierarchy.</p>
          </div>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>Conv vs. Dense</h4>
            <p style={{ margin: 0, fontSize: '0.8rem' }}><b>Dense:</b> Global patterns (1D). <b>Conv:</b> Local, translation-invariant patterns (2D/3D).</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">2. Interactive Architecture Lab</div>
        <div className="interactive-grid">
          <div className="slider-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="slider-row"><div className="slider-label">Width (W) <span className="slider-value">{W}</span></div><input type="range" min="10" max="100" value={W} onChange={e => setW(Number(e.target.value))} /></div>
              <div className="slider-row"><div className="slider-label">Kernel (F) <span className="slider-value">{F}</span></div><input type="range" min="1" max="11" step="2" value={F} onChange={e => setF(Number(e.target.value))} /></div>
              <div className="slider-row"><div className="slider-label">Padding (P) <span className="slider-value">{P}</span></div><input type="range" min="0" max="5" value={P} onChange={e => setP(Number(e.target.value))} /></div>
              <div className="slider-row"><div className="slider-label">Stride (S) <span className="slider-value">{S}</span></div><input type="range" min="1" max="5" value={S} onChange={e => setS(Number(e.target.value))} /></div>
            </div>
            <hr style={{ margin: '24px 0', border: 'none', height: '1px', background: 'var(--border)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="slider-row"><div className="slider-label">Channels <span className="slider-value">{inC}</span></div><input type="range" min="1" max="64" value={inC} onChange={e => setInC(Number(e.target.value))} /></div>
              <div className="slider-row"><div className="slider-label">Filters <span className="slider-value">{outC}</span></div><input type="range" min="1" max="128" value={outC} onChange={e => setOutC(Number(e.target.value))} /></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '12px' }}>OUTPUT FEATURE MAP</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--success)' }}>{outSize} × {outSize}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>⌊(W-F+2P)/S⌋ + 1</div>
            </div>

            <div style={{ background: '#0f172a', padding: '24px', borderRadius: '24px', color: '#fff' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '12px' }}>LEARNABLE PARAMETERS</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '1.25rem', fontWeight: '700' }}>{totalParams.toLocaleString()}</div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '12px 0' }} />
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Weights: {weights.toLocaleString()}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Biases: {outC}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">3. Historical Models & Residual Learning</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>AlexNet (2012)</h4>
            <p style={{ margin: 0, fontSize: '0.75rem' }}>First to stack Conv layers. Used Dropout (50%) and Data Augmentation.</p>
          </div>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>GoogLeNet (2014)</h4>
            <p style={{ margin: 0, fontSize: '0.75rem' }}>Used Inception modules. 10x fewer parameters than AlexNet.</p>
          </div>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>ResNet (2015)</h4>
            <p style={{ margin: 0, fontSize: '0.75rem' }}>Microsoft. 152 layers. Skip connections solved vanishing gradients.</p>
          </div>
        </div>
        <div className="math-formula">
          Residual Block: y = F(x, {'{'}Wᵢ{'}'}) + x
        </div>
      </div>

      <Flashcards cards={TOPIC_FLASHCARDS} />
    </>
  );
}