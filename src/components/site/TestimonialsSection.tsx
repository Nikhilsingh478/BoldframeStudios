/**
 * Testimonials — a deep navy band for contrast. Each quote sits beside the
 * project it's about; quotes rise in word by word, auto-advance every 6s
 * (paused on hover/focus) and can be stepped with the arrows.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from './data';
import { SectionLabel } from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const INTERVAL = 6000;

export function TestimonialsSection() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => go(1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [index, paused, go]);

  // Words of the new quote rise in.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const words = el.querySelectorAll('.bfx-quote .bfx-qw');
    gsap.fromTo(words, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.018, ease: 'expo.out' });
  }, [index]);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      gsap.from(q('.bfx-testi-head .bfx-reveal-inner'), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 70%' },
      });
      gsap.from(q('.bfx-testi-body'), {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 60%' },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section
      ref={root}
      id="testimonials"
      className="bfx-section bfx-testi"
      aria-labelledby="bfx-testi-title"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="bfx-wrap">
        <div className="bfx-testi-head">
          <div>
            <SectionLabel index="06" dark>Clients</SectionLabel>
            <h2 id="bfx-testi-title" className="bfx-h2">
              <span className="bfx-reveal"><span className="bfx-reveal-inner">In their words.</span></span>
            </h2>
          </div>
          <div className="bfx-testi-nav">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        <div className="bfx-testi-body">
          <div className="bfx-testi-media" aria-hidden="true">
            {TESTIMONIALS.map((item, i) => (
              <img key={item.company} src={item.image} alt="" className={i === index ? 'is-active' : undefined} loading="lazy" />
            ))}
            <span className="bfx-testi-company">{t.company}</span>
          </div>

          <figure className="bfx-quote" aria-live="polite">
            <svg className="bfx-quote-mark" viewBox="0 0 48 36" aria-hidden="true">
              <path d="M0 36V22C0 9 7 2 19 0l2 6c-7 2-10 6-10 12h9v18H0zm27 0V22C27 9 34 2 46 0l2 6c-7 2-10 6-10 12h9v18H27z" fill="currentColor" />
            </svg>
            <blockquote key={index}>
              {t.quote.split(' ').map((w, i) => (
                <span key={i} className="bfx-qw">{w} </span>
              ))}
            </blockquote>
            <figcaption>
              <strong>{t.company}</strong>
              <span>{t.role}</span>
            </figcaption>
          </figure>
        </div>

        <div className="bfx-testi-progress" aria-hidden="true">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.company}
              type="button"
              tabIndex={-1}
              className={i === index ? 'is-active' : i < index ? 'is-done' : undefined}
              onClick={() => setIndex(i)}
            >
              <span style={i === index ? { animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? 'paused' : 'running' } : undefined} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
