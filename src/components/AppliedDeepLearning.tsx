import Flashcards from './Flashcards';

const TOPIC_FLASHCARDS = [
  { front: "What is the primary indicator of overfitting in training curves?", back: "Training accuracy approaches 100% while validation accuracy stalls or decreases; training loss hits 0 while validation loss stops improving." },
  { front: "List the 4 steps of the Data Preprocessing pipeline.", back: "1. Read files, 2. Decode JPEGs to RGB, 3. Convert to Tensors, 4. Normalize pixel values to [0, 1]." },
  { front: "How does Data Augmentation fight overfitting?", back: "By generating random transformations (flips, shifts, zooms) so the network never sees the exact same image twice, improving generalization." },
  { front: "What is 'Feature Extraction' in Transfer Learning?", back: "Freezing the convolutional base of a pretrained model and training a new dense classifier on its output." },
  { front: "What is 'Fine-Tuning'?", back: "Unfreezing the top specialized layers of a frozen base and jointly training them with the new classifier to adjust abstract representations." },
  { front: "Why do we only fine-tune the top layers?", back: "Because early layers capture generic visual features (edges), while top layers capture task-specific specialized features." },
  { front: "What is the risk of fine-tuning the entire convolutional base?", back: "High risk of overfitting on small datasets due to the massive number of parameters (millions)." }
];

export default function AppliedDeepLearning() {
  return (
    <>
      <div className="header-meta">
        <span className="topic-badge" style={{ background: '#fce7f3', color: '#be185d' }}>Module 7</span>
        <h2>Applied Deep Learning Strategies</h2>
        <p className="description">Effective techniques for training robust models on small datasets using data augmentation and transfer learning.</p>
      </div>

      <div className="card">
        <div className="card-title">1. Overfitting & Small Datasets</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="retention-card" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>
            <h4 style={{ margin: '0 0 8px' }}>The Overfitting Problem</h4>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>Common when training on ~2,000 images. Model memorizes specific noise instead of learning general patterns.</p>
          </div>
          <div className="retention-card" style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}>
            <h4 style={{ margin: '0 0 8px' }}>The Augmentation Cure</h4>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>Shifts, flips, and zooms create "new" data. Model generalizes better, accuracy can jump from ~71% to ~82%.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">2. Data Preprocessing Pipeline</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
          {[
            { step: '1', label: 'Read', desc: 'Disk to Mem' },
            { step: '2', label: 'Decode', desc: 'JPEG to RGB' },
            { step: '3', label: 'Tensor', desc: 'To Floats' },
            { step: '4', label: 'Scale', desc: '[0, 255] → [0, 1]' }
          ].map((item, idx) => (
            <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: 'bold' }}>{item.step}</div>
              <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">3. Transfer Learning: Strategies</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>Feature Extraction</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.5' }}><b>Action:</b> Freeze Conv Base. Train <i>only</i> the Classifier.<br/><b>Result:</b> Fast training. 90-96% accuracy on small datasets.</p>
          </div>
          <div className="retention-card" style={{ background: '#f8fafc', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 8px' }}>Fine-Tuning</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.5' }}><b>Action:</b> Unfreeze top Conv layers. Train with Classifier.<br/><b>Result:</b> Re-adjusts abstract features. Reaches 98%+ accuracy.</p>
          </div>
        </div>
      </div>

      <Flashcards cards={TOPIC_FLASHCARDS} />
    </>
  );
}