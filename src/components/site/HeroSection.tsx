/**
 * Hero — a layered composition from Nikhil's design:
 * background → giant "BOLDFRAME STUDIOS" → cut-out portrait → glass cards.
 *
 * Entrance (after the loader collapses into the "O"): the background
 * settles, the letters rise one by one, the portrait rises in, then the
 * cards glide up. On scroll the layers drift at different speeds, so the
 * portrait separates from the type. Transforms and opacity only.
 */

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onReveal, setRevealTarget } from './reveal';
import { scrollToId } from '../../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

const LINE_ONE = 'BOLDFRAME';
const LINE_TWO = 'STUDIOS';
const O_INDEX = 1; // the "O" of BOLD, where the loader lands

const STATS = [
  { label: 'Lighthouse Score', value: 90, suffix: '+' },
  { label: 'Live Projects', value: 6, pad: 2 },
];

const THUMBS = ['/p1.webp', '/p2.webp', '/p3.webp'];

// React 18 doesn't know `fetchPriority`; pass the HTML attribute directly.
const HIGH_PRIORITY = { fetchpriority: 'high' } as Record<string, string>;

function Letters({ text, offset }: { text: string; offset: number }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="bfx-ch"
          data-o={offset + i === O_INDEX ? '' : undefined}
        >
          <span className="bfx-ch-inner">{ch}</span>
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const oRef = useRef<HTMLElement | null>(null);

  // Let the loader know where the "O" is.
  useLayoutEffect(() => {
    oRef.current = root.current?.querySelector<HTMLElement>('[data-o]') ?? null;
    setRevealTarget(oRef.current);
    return () => setRevealTarget(null);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const q = gsap.utils.selector(el);

    const ctx = gsap.context(() => {
      const letters = q('.bfx-ch:not([data-o]) .bfx-ch-inner');
      const oLetter = q('.bfx-ch[data-o] .bfx-ch-inner');
      const counters = q<HTMLElement>('[data-count]');

      if (reduce) {
        counters.forEach((c) => { c.textContent = c.dataset.final ?? ''; });
        return;
      }

      // Hidden until the reveal.
      gsap.set(q('.bfx-hero-bg'), { scale: 1.12, opacity: 0 });
      gsap.set(letters, { yPercent: 110 });
      gsap.set(oLetter, { opacity: 0 });
      gsap.set(q('.bfx-hero-person'), { yPercent: 9, opacity: 0, scale: 1.04 });
      gsap.set(q('.bfx-card'), { y: 36, opacity: 0 });

      const entrance = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
      entrance
        .to(q('.bfx-hero-bg'), { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' }, 0)
        .to(letters, { yPercent: 0, duration: 1.3, stagger: { each: 0.045, from: 'start' } }, 0.15)
        .to(oLetter, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.55)
        .to(q('.bfx-hero-person'), { yPercent: 0, opacity: 1, scale: 1, duration: 1.6 }, 0.45)
        .to(q('.bfx-card'), { y: 0, opacity: 1, duration: 1.1, stagger: 0.09 }, 1.05)
        .add(() => {
          counters.forEach((c) => {
            const final = Number(c.dataset.value);
            const pad = Number(c.dataset.pad || 0);
            const obj = { v: 0 };
            gsap.to(obj, {
              v: final,
              duration: 1.4,
              ease: 'power3.out',
              onUpdate: () => {
                c.textContent = String(Math.round(obj.v)).padStart(pad, '0') + (c.dataset.suffix ?? '');
              },
            });
          });
        }, 1.15);

      const stop = onReveal(() => entrance.play());

      // Scroll: the layers part as the hero leaves.
      const scroll = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
      scroll
        .to(q('.bfx-hero-bg-wrap'), { yPercent: 18, scale: 1.06 }, 0)
        .to(q('.bfx-hero-word'), { yPercent: 55, opacity: 0.15 }, 0)
        .to(q('.bfx-hero-person-wrap'), { yPercent: -6, scale: 1.05 }, 0)
        .to(q('.bfx-hero-ui'), { y: -80, opacity: 0 }, 0);

      return () => stop();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="hero" className="bfx-hero" aria-labelledby="bfx-hero-title">
      <div className="bfx-hero-bg-wrap" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero/mobile_background.webp" />
          <img className="bfx-hero-bg" src="/hero/desktop_background.webp" alt="" {...HIGH_PRIORITY} />
        </picture>
      </div>

      <h1 id="bfx-hero-title" className="bfx-hero-word" aria-label="BoldFrame Studios">
        <span className="bfx-line bfx-line--one" aria-hidden="true"><Letters text={LINE_ONE} offset={0} /></span>
        <span className="bfx-line bfx-line--two" aria-hidden="true"><Letters text={LINE_TWO} offset={LINE_ONE.length} /></span>
      </h1>

      <div className="bfx-hero-person-wrap" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero/mobile_nikhil_portrait_vertical_4x5.webp" />
          <img className="bfx-hero-person" src="/hero/desktop_nikhil.webp" alt="" {...HIGH_PRIORITY} />
        </picture>
      </div>

      <div className="bfx-hero-ui">
        <div className="bfx-stats">
          {STATS.map((s) => {
            const final = String(s.value).padStart(s.pad ?? 0, '0') + (s.suffix ?? '');
            return (
              <div key={s.label} className="bfx-card bfx-stat">
                <span className="bfx-stat-label"><i aria-hidden="true" />{s.label}</span>
                <span
                  className="bfx-stat-value"
                  data-count=""
                  data-value={s.value}
                  data-pad={s.pad ?? 0}
                  data-suffix={s.suffix ?? ''}
                  data-final={final}
                >
                  {final}
                </span>
              </div>
            );
          })}
        </div>

        <a
          href="#work"
          className="bfx-card bfx-partner"
          onClick={(e) => { e.preventDefault(); scrollToId('work'); }}
        >
          <span className="bfx-partner-row">
            <span className="bfx-partner-title">Your Partner in<br />Business Growth</span>
            <span className="bfx-partner-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </span>
          <span className="bfx-partner-row bfx-partner-row--bottom">
            <span className="bfx-partner-copy">
              Strategic design, fast frontends and measurable results for forward-thinking brands.
            </span>
            <span className="bfx-partner-proof">
              <span className="bfx-thumbs" aria-hidden="true">
                {THUMBS.map((t) => <img key={t} src={t} alt="" />)}
              </span>
              <span>Six projects<br />live today</span>
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
