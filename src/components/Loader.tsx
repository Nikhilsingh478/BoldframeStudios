import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isWindowLoaded = document.readyState === 'complete';

    const handleWindowLoad = () => {
      isWindowLoaded = true;
    };

    if (!isWindowLoaded) {
      window.addEventListener('load', handleWindowLoad);
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait for the 0.9s circular iris animation to finish before unmounting
          setTimeout(onComplete, 900);
          return 100;
        }

        let inc = 1;
        if (!isWindowLoaded && prev >= 85) {
          // Keep at 85% to ensure all video, images, fonts, and assets are fully downloaded
          return 85;
        }

        if (isWindowLoaded) {
          inc = Math.floor(Math.random() * 8) + 4; // Fast sweep to 100% once assets are cached
        } else {
          inc = Math.floor(Math.random() * 3) + 1;
        }

        return Math.min(prev + inc, 100);
      });
    }, 25);

    return () => {
      clearInterval(timer);
      window.removeEventListener('load', handleWindowLoad);
    };
  }, [onComplete]);

  const easeCurve = [0.76, 0, 0.24, 1];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D0F] overflow-hidden"
      initial={{ clipPath: "circle(100% at 50% 50%)" }}
      animate={progress === 100 ? { clipPath: "circle(0% at 50% 50%)" } : { clipPath: "circle(100% at 50% 50%)" }}
      transition={{ duration: 0.9, ease: easeCurve }}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative w-[80px] h-[80px] flex items-center justify-center">
          {/* Logo SVG with stroke animation and progress circle */}
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={progress === 100 ? { scale: 0.7, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Background Circular Progress Track */}
            <circle
              cx="40"
              cy="40"
              r="38"
              stroke="rgba(124, 138, 150, 0.15)"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Active Circular Progress Indicator */}
            <motion.circle
              cx="40"
              cy="40"
              r="38"
              stroke="#67E8F9"
              strokeWidth="2"
              fill="none"
              strokeDasharray={238.76}
              strokeDashoffset={238.76 - (238.76 * progress) / 100}
              transition={{ duration: 0.1 }}
              transform="rotate(-90 40 40)"
            />

            {/* Frame Box */}
            <motion.rect
              x="18"
              y="18"
              width="44"
              height="44"
              stroke="#5B3CFF"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            
            {/* B Letter */}
            <motion.path
              d="M32 28 L32 52 M32 28 L42 28 C45 28 45 34 42 34 L32 34 M32 34 L43 34 C46 34 46 41 46 43 C46 47 43 52 38 52 L32 52"
              stroke="#E6EEF3"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
            />
          </motion.svg>
        </div>

        {/* Separated Clean Monospace Progress text */}
        <div className="font-mono text-xs text-[#67E8F9] tracking-[0.2em] font-bold select-none h-4">
          {String(progress).padStart(3, '0')}%
        </div>
      </div>
    </motion.div>
  );
}
export default Loader;
