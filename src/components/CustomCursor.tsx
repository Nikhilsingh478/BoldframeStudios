import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Reduced spring stiffness for better performance
  const springConfig = { damping: 30, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth <= 768) return;

    let rafId: number;
    let mouseX = -100;
    let mouseY = -100;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Use RAF for smooth updates
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        cursorX.set(mouseX);
        cursorY.set(mouseY);
      });
    };

    const handleMouseEnter = () => {
      if (cursorRing.current) {
        cursorRing.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorRing.current.style.borderColor = '#67E8F9';
      }
      if (cursorDot.current) {
        cursorDot.current.style.transform = 'translate(-50%, -50%) scale(0.5)';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRing.current) {
        cursorRing.current.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.current.style.borderColor = '#5B3CFF';
      }
      if (cursorDot.current) {
        cursorDot.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
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
