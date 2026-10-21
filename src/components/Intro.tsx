/**
 * Intro — the BoldFrame brand reveal.
 *
 * Four corner brackets open out to frame the screen, the wordmark rises,
 * then the curtain lifts. The page renders underneath from the start; this is
 * an overlay, not a gate. Plays once per browser session and never for
 * visitors who prefer reduced motion.
 */

import { useEffect, useState } from 'react';

const SESSION_KEY = 'bf-intro-seen';
const INTRO_MS = 1500;

function shouldPlay(): boolean {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem(SESSION_KEY) !== '1';
  } catch {
    return false;
  }
}

/** Decided once at load so the hero can time its entrance to the curtain. */
export const INTRO_PLAYS = typeof window !== 'undefined' && shouldPlay();

/** Seconds the hero should wait before its entrance animation. */
export const HERO_ENTRANCE_DELAY = INTRO_PLAYS ? 1.1 : 0.15;

export function Intro() {
  const [done, setDone] = useState(!INTRO_PLAYS);

  useEffect(() => {
    if (done) return;
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* storage blocked */ }
    document.documentElement.classList.add('bf-intro-lock');
    const timer = window.setTimeout(() => {
      document.documentElement.classList.remove('bf-intro-lock');
      setDone(true);
    }, INTRO_MS);
    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove('bf-intro-lock');
    };
  }, [done]);

  if (done) return null;

  return (
    <div className="bf-intro" aria-hidden="true">
      <span className="bf-intro-corner bf-intro-corner--tl" />
      <span className="bf-intro-corner bf-intro-corner--tr" />
      <span className="bf-intro-corner bf-intro-corner--bl" />
      <span className="bf-intro-corner bf-intro-corner--br" />
      <div className="bf-intro-mark">
        <span className="bf-intro-word">BOLD</span>
        <span className="bf-intro-word bf-intro-word--accent">FRAME</span>
      </div>
      <span className="bf-intro-sub">STUDIOS</span>
    </div>
  );
}
