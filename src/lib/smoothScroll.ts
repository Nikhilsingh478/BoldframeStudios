/**
 * Site-wide smooth scrolling (Lenis) driven by GSAP's ticker, so pinned
 * ScrollTrigger sections and the smoothed scroll position stay in lock-step.
 * Desktop pointers only: touch devices keep native scrolling, and visitors
 * who prefer reduced motion get native scrolling everywhere.
 */

import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initSmoothScroll(): () => void {
  // Re-measure every scroll animation once fonts and images have settled.
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener('load', refresh, { once: true });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  if (reduced || !fine || lenis) return () => {};

  // Elements marked data-lenis-prevent (modal scroll areas) keep native
  // wheel/touch scrolling; Lenis would otherwise swallow it while paused.
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  if (locks.size) lenis.stop();

  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

const locks = new Set<string>();

/**
 * Pause/resume page scrolling. Each caller (loader, menu, modal) holds its
 * own named lock, so one closing can't release another that's still open.
 */
export function setScrollLocked(locked: boolean, owner = 'default') {
  if (locked) locks.add(owner);
  else locks.delete(owner);
  if (!lenis) return;
  if (locks.size) lenis.stop();
  else lenis.start();
}

/** Scroll to a section by id, smoothly when Lenis is running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
