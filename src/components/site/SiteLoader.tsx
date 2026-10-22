/**
 * SiteLoader — "framing the shot".
 *
 * A camera viewfinder: four corner brackets snap open around the BoldFrame
 * mark, a counter runs 000 → 100 while DESIGN · BUILD · GROW light up in
 * turn, then the brackets fly out to frame the whole screen and the blue
 * curtain lifts to reveal the hero.
 *
 * Performance: every moving part is a CSS animation of transform or
 * opacity (the counter is three digit strips stepping with steps()), so the
 * GPU runs it smoothly even while the main thread is busy loading the page.
 * JS only mounts it, tells the hero when to start, and unmounts it.
 *
 * First visit in a session: ~2.9s. Later visits: ~1.3s, no counter.
 * Reduced motion: no loader.
 */

import { useEffect, useState } from 'react';
import { startReveal } from './reveal';
import { setScrollLocked } from '../../lib/smoothScroll';
import { LogoMark } from './Logo';

const SESSION_KEY = 'bf-loader-seen';
const WORDS = ['Design', 'Build', 'Grow'];

// ms from mount: hero starts as the curtain lifts; unmount after it's gone.
const TIMING = {
  full: { reveal: 2100, done: 3000 },
  short: { reveal: 700, done: 1450 },
};

function readMode(): 'full' | 'short' | 'none' {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'none';
    return sessionStorage.getItem(SESSION_KEY) === '1' ? 'short' : 'full';
  } catch {
    return 'short';
  }
}

/** One odometer column: a vertical strip of digits stepped by CSS. */
function Digits({ strip, className }: { strip: string; className: string }) {
  return (
    <span className="bfl-digit">
      <span className={`bfl-strip ${className}`}>
        {strip.split('').map((d, i) => <span key={i}>{d}</span>)}
      </span>
    </span>
  );
}

export function SiteLoader() {
  const [mode] = useState(readMode);
  const [done, setDone] = useState(mode === 'none');

  useEffect(() => {
    if (mode === 'none') {
      startReveal();
      return;
    }
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* storage blocked */ }

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.classList.add('bfx-loading');
    setScrollLocked(true, 'loader');

    const t = TIMING[mode];
    const unlock = () => {
      document.documentElement.classList.remove('bfx-loading');
      setScrollLocked(false, 'loader');
    };
    const revealTimer = window.setTimeout(startReveal, t.reveal);
    const doneTimer = window.setTimeout(() => {
      unlock();
      setDone(true);
    }, t.done);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
      unlock();
    };
  }, [mode]);

  if (done) return null;

  return (
    <div className={`bfl bfl--${mode}`} aria-hidden="true">
      <div className="bfl-curtain" />

      {/* Viewfinder corners: open around the mark, then fly to the screen edges */}
      <span className="bfl-corner bfl-corner--tl" />
      <span className="bfl-corner bfl-corner--tr" />
      <span className="bfl-corner bfl-corner--bl" />
      <span className="bfl-corner bfl-corner--br" />

      <div className="bfl-center">
        <span className="bfl-mark"><span><LogoMark size={56} frame="#FFFFFF" letter="#FFFFFF" /></span></span>
        {mode === 'full' && (
          <p className="bfl-words">
            {WORDS.map((w, i) => (
              <span key={w} style={{ '--w': i } as React.CSSProperties}>{w}</span>
            ))}
          </p>
        )}
      </div>

      {mode === 'full' && (
        <div className="bfl-foot">
          <span className="bfl-count">
            <Digits strip="01" className="bfl-strip--h" />
            <Digits strip="01234567890" className="bfl-strip--t" />
            <Digits strip="01234567890" className="bfl-strip--o" />
          </span>
          <span className="bfl-line"><i /></span>
          <span className="bfl-brand">BoldFrame Studios</span>
        </div>
      )}
    </div>
  );
}
