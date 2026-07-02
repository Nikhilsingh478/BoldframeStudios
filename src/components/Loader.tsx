import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait 1.1s for the staggered exits to finish, then notify App.tsx
          setTimeout(onComplete, 1100);
          return 100;
        }
        
        // Count up logic
        const inc = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + inc, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  const easeCurve = [0.76, 0, 0.24, 1];

  return (
    <AnimatePresence>
      {progress < 100 && (
        <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
          
          {/* Shutter Layer 1: Accent Purple */}
          <motion.div
            className="absolute inset-0 bg-[#5B3CFF] pointer-events-auto"
            initial={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 0.85, ease: easeCurve, delay: 0.16 }}
          />

          {/* Shutter Layer 2: Deep Graphite Card BG */}
          <motion.div
            className="absolute inset-0 bg-[#131619] pointer-events-auto"
            initial={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 0.85, ease: easeCurve, delay: 0.08 }}
          />

          {/* Shutter Layer 3: Main Loader Screen */}
          <motion.div
            className="absolute inset-0 bg-[#0B0D0F] flex flex-col justify-between items-center p-12 pointer-events-auto"
            initial={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 0.85, ease: easeCurve }}
          >
            {/* Top Anchor: Minimal indicator */}
            <div className="w-full flex justify-between items-center font-mono text-[10px] text-[#67E8F9] tracking-[0.2em] uppercase select-none opacity-60">
              <span>BF // SYS_INIT</span>
              <span>EST. 2026</span>
            </div>

            {/* Center Anchor: Pulsing brand logo mark */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1.04, opacity: 1 }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="flex flex-col items-center gap-4 select-none"
            >
              <svg width="44" height="44" viewBox="0 0 32 32" fill="none" className="text-[#E6EEF3]">
                <rect x="2" y="2" width="28" height="28" stroke="#5B3CFF" strokeWidth="2.5" rx="6" />
                <path
                  d="M10 8 L10 24 M10 8 L17 8 C19 8 19 12 17 12 L10 12 M10 12 L18 12 C20 12 20 16 20 17.5 C20 20 18 24 16 24 L10 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Bottom Anchor: Monospace counter */}
            <div className="font-mono text-xs text-[#98A3AA] tracking-[0.25em] select-none">
              [ {String(progress).padStart(3, '0')} // 100 ]
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
export default Loader;
