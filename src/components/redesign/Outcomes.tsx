/**
 * Outcomes — Core Web Vitals from the live portfolio builds.
 *
 * Headline stats count up once in view; below them, every project's Largest
 * Contentful Paint as a single-series bar chart against Google's 2.5s "good"
 * threshold. The chart is a real <table>, so the numbers are readable
 * without the bars. Figures come from the project case studies.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

const PROJECTS = [
  { name: 'Organic Green Tea Store', lcp: 0.42, cls: '0', inp: 8 },
  { name: 'Christmas', lcp: 0.53, cls: '0', inp: 0 },
  { name: 'Halloween', lcp: 0.88, cls: '0', inp: 48 },
  { name: 'HBL', lcp: 0.98, cls: '0', inp: 40 },
  { name: 'Huuman', lcp: 2.24, cls: '0', inp: 24 },
  { name: 'Roseberry Massage Spa', lcp: 2.33, cls: '0', inp: 40 },
];

const SCALE_MAX = 3; // seconds shown on the LCP axis
const GOOD_LCP = 2.5;

const STATS = [
  { value: 0.42, decimals: 2, suffix: 's', label: 'Fastest Largest Contentful Paint', note: 'Organic Green Tea Store' },
  { value: 0, decimals: 0, suffix: '', label: 'Layout shift (CLS)', note: 'On all six live builds' },
  { value: 4, decimals: 0, suffix: '/6', label: 'Builds under one second', note: 'Main content painted in < 1s' },
  { value: 48, decimals: 0, prefix: '≤', suffix: 'ms', label: 'Slowest interaction (INP)', note: "Google's “good” limit is 200ms" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function CountUp({ to, decimals, run }: { to: number; decimals: number; run: boolean }) {
  const [value, setValue] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!run) return;
    if (reduceMotion || to === 0) {
      setValue(to);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, to, reduceMotion]);

  return <>{value.toFixed(decimals)}</>;
}

export function Outcomes() {
  const statsRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const statsIn = useInView(statsRef, { once: true, margin: '0px 0px -15% 0px' });
  const chartIn = useInView(chartRef, { once: true, margin: '0px 0px -15% 0px' });
  const reduceMotion = useReducedMotion();

  return (
    <section id="outcomes" className="bf-section bf-oc" aria-labelledby="bf-oc-title">
      <div className="bf-container">
        <div className="bf-oc-head">
          <div className="bf-jr-meta" aria-hidden="true">
            <span>BFS / RESULTS</span>
            <span className="bf-jr-meta-range">LIVE BUILDS</span>
          </div>
          <h2 id="bf-oc-title" className="bf-oc-title">
            <span>FAST IS A FEATURE.</span>
            <span className="bf-oc-title-muted">WE MEASURE EVERY BUILD.</span>
          </h2>
          <p className="bf-oc-lede">
            Core Web Vitals are how Google judges real-world speed and stability. Here is how
            our live projects score.
          </p>
        </div>

        <div ref={statsRef} className="bf-oc-stats">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bf-oc-stat"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={statsIn ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            >
              <span className="bf-oc-corner bf-oc-corner--tl" aria-hidden="true" />
              <span className="bf-oc-corner bf-oc-corner--br" aria-hidden="true" />
              <p className="bf-oc-value">
                {stat.prefix}
                <CountUp to={stat.value} decimals={stat.decimals} run={statsIn} />
                <span className="bf-oc-suffix">{stat.suffix}</span>
              </p>
              <p className="bf-oc-label">{stat.label}</p>
              <p className="bf-oc-note">{stat.note}</p>
            </motion.div>
          ))}
        </div>

        <div ref={chartRef} className={`bf-oc-chart${chartIn || reduceMotion ? ' is-in' : ''}`}>
          <div className="bf-oc-chart-head">
            <h3>Largest Contentful Paint, per project</h3>
            <p>
              Seconds until the main content is visible. Lower is better. The dashed line marks
              Google&rsquo;s &ldquo;good&rdquo; limit of 2.5s.
            </p>
          </div>

          <table className="bf-oc-table">
            <thead>
              <tr>
                <th scope="col">Project</th>
                <th scope="col">LCP</th>
                <th scope="col">CLS</th>
                <th scope="col">INP</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p, i) => (
                <tr key={p.name} style={{ '--i': i } as React.CSSProperties}>
                  <th scope="row">{p.name}</th>
                  <td className="bf-oc-lcp">
                    <span className="bf-oc-track" style={{ '--good': `${(GOOD_LCP / SCALE_MAX) * 100}%` } as React.CSSProperties}>
                      <span className="bf-oc-bar" style={{ width: `${(p.lcp / SCALE_MAX) * 100}%` }} />
                      <span className="bf-oc-bar-value">{p.lcp.toFixed(2)}s</span>
                    </span>
                  </td>
                  <td className="bf-oc-num">{p.cls}</td>
                  <td className="bf-oc-num">
                    {p.inp > 0 ? `${p.inp}ms` : <span title="No interactions recorded in the measurement">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </section>
  );
}
