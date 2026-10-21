/**
 * Work — the six live projects as a stack of sticky cards. Each card pins
 * near the top while the next one slides over it; the card underneath eases
 * back (scale + dim). Phones get a plain list with reveal-on-scroll, since
 * the cards are taller than the screen there.
 */

import { useEffect, useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PROJECTS } from './data';

gsap.registerPlugin(ScrollTrigger);

const host = (url: string) => new URL(url).host;

export function WorkSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.from(q('.bfx-work-head .bfx-reveal-inner'), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      });
      gsap.from(q('.bfx-work-count'), {
        yPercent: 40,
        opacity: 0,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      });

      mm.add('(min-width: 900px)', () => {
        const cards = q<HTMLElement>('.bfx-proj');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector('.bfx-proj-inner'), {
            scale: 0.93,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 18%', scrub: true },
          });
          gsap.to(card.querySelector('.bfx-proj-shade'), {
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 18%', scrub: true },
          });
        });
        // Screenshot drifts inside its frame while the card is in view.
        q<HTMLElement>('.bfx-proj-shot img').forEach((img) => {
          gsap.fromTo(img, { yPercent: -4 }, {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: { trigger: img.closest('.bfx-proj'), start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });
      });

      mm.add('(max-width: 899px)', () => {
        q<HTMLElement>('.bfx-proj').forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          });
        });
      });
    }, el);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="work" className="bfx-section bfx-work" aria-labelledby="bfx-work-title">
      <div className="bfx-wrap">
        <div className="bfx-work-head">
          <div>
            <span className="bfx-tag"><i aria-hidden="true" />Selected work</span>
            <h2 id="bfx-work-title" className="bfx-h2">
              <span className="bfx-reveal"><span className="bfx-reveal-inner">Six live projects.</span></span>
              <span className="bfx-reveal"><span className="bfx-reveal-inner bfx-muted">Every one measured.</span></span>
            </h2>
          </div>
          <span className="bfx-work-count" aria-hidden="true">06</span>
        </div>

        <div className="bfx-stack">
          {PROJECTS.map((p, i) => (
            <article key={p.title} className="bfx-proj" style={{ '--i': i } as CSSProperties}>
              <div className="bfx-proj-inner">
                <div className="bfx-proj-info">
                  <div className="bfx-proj-top">
                    <span className="bfx-proj-index">0{i + 1} / 0{PROJECTS.length}</span>
                    <span className="bfx-proj-time">{p.timeline}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p className="bfx-proj-cat">{p.category}</p>
                  <p className="bfx-proj-desc">{p.description}</p>
                  <ul className="bfx-proj-tags">
                    {p.tech.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                  <dl className="bfx-proj-metrics">
                    <div><dt>Largest paint</dt><dd>{p.lcp.toFixed(2)}s</dd></div>
                    <div><dt>Layout shift</dt><dd>{p.cls}</dd></div>
                    <div><dt>Interaction</dt><dd>{p.inp > 0 ? `${p.inp}ms` : '—'}</dd></div>
                  </dl>
                  <a className="bfx-btn bfx-btn--dark" href={p.url} target="_blank" rel="noopener noreferrer">
                    Visit live site <span aria-hidden="true">↗</span>
                  </a>
                </div>

                <a className="bfx-proj-shot" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title} in a new tab`}>
                  <span className="bfx-proj-bar" aria-hidden="true"><i /><i /><i /><span>{host(p.url)}</span></span>
                  <span className="bfx-proj-img"><img src={p.image} alt={`${p.title} website`} loading="lazy" /></span>
                </a>
                <span className="bfx-proj-shade" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
