/**
 * SiteLoader — the original BoldFrame loader (B drawn inside its frame with a
 * circular progress ring) in brand blue, with a single rolling word:
 * "WE DESIGN → BUILD → GROW BRANDS". It ends by shrinking into the "O" of
 * BOLD in the hero, which hands over to the hero's entrance.
 *
 * Everything that moves is a transform or opacity: the word roll is one
 * translateY on a stacked column, and the exit scales a pre-sized disc
 * (compositor-only) instead of animating clip-path.
 *
 * First visit in a session: full sequence (~3.6s). Later visits: a short
 * version without the words. Reduced motion: no loader.
 */

import { useEffect, useRef, useState } from 'react';
import { getRevealTarget, startReveal } from './reveal';
import { setScrollLocked } from '../../lib/smoothScroll';

const WORDS = ['DESIGN', 'BUILD', 'GROW'];
const SESSION_KEY = 'bf-loader-seen';
const RING = 2 * Math.PI * 38;

function readMode(): 'full' | 'short' | 'none' {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'none';
    return sessionStorage.getItem(SESSION_KEY) === '1' ? 'short' : 'full';
  } catch {
    return 'short';
  }
}

export function SiteLoader() {
  const [mode] = useState(readMode);
  const [done, setDone] = useState(mode === 'none');
  const [step, setStep] = useState(-1); // -1 = words hidden below the slot
  const [phase, setPhase] = useState<'run' | 'out'>('run');
  const disc = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (mode === 'none') {
      startReveal();
      return;
    }
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* storage blocked */ }

    // Always reveal at the top, so the "O" is on screen.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.classList.add('bfx-loading');
    setScrollLocked(true, 'loader');

    const full = mode === 'full';
    const hold = full ? 2750 : 950; // time before the exit starts, ms
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    // Progress ring: one attribute per frame on one element.
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (hold - 150));
      const eased = 1 - Math.pow(1 - t, 2.4);
      ring.current?.setAttribute('stroke-dashoffset', String(RING * (1 - eased)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    if (full) {
      at(380, () => setStep(0));
      at(1040, () => setStep(1));
      at(1700, () => setStep(2));
    }

    at(hold, () => setPhase('out'));

    // Shrink the disc into the hero's "O".
    at(hold + 220, () => {
      const el = disc.current;
      const target = getRevealTarget()?.querySelector<HTMLElement>('.bfx-ch-inner');
      startReveal();
      if (!el) return;

      let cx = window.innerWidth / 2;
      let cy = window.innerHeight / 2;
      let rx = 24;
      let ry = 40;
      if (target) {
        const r = target.getBoundingClientRect();
        const cs = getComputedStyle(target);
        const fs = parseFloat(cs.fontSize);
        const lh = parseFloat(cs.lineHeight) || fs;
        // Anton: ascent 1.18em, descent 0.33em, cap height 0.87em
        const baseline = r.top + (lh - 1.51 * fs) / 2 + 1.18 * fs;
        cx = r.left + r.width / 2;
        cy = baseline - 0.435 * fs;
        rx = 0.235 * fs;
        ry = 0.43 * fs;
      }

      // The disc is centred on the target and just covers the farthest corner.
      const R = Math.max(
        Math.hypot(cx, cy),
        Math.hypot(window.innerWidth - cx, cy),
        Math.hypot(cx, window.innerHeight - cy),
        Math.hypot(window.innerWidth - cx, window.innerHeight - cy),
      ) * 1.02;
      Object.assign(el.style, {
        width: `${R * 2}px`,
        height: `${R * 2}px`,
        left: `${cx - R}px`,
        top: `${cy - R}px`,
        borderRadius: '50%',
      });

      const anim = el.animate(
        [
          { transform: 'scale(1, 1)' },
          { transform: `scale(${rx / R}, ${ry / R})` },
        ],
        { duration: full ? 1000 : 800, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', fill: 'forwards' },
      );
      anim.onfinish = () => {
        const fade = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, easing: 'ease-out', fill: 'forwards' });
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
    <div className={`bfx-loader${phase === 'out' ? ' is-out' : ''}`} aria-hidden="true">
      <div ref={disc} className="bfx-loader-disc" />

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
            <circle cx="40" cy="40" r="38" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" />
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
            <span className="bfx-loader-dim">WE</span>
            <span className="bfx-loader-slot">
              <span className="bfx-loader-column" style={{ transform: `translateY(${-(step + 1) * 25}%)` }}>
                <span>&nbsp;</span>
                {WORDS.map((w) => <span key={w}>{w}</span>)}
              </span>
            </span>
            <span className="bfx-loader-dim">BRANDS</span>
          </p>
        )}
      </div>
    </div>
  );
}
