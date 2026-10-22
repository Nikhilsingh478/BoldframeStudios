/**
 * SiteLoader — "The Aperture".
 *
 * BoldFrame frames brands, so the loader is a frame. A blue screen splits
 * open into a small window onto the real hero (Nikhil's portrait) behind
 * it. The window widens in three steps, like a camera zooming out, while a
 * placard on the frame reads DESIGN → BUILD → GROW with a 01/03 index and a
 * counter runs 000 → 100. Then the four blue panels fly apart and the hero
 * is simply there: the loader becomes the page instead of covering it.
 *
 * Performance: the "hole" is four solid panels moved apart with transforms,
 * the counter and captions are stepped strips, and every animation is
 * transform/opacity in CSS, so it all runs on the compositor and stays
 * smooth on phones while the page is still loading. JS only mounts it,
 * starts the hero at the right moment and unmounts it.
 *
 * First visit in a session: ~2.9s. Later visits: ~1.4s (open, then fly
 * apart). Reduced motion: no loader.
 */

import { useEffect, useState, type CSSProperties } from 'react';
import { startReveal } from './reveal';
import { setScrollLocked } from '../../lib/smoothScroll';
import { LogoMark } from './Logo';

const SESSION_KEY = 'bf-loader-seen';
const STEPS = ['Design', 'Build', 'Grow'];

const TIMING = {
  full: { reveal: 2250, done: 3000 },
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

/** A clipped vertical strip, stepped through by CSS. */
function Strip({ items, className }: { items: string[]; className: string }) {
  return (
    <span className="bfa-slot">
      <span className={`bfa-strip ${className}`} style={{ '--n': items.length } as CSSProperties}>
        {items.map((d, i) => <span key={i}>{d}</span>)}
      </span>
    </span>
  );
}

const DIGITS = '01234567890'.split('');

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
    <div className={`bfa bfa--${mode}`} aria-hidden="true">
      <span className="bfa-panel bfa-panel--t">
        {mode === 'full' && (
          <span className="bfa-edge bfa-edge--t">
            <span>BoldFrame Studios</span>
            <span className="bfa-index">
              <Strip items={['01', '02', '03']} className="bfa-strip--steps" /> / 03
            </span>
          </span>
        )}
      </span>
      <span className="bfa-panel bfa-panel--b">
        {mode === 'full' && (
          <span className="bfa-edge bfa-edge--b">
            <Strip items={STEPS} className="bfa-strip--steps" />
            <span className="bfa-count">
              <Strip items={['0', '1']} className="bfa-strip--h" />
              <Strip items={DIGITS} className="bfa-strip--t" />
              <Strip items={DIGITS} className="bfa-strip--o" />
            </span>
          </span>
        )}
      </span>
      <span className="bfa-panel bfa-panel--l" />
      <span className="bfa-panel bfa-panel--r" />

      <span className="bfa-corner bfa-corner--tl" />
      <span className="bfa-corner bfa-corner--tr" />
      <span className="bfa-corner bfa-corner--bl" />
      <span className="bfa-corner bfa-corner--br" />

      <span className="bfa-mark"><LogoMark size={52} frame="#FFFFFF" letter="#FFFFFF" /></span>
    </div>
  );
}
