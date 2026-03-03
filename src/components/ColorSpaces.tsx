import { useState } from 'react';
import Flashcards from './Flashcards';

const TOPIC_FLASHCARDS = [
  { front: "State the CIELAB 8-bit scaling for Lightness (L*).", back: "OpenCV scales theoretical L* (0-100) by multiplying by 2.55 to fit the 0-255 range." },
  { front: "How are a* and b* axes (CIELAB) handled in 8-bit images?", back: "Theoretical values (-128 to 127) are shifted by adding +128 to fit the 0-255 range." },
  { front: "What are the three components of the HSV color space?", back: "Hue (color angle), Saturation (purity), and Value (brightness)." },
  { front: "What is the primary difference between RGB and CMYK?", back: "RGB is an Additive model (starts black), while CMYK is a Subtractive model (starts white, used for printing)." },
  { front: "Which color channel has the highest weight in Luma conversion?", back: "Green (0.5870), because the human eye is most sensitive to it." },
  { front: "What is Chromaticity?", back: "Color information independent of brightness (luminance). Includes Hue and Saturation." },
  { front: "What is the visible electromagnetic spectrum range?", back: "Approximately 400 nm (blue) to 700 nm (red)." }
];

export default function ColorSpaces() {
  const [r, setR] = useState(255);
  const [g, setG] = useState(180);
  const [b, setB] = useState(50);
  const [mode, setMode] = useState<'rgb' | 'hsv' | 'lab' | 'cmyk' | 'ycbcr'>('rgb');

  const luma = 0.2989 * r + 0.5870 * g + 0.1140 * b;

  // Simplified Calculations for Visualization
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const delta = max - min;
  
  // HSV
  const v = max;
  const s_hsv = max === 0 ? 0 : delta / max;
  let h = 0;
  if (delta !== 0) {
    if (max === r/255) h = ((g/255 - b/255) / delta) % 6;
    else if (max === g/255) h = (b/255 - r/255) / delta + 2;
    else h = (r/255 - g/255) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  // CMYK
  const k = 1 - Math.max(r/255, g/255, b/255);
  const c = (1 - r/255 - k) / (1 - k) || 0;
  const m = (1 - g/255 - k) / (1 - k) || 0;
  const y = (1 - b/255 - k) / (1 - k) || 0;

  // YCbCr (Approximate)
  const y_cc = 16 + (65.481 * r/255 + 128.553 * g/255 + 24.966 * b/255);
  const cb = 128 + (-37.797 * r/255 - 74.203 * g/255 + 112.0 * b/255);
  const cr = 128 + (112.0 * r/255 - 93.786 * g/255 - 18.214 * b/255);

  return (
    <>
      <div className="header-meta">
        <span className="topic-badge" style={{ background: '#fef2f2', color: '#991b1b' }}>Module 2</span>
        <h2>Color Spaces & Theory</h2>
        <p className="description">From Newton's prism to perceptually uniform digital models.</p>
      </div>

      <div className="card">
        <div className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9z"/><path d="M12 8v4l3 3"/></svg>
          Color Spaces Cheat Sheet
        </div>
        <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px dashed var(--border)', padding: '16px', textAlign: 'center', marginBottom: '24px' }}>
          <img 
            src="/assets/infographic_color_spaces.png" 
            alt="Color Spaces Infographic" 
            style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'contain' }}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-title">1. Color Physics & Perception</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>The Visible Spectrum</h4>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>Isaac Newton demonstrated that white light splits into a spectrum (400nm - 700nm). Component colors do not split further.</p>
            <div style={{ height: '10px', width: '100%', background: 'linear-gradient(to right, #4b0082, #0000ff, #00ff00, #ffff00, #ff7f00, #ff0000)', borderRadius: '999px', marginTop: '12px' }} />
          </div>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>Chromaticity</h4>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>Chromaticity = Hue + Saturation. It is color information independent of brightness (Luminance). Used in JPEG compression and segmentation.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">2. Unified Color Lab</div>
        <div className="interactive-grid">
          <div className="slider-container">
            <div className="slider-row">
              <div className="slider-label">Red <span className="slider-value">{r}</span></div>
              <input type="range" min="0" max="255" value={r} onChange={e => setR(Number(e.target.value))} />
            </div>
            <div className="slider-row">
              <div className="slider-label">Green <span className="slider-value">{g}</span></div>
              <input type="range" min="0" max="255" value={g} onChange={e => setG(Number(e.target.value))} />
            </div>
            <div className="slider-row">
              <div className="slider-label">Blue <span className="slider-value">{b}</span></div>
              <input type="range" min="0" max="255" value={b} onChange={e => setB(Number(e.target.value))} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '16px' }}>
              <button className={`btn-primary`} onClick={()=>setMode('rgb')} style={{fontSize: '0.6rem', padding: '8px', background: mode==='rgb'?'':'#f1f5f9', color: mode==='rgb'?'':'#64748b'}}>LUMA</button>
              <button className={`btn-primary`} onClick={()=>setMode('hsv')} style={{fontSize: '0.6rem', padding: '8px', background: mode==='hsv'?'':'#f1f5f9', color: mode==='hsv'?'':'#64748b'}}>HSV</button>
              <button className={`btn-primary`} onClick={()=>setMode('lab')} style={{fontSize: '0.6rem', padding: '8px', background: mode==='lab'?'':'#f1f5f9', color: mode==='lab'?'':'#64748b'}}>LAB</button>
              <button className={`btn-primary`} onClick={()=>setMode('cmyk')} style={{fontSize: '0.6rem', padding: '8px', background: mode==='cmyk'?'':'#f1f5f9', color: mode==='cmyk'?'':'#64748b'}}>CMYK</button>
              <button className={`btn-primary`} onClick={()=>setMode('ycbcr')} style={{fontSize: '0.6rem', padding: '8px', background: mode==='ycbcr'?'':'#f1f5f9', color: mode==='ycbcr'?'':'#64748b'}}>YCbCr</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '24px' }}>
            <div style={{ 
              width: '100px', height: '100px', background: `rgb(${r},${g},${b})`, borderRadius: '24px',
              boxShadow: `0 20px 40px -12px rgba(${r},${g},${b}, 0.3)`, 
              filter: mode === 'rgb' ? 'grayscale(100%)' : 'none',
              transition: 'all 0.4s ease'
            }} />
            <div style={{ marginTop: '20px', width: '100%' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '8px', textAlign: 'center' }}>
                {mode.toUpperCase()} COMPONENTS
              </div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', background: '#fff', padding: '10px', borderRadius: '12px', border: '1px solid #eee' }}>
                {mode === 'rgb' && <div>Gray: {luma.toFixed(1)}</div>}
                {mode === 'hsv' && <div>H:{h}°, S:{(s_hsv*100).toFixed(0)}%, V:{(v*100).toFixed(0)}%</div>}
                {mode === 'lab' && <div>L* (8bit): {(v*255).toFixed(0)}</div>}
                {mode === 'cmyk' && <div>C:{(c*100).toFixed(0)}% M:{(m*100).toFixed(0)}% Y:{(y*100).toFixed(0)}% K:{(k*100).toFixed(0)}%</div>}
                {mode === 'ycbcr' && <div>Y:{y_cc.toFixed(0)} Cb:{cb.toFixed(0)} Cr:{cr.toFixed(0)}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">3. Mathematics & Models</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h4 style={{ margin: '0 0 8px' }}>Additive (RGB)</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Light-based (Screens). Not perceptually uniform.</p>
            <h4 style={{ margin: '16px 0 8px' }}>Subtractive (CMYK)</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Ink-based (Print). Colors absorb specific wavelengths.</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px' }}>CIELAB (Perceptual)</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Uniform color space. OpenCV scaling for 8-bit:</p>
            <div className="math-formula" style={{ padding: '8px', fontSize: '0.8rem' }}>
              L_8bit = L_theo * 2.55 <br/>
              a/b_8bit = a/b_theo + 128
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Mathematical Derivation: Luma</div>
        <div className="math-formula">
          Gray = 0.2989 · R + 0.5870 · G + 0.1140 · B
        </div>
        <div className="retention-card" style={{ background: '#f0fdf4', color: '#166534', borderColor: '#bbf7d0' }}>
          <div className="retention-header">Memory Strategy: 3-6-1</div>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>Human eyes see green as the brightest channel. (~30% Red, ~60% Green, ~10% Blue).</p>
        </div>
      </div>

      <Flashcards cards={TOPIC_FLASHCARDS} />
    </>
  );
}