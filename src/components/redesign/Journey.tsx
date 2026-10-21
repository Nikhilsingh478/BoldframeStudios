/**
 * Journey — the BoldFrame process, from rough idea to sharp experience.
 *
 * Five checkpoints joined by a violet path that draws itself once when the
 * section scrolls into view. No pinning and no scroll-linked timeline: the
 * section scrolls like any other, so it can't stall, skip or leave blank
 * frames. On narrow screens the path becomes a vertical line.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

const CHECKPOINTS = [
  { id: '01', title: 'DISCOVER', copy: 'Understand what deserves attention.' },
  { id: '02', title: 'FRAME', copy: 'Give the idea structure and direction.' },
  { id: '03', title: 'DESIGN', copy: 'Turn strategy into something unmistakable.' },
  { id: '04', title: 'BUILD', copy: 'Engineer the experience for the real browser.' },
  { id: '05', title: 'REFINE', copy: 'Remove friction until everything feels inevitable.' },
];

// Node positions on the desktop track, in the SVG's 1000 × 120 space.
// x matches the centre of each of the five equal columns below the track.
const NODES = [
  { x: 100, y: 78 },
  { x: 300, y: 38 },
  { x: 500, y: 70 },
  { x: 700, y: 30 },
  { x: 900, y: 58 },
];

const TRACK_PATH =
  'M 0 96 C 50 92 70 80 100 78 C 170 74 230 38 300 38 C 370 38 430 70 500 70 ' +
  'C 570 70 630 30 700 30 C 770 30 830 58 900 58 C 940 58 975 50 1000 44';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DRAW_SECONDS = 2.2;
const NARROW_MQ = '(max-width: 899px)';

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const trackInView = useInView(trackRef, { once: true, margin: '0px 0px -20% 0px' });
  const closingInView = useInView(closingRef, { once: true, margin: '0px 0px -15% 0px' });
  const drawn = trackInView || !!reduceMotion;

  // Below 900px the path becomes a vertical line (see CSS) and the steps
  // simply cascade in, instead of waiting for the desktop path to reach them.
  const [isNarrow, setIsNarrow] = useState(() => window.matchMedia(NARROW_MQ).matches);
  useEffect(() => {
    const mq = window.matchMedia(NARROW_MQ);
    const onChange = (e: MediaQueryListEvent) => setIsNarrow(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Each checkpoint lights up as the path reaches it.
  const stepDelay = (i: number) => {
    if (reduceMotion) return 0;
    if (isNarrow) return 0.15 + i * 0.12;
    return 0.25 + (NODES[i].x / 1000) * DRAW_SECONDS;
  };

  return (
    <section id="journey" className="bf-section bf-jr" aria-labelledby="bf-jr-title">
      <div className="bf-container">
        <div className="bf-jr-meta" aria-hidden="true">
          <span>BFS / PROCESS</span>
          <span className="bf-jr-meta-range">01—05</span>
        </div>

        <h2 id="bf-jr-title" className="bf-jr-title">
          <span className="bf-jr-title-from">FROM ROUGH IDEA</span>
          <span className="bf-jr-title-to">TO SHARP EXPERIENCE.</span>
        </h2>

        <div ref={trackRef} className={`bf-jr-track${drawn ? ' is-drawn' : ''}`}>
          <div className="bf-jr-line">
            <svg className="bf-jr-path" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
              <path className="bf-jr-path-base" d={TRACK_PATH} vectorEffect="non-scaling-stroke" />
              <path
                className="bf-jr-path-line"
                d={TRACK_PATH}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
                style={{ transitionDuration: reduceMotion ? '0s' : `${DRAW_SECONDS}s` }}
              />
            </svg>

            {NODES.map((node, i) => (
              <span
                key={CHECKPOINTS[i].id}
                className="bf-jr-node"
                aria-hidden="true"
                style={{
                  left: `${node.x / 10}%`,
                  top: `${(node.y / 120) * 100}%`,
                  transitionDelay: `${stepDelay(i)}s`,
                } as CSSProperties}
              />
            ))}
          </div>

          <ol className="bf-jr-steps">
            {CHECKPOINTS.map((cp, i) => (
              <motion.li
                key={cp.id}
                className="bf-jr-step"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={drawn ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, ease: EASE, delay: stepDelay(i) }}
              >
                <span className="bf-jr-step-id">{cp.id}</span>
                <h3 className="bf-jr-step-title">{cp.title}</h3>
                <p className="bf-jr-step-copy">{cp.copy}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          ref={closingRef}
          className="bf-jr-result"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={closingInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="bf-jr-result-label">THE RESULT?</span>
          <p className="bf-jr-result-text">
            <span className="bf-jr-result-lead">A WEBSITE THAT</span>
            <span>DOESN&rsquo;T FEEL</span>
            <span>INTERCHANGEABLE.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
