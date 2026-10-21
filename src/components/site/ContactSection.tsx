/**
 * Contact — the closing invitation, with a project mosaic whose columns
 * drift in opposite directions as you scroll.
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CONTACT_EMAIL, PROJECTS } from './data';

gsap.registerPlugin(ScrollTrigger);

const COLUMNS = [
  [PROJECTS[0], PROJECTS[3], PROJECTS[1]],
  [PROJECTS[2], PROJECTS[5], PROJECTS[4]],
  [PROJECTS[1], PROJECTS[4], PROJECTS[0]],
];

export function ContactSection({ onContactClick }: { onContactClick: () => void }) {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      gsap.from(q('.bfx-contact-copy .bfx-reveal-inner'), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 70%' },
      });
      gsap.from(q('.bfx-contact-copy .bfx-fade'), {
        y: 24,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.25,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 70%' },
      });
      const travel = [-14, 10, -18];
      q<HTMLElement>('.bfx-mosaic-col').forEach((col, i) => {
        gsap.fromTo(col, { yPercent: -travel[i] }, {
          yPercent: travel[i],
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <section ref={root} id="contact" className="bfx-section bfx-contact" aria-labelledby="bfx-contact-title">
      <div className="bfx-wrap bfx-contact-grid">
        <div className="bfx-contact-copy">
          <span className="bfx-tag bfx-fade"><i aria-hidden="true" />Start a project</span>
          <h2 id="bfx-contact-title" className="bfx-h2 bfx-h2--xl">
            <span className="bfx-reveal"><span className="bfx-reveal-inner">Have a project</span></span>
            <span className="bfx-reveal"><span className="bfx-reveal-inner">in mind? Let&rsquo;s</span></span>
            <span className="bfx-reveal"><span className="bfx-reveal-inner bfx-blue">make it bold.</span></span>
          </h2>
          <p className="bfx-lede bfx-fade">
            Tell us what you&rsquo;re building. We&rsquo;ll reply with next steps and an honest read
            on scope, timeline and what it takes to make it convert.
          </p>
          <div className="bfx-contact-actions bfx-fade">
            <button type="button" className="bfx-btn bfx-btn--blue" onClick={onContactClick}>
              Let&rsquo;s Connect <span className="bfx-btn-icon" aria-hidden="true">→</span>
            </button>
            <div className="bfx-email">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <button type="button" onClick={copy} aria-live="polite">{copied ? 'Copied' : 'Copy'}</button>
            </div>
          </div>
        </div>

        <div className="bfx-mosaic" aria-hidden="true">
          {COLUMNS.map((col, i) => (
            <div key={i} className="bfx-mosaic-col">
              {col.map((p, j) => (
                <span key={`${p.title}-${j}`} className="bfx-mosaic-tile">
                  <img src={p.image} alt="" loading="lazy" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
