/**
 * Work — the six live projects as a stack of sticky cards. Each card pins
 * near the top while the next one slides over it; the card underneath eases
 * back (scale + dim). Phones and small tablets get a swipeable strip of
 * compact image tiles instead (native scroll-snap); a single details panel
 * below shows the centred project, with a counter, progress line and arrows.
 */

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PROJECTS } from './data';
import { scrollToId } from '../../lib/smoothScroll';
import { SectionLabel } from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const host = (url: string) => new URL(url).host;

const STRIP_MQ = '(max-width: 899px)';

export function WorkSection() {
  const root = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  // Phones and small tablets show the projects as a swipeable strip.
  const [active, setActive] = useState(0);

  // Strip: track which card is centred.
  useEffect(() => {
    const track = stack.current;
    if (!track) return;
    const mq = window.matchMedia(STRIP_MQ);
    let observer: IntersectionObserver | null = null;
    const setup = () => {
      observer?.disconnect();
      observer = null;
      if (!mq.matches) return;
      observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }),
        { root: track, threshold: 0.6 },
      );
      track.querySelectorAll('.bfx-proj').forEach((c) => observer!.observe(c));
    };
    setup();
    mq.addEventListener('change', setup);
    return () => {
      mq.removeEventListener('change', setup);
      observer?.disconnect();
    };
  }, []);

  // Strip: centre card i (smoothly) in the track.
  const goTo = useCallback((i: number) => {
    const track = stack.current;
    const card = track?.querySelectorAll<HTMLElement>('.bfx-proj')[i];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
  }, []);

  // Project index links: on the strip, bring the section in and slide to the
  // card; on desktop, scroll to the card in the stack.
  const openProject = (i: number) => {
    if (window.matchMedia(STRIP_MQ).matches) {
      scrollToId('work');
      goTo(i);
    } else {
      scrollToId(`proj-${i + 1}`);
    }
  };

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

      mm.add(STRIP_MQ, () => {
        // The strip slides in from the right once.
        gsap.from(q('.bfx-proj'), {
          x: 80,
          opacity: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: q('.bfx-stack')[0], start: 'top 85%' },
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
            <SectionLabel index="03">Selected work</SectionLabel>
            <h2 id="bfx-work-title" className="bfx-h2">
              <span className="bfx-reveal"><span className="bfx-reveal-inner">Six live projects.</span></span>
              <span className="bfx-reveal"><span className="bfx-reveal-inner bfx-muted">Every one measured.</span></span>
            </h2>
          </div>
          <div className="bfx-work-index">
            <span className="bfx-work-count" aria-hidden="true">06</span>
            <ol className="bfx-work-toc" aria-label="Projects">
              {PROJECTS.map((p, i) => (
                <li key={p.title}>
                  <a href={`#proj-${i + 1}`} onClick={(e) => { e.preventDefault(); openProject(i); }}>
                    <span>0{i + 1}</span>{p.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div ref={stack} className="bfx-stack">
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              id={`proj-${i + 1}`}
              data-index={i}
              className={`bfx-proj${i === active ? ' is-active' : ''}`}
              style={{ '--i': i } as CSSProperties}
            >
              <div className="bfx-proj-inner">
                <div className="bfx-proj-info">
                  <div className="bfx-proj-top">
                    <span className="bfx-proj-index">0{i + 1} / 0{PROJECTS.length}</span>
                    <span className="bfx-proj-time">{p.timeline}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p className="bfx-proj-cat">{p.category}</p>
                  <p className="bfx-proj-desc">{p.description}</p>
                  <p className="bfx-proj-tech">
                    <span>Built with</span>
                    {p.tech.join(' / ')}
                  </p>
                  <dl className="bfx-proj-metrics">
                    <div><dt>Largest paint</dt><dd>{p.lcp.toFixed(2)}s</dd></div>
                    <div><dt>Layout shift</dt><dd>{p.cls}</dd></div>
                    <div><dt>Interaction</dt><dd>{p.inp > 0 ? `${p.inp}ms` : '—'}</dd></div>
                  </dl>
                  <a className="bfx-link" href={p.url} target="_blank" rel="noopener noreferrer">
                    Visit live site <span className="bfx-link-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>

                <a className="bfx-proj-shot" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title} in a new tab`}>
                  <span className="bfx-proj-bar" aria-hidden="true"><i /><i /><i /><span>{host(p.url)}</span></span>
                  <span className="bfx-proj-img"><img src={p.image} alt={`${p.title} website`} loading="lazy" /></span>
                  {/* Strip only: the title sits on the image */}
                  <span className="bfx-proj-caption" aria-hidden="true">
                    <span>0{i + 1}</span>
                    <strong>{p.title}</strong>
                  </span>
                </a>
                <span className="bfx-proj-shade" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        {/* Strip controls (phones): counter, progress, prev / next */}
        <div className="bfx-strip-ui">
          <span className="bfx-strip-count" aria-live="polite">
            <strong>0{active + 1}</strong> / 0{PROJECTS.length}
          </span>
          <span className="bfx-strip-bar" aria-hidden="true">
            <i style={{ transform: `scaleX(${(active + 1) / PROJECTS.length})` }} />
          </span>
          <span className="bfx-strip-nav">
            <button type="button" onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0} aria-label="Previous project">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" onClick={() => goTo(Math.min(PROJECTS.length - 1, active + 1))} disabled={active === PROJECTS.length - 1} aria-label="Next project">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </span>
        </div>

        {/* Strip details (phones): the centred project's info, one at a time */}
        <div className="bfx-strip-detail" aria-live="polite">
          <div key={active} className="bfx-strip-detail-inner">
            <p className="bfx-strip-meta">
              <span>{PROJECTS[active].category}</span>
              <span>{PROJECTS[active].timeline}</span>
            </p>
            <p className="bfx-strip-desc">{PROJECTS[active].description}</p>
            <dl className="bfx-strip-vitals">
              <div><dt>LCP</dt><dd>{PROJECTS[active].lcp.toFixed(2)}s</dd></div>
              <div><dt>CLS</dt><dd>{PROJECTS[active].cls}</dd></div>
              <div><dt>INP</dt><dd>{PROJECTS[active].inp > 0 ? `${PROJECTS[active].inp}ms` : '—'}</dd></div>
            </dl>
            <a className="bfx-link" href={PROJECTS[active].url} target="_blank" rel="noopener noreferrer">
              Visit {PROJECTS[active].title} <span className="bfx-link-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
