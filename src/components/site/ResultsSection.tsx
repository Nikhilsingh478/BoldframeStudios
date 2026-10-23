/**
 * Results — mobile Lighthouse runs of the live builds (reports in
 * public/reports). Headline stats count up in view; the chart shows each
 * project's Performance score against the 90 "good" line, as a real table
 * so it reads without the bars, with a link to every report.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PROJECTS } from './data';
import { SectionLabel } from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const SCALE_MAX = 100;
const GOOD = 90;

// Projects with a Lighthouse report that belong in the chart; best first.
const MEASURED = PROJECTS.flatMap((p) =>
  p.lighthouse && p.lighthouse.chart !== false ? [{ title: p.title, ...p.lighthouse }] : [],
).sort((a, b) => b.performance - a.performance || a.lcp - b.lcp);
const TOP = MEASURED[0];
const FASTEST = [...MEASURED].sort((a, b) => a.lcp - b.lcp)[0];
const GOOD_COUNT = MEASURED.filter((p) => p.performance >= GOOD).length;
const ALL_BP = MEASURED.every((p) => p.bestPractices === 100);
const COUNT_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const ALL = `all ${COUNT_WORDS[MEASURED.length] ?? MEASURED.length}`;

const STATS = [
  { value: TOP.performance, decimals: 0, suffix: '', label: 'Top Performance score', note: TOP.title },
  { value: GOOD_COUNT, decimals: 0, suffix: `/${MEASURED.length}`, label: 'Projects scoring 90+', note: 'Lighthouse Performance, mobile' },
  ...(ALL_BP ? [{ value: 100, decimals: 0, suffix: '', label: 'Best practices', note: `On ${ALL} reports` }] : []),
  { value: FASTEST.lcp, decimals: 1, suffix: 's', label: 'Fastest Largest Contentful Paint', note: FASTEST.title },
];

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
            Every live project is tested with Google Lighthouse on a mid-range phone over a slow
            4G connection. These are the scores, and the full reports are linked below.
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
            <h3>Lighthouse Performance, per project</h3>
            <p>Mobile run, emulated Moto G Power on slow 4G. Scored out of 100; the dashed line marks 90, where Lighthouse rates a page &ldquo;good&rdquo;.</p>
          </div>
          {/* Phones: threshold label above the bars */}
          <div className="bfx-res-goodlabel" aria-hidden="true">
            <span style={{ left: `${(GOOD / SCALE_MAX) * 100}%` }}>Good ≥ 90</span>
          </div>
          <table className="bfx-res-table">
            <thead>
              <tr>
                <th scope="col">Project</th>
                <th scope="col">Performance</th>
                <th scope="col">LCP</th>
                <th scope="col">CLS</th>
                <th scope="col">Report</th>
              </tr>
            </thead>
            <tbody>
              {MEASURED.map((p, i) => (
                <tr key={p.title} style={{ '--i': i } as CSSProperties}>
                  <th scope="row"><span className="bfx-res-rank" aria-hidden="true">0{i + 1}</span>{p.title}</th>
                  <td>
                    <span className="bfx-res-track" style={{ '--good': `${(GOOD / SCALE_MAX) * 100}%` } as CSSProperties}>
                      <span className="bfx-res-bar" style={{ width: `${(p.performance / SCALE_MAX) * 100}%` }} />
                      <span className="bfx-res-bar-value">{p.performance}</span>
                    </span>
                  </td>
                  <td className="bfx-res-num">{p.lcp.toFixed(1)}s</td>
                  <td className="bfx-res-num">{p.cls}</td>
                  <td className="bfx-res-report">
                    {p.report && (
                      <a href={p.report} target="_blank" rel="noopener" aria-label={`${p.title} Lighthouse report (PDF)`}>
                        PDF <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Phones: score scale under the bars */}
          <div className="bfx-res-axis" aria-hidden="true">
            {[0, 50, 100].map((t) => (
              <span key={t} style={{ left: `${(t / SCALE_MAX) * 100}%` }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
