/**
 * Work — the six live projects.
 *
 * Desktop: a stack of sticky cards. Each card pins near the top while the
 * next one slides over it; the card underneath eases back (scale + dim).
 *
 * Phones / small tablets: a "scroll index". A framed preview window sticks
 * at the top of the section and the projects are a list of large titles
 * below it. Browsing is just scrolling: the title crossing the middle of
 * the screen becomes active (stats + visit link appear) and its screenshot
 * slides up into the frame over the previous one; scrolling back slides it
 * away again. Transforms only.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PROJECTS, projectMetrics } from './data';
import { scrollToId } from '../../lib/smoothScroll';
import { SectionLabel } from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const host = (url: string) => new URL(url).host;
const INDEX_MQ = '(max-width: 899px)';

function MobileIndex() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  // While a tap-triggered scroll runs, scrolling must not change the
  // selection (rows pass through the detection band on the way).
  const tapLock = useRef(0);

  // Active row = the one crossing a band just below the sticky preview
  // (56–60% down the screen).
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && performance.now() > tapLock.current) {
          setActive(Number((e.target as HTMLElement).dataset.index));
        }
      }),
      { rootMargin: '-56% 0px -40% 0px' },
    );
    list.querySelectorAll('li').forEach((li) => observer.observe(li));
    return () => observer.disconnect();
  }, []);

  // Tap: select that project now, then scroll its top to just above the
  // band, so the band sits inside the tapped row (centring it put the band
  // on the row below, which then became active).
  const focusRow = (i: number) => {
    const row = listRef.current?.querySelectorAll('li')[i];
    if (!row) return;
    tapLock.current = performance.now() + 1200;
    setActive(i);
    requestAnimationFrame(() => {
      const top = row.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.48;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  };

  const current = PROJECTS[active];

  return (
    <div className="bfx-mindex">
      <div className="bfx-mindex-stage" aria-hidden="true">
        <div className="bfx-mindex-frame">
          {PROJECTS.map((p, i) => (
            <img
              key={p.title}
              src={p.image}
              alt=""
              loading="lazy"
              className={i <= active ? 'is-in' : undefined}
              style={{ zIndex: i, objectPosition: p.focus }}
            />
          ))}
          <span className="bfx-mindex-shade" />
          <span className="bfx-mindex-count">0{active + 1} / 0{PROJECTS.length}</span>
          <span className="bfx-mindex-host">{host(current.url)}</span>
        </div>
        <i className="bfx-mindex-c bfx-mindex-c--tl" />
        <i className="bfx-mindex-c bfx-mindex-c--tr" />
        <i className="bfx-mindex-c bfx-mindex-c--bl" />
        <i className="bfx-mindex-c bfx-mindex-c--br" />
      </div>

      <ol ref={listRef} className="bfx-mindex-list">
        {PROJECTS.map((p, i) => (
          <li
            key={p.title}
            data-index={i}
            className={i === active ? 'is-active' : undefined}
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest('a')) focusRow(i);
            }}
          >
            <span className="bfx-mindex-num">0{i + 1}</span>
            <div className="bfx-mindex-body">
              <h3>{p.title}</h3>
              <p className="bfx-mindex-cat">{p.category}</p>
              <div className="bfx-mindex-more">
                <div>
                  <p className="bfx-mindex-stats">
                    {projectMetrics(p).map((m) => <span key={m.short}>{m.short} {m.value}</span>)}
                  </p>
                  <a
                    className="bfx-link"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={i === active ? 0 : -1}
                  >
                    Visit live site <span className="bfx-link-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

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
        // (No drift on the screenshot: it's shown whole, at its own shape.)
      });

      mm.add(INDEX_MQ, () => {
        // Index rows rise in once as they arrive.
        q<HTMLElement>('.bfx-mindex-list li').forEach((li) => {
          gsap.from(li, {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: li, start: 'top 92%' },
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
                  <a href={`#proj-${i + 1}`} onClick={(e) => { e.preventDefault(); scrollToId(`proj-${i + 1}`); }}>
                    <span>0{i + 1}</span>{p.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="bfx-stack">
          {PROJECTS.map((p, i) => (
            <article key={p.title} id={`proj-${i + 1}`} className="bfx-proj" style={{ '--i': i } as CSSProperties}>
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
                    {projectMetrics(p).map((m) => (
                      <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
                    ))}
                  </dl>
                  <a className="bfx-link" href={p.url} target="_blank" rel="noopener noreferrer">
                    Visit live site <span className="bfx-link-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>

                <a className="bfx-proj-shot" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title} in a new tab`}>
                  <span className="bfx-proj-bar" aria-hidden="true"><i /><i /><i /><span>{host(p.url)}</span></span>
                  <span className="bfx-proj-img"><img src={p.image} alt={`${p.title} website`} width={1920} height={1080} loading="lazy" style={p.focus ? { objectPosition: p.focus } : undefined} /></span>
                </a>
                <span className="bfx-proj-shade" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <MobileIndex />
      </div>
    </section>
  );
}
