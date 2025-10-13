import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 3;
      });
    }, 15);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D0F]"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="relative">
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
      </div>
    </motion.div>
  );
}
