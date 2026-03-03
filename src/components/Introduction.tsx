import Flashcards from './Flashcards';

const INTRO_FLASHCARDS = [
  { front: "What is the weightage of the Final Exam in the Computer Vision course?", back: "50%" },
  { front: "What is the weightage of the Midterm Exam?", back: "30%" },
  { front: "How many marks is a student awarded for attendance above 95%?", back: "2 marks" },
  { front: "What is the penalty for copying an assignment from a classmate?", back: "All involved students receive zero marks." },
  { front: "Which three software tools are primarily used in this course?", back: "Python, TensorFlow / PyTorch, and Google Colab." },
  { front: "How long is the lecture duration for the course?", back: "14 weeks" }
];

export default function Introduction() {
  return (
    <>
      <div className="header-meta">
        <span className="topic-badge" style={{ background: '#eef2ff', color: '#4338ca' }}>Module 0</span>
        <h2>Course Introduction & Overview</h2>
        <p className="description">Course scope, evaluation metrics, and administrative guidelines.</p>
      </div>

      <div className="card">
        <div className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          Course Scope
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h4 style={{ margin: '0 0 8px' }}>Traditional & Modern Vision</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              The course covers a fast track on Traditional Computer Vision techniques and advances into Deep Learning with CNNs, Transformers, and Explainable AI.
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px' }}>Tools & Practical Work</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Hands-on implementation using Python, TensorFlow/PyTorch, and Google Colab environments.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
          Marks Distribution
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Final Exam', value: '50%' },
            { label: 'Midterm', value: '30%' },
            { label: 'Assignments', value: '7%' },
            { label: 'Presentation', value: '6%' },
            { label: 'Quizzes', value: '3%' },
            { label: 'Participation', value: '2%' },
            { label: 'Attendance', value: '2%' },
          ].map((item, idx) => (
            <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Class Discipline
        </div>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.8' }}>
          <li><b>Strict Deadlines:</b> No extensions for quizzes, assignments, or projects.</li>
          <li><b>Academic Integrity:</b> Zero tolerance for plagiarism. Copied work results in a grade of zero for all involved.</li>
          <li><b>Professionalism:</b> Mobile phones on silent; no texting or calling in class. Respect for peers and instructor.</li>
        </ul>
      </div>

      <Flashcards cards={INTRO_FLASHCARDS} />
    </>
  );
}