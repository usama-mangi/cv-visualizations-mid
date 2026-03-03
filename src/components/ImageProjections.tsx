import { useState } from 'react';
import Flashcards from './Flashcards';

const FUNDAMENTALS_FLASHCARDS = [
  { front: "How is a digital image represented in a computer?", back: "As a matrix of pixels. 2D array for Grayscale (Intensity) and 3D array for Color (RGB)." },
  { front: "What is Bit Depth?", back: "The number of bits used per pixel, which determines the range of available colors (e.g., 8-bit = 256 shades)." },
  { front: "Explain the image as a mathematical function f(x, y).", back: "The function maps spatial coordinates (x, y) to an intensity value or a vector of color values." },
  { front: "How can image arithmetic be used for motion detection?", back: "By subtracting two consecutive video frames; pixels that haven't changed result in zero, while moving objects leave a non-zero residual." }
];

const PROJECTION_FLASHCARDS = [
  { front: "Perspective vs Orthographic: Which preserves scale?", back: "Orthographic Projection preserves scale and dimensions by using parallel rays. Perspective does not." },
  { front: "What is the Center of Projection (CoP)?", back: "The single point where all projection lines converge in a perspective camera model." },
  { front: "State the WCIP Pipeline mnemonic.", back: "World -> Camera -> Image -> Pixel (We Catch Image Pixels)." },
  { front: "Extrinsics vs Intrinsics: Which describes the camera hardware?", back: "Intrinsics (K matrix) describe the internal hardware (focal length, sensor center). Extrinsics describe external pose." }
];

export default function ImageProjections() {
  const [focalLength, setFocalLength] = useState(800);
  const [zDepth, setZDepth] = useState(10);
  const [xWorld] = useState(5000);
  const [isOrthographic, setIsOrthographic] = useState(false);
  const [bitDepth, setBitDepth] = useState(8);
  
  const cx = 320;
  const x_cam = xWorld; 
  
  // Projection Logic
  const u_homo = (focalLength * x_cam) + (cx * zDepth);
  const u_pixel = isOrthographic ? (x_cam / 10) + cx : u_homo / zDepth;

  return (
    <>
      <div className="header-meta">
        <span className="topic-badge">Module 1</span>
        <h2>Image Fundamentals & Camera Models</h2>
        <p className="description">From raw pixels to complex 3D-to-2D geometric projections.</p>
      </div>

      {/* II. IMAGE FUNDAMENTALS */}
      <div className="card">
        <div className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
          II. Image Fundamentals
        </div>
        
        <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px dashed var(--border)', padding: '16px', textAlign: 'center', marginBottom: '24px' }}>
          <img 
            src="assets/infographic_fundamentals.png" 
            alt="Image Fundamentals Infographic" 
            style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'contain' }}
          />
        </div>

        <div className="interactive-grid">
          <div className="slider-container">
            <div className="slider-row">
              <div className="slider-label">Bit Depth (Bits/Pixel) <span className="slider-value">{bitDepth}</span></div>
              <input type="range" min="1" max="8" step="1" value={bitDepth} onChange={e => setBitDepth(Number(e.target.value))} />
            </div>
            <div className="retention-hint" style={{ background: '#fff' }}>
              <strong>Visualizing Bit Depth:</strong> At {bitDepth} bits, each pixel can represent 2^{bitDepth} = <b>{Math.pow(2, bitDepth)}</b> unique shades.
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '16px' }}>PIXEL INTENSITY MAP</div>
             <div style={{ 
               display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', width: '120px'
             }}>
               {[...Array(16)].map((_, i) => (
                 <div key={i} style={{ 
                   aspectRatio: 1, 
                   background: `rgba(0,0,0, ${Math.floor((i/15) * (Math.pow(2, bitDepth)-1)) / (Math.pow(2, bitDepth)-1)})`,
                   border: '1px solid #ddd',
                   borderRadius: '2px'
                 }} />
               ))}
             </div>
             <p style={{ fontSize: '0.75rem', marginTop: '12px', color: 'var(--text-secondary)' }}>Image as Function: <i>f(x, y)</i></p>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <h4>Function Arithmetic</h4>
          <div className="math-formula">
            Motion Detection: Change(x,y) = | f_t(x,y) - f_t-1(x,y) |
          </div>
          <p className="description" style={{ fontSize: '0.9rem' }}>Subtracting consecutive frames isolates pixels that changed, revealing moving objects.</p>
        </div>

        <Flashcards cards={FUNDAMENTALS_FLASHCARDS} />
      </div>

      {/* III-V. PROJECTIONS & CAMERA MODELS */}
      <div className="card">
        <div className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9z"/><path d="M12 8v4l3 3"/></svg>
          III-V. Projections & Camera Models
        </div>

        <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px dashed var(--border)', padding: '16px', textAlign: 'center', marginBottom: '24px' }}>
          <img 
            src="assets/infographic_projection.png" 
            alt="3D to 2D Projection Pipeline" 
            style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'contain' }}
          />
        </div>

        <div className="interactive-grid">
          <div className="slider-container">
            <div className="slider-row">
              <div className="slider-label">Focal Length (f) <span className="slider-value">{focalLength}</span></div>
              <input type="range" min="100" max="2000" value={focalLength} onChange={e => setFocalLength(Number(e.target.value))} />
            </div>
            <div className="slider-row">
              <div className="slider-label">Depth (Z / w) <span className="slider-value">{zDepth}m</span></div>
              <input type="range" min="1" max="50" value={zDepth} onChange={e => setZDepth(Number(e.target.value))} />
            </div>
            <button 
              className="btn-primary" 
              style={{ width: '100%', background: isOrthographic ? '#f59e0b' : '' }}
              onClick={() => setIsOrthographic(!isOrthographic)}
            >
              Mode: {isOrthographic ? 'Orthographic (CAD)' : 'Perspective (Realism)'}
            </button>
          </div>

          <div style={{ background: '#0f172a', padding: '32px', borderRadius: '24px', color: '#fff', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '16px' }}>SENSOR VIEWPORT</div>
            <svg width="200" height="150" style={{ background: '#1e293b', borderRadius: '12px', border: '2px solid #334155', marginBottom: '20px' }}>
              <line x1="100" y1="0" x2="100" y2="150" stroke="#334155" strokeDasharray="4" />
              <line x1="0" y1="75" x2="200" y2="75" stroke="#334155" strokeDasharray="4" />
              <circle 
                cx={isOrthographic ? 150 : (50 * focalLength) / (zDepth * 100) + 100} 
                cy="75" 
                r={isOrthographic ? 20 : (100 * focalLength) / (zDepth * 100)} 
                fill="url(#projGradient)" 
                stroke="#fff" 
                strokeWidth="2"
              />
              <defs>
                <radialGradient id="projGradient"><stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="#4f46e5" /></radialGradient>
              </defs>
            </svg>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: '1.25rem', color: 'var(--success)' }}>u = {u_pixel.toFixed(1)} px</div>
          </div>
        </div>

        <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="retention-card">
            <h4 style={{ margin: '0 0 8px' }}>Camera Evolution</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.8rem', lineHeight: '1.6' }}>
              <li><b>Pinhole:</b> Hole (aperture) only. Sharp vs Bright trade-off.</li>
              <li><b>Analogue:</b> Hole + Lens + Chemical Film.</li>
              <li><b>Digital:</b> Hole + Lens + Pixel Sensor.</li>
            </ul>
          </div>
          <div className="retention-card" style={{ background: '#f0f9ff', color: '#0369a1', borderColor: '#bae6fd' }}>
            <h4 style={{ margin: '0 0 8px' }}>The Matrices</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.8rem', lineHeight: '1.6' }}>
              <li><b>Extrinsics [R|t]:</b> Outside pose (Rotation/Translation).</li>
              <li><b>Intrinsics K:</b> Inside hardware (Focal length/Center).</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <h4>WCIP Pipeline Derivation</h4>
          <div className="math-formula">
            x_pixel = K [R|t] X_world <br/>
            [x, y, w]ᵀ → (x/w, y/w)
          </div>
          <p className="description" style={{ fontSize: '0.9rem' }}>The matrix multiplication yields a <b>Homogeneous Coordinate</b>. Division by <i>w</i> (depth) is the final normalization step to 2D.</p>
        </div>

        <Flashcards cards={PROJECTION_FLASHCARDS} />
      </div>
    </>
  );
}