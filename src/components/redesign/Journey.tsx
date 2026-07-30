/**
 * BoldFrame Journey — Scroll-drawn process narrative
 *
 * Scroll tracking: GSAP ScrollTrigger drives a useMotionValue(progress).
 * This is intentional — Framer Motion useScroll({ target }) measures
 * element offsets at React render time, before GSAP pin-spacers from
 * other sections (Manifesto, FeaturedWork) are inserted into the DOM.
 * That causes the trigger to fire at the wrong scroll position.
 * GSAP ScrollTrigger always reads live layout, so it is the correct
 * tool for scroll tracking in this project.
 *
 * Framer Motion is still used for all actual animation (useTransform,
 * useMotionValue, motion components) — the progress value is simply
 * fed in from GSAP rather than from useScroll.
 *
 * Desktop section height: 300vh  → trigger end: '+=300vh' (bottom top)
 * Mobile  section height: 200vh  → trigger end: '+=200vh' (bottom top)
 * Both use start: 'top top' — animation begins the moment the section
 * enters the viewport, not some indeterminate time later.
 */

import { useRef, useEffect } from 'react';
import {
  motion,
  useTransform,
  useMotionValue,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const DESKTOP_PATH = [
  'M 120 165',
  'C 110 220 100 275 100 330',
  'C 100 385 168 376 338 358',
  'C 508 340 710 302 920 270',
  'C 1040 254 1098 248 1155 252',
  'C 1200 256 1248 272 1258 300',
  'C 1268 328 1248 362 1198 386',
  'C 1128 416 1012 437 868 455',
  'C 700 474 498 476 318 474',
  'C 208 473 138 476 101 486',
  'C 64 496 100 530 192 552',
  'C 312 574 502 578 702 576',
  'C 882 574 1040 567 1150 572',
  'C 1165 573 1174 574 1181 576',
  'C 1220 578 1268 595 1276 620',
  'C 1284 650 1262 690 1218 718',
  'C 1154 752 1042 764 900 758',
  'C 756 752 606 734 496 720',
  'C 452 712 412 706 374 702',
  'C 344 696 324 712 308 740',
  'C 296 762 290 784 296 808',
  'C 304 830 330 842 355 842',
].join(' ');

const MOBILE_PATH = [
  'M 55 58',
  'C 52 95 50 135 52 175',
  'C 54 215 95 225 160 232',
  'C 225 239 280 246 310 258',
  'C 325 264 332 272 318 290',
  'C 304 308 262 320 208 332',
  'C 154 344 90 350 55 368',
  'C 32 378 42 385 50 395',
  'C 58 405 90 418 148 428',
  'C 210 438 268 444 302 458',
  'C 318 464 330 472 312 488',
  'C 294 504 248 514 196 522',
  'C 148 530 100 534 74 552',
  'C 56 564 60 580 76 596',
  'C 92 612 128 622 166 628',
  'C 188 632 198 640 194 660',
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
      <div className="bf-fm-chrome">
        <span className="bf-fm-dot" style={{ background: '#FF5F57' }} />
        <span className="bf-fm-dot" style={{ background: '#FEBC2E' }} />
        <span className="bf-fm-dot" style={{ background: '#28C840' }} />
        <div className="bf-fm-url-bar" />
      </div>
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

  // ── GSAP drives the scroll progress value ────────────────────────
  // useMotionValue is the bridge: GSAP writes to it via onUpdate,
  // Framer Motion reads from it via useTransform.
  const progress = useMotionValue(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || rm) return;

    let ctx: gsap.Context | null = null;

    function buildTrigger() {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // ── Desktop: section is 300vh ──────────────────────────────
        // start: 'top top'    → triggers when section top = viewport top
        // end:   '+=300vh'    → triggers when 300vh of scroll have passed
        //                       (i.e. section has fully traversed the viewport)
        // This is equivalent to GSAP's 'bottom top' for a 300vh section,
        // but explicit px/vh avoids any ambiguity with pinned neighbour spacers.
        mm.add('(min-width: 768px)', () => {
          ScrollTrigger.create({
            id: 'bf-journey-desktop',
            trigger: section,
            start: 'top top',
            end: '+=300vh',
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              progress.set(self.progress);
            },
          });
        });

        // ── Mobile: section is 200vh ───────────────────────────────
        // Same logic, shorter scroll range matching reduced section height.
        mm.add('(max-width: 767px)', () => {
          ScrollTrigger.create({
            id: 'bf-journey-mobile',
            trigger: section,
            start: 'top top',
            end: '+=200vh',
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              progress.set(self.progress);
            },
          });
        });
      }, section);
    }

    // Wait for fonts so layout is stable before measuring the section offset.
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        buildTrigger();
        // Let GSAP recalculate after any pin-spacers from other sections settle.
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    });

    // Rebuild on resize (section height can change, position can shift).
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(buildTrigger);
    });
    ro.observe(section);

    return () => {
      ro.disconnect();
      ctx?.revert();
      ScrollTrigger.getAll()
        .filter(t => ['bf-journey-desktop', 'bf-journey-mobile'].includes(t.vars?.id ?? ''))
        .forEach(t => t.kill());
      progress.set(0);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rm]);

  // ── Derived animation values from progress ────────────────────────
  // Always call hooks unconditionally; select between animated and
  // static variants afterwards (Rules of Hooks compliance).
  const staticOne      = useMotionValue(1);
  const pathLengthAnim = useTransform(progress, [0, 0.88], [0, 1], { clamp: true });
  const pathLength     = rm ? staticOne : pathLengthAnim;

  // FROM ROUGH IDEA — enters early, fades mid-journey
  const roughOpacity = useTransform(
    progress,
    [0, 0.07, 0.48, 0.60],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const roughY = useTransform(progress, [0, 0.07], [24, 0], { clamp: true });

  // SHARP EXPERIENCE — resolves in final third
  const sharpOpacity = useTransform(progress, [0.50, 0.63], [0, 1], { clamp: true });
  const sharpY      = useTransform(progress, [0.50, 0.63], [20, 0], { clamp: true });
  const sharpScale  = useTransform(progress, [0.50, 0.63], [0.97, 1], { clamp: true });

  // THE RESULT? — arrives near the end
  const finalOpacity = useTransform(progress, [0.70, 0.82], [0, 1], { clamp: true });
  const finalY       = useTransform(progress, [0.70, 0.82], [16, 0], { clamp: true });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="bf-journey-section"
      aria-label="BoldFrame creative process"
    >
      <div className="bf-journey-sticky">

        {/* ── SVG Path ─────────────────────────────────────────── */}
        <div className="bf-journey-svgwrap" aria-hidden="true">

          <svg
            className="bf-journey-svg bf-journey-desktop"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
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
              style={{ pathLength: rm ? staticOne : pathLength }}
            />
          </svg>

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
              style={{ pathLength: rm ? staticOne : pathLength }}
            />
          </svg>
        </div>

        {/* ── Frame motif ─────────────────────────────────────── */}
        <FrameMotif pathProgress={progress} rm={rm} />

        {/* ── Section metadata ────────────────────────────────── */}
        <div className="bf-journey-meta" aria-hidden="true">
          <span className="bf-journey-meta-label">BFS / PROCESS</span>
          <span className="bf-journey-meta-range">01—05</span>
        </div>

        {/* ── FROM ROUGH IDEA ─────────────────────────────────── */}
        <motion.div
          className="bf-journey-rough-block"
          style={{
            opacity: rm ? 1 : roughOpacity,
            y:       rm ? 0 : roughY,
          }}
        >
          <div className="bf-journey-from">FROM</div>
          <div className="bf-journey-rough-idea">ROUGH IDEA</div>
        </motion.div>

        {/* ── SHARP EXPERIENCE ────────────────────────────────── */}
        <motion.div
          className="bf-journey-sharp-block"
          style={{
            opacity: rm ? 1 : sharpOpacity,
            y:       rm ? 0 : sharpY,
            scale:   rm ? 1 : sharpScale,
          }}
        >
          <div className="bf-journey-sharp-label">SHARP</div>
          <div className="bf-journey-experience">EXPERIENCE.</div>
        </motion.div>

        {/* ── THE RESULT? ─────────────────────────────────────── */}
        <motion.div
          className="bf-journey-final-block"
          style={{
            opacity: rm ? 1 : finalOpacity,
            y:       rm ? 0 : finalY,
          }}
        >
          <div className="bf-journey-result-label">THE RESULT?</div>
          <div className="bf-journey-final-text">
            <span className="bf-jf-line-a">A WEBSITE THAT</span>
            <span className="bf-jf-line-b">DOESN'T FEEL</span>
            <span className="bf-jf-line-c">INTERCHANGEABLE.</span>
          </div>
        </motion.div>

        {/* ── Five checkpoint annotations ─────────────────────── */}
        {CHECKPOINTS.map((cp) => (
          <CheckpointAnnotation
            key={cp.id}
            cp={cp}
            progress={progress}
            rm={rm}
          />
        ))}
      </div>
    </section>
  );
}
