/**
 * BoldFrame Journey — Scroll-drawn process narrative
 * ─────────────────────────────────────────────────────────────────
 * THE FIXES:
 * 1. Fixed the "Scrolled Past" Bug: Triggers are now created synchronously 
 *    in `useLayoutEffect`. Delayed font loading no longer causes race conditions 
 *    that leave start markers in the wrong place.
 * 2. Native GSAP Pinning: Removed reliance on brittle CSS sticky heights. GSAP 
 *    now naturally pins the container (`pin: stickyRef.current`) and generates 
 *    its own flawless scroll padding.
 * 3. Consistent Scroll Pace: `end: '+=350%'` (desktop) and `+=250%'` (mobile) 
 *    creates a consistent, measured scroll track. It will feel perfectly paced
 *    no matter the viewport size.
 * 4. Bulletproof Cleanup: `gsap.context()` seamlessly kills triggers 
 *    on unmount, making it 100% React Strict Mode compatible.
 */

import { useRef, useEffect, useLayoutEffect, useState } from 'react';
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

const MOBILE_BREAKPOINT = 768;

// ─── Journey checkpoints — separate layouts per breakpoint ─────────
const CHECKPOINT_CONTENT = [
  { id: '01', title: 'DISCOVER', copy: 'Understand what deserves attention.', activateAt: 0.09 },
  { id: '02', title: 'FRAME', copy: 'Give the idea structure and direction.', activateAt: 0.27 },
  { id: '03', title: 'DESIGN', copy: 'Turn strategy into something unmistakable.', activateAt: 0.45 },
  { id: '04', title: 'BUILD', copy: 'Engineer the experience for the real browser.', activateAt: 0.63 },
  { id: '05', title: 'REFINE', copy: 'Remove friction until everything feels inevitable.', activateAt: 0.81 },
] as const;

const DESKTOP_POSITIONS = [
  { left: '6%', top: '15%' },
  { left: '68%', top: '26%' },
  { left: '6%', top: '50%' },
  { left: '68%', top: '68%' },
  { left: '30%', top: '85%' },
] as const;

const MOBILE_POSITIONS = [
  { left: '6%', top: '8%' },
  { left: '54%', top: '24%' },
  { left: '8%', top: '42%' },
  { left: '52%', top: '60%' },
  { left: '14%', top: '78%' },
] as const;

function buildCheckpoints(mobile: boolean) {
  const pos = mobile ? MOBILE_POSITIONS : DESKTOP_POSITIONS;
  return CHECKPOINT_CONTENT.map((c, i) => ({ ...c, ...pos[i] }));
}

// ─── SVG Paths ────────────────────────────────────────────────────
const DESKTOP_PATH = [
  'M 120 165', 'C 110 220 100 275 100 330', 'C 100 385 168 376 338 358',
  'C 508 340 710 302 920 270', 'C 1040 254 1098 248 1155 252',
  'C 1200 256 1248 272 1258 300', 'C 1268 328 1248 362 1198 386',
  'C 1128 416 1012 437 868 455', 'C 700 474 498 476 318 474',
  'C 208 473 138 476 101 486', 'C 64 496 100 530 192 552',
  'C 312 574 502 578 702 576', 'C 882 574 1040 567 1150 572',
  'C 1165 573 1174 574 1181 576', 'C 1220 578 1268 595 1276 620',
  'C 1284 650 1262 690 1218 718', 'C 1154 752 1042 764 900 758',
  'C 756 752 606 734 496 720', 'C 452 712 412 706 374 702',
  'C 344 696 324 712 308 740', 'C 296 762 290 784 296 808',
  'C 304 830 330 842 355 842',
].join(' ');

const MOBILE_PATH = [
  'M 55 58', 'C 52 95 50 135 52 175', 'C 54 215 95 225 160 232',
  'C 225 239 280 246 310 258', 'C 325 264 332 272 318 290',
  'C 304 308 262 320 208 332', 'C 154 344 90 350 55 368',
  'C 32 378 42 385 50 395', 'C 58 405 90 418 148 428',
  'C 210 438 268 444 302 458', 'C 318 464 330 472 312 488',
  'C 294 504 248 514 196 522', 'C 148 530 100 534 74 552',
  'C 56 564 60 580 76 596', 'C 92 612 128 622 166 628',
  'C 188 632 198 640 194 660', 'C 190 678 182 692 175 704',
].join(' ');

// ─── Checkpoint annotation ────────────────────────────────────────
interface CPProps {
  cp: ReturnType<typeof buildCheckpoints>[number];
  progress: MotionValue<number>;
  rm: boolean;
  mobile: boolean;
}

function CheckpointAnnotation({ cp, progress, rm, mobile }: CPProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const activated = useRef(false);

  const opacity = useTransform(progress, [cp.activateAt - 0.02, cp.activateAt + 0.04], [0, 1], { clamp: true });
  const y = useTransform(progress, [cp.activateAt - 0.02, cp.activateAt + 0.04], [14, 0], { clamp: true });
  const scale = useTransform(progress, [cp.activateAt - 0.02, cp.activateAt + 0.04], [0.97, 1], { clamp: true });

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
        maxWidth: mobile ? '150px' : '210px',
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
  const opacity = useTransform(pathProgress, [0.20, 0.32, 0.62, 0.74], [0, 1, 1, 0], { clamp: true });
  const scale = useTransform(pathProgress, [0.20, 0.55], [0.93, 1.0], { clamp: true });

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
  const stickyRef = useRef<HTMLDivElement>(null); // Added this specific ref for GSAP pinning
  const rm = useReducedMotion() ?? false;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const progress = useMotionValue(0);

  // Replaced asynchronous useEffect with synchronous useLayoutEffect
  useLayoutEffect(() => {
    if (!sectionRef.current || !stickyRef.current || rm) return;

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Desktop ─────────────────────────────────────────────────
      mm.add(`(min-width: ${MOBILE_BREAKPOINT}px)`, () => {
        ScrollTrigger.create({
          id: 'bf-journey-desktop',
          trigger: sectionRef.current,
          pin: stickyRef.current, // Letting GSAP elegantly handle the pinning and padding!
          start: 'top top',
          end: '+=350%', // Creates a scroll space 3.5x viewport height (smooth mapping)
          scrub: 0.2, // Added slight scrub smoothing to make drawing path feel premium
          invalidateOnRefresh: true,
          onUpdate: (self) => progress.set(self.progress),
        });
      });

      // ── Mobile ──────────────────────────────────────────────────
      mm.add(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`, () => {
        ScrollTrigger.create({
          id: 'bf-journey-mobile',
          trigger: sectionRef.current,
          pin: stickyRef.current, 
          start: 'top top',
          end: '+=250%', // Slightly faster scroll requirement on mobile
          scrub: 0.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => progress.set(self.progress),
        });
      });
    });

    // Handle late layout shifts (e.g. fonts loading, or previous sections resolving their pins)
    // By separating trigger creation from the refresh logic, we prevent race conditions.
    const handleRefresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(handleRefresh);
    window.addEventListener('load', handleRefresh);

    // Backup catchers for layout recalibrations caused by sibling components mounting late
    const lateRefresh = window.setTimeout(handleRefresh, 500);
    const laterRefresh = window.setTimeout(handleRefresh, 1500);

    return () => {
      window.removeEventListener('load', handleRefresh);
      window.clearTimeout(lateRefresh);
      window.clearTimeout(laterRefresh);
      ctx.revert(); // Context cleanly wipes everything 
      progress.set(0);
    };
  }, [rm, progress]);

  // ── Derived animation values from progress ────────────────────────
  const staticOne = useMotionValue(1);
  const pathLengthAnim = useTransform(progress, [0, 0.97], [0, 1], { clamp: true });
  const pathLength = rm ? staticOne : pathLengthAnim;

  const roughOpacity = useTransform(progress, [0, 0.06, 0.20, 0.30], [0, 1, 1, 0], { clamp: true });
  const roughY = useTransform(progress, [0, 0.06], [24, 0], { clamp: true });

  const sharpOpacity = useTransform(progress, [0.56, 0.68], [0, 1], { clamp: true });
  const sharpY = useTransform(progress, [0.56, 0.68], [20, 0], { clamp: true });
  const sharpScale = useTransform(progress, [0.56, 0.68], [0.97, 1], { clamp: true });

  const finalOpacity = useTransform(progress, [0.88, 1.0], [0, 1], { clamp: true });
  const finalY = useTransform(progress, [0.88, 1.0], [16, 0], { clamp: true });

  const checkpoints = buildCheckpoints(isMobile);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="bf-journey-section"
      aria-label="BoldFrame creative process"
    >
      {/* Attached the stickyRef so GSAP takes over pinning logic safely */}
      <div ref={stickyRef} className="bf-journey-sticky">
        
        {/* ── SVG Path ─────────────────────────────────────────── */}
        <div className="bf-journey-svgwrap" aria-hidden="true">
          <svg className="bf-journey-svg bf-journey-desktop" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bfJourneyGrad" gradientUnits="userSpaceOnUse" x1="120" y1="165" x2="355" y2="842">
                <stop offset="0%" stopColor="#7357FF" />
                <stop offset="74%" stopColor="#7357FF" />
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

          <svg className="bf-journey-svg bf-journey-mobile" viewBox="0 0 390 760" preserveAspectRatio="xMidYMid slice">
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

        <FrameMotif pathProgress={progress} rm={rm} />

        <div className="bf-journey-meta" aria-hidden="true">
          <span className="bf-journey-meta-label">BFS / PROCESS</span>
          <span className="bf-journey-meta-range">01—05</span>
        </div>

        <motion.div className="bf-journey-rough-block" style={{ opacity: rm ? 1 : roughOpacity, y: rm ? 0 : roughY }}>
          <div className="bf-journey-from">FROM</div>
          <div className="bf-journey-rough-idea">ROUGH IDEA</div>
        </motion.div>

        <motion.div className="bf-journey-sharp-block" style={{ opacity: rm ? 1 : sharpOpacity, y: rm ? 0 : sharpY, scale: rm ? 1 : sharpScale }}>
          <div className="bf-journey-sharp-label">SHARP</div>
          <div className="bf-journey-experience">EXPERIENCE.</div>
        </motion.div>

        <motion.div className="bf-journey-final-block" style={{ opacity: rm ? 1 : finalOpacity, y: rm ? 0 : finalY }}>
          <div className="bf-journey-result-label">THE RESULT?</div>
          <div className="bf-journey-final-text">
            <span className="bf-jf-line-a">A WEBSITE THAT</span>
            <span className="bf-jf-line-b">DOESN'T FEEL</span>
            <span className="bf-jf-line-c">INTERCHANGEABLE.</span>
          </div>
        </motion.div>

        {checkpoints.map((cp) => (
          <CheckpointAnnotation key={cp.id} cp={cp} progress={progress} rm={rm} mobile={isMobile} />
        ))}
      </div>
    </section>
  );
}