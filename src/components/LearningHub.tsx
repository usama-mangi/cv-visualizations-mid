export default function LearningHub() {
  return (
    <>
      <div className="header-meta">
        <span className="topic-badge" style={{ background: '#fef3c7', color: '#92400e' }}>Knowledge Base</span>
        <h2>Learning Hub & Final Review</h2>
        <p className="description">A consolidated repository of all artifacts, study guides, and visual summaries generated for this course.</p>
      </div>

      <div className="card">
        <div className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          Comprehensive Study Guide
        </div>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          <h4 style={{ color: 'var(--text-primary)' }}>Section 1: Image Representation & Camera Geometry</h4>
          <p>Perspective projection simulates how a camera captures the 3D world onto a 2D image plane. The complete pipeline uses the equation: <b>x_pixel = K [R|t] X_world</b>.</p>
          
          <h4 style={{ color: 'var(--text-primary)', marginTop: '24px' }}>Section 2: Color Spaces & Frequency Domains</h4>
          <p>Converting an RGB image to grayscale uses the weighted Luma formula: <b>Gray = 0.2989·R + 0.5870·G + 0.1140·B</b>. High frequencies represent edges and noise, while low frequencies represent smooth areas.</p>

          <h4 style={{ color: 'var(--text-primary)', marginTop: '24px' }}>Section 3: Filtering & Edge Detection</h4>
          <p>Linear filters calculate the output pixel as a weighted sum of the inputs in the neighborhood. Sobel filters emphasize edges while applying Gaussian smoothing.</p>

          <h4 style={{ color: 'var(--text-primary)', marginTop: '24px' }}>Section 4: Feature Extraction</h4>
          <p>Harris Corner detection uses the Structure Tensor matrix <b>M</b>. If both eigenvalues are large, it's a corner. SIFT refines keypoints to sub-pixel accuracy using Taylor series expansion.</p>

          <h4 style={{ color: 'var(--text-primary)', marginTop: '24px' }}>Section 5: CNN Architecture</h4>
          <p>Output spatial dimensions are calculated as: <b>O = ⌊(W - F + 2P) / S⌋ + 1</b>. Total parameters are calculated as (Filter Size × Input Channels) × Filters + Biases.</p>
        </div>
      </div>

      <div className="card">
        <div className="card-title">External Resources & Mind Maps</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <a 
            href="https://notebooklm.google.com/notebook/3f088c55-286c-4e76-8f0e-91cc95a43b2c" 
            target="_blank" 
            rel="noopener noreferrer"
            className="retention-card"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', transition: 'transform 0.2s' }}
          >
            <span style={{ fontSize: '1.5rem' }}>🧠</span>
            <div>
              <div style={{ fontWeight: '700' }}>Curriculum Mind Map</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>View logical connections in NotebookLM</div>
            </div>
          </a>
          <a 
            href="https://notebooklm.google.com/notebook/3f088c55-286c-4e76-8f0e-91cc95a43b2c" 
            target="_blank" 
            rel="noopener noreferrer"
            className="retention-card"
            style={{ background: '#fdf2f8', borderColor: '#fbcfe8', color: '#9d174d', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span style={{ fontSize: '1.5rem' }}>⚖️</span>
            <div>
              <div style={{ fontWeight: '700' }}>Ethics & Arch Mind Map</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Explore system-wide dependencies</div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}