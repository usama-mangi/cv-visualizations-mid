import { useState } from 'react';

interface Flashcard {
  front: string;
  back: string;
}

export default function Flashcards({ cards }: { cards: Flashcard[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) return null;

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  return (
    <div className="flashcard-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="topic-badge" style={{ background: '#eef2ff', color: '#4338ca' }}>Active Recall</span>
        <h3 style={{ margin: '8px 0 0', color: 'var(--text-primary)' }}>Test Your Knowledge</h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
        <button 
          className="nav-btn" 
          onClick={handlePrev}
          style={{ width: '56px', height: '56px', borderRadius: '50%', padding: 0, justifyContent: 'center', background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <div style={{ flex: '0 0 500px', perspective: '1200px', height: '280px' }}>
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              cursor: 'pointer'
            }}
          >
            {/* Front */}
            <div style={{
              position: 'absolute', width: '100%', height: '100%',
              backfaceVisibility: 'hidden',
              background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
              fontSize: '1.25rem', textAlign: 'center', fontWeight: '600', color: 'var(--text-primary)',
              lineHeight: '1.5'
            }}>
              {cards[currentIndex].front}
              <div style={{ position: 'absolute', bottom: '24px', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Click to flip</div>
            </div>
            
            {/* Back */}
            <div style={{
              position: 'absolute', width: '100%', height: '100%',
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', color: '#fff', borderRadius: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px',
              fontSize: '1.1rem', textAlign: 'center', transform: 'rotateY(180deg)',
              boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.3)',
              lineHeight: '1.6'
            }}>
              {cards[currentIndex].back}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            {currentIndex + 1} OF {cards.length}
          </div>
        </div>

        <button 
          className="nav-btn" 
          onClick={handleNext}
          style={{ width: '56px', height: '56px', borderRadius: '50%', padding: 0, justifyContent: 'center', background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}