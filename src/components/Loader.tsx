import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [activeWord, setActiveWord] = useState('DISCOVERING');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Timing align: let the 1.0s Framer Motion slide exit finish, then call onComplete
          setTimeout(onComplete, 1100);
          return 100;
        }
        
        // Custom progress pacing logic for cinematic count up feeling
        const inc = Math.floor(Math.random() * 8) + 2;
        const next = Math.min(prev + inc, 100);
        
        if (next < 25) setActiveWord('DISCOVERING INTENT //');
        else if (next < 50) setActiveWord('MAPPING COMPETITORS //');
        else if (next < 75) setActiveWord('SYNTHESIZING DESIGN SYSTEM //');
        else if (next < 100) setActiveWord('COMPILING ENGINE CODE //');
        else setActiveWord('SYSTEM READY //');

        return next;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  const cubicEasing = [0.76, 0, 0.24, 1];

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#0A0C0E] flex flex-col justify-between p-8 md:p-16 overflow-hidden select-none"
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1.0, ease: cubicEasing }}
        >
          {/* Top Panel: Brand logo mark and header info */}
          <div className="flex justify-between items-start w-full">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="text-[#E6EEF3]">
                <rect x="2" y="2" width="28" height="28" stroke="#5B3CFF" strokeWidth="2" rx="6" />
                <path
                  d="M10 8 L10 24 M10 8 L17 8 C19 8 19 12 17 12 L10 12 M10 12 L18 12 C20 12 20 16 20 17.5 C20 20 18 24 16 24 L10 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-dm-sans font-bold text-sm tracking-wider uppercase text-[#E6EEF3]">
                BoldFrame
              </span>
            </div>
            <span className="font-mono text-xs text-[#67E8F9] tracking-[0.2em] uppercase">
              INITIALIZING ENGINE //
            </span>
          </div>

          {/* Center Panel: Large Headline and tracking word cycle */}
          <div className="my-auto flex flex-col items-start max-w-4xl">
            <span className="font-mono text-xs md:text-sm text-[#67E8F9] mb-4 tracking-[0.25em] uppercase block h-6">
              {activeWord}
            </span>
            <h1 className="font-dm-sans font-bold text-5xl md:text-8xl tracking-tighter text-[#E6EEF3] leading-[1.05] uppercase">
              Next-Gen<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B3CFF] to-[#67E8F9]">
                Web Experiences
              </span>
            </h1>
          </div>

          {/* Bottom Panel: Count Up display and progress bar */}
          <div className="w-full flex flex-col gap-8">
            <div className="flex justify-between items-end w-full">
              <span className="font-mono text-xs text-[#98A3AA] max-w-xs leading-relaxed uppercase">
                © {new Date().getFullYear()} BoldFrame Studios.<br />
                All rights reserved.
              </span>
              <div className="flex items-baseline font-dm-sans font-black text-8xl md:text-[11rem] text-[#E6EEF3] leading-none tracking-tighter">
                {String(progress).padStart(3, '0')}
                <span className="text-[#5B3CFF] text-2xl md:text-4xl font-light ml-2">%</span>
              </div>
            </div>

            {/* Flat loading progress indicator line */}
            <div className="relative w-full h-[2px] bg-[#7C8A96]/10 overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#5B3CFF] to-[#67E8F9]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>
          </div>

          {/* Liquid suction wave pulling underneath the curtains */}
          <svg 
            className="absolute left-0 w-screen fill-[#0A0C0E] pointer-events-none" 
            style={{ top: "100%", height: "15vh" }}
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            <path d="M0 0 L100 0 Q50 120 0 0 Z" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
