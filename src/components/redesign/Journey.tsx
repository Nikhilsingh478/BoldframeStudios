/**
 * BoldFrame Journey — Scroll-drawn process narrative
 * Scroll progress → SVG path draws → checkpoints activate → typography evolves
 *
 * Section is 300vh. Sticky inner is 100vh.
 * Framer Motion useScroll + useTransform drives all animation.
 * No global side effects. Cleanup handled by Framer Motion internally.
 */

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react';

// ─── Journey checkpoints ──────────────────────────────────────────

const CHECKPOINTS = [
  {
    id: '01',
    title: 'DISCOVER',
    copy: 'Understand what deserves attention.',
    activateAt: 0.10,
    left: '7%',
    top: '36%',
  },
  {
    id: '02',
    title: 'FRAME',
    copy: 'Give the idea structure and direction.',
    activateAt: 0.27,
    left: '64%',
    top: '23%',
  },
  {
    id: '03',
    title: 'DESIGN',
    copy: 'Turn strategy into something unmistakable.',
    activateAt: 0.44,
    left: '7%',
    top: '54%',
  },
  {
    id: '04',
    title: 'BUILD',
    copy: 'Engineer the experience for the real browser.',
    activateAt: 0.60,
    left: '64%',
    top: '63%',
  },
  {
    id: '05',
    title: 'REFINE',
    copy: 'Remove friction until everything feels inevitable.',
    activateAt: 0.73,
    left: '26%',
    top: '77%',
  },
] as const;

// ─── SVG Paths ────────────────────────────────────────────────────
//
// Desktop: viewBox 0 0 1440 900
// Route: start(120,165) → DISCOVER(100,330) → FRAME(1155,252) →
//        → around frame motif → DESIGN(101,486) → BUILD(1181,576) →
//        → REFINE(374,702) → end(355,842)
// Resolves to a confident horizontal trajectory in the final segment.

const DESKTOP_PATH = [
  'M 120 165',
  'C 110 220 100 275 100 330',      // ↓ to DISCOVER
  'C 100 385 168 376 338 358',      // → sweep right begins
  'C 508 340 710 302 920 270',
  'C 1040 254 1098 248 1155 252',   // → arrive FRAME
  'C 1200 256 1248 272 1258 300',   // ↓ past frame motif
  'C 1268 328 1248 362 1198 386',
  'C 1128 416 1012 437 868 455',    // ← sweep left begins
  'C 700 474 498 476 318 474',
  'C 208 473 138 476 101 486',      // → arrive DESIGN
  'C 64 496 100 530 192 552',       // ↗ curve right
  'C 312 574 502 578 702 576',
  'C 882 574 1040 567 1150 572',
  'C 1165 573 1174 574 1181 576',   // → arrive BUILD
  'C 1220 578 1268 595 1276 620',   // ↓ curve down
  'C 1284 650 1262 690 1218 718',
  'C 1154 752 1042 764 900 758',    // ← sweep left begins
  'C 756 752 606 734 496 720',
  'C 452 712 412 706 374 702',      // → arrive REFINE
  'C 344 696 324 712 308 740',      // ↓ final descent, resolving horizontal
  'C 296 762 290 784 296 808',
  'C 304 830 330 842 355 842',      // → final arrival
].join(' ');

// Mobile: viewBox 0 0 390 760
// Primarily vertical with controlled horizontal curves.
// Shorter than desktop — section is 200vh on mobile.

const MOBILE_PATH = [
  'M 55 58',
  'C 52 95 50 135 52 175',          // ↓ to DISCOVER
  'C 54 215 95 225 160 232',        // → bend right
  'C 225 239 280 246 310 258',
  'C 325 264 332 272 318 290',      // → peak right / near FRAME
  'C 304 308 262 320 208 332',      // ← bend back left
  'C 154 344 90 350 55 368',
  'C 32 378 42 385 50 395',         // ↓ to DESIGN
  'C 58 405 90 418 148 428',        // → bend right
  'C 210 438 268 444 302 458',
  'C 318 464 330 472 312 488',      // → peak right / near BUILD
  'C 294 504 248 514 196 522',      // ← bend left
  'C 148 530 100 534 74 552',
  'C 56 564 60 580 76 596',         // ↓ near REFINE
  'C 92 612 128 622 166 628',
  'C 188 632 198 640 194 660',      // resolves horizontal
  'C 190 678 182 692 175 704',
].join(' ');

// ─── Checkpoint annotation ────────────────────────────────────────

interface CPProps {
  cp: (typeof CHECKPOINTS)[number];
  progress: MotionValue<number>;
  rm: boolean;
}

function CheckpointAnnotation({ cp, progress, rm }: CPProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const activated = useRef(false);

  const opacity = useTransform(
    progress,
    [cp.activateAt - 0.02, cp.activateAt + 0.04],
    [0, 1],
    { clamp: true },
  );
  const y = useTransform(
    progress,
    [cp.activateAt - 0.02, cp.activateAt + 0.04],
    [14, 0],
    { clamp: true },
  );
  const scale = useTransform(
    progress,
    [cp.activateAt - 0.02, cp.activateAt + 0.04],
    [0.97, 1],
    { clamp: true },
  );

  useMotionValueEvent(progress, 'change', (v) => {
    if (v >= cp.activateAt && !activated.current) {
      activated.current = true;
      dotRef.current?.classList.add('bf-cp-activated');
    } else if (v < cp.activateAt - 0.04 && activated.current) {
      activated.current = false;
      dotRef.current?.classList.remove('bf-cp-activated');
    }
  });

  return (
    <motion.div
      className="bf-cp"
      style={{
        position: 'absolute',
        left: cp.left,
        top: cp.top,
        opacity: rm ? 1 : opacity,
        y: rm ? 0 : y,
        scale: rm ? 1 : scale,
        zIndex: 3,
        maxWidth: '210px',
      }}
    >
      {/* Row: dot + index */}
      <div className="bf-cp-header">
        <div ref={dotRef} className="bf-cp-dot" />
        <span className="bf-cp-index">{cp.id}</span>
      </div>

      <div className="bf-cp-title">{cp.title}</div>
      <div className="bf-cp-copy">{cp.copy}</div>
    </motion.div>
  );
}

// ─── Frame motif ──────────────────────────────────────────────────
// A small outlined browser frame — path enters from left, passes through,
// exits toward DESIGN. Positioned at FRAME checkpoint area.
// z-index: 2 → sits above SVG (z-1) → path appears "inside" the frame.

interface FrameMotifProps {
  pathProgress: MotionValue<number>;
  rm: boolean;
}

function FrameMotif({ pathProgress, rm }: FrameMotifProps) {
  const opacity = useTransform(
    pathProgress,
    [0.22, 0.32, 0.58, 0.68],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const scale = useTransform(pathProgress, [0.22, 0.52], [0.93, 1.0], { clamp: true });

  return (
    <motion.div
      className="bf-frame-motif"
      aria-hidden="true"
      style={{ opacity: rm ? 1 : opacity, scale: rm ? 1 : scale }}
    >
      {/* Browser chrome */}
      <div className="bf-fm-chrome">
        <span className="bf-fm-dot" style={{ background: '#FF5F57' }} />
        <span className="bf-fm-dot" style={{ background: '#FEBC2E' }} />
        <span className="bf-fm-dot" style={{ background: '#28C840' }} />
        <div className="bf-fm-url-bar" />
      </div>
      {/* Content skeleton */}
      <div className="bf-fm-body">
        <div className="bf-fm-line" style={{ width: '54%', height: '9px' }} />
        <div className="bf-fm-line" style={{ width: '78%', height: '6px', marginTop: '10px' }} />
        <div className="bf-fm-line" style={{ width: '66%', height: '6px', marginTop: '6px' }} />
        <div className="bf-fm-block" />
      </div>
    </motion.div>
  );
}

// ─── Main Journey section ─────────────────────────────────────────

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const rm = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Path draws 0→1 as scroll goes 0→0.9 (final 10% is breathing room)
  const pathLengthAnim = useTransform(scrollYProgress, [0, 0.9], [0, 1], { clamp: true });
  const pathLengthStatic = useMotionValue(1);
  const pathLength = rm ? pathLengthStatic : pathLengthAnim;

  // ── Typography opacity + Y transforms ─────────────────────────

  // FROM / ROUGH IDEA — appears at start, fades as SHARP EXPERIENCE enters
  const roughOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.50, 0.62],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const roughY = useTransform(scrollYProgress, [0, 0.08], [24, 0], { clamp: true });

  // SHARP / EXPERIENCE. — appears in the final third
  const sharpOpacity = useTransform(scrollYProgress, [0.52, 0.66], [0, 1], { clamp: true });
  const sharpY = useTransform(scrollYProgress, [0.52, 0.66], [20, 0], { clamp: true });
  const sharpScale = useTransform(scrollYProgress, [0.52, 0.66], [0.97, 1], { clamp: true });

  // THE RESULT? / final statement — arrives near end
  const finalOpacity = useTransform(scrollYProgress, [0.72, 0.84], [0, 1], { clamp: true });
  const finalY = useTransform(scrollYProgress, [0.72, 0.84], [16, 0], { clamp: true });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="bf-journey-section"
      aria-label="BoldFrame creative process"
    >
      <div className="bf-journey-sticky">

        {/* ── SVG Path — z-index 1 ─────────────────────────── */}
        <div className="bf-journey-svgwrap" aria-hidden="true">

          {/* Desktop path */}
          <svg
            className="bf-journey-svg bf-journey-desktop"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Subtle violet → slightly blue evolution at the very end */}
              <linearGradient
                id="bfJourneyGrad"
                gradientUnits="userSpaceOnUse"
                x1="120" y1="165"
                x2="355" y2="842"
              >
                <stop offset="0%"   stopColor="#7357FF" />
                <stop offset="74%"  stopColor="#7357FF" />
                <stop offset="100%" stopColor="#6B8AFF" stopOpacity="0.88" />
              </linearGradient>
            </defs>
            <motion.path
              d={DESKTOP_PATH}
              stroke="url(#bfJourneyGrad)"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength }}
            />
          </svg>

          {/* Mobile path */}
          <svg
            className="bf-journey-svg bf-journey-mobile"
            viewBox="0 0 390 760"
            preserveAspectRatio="xMidYMid slice"
          >
            <motion.path
              d={MOBILE_PATH}
              stroke="#7357FF"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* ── Frame motif — z-index 2 ──────────────────────── */}
        {/* Positioned near FRAME checkpoint: path enters, passes behind frame border, exits */}
        <FrameMotif pathProgress={scrollYProgress} rm={rm} />

        {/* ── Section metadata — always visible ────────────── */}
        <div className="bf-journey-meta" aria-hidden="true">
          <span className="bf-journey-meta-label">BFS / PROCESS</span>
          <span className="bf-journey-meta-range">01—05</span>
        </div>

        {/* ── FROM ROUGH IDEA — initial large typography ───── */}
        {/* z-index 2: path appears to go behind "ROUGH IDEA" letters */}
        <motion.div
          className="bf-journey-rough-block"
          style={{
            opacity: rm ? 1 : roughOpacity,
            y: rm ? 0 : roughY,
          }}
        >
          <div className="bf-journey-from">FROM</div>
          <div className="bf-journey-rough-idea">ROUGH IDEA</div>
        </motion.div>

        {/* ── SHARP EXPERIENCE — resolves as journey progresses */}
        {/* Spatial: SHARP appears right-heavy, EXPERIENCE. left-heavy → 
            "messy → resolved" composition */}
        <motion.div
          className="bf-journey-sharp-block"
          style={{
            opacity: rm ? 1 : sharpOpacity,
            y: rm ? 0 : sharpY,
            scale: rm ? 1 : sharpScale,
          }}
        >
          <div className="bf-journey-sharp-label">SHARP</div>
          <div className="bf-journey-experience">EXPERIENCE.</div>
        </motion.div>

        {/* ── THE RESULT? / Final statement ────────────────── */}
        <motion.div
          className="bf-journey-final-block"
          style={{
            opacity: rm ? 1 : finalOpacity,
            y: rm ? 0 : finalY,
          }}
        >
          <div className="bf-journey-result-label">THE RESULT?</div>
          <div className="bf-journey-final-text">
            <span className="bf-jf-line-a">A WEBSITE THAT</span>
            <span className="bf-jf-line-b">DOESN'T FEEL</span>
            <span className="bf-jf-line-c">INTERCHANGEABLE.</span>
          </div>
        </motion.div>

        {/* ── Five checkpoint annotations ───────────────────── */}
        {CHECKPOINTS.map((cp) => (
          <CheckpointAnnotation
            key={cp.id}
            cp={cp}
            progress={scrollYProgress}
            rm={rm}
          />
        ))}
      </div>
    </section>
  );
}
