/**
 * SiteLoader — "The fill".
 *
 * There's no separate loading screen: the hero is the loader. On a quiet
 * light canvas, the giant BOLDFRAME STUDIOS (already in its final hero
 * position) is drawn as a thin outline, then solid blue fills the letters
 * from the bottom up as the page loads. When the word is full the canvas
 * opens like a shutter around it and the hero appears in place.
 *
 * The visuals live in the hero (HeroSection + site.css); this component
 * owns the timing, the scroll lock, and a small footer line (name,
 * hairline progress, 000 → 100). The intro mode comes from the inline
 * script in index.html (data-intro on <html>), set before first paint.
 * The clock starts when the self-hosted Anton font is ready (html gets
 * .bfx-intro-go), so the word never appears in a fallback font.
 */

import { useEffect, useState, type CSSProperties } from 'react';
import { startReveal } from './reveal';
import { setScrollLocked } from '../../lib/smoothScroll';

type Mode = 'full' | 'short' | 'none';

// ms from mount: when the shutter opens, and when the overlay unmounts.
const TIMING = {
  full: { reveal: 2150, done: 3050 },
  short: { reveal: 700, done: 1600 },
};

const readMode = (): Mode => {
  const m = document.documentElement.getAttribute('data-intro');
  return m === 'full' || m === 'short' ? m : 'none';
};

const DIGITS = '01234567890'.split('');

function Strip({ items, className }: { items: string[]; className: string }) {
  return (
    <span className="bff-slot">
      <span className={`bff-strip ${className}`} style={{ '--n': items.length } as CSSProperties}>
        {items.map((d, i) => <span key={i}>{d}</span>)}
      </span>
    </span>
  );
}

export function SiteLoader() {
  const [mode] = useState(readMode);
  const [phase, setPhase] = useState<'wait' | 'run' | 'out' | 'done'>(mode === 'none' ? 'done' : 'wait');

  useEffect(() => {
    const unlock = () => {
      document.documentElement.classList.remove('bfx-loading');
      setScrollLocked(false, 'loader');
    };

    if (mode === 'none') {
      unlock();
      startReveal();
      return;
    }

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    setScrollLocked(true, 'loader');

    // Start only once Anton is ready (capped, so a slow network never
    // blocks the page): the word must never render in a fallback font.
    let cancelled = false;
    let revealTimer = 0;
    let doneTimer = 0;
    const fontReady = document.fonts?.load('400 100px Anton') ?? Promise.resolve();
    const cap = new Promise((resolve) => window.setTimeout(resolve, 2500));
    Promise.race([fontReady, cap]).catch(() => {}).then(() => {
      if (cancelled) return;
      document.documentElement.classList.add('bfx-intro-go');
      setPhase('run');
      const t = TIMING[mode];
      revealTimer = window.setTimeout(() => {
        setPhase('out');
        startReveal();
      }, t.reveal);
      doneTimer = window.setTimeout(() => {
        unlock();
        setPhase('done');
      }, t.done);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
      document.documentElement.classList.add('bfx-intro-go');
      unlock();
    };
  }, [mode]);

  if (phase === 'wait' || phase === 'done' || mode !== 'full') return null;

  return (
    <div className={`bff${phase === 'out' ? ' is-out' : ''}`} aria-hidden="true">
      <span className="bff-name">BoldFrame Studios</span>
      <span className="bff-line"><i /></span>
      <span className="bff-count">
        <Strip items={['0', '1']} className="bff-strip--h" />
        <Strip items={DIGITS} className="bff-strip--t" />
        <Strip items={DIGITS} className="bff-strip--o" />
      </span>
    </div>
  );
}
