/**
 * Results — Core Web Vitals from the live builds. Headline stats count up
 * in view; the chart shows each project's Largest Contentful Paint against
 * Google's 2.5s "good" line (a real table, so it reads without the bars).
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PROJECTS } from './data';
import { SectionLabel } from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const SCALE_MAX = 3;
const GOOD_LCP = 2.5;

const STATS = [
  { value: 0.42, decimals: 2, suffix: 's', label: 'Fastest Largest Contentful Paint', note: 'Organic Green Tea Store' },
  { value: 0, decimals: 0, suffix: '', label: 'Layout shift (CLS)', note: 'On all six live builds' },
  { value: 4, decimals: 0, suffix: '/6', label: 'Builds under one second', note: 'Main content painted in < 1s' },
  { value: 48, decimals: 0, prefix: '≤', suffix: 'ms', label: 'Slowest interaction (INP)', note: 'Google’s “good” limit is 200ms' },
];

const BY_SPEED = [...PROJECTS].sort((a, b) => a.lcp - b.lcp);

export function ResultsSection() {
  const root = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const q = gsap.utils.selector(el);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: q('.bfx-res-chart')[0], start: 'top 80%', once: true, onEnter: () => setInView(true) });

      q<HTMLElement>('[data-count]').forEach((node) => {
        const to = Number(node.dataset.value);
        const decimals = Number(node.dataset.decimals);
        if (reduce || to === 0) {
          node.textContent = to.toFixed(decimals);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top 85%' },
          onUpdate: () => { node.textContent = obj.v.toFixed(decimals); },
        });
      });

      if (reduce) return;
      gsap.from(q('.bfx-res-head .bfx-reveal-inner'), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      });
      gsap.from(q('.bfx-res-stat'), {
        y: 50,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: q('.bfx-res-stats')[0], start: 'top 85%' },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="outcomes" className="bfx-section bfx-results" aria-labelledby="bfx-res-title">
      <div className="bfx-wrap">
        <div className="bfx-res-head">
          <SectionLabel index="05">Results</SectionLabel>
          <h2 id="bfx-res-title" className="bfx-h2">
            <span className="bfx-reveal"><span className="bfx-reveal-inner">Measured,</span></span>
            <span className="bfx-reveal"><span className="bfx-reveal-inner bfx-muted">not promised.</span></span>
          </h2>
          <p className="bfx-lede">
            Core Web Vitals are how Google judges real-world speed and stability. Here is how our
            live projects score.
          </p>
        </div>

        <div className="bfx-res-stats">
          {STATS.map((s) => (
            <div key={s.label} className="bfx-res-stat">
              <p className="bfx-res-value">
                {s.prefix}
                <span data-count="" data-value={s.value} data-decimals={s.decimals}>{s.value.toFixed(s.decimals)}</span>
                <span className="bfx-res-suffix">{s.suffix}</span>
              </p>
              <p className="bfx-res-label">{s.label}</p>
              <p className="bfx-res-note">{s.note}</p>
            </div>
          ))}
        </div>

        <div className={`bfx-res-chart${inView ? ' is-in' : ''}`}>
          <div className="bfx-res-chart-head">
            <h3>Largest Contentful Paint, per project</h3>
            <p>Seconds until the main content is visible. Lower is better. The dashed line marks Google&rsquo;s &ldquo;good&rdquo; limit of 2.5s.</p>
          </div>
          {/* Phones: threshold label above the bars */}
          <div className="bfx-res-goodlabel" aria-hidden="true">
            <span style={{ left: `${(GOOD_LCP / SCALE_MAX) * 100}%` }}>Good ≤ 2.5s</span>
          </div>
          <table className="bfx-res-table">
            <thead>
              <tr>
                <th scope="col">Project</th>
                <th scope="col">LCP</th>
                <th scope="col">CLS</th>
                <th scope="col">INP</th>
              </tr>
            </thead>
            <tbody>
              {BY_SPEED.map((p, i) => (
                <tr key={p.title} style={{ '--i': i } as CSSProperties}>
                  <th scope="row"><span className="bfx-res-rank" aria-hidden="true">0{i + 1}</span>{p.title}</th>
                  <td>
                    <span className="bfx-res-track" style={{ '--good': `${(GOOD_LCP / SCALE_MAX) * 100}%` } as CSSProperties}>
                      <span className="bfx-res-bar" style={{ width: `${(p.lcp / SCALE_MAX) * 100}%` }} />
                      <span className="bfx-res-bar-value">{p.lcp.toFixed(2)}s</span>
                    </span>
                  </td>
                  <td className="bfx-res-num">{p.cls}</td>
                  <td className="bfx-res-num">
                    {p.inp > 0 ? `${p.inp}ms` : <span title="No interactions recorded in the measurement">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Phones: seconds scale under the bars */}
          <div className="bfx-res-axis" aria-hidden="true">
            {[0, 1, 2, 3].map((t) => (
              <span key={t} style={{ left: `${(t / SCALE_MAX) * 100}%` }}>{t}s</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
