import { useState } from 'react';
import './App.css';
import ImageProjections from './components/ImageProjections';
import Introduction from './components/Introduction';
import ColorSpaces from './components/ColorSpaces';
import Filtering from './components/Filtering';
import FeatureExtraction from './components/FeatureExtraction';
import CNNMath from './components/CNNMath';
import FrequencyDomain from './components/FrequencyDomain';
import AppliedDeepLearning from './components/AppliedDeepLearning';
import Quiz from './components/Quiz';

const SECTIONS = [
  { id: 'intro', title: 'Course Overview', icon: '📝' },
  { id: 'img-rep', title: 'Image & Projections', icon: '📷' },
  { id: 'color-spaces', title: 'Color Spaces', icon: '🎨' },
  { id: 'filtering', title: 'Filtering Math', icon: '⚡' },
  { id: 'features', title: 'Feature Extraction', icon: '🎯' },
  { id: 'cnn-math', title: 'CNN Architecture', icon: '🧠' },
  { id: 'frequency', title: 'Frequency Domain', icon: '🌊' },
  { id: 'applied-dl', title: 'Applied DL', icon: '🚀' },
  { id: 'quiz', title: 'Knowledge Quiz', icon: '🏆' },
];

function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">CV</div>
          <span className="sidebar-title">VisionAcademy</span>
        </div>

        <div className="nav-group">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              className={`nav-btn ${activeSection === sec.id ? 'active' : ''}`}
              onClick={() => setActiveSection(sec.id)}
            >
              <span style={{marginRight: '12px', fontSize: '1.1rem'}}>{sec.icon}</span>
              {sec.title}
            </button>
          ))}
        </div>

        <div style={{marginTop: 'auto', padding: '20px 12px'}}>
          <div style={{background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
            <div style={{fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '4px'}}>PROGRESS</div>
            <div style={{height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden'}}>
              <div style={{width: `${((SECTIONS.findIndex(s => s.id === activeSection) + 1) / SECTIONS.length) * 100}%`, height: '100%', background: 'var(--primary)'}} />
            </div>
          </div>
        </div>
      </nav>

      <main className="content">
        {activeSection === 'intro' && <Introduction />}
        {activeSection === 'img-rep' && <ImageProjections />}
        {activeSection === 'color-spaces' && <ColorSpaces />}
        {activeSection === 'filtering' && <Filtering />}
        {activeSection === 'features' && <FeatureExtraction />}
        {activeSection === 'cnn-math' && <CNNMath />}
        {activeSection === 'frequency' && <FrequencyDomain />}
        {activeSection === 'applied-dl' && <AppliedDeepLearning />}
        {activeSection === 'quiz' && <Quiz />}
      </main>
    </div>
  );
}
export default App;
