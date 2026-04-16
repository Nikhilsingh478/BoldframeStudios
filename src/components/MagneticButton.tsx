import { motion } from 'motion/react';
import { useRef, useState, MouseEvent, useCallback, memo } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export const MagneticButton = memo(function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const rect = rectRef.current;
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    requestAnimationFrame(() => {
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength,
      });
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        damping: 18,
        stiffness: 120,
        mass: 0.5,
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
});
