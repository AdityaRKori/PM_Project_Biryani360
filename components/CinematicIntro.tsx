import React, { useState, useEffect } from 'react';

interface Props {
  lines: string[];
  onComplete: () => void;
}

export const CinematicIntro: React.FC<Props> = ({ lines, onComplete }) => {
  const [currentLine, setCurrentLine] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      // Initial pause before starting
      await new Promise(r => setTimeout(r, 200));

      for (let i = 0; i < lines.length; i++) {
        if (!isMounted) return;
        
        // Show line
        setCurrentLine(i);
        // Small buffer to allow render before fading in
        await new Promise(r => setTimeout(r, 50));
        setVisible(true); // Trigger CSS transition (fade in 800ms)
        
        // Wait for fade in + read time (e.g., 800ms fade + 800ms read)
        await new Promise(r => setTimeout(r, 1600));
        
        // Hide line
        setVisible(false); // Trigger CSS transition (fade out)
        
        // Wait for fade out + pause (e.g., 500ms fade + 300ms pause)
        await new Promise(r => setTimeout(r, 800));
      }

      if (isMounted) onComplete();
    };

    runSequence();

    return () => { isMounted = false; };
  }, [lines, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-charcoal-950 flex items-center justify-center touch-none">
      <div className="absolute inset-0 bg-lux-gradient opacity-20 pointer-events-none"></div>
      <div 
        className={`transition-all duration-[800ms] ease-out transform px-6 text-center ${
          visible 
            ? 'opacity-100 translate-y-0 scale-100 blur-0' 
            : 'opacity-0 translate-y-4 scale-95 blur-sm'
        }`}
      >
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-cream-50 lowercase tracking-wide leading-tight">
          {lines[currentLine]}
        </h1>
      </div>
    </div>
  );
};