/**
 * SiteLoader — the original BoldFrame loader (B drawn inside its frame with a
 * circular progress ring), now in brand blue, plus a word cycle
 * ("WE DESIGN / BUILD / GROW BRANDS"). It ends by collapsing the whole
 * screen into the "O" of BOLD in the hero, which hands over to the hero's
 * entrance.
 *
 * First visit in a session: full sequence (~3.8s). Later visits: a short
 * version without the words. Reduced motion: no loader at all.
 */

import { useEffect, useRef, useState } from 'react';
import { getRevealTarget, startReveal } from './reveal';
import { setScrollLocked } from '../../lib/smoothScroll';

const WORDS = ['DESIGN', 'BUILD', 'GROW'];
const SESSION_KEY = 'bf-loader-seen';

function readMode(): 'full' | 'short' | 'none' {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'none';
    return sessionStorage.getItem(SESSION_KEY) === '1' ? 'short' : 'full';
  } catch {
    return 'short';
  }
}

const RING = 2 * Math.PI * 38;

export function SiteLoader() {
  const [mode] = useState(readMode);
  const [done, setDone] = useState(mode === 'none');
  const [word, setWord] = useState(-1);
  const [prevWord, setPrevWord] = useState(-1);
  const [phase, setPhase] = useState<'run' | 'out'>('run');
  const overlay = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (mode === 'none') {
      startReveal();
      return;
    }
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* storage blocked */ }

    // Always start the reveal at the top, so the "O" is on screen.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.classList.add('bfx-loading');
    setScrollLocked(true, 'loader');

    const full = mode === 'full';
    const total = full ? 2600 : 1050; // ring fill + content time, ms
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    // Progress ring
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (total - 250));
      const eased = 1 - Math.pow(1 - t, 2.2);
      ring.current?.setAttribute('stroke-dashoffset', String(RING * (1 - eased)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    if (full) {
      at(350, () => setWord(0));
      at(1150, () => { setPrevWord(0); setWord(1); });
      at(1950, () => { setPrevWord(1); setWord(2); });
    }

    at(total, () => setPhase('out'));

    // Collapse into the hero's "O"
    at(total + 120, () => {
      const el = overlay.current;
      const target = getRevealTarget()?.querySelector<HTMLElement>('.bfx-ch-inner');
      startReveal();
      if (!el) return;

      let cx = window.innerWidth / 2;
      let cy = window.innerHeight / 2;
      let rx = 24;
      let ry = 40;
      if (target) {
        const r = target.getBoundingClientRect();
        const fs = parseFloat(getComputedStyle(target).fontSize);
        const lh = parseFloat(getComputedStyle(target).lineHeight) || fs;
        // Anton: ascent 1.18em, descent 0.33em, cap height 0.87em
        const baseline = r.top + (lh - 1.51 * fs) / 2 + 1.18 * fs;
        cx = r.left + r.width / 2;
        cy = baseline - 0.435 * fs;
        rx = 0.235 * fs;
        ry = 0.43 * fs;
      }
      // Start exactly at the farthest screen corner so the shrink is visible at once.
      const big = Math.max(
        Math.hypot(cx, cy),
        Math.hypot(window.innerWidth - cx, cy),
        Math.hypot(cx, window.innerHeight - cy),
        Math.hypot(window.innerWidth - cx, window.innerHeight - cy),
      ) * 1.03;
      const anim = el.animate(
        [
          { clipPath: `ellipse(${big}px ${big}px at ${cx}px ${cy}px)` },
          { clipPath: `ellipse(${rx}px ${ry}px at ${cx}px ${cy}px)` },
        ],
        { duration: full ? 1050 : 850, easing: 'cubic-bezier(0.62, 0, 0.2, 1)', fill: 'forwards' },
      );
      anim.onfinish = () => {
        const fade = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, easing: 'ease-out', fill: 'forwards' });
        fade.onfinish = () => setDone(true);
        document.documentElement.classList.remove('bfx-loading');
        setScrollLocked(false, 'loader');
      };
    });

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('bfx-loading');
      setScrollLocked(false, 'loader');
    };
  }, [mode]);

  if (done) return null;

  return (
    <div ref={overlay} className={`bfx-loader${phase === 'out' ? ' is-out' : ''}`} aria-hidden="true">
      <div className="bfx-loader-content">
        <div className="bfx-loader-mark">
          <svg width="96" height="96" viewBox="0 0 80 80" fill="none">
            <rect className="bfx-ld-frame" x="10" y="10" width="60" height="60" stroke="#FFFFFF" strokeWidth="2" />
            <path
              className="bfx-ld-b"
              d="M30 25 L30 55 M30 25 L45 25 C50 25 50 32 45 32 L30 32 M30 32 L47 32 C52 32 52 40 52 43 C52 48 48 55 42 55 L30 55"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg className="bfx-loader-ring" width="96" height="96" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="38" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
            <circle
              ref={ring}
              cx="40"
              cy="40"
              r="38"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={RING}
              strokeDashoffset={RING}
            />
          </svg>
        </div>

        {mode === 'full' && (
          <p className="bfx-loader-words">
            <span>WE</span>
            <span className="bfx-loader-slot">
              {prevWord >= 0 && (
                <span key={`out-${prevWord}`} className="bfx-loader-word is-leaving">
                  {WORDS[prevWord].split('').map((c, i) => <span key={i} style={{ animationDelay: `${i * 0.03}s` }}>{c}</span>)}
                </span>
              )}
              {word >= 0 && (
                <span key={`in-${word}`} className="bfx-loader-word is-entering">
                  {WORDS[word].split('').map((c, i) => <span key={i} style={{ animationDelay: `${i * 0.035}s` }}>{c}</span>)}
                </span>
              )}
            </span>
            <span>BRANDS</span>
          </p>
        )}
      </div>
    </div>
  );
}
