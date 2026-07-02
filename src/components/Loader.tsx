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
      <div className="relative flex items-center justify-center w-[120px] h-[120px]">
        {/* Centered Monospace Percentage Progress Indicator */}
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[13px] text-[#67E8F9] font-bold tracking-tight select-none">
          {String(progress).padStart(2, '0')}%
        </div>

        {/* Logo SVG with stroke animation */}
        <motion.svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={progress === 100 ? { scale: 0.7, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Frame */}
          <motion.rect
            x="10"
            y="10"
            width="60"
            height="60"
            stroke="#5B3CFF"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          
          {/* B Letter */}
          <motion.path
            d="M30 25 L30 55 M30 25 L45 25 C50 25 50 32 45 32 L30 32 M30 32 L47 32 C52 32 52 40 52 43 C52 48 48 55 42 55 L30 55"
            stroke="#E6EEF3"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
          />
        </motion.svg>

        {/* Progress ring */}
        <svg className="absolute inset-0 -rotate-90" width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="56"
            stroke="rgba(124, 138, 150, 0.15)"
            strokeWidth="1.5"
            fill="none"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="56"
            stroke="#67E8F9"
            strokeWidth="2"
            fill="none"
            strokeDasharray={351.858}
            strokeDashoffset={351.858 - (351.858 * progress) / 100}
            transition={{ duration: 0.1 }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
export default Loader;
