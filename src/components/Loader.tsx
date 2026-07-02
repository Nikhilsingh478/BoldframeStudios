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
      {/* Animated GPU-accelerated liquid gradient mesh backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
        <style>{`
          .blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(120px);
            mix-blend-mode: screen;
          }
          .blob-1 {
            width: 450px;
            height: 450px;
            background: radial-gradient(circle, rgba(103, 232, 249, 0.25) 0%, rgba(103, 232, 249, 0) 70%);
            top: -10%;
            left: -10%;
            animation: float-1 14s ease-in-out infinite;
          }
          .blob-2 {
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(91, 60, 255, 0.3) 0%, rgba(91, 60, 255, 0) 70%);
            bottom: -15%;
            right: -10%;
            animation: float-2 18s ease-in-out infinite;
          }
          .blob-3 {
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(217, 70, 239, 0.2) 0%, rgba(217, 70, 239, 0) 70%);
            top: 25%;
            left: 35%;
            animation: float-3 16s ease-in-out infinite;
          }
          @keyframes float-1 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); }
            33% { transform: translate(120px, 90px) scale(1.1) rotate(120deg); }
            66% { transform: translate(-60px, 160px) scale(0.95) rotate(240deg); }
            100% { transform: translate(0, 0) scale(1) rotate(360deg); }
          }
          @keyframes float-2 {
            0% { transform: translate(0, 0) scale(1.1) rotate(0deg); }
            50% { transform: translate(-140px, -90px) scale(0.9) rotate(-180deg); }
            100% { transform: translate(0, 0) scale(1.1) rotate(-360deg); }
          }
          @keyframes float-3 {
            0% { transform: translate(0, 0) scale(0.95) rotate(0deg); }
            33% { transform: translate(-90px, 70px) scale(1.1) rotate(90deg); }
            66% { transform: translate(140px, -60px) scale(1.0) rotate(180deg); }
            100% { transform: translate(0, 0) scale(0.95) rotate(360deg); }
          }
        `}</style>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Main Content Area */}
      <motion.div 
        className="flex flex-col items-center justify-center relative z-10 px-6 text-center"
        animate={progress === 100 ? { scale: 0.85, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* SVG Canvas locking Logo Box & Circular Progress Ring */}
        <div className="relative w-[96px] h-[96px] flex items-center justify-center mb-6">
          <svg
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circular progress track */}
            <circle
              cx="48"
              cy="48"
              r="45"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="2"
              fill="none"
            />
            {/* Active circular progress indicator */}
            <motion.circle
              cx="48"
              cy="48"
              r="45"
              stroke="#67E8F9"
              strokeWidth="2"
              fill="none"
              strokeDasharray={282.743}
              strokeDashoffset={282.743 - (282.743 * progress) / 100}
              transition={{ duration: 0.1 }}
              transform="rotate(-90 48 48)"
            />

            {/* Frame Box */}
            <motion.rect
              x="24"
              y="24"
              width="48"
              height="48"
              stroke="#5B3CFF"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            
            {/* B Letter */}
            <motion.path
              d="M39 34 L39 62 M39 34 L51 34 C54 34 54 41 51 41 L39 41 M39 41 L53 41 C56 41 56 49 56 52 C56 57 52 62 46 62 L39 62"
              stroke="#E6EEF3"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        {/* Brand Headline */}
        <h2 className="font-dm-sans font-bold text-sm tracking-[0.3em] uppercase text-white/95 select-none">
          BOLDFRAMESTUDIOS
        </h2>

        {/* Tagline */}
        <p className="font-dm-sans italic text-xs text-[#9ca3af] tracking-wide mt-2 select-none">
          Websites built to convert
        </p>

        {/* Minimal Progress Bar */}
        <div className="relative w-[140px] h-[1px] bg-white/10 overflow-hidden mt-6">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#5B3CFF] to-[#67E8F9]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.1 }}
          />
        </div>

        {/* Monospace progress readout */}
        <span className="font-mono text-[10px] text-[#67E8F9] tracking-[0.2em] font-bold mt-3 select-none">
          {String(progress).padStart(3, '0')}%
        </span>
      </motion.div>
    </motion.div>
  );
}
export default Loader;
