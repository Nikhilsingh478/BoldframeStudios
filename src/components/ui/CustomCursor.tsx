import { useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';

const INTERACTIVE_SELECTOR = 'a,button,[role="button"],input,textarea,select,label,[tabindex]:not([tabindex="-1"])';

function usePrefersReducedMotion(): boolean {
  return useMemo(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
}

function isTouchOrSmall(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return true;
  const hasTouch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
  const smallViewport = window.innerWidth < 768;
  return hasTouch || smallViewport;
}

export default function CustomCursor() {
  if (typeof window === 'undefined') return null;
  if (isTouchOrSmall()) return null;

  const prefersReducedMotion = usePrefersReducedMotion();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Raw target values (updated on pointer events)
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  // Springs for dot (fast) and ring (lag)
  const dotX = useSpring(targetX, { stiffness: 600, damping: 40 });
  const dotY = useSpring(targetY, { stiffness: 600, damping: 40 });
  const ringX = useSpring(targetX, { stiffness: 200, damping: 30 });
  const ringY = useSpring(targetY, { stiffness: 200, damping: 30 });

  // Scales (hover/press effects)
  const ringScale = useMotionValue(1);
  const dotScale = useMotionValue(1);

  const ringTransform = useMotionTemplate`translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
  const dotTransform = useMotionTemplate`translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${dotScale})`;

  const initializedRef = useRef(false);
  const overInteractiveRef = useRef(false);
  const pressedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      const init = () => {
        if (initializedRef.current) return;
        initializedRef.current = true;
        const container = containerRef.current;
        if (container) container.style.opacity = '1';
        // In reduced motion, don't hide the native cursor and hide the ring
        if (ringRef.current) ringRef.current.style.opacity = '0';
      };
      window.addEventListener('load', init, { once: true });
      document.addEventListener('pointermove', init as EventListener, { once: true, passive: true });

      // Minimal pointermove to place the dot without animation
      const onMove = (e: PointerEvent) => {
        targetX.set(e.clientX);
        targetY.set(e.clientY);
      };
      document.addEventListener('pointermove', onMove, { passive: true });

      return () => {
        window.removeEventListener('load', init as EventListener);
        document.removeEventListener('pointermove', init as EventListener, true as any);
        document.removeEventListener('pointermove', onMove as EventListener, true as any);
      };
    }

    const onPointerMove = (e: PointerEvent) => {
      targetX.set(e.clientX);
      targetY.set(e.clientY);
      const target = e.target as Element | null;
      if (target && typeof (target as any).closest === 'function') {
        const isOver = !!target.closest(INTERACTIVE_SELECTOR);
        if (isOver !== overInteractiveRef.current) {
          overInteractiveRef.current = isOver;
          ringScale.set(isOver ? 1.15 : 1);
          // Glow/border adjustments happen on the element style, not per frame
          const ring = ringRef.current;
          if (ring) {
            if (isOver) {
              ring.style.opacity = '0.9';
              ring.style.boxShadow = '0 0 24px rgba(103, 232, 249, 0.35)';
              ring.style.borderColor = '#67E8F9';
              ring.style.backgroundColor = 'rgba(103,232,249,0.08)';
            } else {
              ring.style.opacity = '0.7';
              ring.style.boxShadow = '0 0 18px rgba(91, 60, 255, 0.25)';
              ring.style.borderColor = '#5B3CFF';
              ring.style.backgroundColor = 'rgba(91,60,255,0.05)';
            }
          }
        }
      }
    };

    const onPointerDown = () => {
      pressedRef.current = true;
      ringScale.set((overInteractiveRef.current ? 1.15 : 1) * 0.92);
      dotScale.set(0.92);
    };
    const onPointerUp = () => {
      pressedRef.current = false;
      ringScale.set(overInteractiveRef.current ? 1.15 : 1);
      dotScale.set(1);
    };

    const init = () => {
      if (initializedRef.current) return;
      initializedRef.current = true;
      const container = containerRef.current;
      if (container) container.style.opacity = '1';
      document.body.classList.add('cursor-none');
    };

    window.addEventListener('load', init, { once: true });
    document.addEventListener('pointermove', init as EventListener, { once: true, passive: true });

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('pointerup', onPointerUp, { passive: true });

    const onVisibility = () => {
      const container = containerRef.current;
      if (!container) return;
      container.style.opacity = document.hidden ? '0' : '1';
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('load', init as EventListener);
      document.removeEventListener('pointermove', init as EventListener, true as any);
      document.removeEventListener('pointermove', onPointerMove as EventListener, true as any);
      document.removeEventListener('pointerdown', onPointerDown as EventListener, true as any);
      document.removeEventListener('pointerup', onPointerUp as EventListener, true as any);
      document.removeEventListener('visibilitychange', onVisibility as EventListener, true as any);
      document.body.classList.remove('cursor-none');
    };
  }, [prefersReducedMotion, targetX, targetY, ringScale, dotScale]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2147483647,
        opacity: 0,
        transition: 'opacity 200ms ease',
      }}
      aria-hidden
    >
      {/* Outer ring */}
      <motion.div
        ref={ringRef}
        style={{
          position: 'absolute',
          width: 28,
          height: 28,
          borderRadius: '9999px',
          border: '1.5px solid #5B3CFF',
          boxShadow: '0 0 18px rgba(91, 60, 255, 0.25)',
          backgroundColor: 'rgba(91,60,255,0.05)',
          transform: ringTransform,
          willChange: 'transform, opacity',
          transition: 'opacity 150ms ease',
          pointerEvents: 'none',
        }}
      />

      {/* Primary dot */}
      <motion.div
        style={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: '9999px',
          backgroundColor: '#E6EEF3',
          boxShadow: '0 0 14px rgba(103, 232, 249, 0.35)',
          transform: dotTransform,
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}


