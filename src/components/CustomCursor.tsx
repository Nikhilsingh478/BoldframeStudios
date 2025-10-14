import { useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Optimized spring config
  const springConfig = useMemo(() => ({ 
    damping: 25, 
    stiffness: 200,
    mass: 0.8 
  }), []);
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Throttled mouse move handler
  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  const handleMouseEnter = useCallback(() => {
    if (cursorRing.current) {
      cursorRing.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorRing.current.style.borderColor = '#67E8F9';
    }
    if (cursorDot.current) {
      cursorDot.current.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cursorRing.current) {
      cursorRing.current.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.current.style.borderColor = '#5B3CFF';
    }
    if (cursorDot.current) {
      cursorDot.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }, []);

  useEffect(() => {
    // Only run on desktop and if user hasn't disabled animations
    if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Use passive listeners for better performance
    window.addEventListener('mousemove', moveCursor, { passive: true });

    // Use event delegation for better performance
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea')) {
        if (e.type === 'mouseenter') {
          handleMouseEnter();
        } else {
          handleMouseLeave();
        }
      }
    };

    document.addEventListener('mouseenter', handleElementHover, true);
    document.addEventListener('mouseleave', handleElementHover, true);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleElementHover, true);
      document.removeEventListener('mouseleave', handleElementHover, true);
    };
  }, [moveCursor, handleMouseEnter, handleMouseLeave]);

  // Don't render on mobile or if reduced motion is preferred
  if (typeof window !== 'undefined' && 
      (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    return null;
  }

  return (
    <>
      {/* Cursor Dot */}
      <motion.div
        ref={cursorDot}
        className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-[#67E8F9] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Cursor Ring */}
      <motion.div
        ref={cursorRing}
        className="cursor-ring fixed top-0 left-0 w-8 h-8 border-2 border-[#5B3CFF] rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          transition: 'transform 0.15s ease-out, border-color 0.15s ease-out',
        }}
      />
    </>
  );
}
