/**
 * About — who BoldFrame is, said once and clearly.
 *
 * Scroll-linked: the statement fills in word by word, a giant faint
 * wordmark drifts sideways behind it, and the "We · Build · → · Bold" pills
 * slide together. Everything is scrubbed to scroll, transforms/opacity only.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SOCIALS } from './data';
import { SectionLabel } from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

// [text, accent?] — accent words turn blue as they fill.
const STATEMENT: [string, boolean?][] = [
  ['We’re a design-led frontend studio.'],
  ['We plan, design and build websites that'],
  ['look bold,', true],
  ['load fast', true],
  ['and'],
  ['turn visitors into customers', true],
  ['— for brands that refuse to blend in.'],
];

// The giant drifting "BOLDFRAME STUDIOS" wordmark behind this section.
// Switched off for now; set to true to bring it (and its scroll drift) back.
const SHOW_BG_WORDMARK = false;

const PILLS = [
  { label: 'We', tone: 'white' },
  { label: 'Build', tone: 'blue' },
  { label: '→', tone: 'navy' },
  { label: 'Bold', tone: 'sky' },
];

export function AboutSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Giant wordmark drifts left as the section scrolls by.
      if (SHOW_BG_WORDMARK) {
        gsap.fromTo(q('.bfx-about-bgword'), { xPercent: 4 }, {
          xPercent: -28,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }

      // Statement: word-by-word fill on desktop; on phones a single reveal
      // (scrubbing ~40 words' opacity and colour repaints text every frame).
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(q('.bfx-word'), { opacity: 0.16 }, {
          opacity: 1,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: q('.bfx-statement')[0], start: 'top 78%', end: 'bottom 42%', scrub: true },
        });
        gsap.fromTo(q('.bfx-word[data-accent]'), { color: '#0A1633' }, {
          color: '#0B5CFF',
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: q('.bfx-statement')[0], start: 'top 60%', end: 'bottom 40%', scrub: true },
        });
      });
      mm.add('(max-width: 767px)', () => {
        gsap.from(q('.bfx-statement'), {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: q('.bfx-statement')[0], start: 'top 85%' },
        });
      });

      // Pills start scattered and click together.
      const spread = [-38, -14, 14, 38];
      q('.bfx-pill-big').forEach((pill, i) => {
        gsap.fromTo(pill, { xPercent: spread[i], rotate: i % 2 ? 6 : -6, opacity: 0.4 }, {
          xPercent: 0,
          rotate: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: q('.bfx-pills')[0], start: 'top bottom', end: 'center 60%', scrub: true },
        });
      });

      // Side column eases in.
      gsap.from(q('.bfx-about-side > *'), {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 70%' },
      });
    }, el);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="about" className="bfx-section bfx-about" aria-labelledby="bfx-about-title">
      {SHOW_BG_WORDMARK && (
        <div className="bfx-about-bgword" aria-hidden="true">BOLDFRAME STUDIOS · BOLDFRAME</div>
      )}

      <div className="bfx-wrap bfx-about-grid">
        <div className="bfx-about-side">
          <SectionLabel index="01">About us</SectionLabel>
          <div className="bfx-founder">
            <img src="/hero/mobile_nikhil_portrait_vertical_4x5.webp" alt="Nikhil Singh" />
            <div>
              <strong>Nikhil Singh</strong>
              <span>Founder · Designer &amp; frontend developer</span>
            </div>
          </div>
          <div className="bfx-socials">
            {SOCIALS.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} <span aria-hidden="true">↗</span></a>
            ))}
          </div>
        </div>

        <h2 id="bfx-about-title" className="bfx-statement">
          {STATEMENT.map(([text, accent], i) =>
            text.split(' ').map((w, j) => (
              <span key={`${i}-${j}`} className="bfx-word" data-accent={accent ? '' : undefined}>{w} </span>
            )),
          )}
        </h2>
      </div>

      <div className="bfx-wrap bfx-pills" aria-hidden="true">
        {PILLS.map((p) => (
          <span key={p.label} className={`bfx-pill-big bfx-pill-big--${p.tone}`}>{p.label}</span>
        ))}
      </div>
    </section>
  );
}
