/**
 * Hero — a layered composition from Nikhil's design:
 * background → giant "BOLDFRAME STUDIOS" → cut-out portrait → glass cards.
 *
 * Intro (see SiteLoader): the giant word is outlined on a light canvas and
 * fills with blue; then the canvas opens like a shutter, the background
 * settles, the portrait rises in from the bottom edge and the cards glide up.
 * It's pure CSS (transform/opacity), so it stays smooth on phones even
 * while the rest of the page is still loading. On desktop, scrolling
 * drifts the layers at different speeds so the portrait separates from
 * the type.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onReveal } from './reveal';
import { scrollToId } from '../../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

const LINE_ONE = 'BOLDFRAME';
const LINE_TWO = 'STUDIOS';

const STATS = [
  { label: 'Lighthouse Score', value: 90, suffix: '+' },
  { label: 'Live Projects', value: 6, pad: 2 },
];

const THUMBS = ['/thunderbold.webp', '/p1.webp', '/p2.webp'];

// React 18 doesn't know `fetchPriority`; pass the HTML attribute directly.
const HIGH_PRIORITY = { fetchpriority: 'high' } as Record<string, string>;

function Letters({ text, offset }: { text: string; offset: number }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span key={i} className="bfx-ch" style={{ '--ci': offset + i } as CSSProperties}>
          <span className="bfx-ch-inner">{ch}</span>
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  // Entrance is CSS (compositor-only), keyed off the intro mode set in
  // index.html; it plays when the loader calls startReveal().
  const [armed] = useState(() => document.documentElement.getAttribute('data-intro') !== 'none');
  const [revealed, setRevealed] = useState(!armed);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const counters = Array.from(el.querySelectorAll<HTMLElement>('[data-count]'));

    if (!armed) {
      counters.forEach((c) => { c.textContent = c.dataset.final ?? ''; });
      return;
    }

    // Counters tick once the cards have landed.
    let counterTimer = 0;
    const tweens: gsap.core.Tween[] = [];
    const stop = onReveal(() => {
      setRevealed(true);
      counterTimer = window.setTimeout(() => {
        counters.forEach((c) => {
          const final = Number(c.dataset.value);
          const pad = Number(c.dataset.pad || 0);
          const obj = { v: 0 };
          tweens.push(gsap.to(obj, {
            v: final,
            duration: 1.4,
            ease: 'power3.out',
            onUpdate: () => {
              c.textContent = String(Math.round(obj.v)).padStart(pad, '0') + (c.dataset.suffix ?? '');
            },
          }));
        });
      }, 1000);
    });

    // Scroll depth (desktop only — phones keep the hero still, which is
    // cheaper and avoids re-blurring the glass cards every frame).
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const q = gsap.utils.selector(el);
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
        .to(q('.bfx-hero-bg-wrap'), { yPercent: 18, scale: 1.06 }, 0)
        .to(q('.bfx-hero-word'), { yPercent: 55, opacity: 0.15 }, 0)
        // Portrait stays anchored to the hero's bottom edge: it only grows
        // from its base, so its cut-off edge is never exposed.
        .to(q('.bfx-hero-person-wrap'), { scale: 1.06 }, 0)
        .to(q('.bfx-hero-ui'), { y: -80, opacity: 0 }, 0);
    });

    return () => {
      stop();
      window.clearTimeout(counterTimer);
      tweens.forEach((t) => t.kill());
      mm.revert();
    };
  }, [armed]);

  return (
    <section
      ref={root}
      id="hero"
      className={`bfx-hero${armed ? ' is-armed' : ''}${revealed ? ' is-revealed' : ''}`}
      aria-labelledby="bfx-hero-title"
    >
      <div className="bfx-hero-bg-wrap" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero/mobile_background.webp" />
          <img className="bfx-hero-bg" src="/hero/desktop_background.webp" alt="" {...HIGH_PRIORITY} />
        </picture>
      </div>

      {/* Intro canvas: two halves that open like a shutter around the word. */}
      <div className="bfx-shutter" aria-hidden="true">
        <span className="bfx-shutter-half bfx-shutter-half--t" />
        <span className="bfx-shutter-half bfx-shutter-half--b" />
      </div>

      {/* The word is drawn twice: a thin outline, and the solid blue fill on
          top of it, which the intro wipes up from the bottom. */}
      <h1 id="bfx-hero-title" className="bfx-hero-word" aria-label="BoldFrame Studios">
        <span className="bfx-word-outline" aria-hidden="true">
          <span className="bfx-line bfx-line--one"><Letters text={LINE_ONE} offset={0} /></span>
          <span className="bfx-line bfx-line--two"><Letters text={LINE_TWO} offset={LINE_ONE.length} /></span>
        </span>
        <span className="bfx-word-fill" aria-hidden="true">
          <span className="bfx-word-fill-inner">
            <span className="bfx-line bfx-line--one"><Letters text={LINE_ONE} offset={0} /></span>
            <span className="bfx-line bfx-line--two"><Letters text={LINE_TWO} offset={LINE_ONE.length} /></span>
          </span>
        </span>
      </h1>

      <div className="bfx-hero-person-wrap" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero/mobile_nikhil_portrait_vertical_4x5.webp" />
          <img className="bfx-hero-person" src="/hero/desktop_nikhil.webp" alt="" {...HIGH_PRIORITY} />
        </picture>
      </div>

      <div className="bfx-hero-ui">
        <div className="bfx-stats">
          {STATS.map((s, i) => {
            const final = String(s.value).padStart(s.pad ?? 0, '0') + (s.suffix ?? '');
            return (
              <div key={s.label} className="bfx-card bfx-stat" style={{ '--k': i } as CSSProperties}>
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
          style={{ '--k': 2 } as CSSProperties}
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
              Research, design and development, planned around the outcome you need.
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
