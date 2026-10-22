/**
 * Services — a large list; the row crossing the middle of the screen becomes
 * active (or the one under the pointer). On desktop a sticky preview card
 * swaps to that service's image and deliverables.
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SERVICES } from './data';
import { SectionLabel } from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Active row = the one crossing the vertical middle of the viewport.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>('.bfx-svc-row'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    rows.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      gsap.from(q('.bfx-svc-head .bfx-reveal-inner'), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      });
      q('.bfx-svc-row').forEach((row) => {
        gsap.from(row, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 88%' },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const current = SERVICES[active];

  return (
    <section ref={root} id="services" className="bfx-section bfx-services" aria-labelledby="bfx-svc-title">
      <div className="bfx-wrap">
        <div className="bfx-svc-head">
          <SectionLabel index="02">What we do</SectionLabel>
          <h2 id="bfx-svc-title" className="bfx-h2">
            <span className="bfx-reveal"><span className="bfx-reveal-inner">Everything your brand</span></span>
            <span className="bfx-reveal"><span className="bfx-reveal-inner bfx-muted">needs to convert online.</span></span>
          </h2>
        </div>

        <div className="bfx-svc-body">
          <ol className="bfx-svc-list">
            {SERVICES.map((s, i) => (
              <li
                key={s.title}
                data-index={i}
                className={`bfx-svc-row${i === active ? ' is-active' : ''}`}
                onPointerEnter={() => setActive(i)}
              >
                <span className="bfx-svc-index">0{i + 1}</span>
                <div className="bfx-svc-main">
                  <h3>{s.title}</h3>
                  <p className="bfx-svc-tagline">{s.tagline}</p>
                  <div className="bfx-svc-more">
                    <p>{s.description}</p>
                    <ul>
                      {s.deliverables.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <aside className="bfx-svc-preview" aria-hidden="true">
            <div className="bfx-svc-frame">
              {SERVICES.map((s, i) => (
                <img key={s.title} src={s.image} alt="" className={i === active ? 'is-active' : undefined} loading="lazy" />
              ))}
              <span className="bfx-svc-badge">0{active + 1} / 0{SERVICES.length}</span>
            </div>
            <div className="bfx-svc-card">
              <strong>{current.title}</strong>
              <ul>
                {current.deliverables.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
