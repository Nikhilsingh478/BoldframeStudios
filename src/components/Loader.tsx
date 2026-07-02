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
          // Wait for the 0.8s panel slide up animation to complete before unmounting
          setTimeout(onComplete, 800);
          return 100;
        }

        // Ticker logic
        let inc = 1;
        if (!isWindowLoaded && prev >= 85) {
          // Clamp loader to 85% to wait for hero webm/webp media files and general assets to load
          return 85;
        }

        if (isWindowLoaded) {
          inc = Math.floor(Math.random() * 8) + 4; // Sweep cleanly to 100% when assets are loaded
        } else {
          inc = Math.floor(Math.random() * 3) + 1; // Consistent pacing
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
      initial={{ y: 0 }}
      animate={progress === 100 ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.8, ease: easeCurve }}
    >
      <motion.div 
        className="relative"
        animate={progress === 100 ? { y: -80, opacity: 0, scale: 0.9 } : { y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: easeCurve }}
      >
        {/* Logo SVG with stroke animation */}
        <motion.svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
        <svg className="absolute inset-0 -rotate-90" width="80" height="80">
          <circle
            cx="40"
            cy="40"
            r="38"
            stroke="rgba(124, 138, 150, 0.2)"
            strokeWidth="1"
            fill="none"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="38"
            stroke="#67E8F9"
            strokeWidth="1"
            fill="none"
            strokeDasharray={238.76}
            strokeDashoffset={238.76 - (238.76 * progress) / 100}
            transition={{ duration: 0.1 }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
export default Loader;
