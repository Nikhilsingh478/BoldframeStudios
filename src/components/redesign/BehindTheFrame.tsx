/**
 * BehindTheFrame — GSAP sticky card stack (Master Part 2, Chunk 3/4)
 *
 * Reveals the five layers behind a finished web experience:
 * DIRECTION → INTERFACE → MOTION → ENGINEERING → FINAL FRAME
 *
 * Structure:
 *   A) Intro  — ~35vh breathing room + conceptual headline (not pinned)
 *   B) Stack  — GSAP-pinned 100vh with 5 stacking cards
 *   C) Outro  — quiet post-stack closing statement (§18)
 *
 * Stacking choreography (spec §11–§12):
 *   Cards enter from y=100% → 0%.
 *   Previous cards: scale down + rotate per-card pattern + opacity mute.
 *   Depth: immediate-prev=0.92, two-behind=0.88, deeper=0.85.
 *   Rotation pattern: -2 / +2.5 / -1.5 / +2 / 0 deg (final=0 is resolution).
 *
 * Exit animation (spec §17): as card 5 arrives, ambient surroundings simplify —
 *   stack background fades, counter dims, layers recede behind the finished object.
 *
 * Internal motion (spec §13): one element per card responds to its arrival phase.
 * Counter (spec §16): "01 — 05" updated via direct DOM, no React rerenders.
 * Mobile (spec §19): CSS-only vertical overlap stack, GSAP bails early.
 * Reduced motion (spec §20): static vertical sequence via CSS.
 *
 * Init: useLayoutEffect → fonts.ready → rAF → buildStack → rAF → ST.refresh()
 * Single ResizeObserver on stack section, debounced 160ms.
 * Only kills 'bf-stack' trigger — never ST.getAll().kill().
 */

import { useRef, useLayoutEffect } from 'react';
import { useReducedMotion, motion, useInView } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Card data ────────────────────────────────────────────────────────────────

const CARD_DATA = [
  {
    id:       'direction',
    index:    '01',
    label:    '01 / BEFORE PIXELS',
    title:    'DIRECTION',
    thought:  'Decide what deserves attention before deciding how it looks.',
    rotation: -2,
    bg:       'var(--bf-bg-primary)',
  },
  {
    id:       'interface',
    index:    '02',
    label:    '02 / STRUCTURE BECOMES VISIBLE',
    title:    'INTERFACE',
    thought:  'Turn hierarchy into a visual system people understand without thinking.',
    rotation:  2.5,
    bg:       'var(--bf-bg-secondary)',
  },
  {
    id:       'motion-card',
    index:    '03',
    label:    '03 / MOVEMENT WITH A JOB',
    title:    'MOTION',
    thought:  'Motion should explain, guide or respond\u2014never exist just because it can.',
    rotation: -1.5,
    bg:       'var(--bf-bg-base)',
  },
  {
    id:       'engineering',
    index:    '04',
    label:    '04 / THE INVISIBLE LAYER',
    title:    'ENGINEERING',
    thought:  'Responsive behavior and performance belong in the build, not the cleanup.',
    rotation:  2,
    bg:       'var(--bf-bg-inset)',
  },
  {
    id:       'final-frame',
    index:    '05',
    label:    '05 / EVERYTHING WORKING TOGETHER',
    title:    'FINAL\nFRAME.',
    thought:  'The best result feels simple because the complexity has already been handled.',
    rotation:  0,   // ← meaningful: final card arrives perfectly aligned
    bg:       'var(--bf-bg-primary)',
  },
] as const;

type CardDatum = (typeof CARD_DATA)[number];
const TOTAL_CARDS = CARD_DATA.length;   // 5
const TRANSITIONS  = TOTAL_CARDS - 1;  // 4

type InnerRef = (el: HTMLElement | null) => void;

// ─── Card 01 Visual — DIRECTION ───────────────────────────────────────────────
// Abstract word scatter + grid coordinates + focal highlight + competing paths.
// Inner ref: the entire scatter container (subtle y-settle on arrival).

function VisualDirection({ onInner }: { onInner: InnerRef }) {
  return (
    <div className="bf-vis-direction" ref={el => onInner(el)} aria-hidden="true">

      {/* Grid coordinate ticks */}
      <span className="bf-dir-coord bf-dir-coord-1">A2</span>
      <span className="bf-dir-coord bf-dir-coord-2">B4</span>
      <span className="bf-dir-coord bf-dir-coord-3">C1</span>
      <span className="bf-dir-coord bf-dir-coord-4">D3</span>

      {/* Scattered concept words — ambiguity before direction */}
      <span className="bf-dir-word bf-dir-word-1">HIERARCHY</span>
      <span className="bf-dir-word bf-dir-word-2">CLARITY</span>
      <span className="bf-dir-word bf-dir-word-3">FOCUS</span>
      <span className="bf-dir-word bf-dir-word-4">RHYTHM</span>
      <span className="bf-dir-word bf-dir-word-5">USER</span>
      <span className="bf-dir-word bf-dir-word-6">VOICE</span>

      {/* Focal highlight — the chosen priority */}
      <div className="bf-dir-focal" />

      {/* Competing path options */}
      <svg className="bf-dir-paths" viewBox="0 0 500 280" fill="none" preserveAspectRatio="none">
        {/* Path A — direct, chosen */}
        <path
          d="M 55 230 Q 150 110 275 95 Q 360 82 455 45"
          stroke="rgba(115,87,255,0.42)"
          strokeWidth="1.5"
          strokeDasharray="5 7"
        />
        {/* Path B — wandering, uncertain */}
        <path
          d="M 55 230 Q 95 195 165 200 Q 235 205 300 158 Q 375 112 455 45"
          stroke="rgba(243,242,238,0.10)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        {/* Convergence */}
        <circle cx="455" cy="45" r="3.5" fill="rgba(115,87,255,0.65)" />
      </svg>
    </div>
  );
}

// ─── Card 02 Visual — INTERFACE ───────────────────────────────────────────────
// Wireframe layout structure. Inner ref: grid-lines overlay (opacity reveal).

function VisualInterface({ onInner }: { onInner: InnerRef }) {
  return (
    <div className="bf-vis-interface" aria-hidden="true">
      {/* Layout wireframe */}
      <div className="bf-iface-layout">
        <div className="bf-iface-header">
          <span className="bf-iface-label">HEADER</span>
          <div className="bf-iface-nav">
            <div className="bf-iface-nav-item"><span>NAV</span></div>
            <div className="bf-iface-nav-item"><span>NAV</span></div>
            <div className="bf-iface-nav-item"><span>NAV</span></div>
            <div className="bf-iface-nav-cta"><span>CTA</span></div>
          </div>
        </div>

        <div className="bf-iface-hero-region">
          <div className="bf-iface-hero-text">
            <div className="bf-iface-txtblock bf-iface-txtblock--h" />
            <div className="bf-iface-txtblock bf-iface-txtblock--sub" />
            <div className="bf-iface-txtblock bf-iface-txtblock--sub" style={{ width: '45%', marginTop: '0.35rem' }} />
          </div>
          <div className="bf-iface-hero-img" />
        </div>

        <div className="bf-iface-content-row">
          <div className="bf-iface-col-main">
            <div className="bf-iface-txtblock" />
            <div className="bf-iface-txtblock bf-iface-txtblock--sm" />
            <div className="bf-iface-txtblock bf-iface-txtblock--sm" style={{ width: '65%' }} />
            <div className="bf-iface-module" />
          </div>
          <div className="bf-iface-col-side">
            <span className="bf-iface-label">ASIDE</span>
            <div className="bf-iface-img-region" />
            <div className="bf-iface-txtblock bf-iface-txtblock--xs" />
            <div className="bf-iface-txtblock bf-iface-txtblock--xs" style={{ width: '50%' }} />
          </div>
        </div>
      </div>

      {/* Grid lines overlay — the animated element (opacity reveals as card arrives) */}
      <div ref={el => onInner(el)} className="bf-iface-gridlines" />
    </div>
  );
}

// ─── Card 03 Visual — MOTION ──────────────────────────────────────────────────
// Three framed states connected by a trajectory.
// Inner ref: the moving dot (x-travel along trajectory).

function VisualMotion({ onInner }: { onInner: InnerRef }) {
  return (
    <div className="bf-vis-motion" aria-hidden="true">
      <div className="bf-motion-track">
        {(['ENTER', 'TRANSFORM', 'RESOLVE'] as const).map((label, i) => (
          <div key={label} className="bf-motion-frame">
            <span className="bf-motion-frame-num">FRAME 0{i + 1}</span>
            <div className="bf-motion-frame-box">
              <div className={`bf-motion-state bf-motion-state--${i + 1}`} />
            </div>
            <span className="bf-motion-frame-label">{label}</span>
          </div>
        ))}

        {/* Connecting trajectory line */}
        <svg className="bf-motion-line-svg" viewBox="0 0 100 2" preserveAspectRatio="none">
          <line x1="0" y1="1" x2="100" y2="1"
            stroke="rgba(115,87,255,0.20)" strokeWidth="1" strokeDasharray="4 5" />
        </svg>

        {/* Moving dot — GSAP moves this along the trajectory */}
        <div ref={el => onInner(el)} className="bf-motion-dot" />
      </div>
    </div>
  );
}

// ─── Card 04 Visual — ENGINEERING ────────────────────────────────────────────
// Architectural blueprint: three device viewport outlines.
// Inner ref: viewport container (scale settle on arrival).

function VisualEngineering({ onInner }: { onInner: InnerRef }) {
  return (
    <div className="bf-vis-engineering" aria-hidden="true">
      <div className="bf-eng-container" ref={el => onInner(el)}>
        <div className="bf-eng-vp bf-eng-vp--desktop">
          <span className="bf-eng-vp-label">DESKTOP</span>
          <div className="bf-eng-vp-screen">
            <div className="bf-eng-vp-chrome" />
            <div className="bf-eng-vp-body">
              <div className="bf-eng-row bf-eng-row--full" />
              <div className="bf-eng-row bf-eng-row--cols">
                <div className="bf-eng-cell bf-eng-cell--wide" />
                <div className="bf-eng-cell bf-eng-cell--narrow" />
              </div>
              <div className="bf-eng-row bf-eng-row--sm" />
              <div className="bf-eng-row bf-eng-row--sm" style={{ width: '60%' }} />
            </div>
          </div>
        </div>

        <div className="bf-eng-vp bf-eng-vp--tablet">
          <span className="bf-eng-vp-label">TABLET</span>
          <div className="bf-eng-vp-screen">
            <div className="bf-eng-vp-chrome" />
            <div className="bf-eng-vp-body">
              <div className="bf-eng-row bf-eng-row--full" />
              <div className="bf-eng-row bf-eng-row--full" />
              <div className="bf-eng-row bf-eng-row--sm" />
            </div>
          </div>
        </div>

        <div className="bf-eng-vp bf-eng-vp--mobile">
          <span className="bf-eng-vp-label">MOBILE</span>
          <div className="bf-eng-vp-screen">
            <div className="bf-eng-vp-chrome" />
            <div className="bf-eng-vp-body">
              <div className="bf-eng-row bf-eng-row--full" />
              <div className="bf-eng-row bf-eng-row--full" />
              <div className="bf-eng-row bf-eng-row--sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Layer classification labels */}
      <div className="bf-eng-layers">
        {[
          { color: 'rgba(115,87,255,0.80)', name: 'LAYOUT' },
          { color: 'rgba(85,221,245,0.60)',  name: 'MOTION' },
          { color: 'rgba(243,242,238,0.35)', name: 'PERFORMANCE' },
        ].map(({ color, name }) => (
          <div key={name} className="bf-eng-layer">
            <span className="bf-eng-layer-dot" style={{ background: color }} />
            <span className="bf-eng-layer-name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 05 Visual — FINAL FRAME ────────────────────────────────────────────
// Real Huuman project in a browser chrome. The settled, resolved state.
// Inner ref: project image (scale 1.025 → 1.0 as it arrives).

function VisualFinalFrame({ onInner }: { onInner: InnerRef }) {
  return (
    <div className="bf-vis-finalframe" aria-hidden="true">
      <div className="bf-ff-browser">
        <div className="bf-ff-chrome">
          <span className="bf-ff-dot" style={{ background: '#FF5F57' }} />
          <span className="bf-ff-dot" style={{ background: '#FEBC2E' }} />
          <span className="bf-ff-dot" style={{ background: '#28C840' }} />
          <div className="bf-ff-urlbar">boldframestudios.in/huuman</div>
        </div>
        <div className="bf-ff-viewport">
          <img
            ref={el => onInner(el as HTMLElement | null)}
            src="/p1.webp"
            alt="Huuman — digital experience by BoldFrame"
            className="bf-ff-img"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────

interface BehindCardProps {
  card:    CardDatum;
  zIndex:  number;
  cardRef: (el: HTMLDivElement | null) => void;
  onInner: InnerRef;
}

function BehindCard({ card, zIndex, cardRef, onInner }: BehindCardProps) {
  const { id, label, title, thought, bg } = card;

  return (
    <div
      ref={cardRef}
      className={`bf-btf-card bf-btf-card--${id}`}
      style={{ background: bg, zIndex }}
      aria-label={`Layer ${card.index}: ${title.replace('\n', ' ')}`}
    >
      {/* Visual composition — behind all text */}
      <div className="bf-btf-card-visual">
        {id === 'direction'   && <VisualDirection   onInner={onInner} />}
        {id === 'interface'   && <VisualInterface   onInner={onInner} />}
        {id === 'motion-card' && <VisualMotion      onInner={onInner} />}
        {id === 'engineering' && <VisualEngineering onInner={onInner} />}
        {id === 'final-frame' && <VisualFinalFrame  onInner={onInner} />}
      </div>

      {/* Upper-left: micro label */}
      <div className="bf-btf-card-micro" aria-hidden="true">
        <span className="bf-micro">{label}</span>
      </div>

      {/* Upper-right: supporting thought */}
      <div className="bf-btf-card-thought">
        <p>{thought}</p>
      </div>

      {/* Lower-left: large editorial title */}
      <div className="bf-btf-card-title">
        {title.split('\n').map((line, i) => (
          <span key={i} className="bf-btf-card-title-line">{line}</span>
        ))}
      </div>

      {/* Inset border for depth perception (spec §15) */}
      <div className="bf-btf-card-border" aria-hidden="true" />
    </div>
  );
}

// ─── Intro section (§02) ─────────────────────────────────────────────────────
// ~35vh breathing room between the horizontal gallery and the card stack.

function BehindIntro() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const ease   = [0.22, 1, 0.36, 1] as const;

  return (
    <div ref={ref} className="bf-btf-intro">

      {/* Section metadata */}
      <motion.div
        className="bf-btf-intro-meta"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
      >
        <span className="bf-micro">03 / BEHIND THE FRAME</span>
      </motion.div>

      {/* First statement — large, asymmetric */}
      <motion.div
        className="bf-btf-intro-headline"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease, delay: 0.10 }}
      >
        <span className="bf-btf-intro-line-a">WHAT YOU SEE</span>
        <span className="bf-btf-intro-line-b">IS THE FINAL FRAME.</span>
      </motion.div>

      {/* Second statement — appears slightly after, approaches the stack */}
      <motion.div
        className="bf-btf-intro-sub"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.32 }}
      >
        <span className="bf-btf-intro-sub-a">WHAT MAKES IT WORK</span>
        <span className="bf-btf-intro-sub-b">LIVES BEHIND IT.</span>
      </motion.div>

    </div>
  );
}

// ─── Outro section (§18) ─────────────────────────────────────────────────────
// Quiet closing statement after pin releases. Closes the "Behind the Frame" idea.

function BehindOutro() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const ease   = [0.22, 1, 0.36, 1] as const;

  return (
    <div ref={ref} className="bf-btf-outro" aria-label="Behind the Frame closing">

      <motion.div
        className="bf-btf-outro-block"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
      >
        <span className="bf-btf-outro-line">THE COMPLEXITY</span>
        <span className="bf-btf-outro-line">STAYS WITH US.</span>
      </motion.div>

      <motion.div
        className="bf-btf-outro-block bf-btf-outro-block--muted"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.28 }}
      >
        <span className="bf-btf-outro-line">THE CLARITY</span>
        <span className="bf-btf-outro-line">STAYS WITH YOU.</span>
      </motion.div>

    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function BehindTheFrame() {
  const stackSectionRef = useRef<HTMLDivElement>(null);
  const stickyRef       = useRef<HTMLDivElement>(null);
  const counterRef      = useRef<HTMLDivElement>(null);

  // Per-card DOM refs
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLElement   | null)[]>([]);

  const rm = useReducedMotion() ?? false;

  useLayoutEffect(() => {
    const stackSection = stackSectionRef.current;
    const sticky       = stickyRef.current;
    if (!stackSection || !sticky || rm) return;

    let ctx: gsap.Context | null = null;
    let resizeTimer = 0;

    function buildStack() {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const vw       = window.innerWidth;
        const vh       = window.innerHeight;
        const isMobile = vw < 768;

        // On mobile: bail — CSS handles the vertical overlap layout
        if (isMobile) {
          stackSection.style.height = '';
          return;
        }

        // Scroll per card — one viewport-height each, capped for very tall viewports (§11)
        const scrollPerCard = Math.min(vh * 0.82, 720);
        const totalScroll   = TRANSITIONS * scrollPerCard;

        stackSection.style.height = `${vh + totalScroll}px`;

        const cards = cardRefs.current;
        if (cards.some(c => !c)) return;

        // ── Initial card states ───────────────────────────────────────
        // Card 0 sits visible; cards 1-4 start below the stack container
        cards.forEach((card, i) => {
          if (!card) return;
          gsap.set(card, {
            y:               i === 0 ? 0 : '100%',
            scale:           1,
            rotation:        0,
            opacity:         1,
            transformOrigin: 'center center',
          });
        });

        // ── Initial inner-element states (§13) ───────────────────────
        innerRefs.current.forEach((el, i) => {
          if (!el) return;
          switch (i) {
            case 0: gsap.set(el, { y: 5 }); break;                         // direction: slightly displaced
            case 1: gsap.set(el, { opacity: 0.10 }); break;                // interface: grid hidden
            case 2: gsap.set(el, { x: 0 }); break;                         // motion: dot at start
            case 3: gsap.set(el, { scale: 0.97, transformOrigin: 'center center' }); break; // engineering
            case 4: gsap.set(el, { scale: 1.025, transformOrigin: 'center top' }); break;  // final-frame
          }
        });

        // ── Stacking timeline (spec §11–§12) ─────────────────────────
        // Duration=4, one unit per transition. Scrub maps scroll → tween progress.
        // ease:'none' — scrub(1.0) provides the smooth feel.
        const tl = gsap.timeline({ paused: true });

        // Transition 0 (t=0..1): Card 1 slides up, Card 0 recedes
        tl.fromTo(cards[1]!, { y: '100%' }, { y: '0%', ease: 'none', duration: 1 }, 0)
          .to(cards[0]!, { scale: 0.92, rotation: CARD_DATA[0].rotation, opacity: 0.80, ease: 'none', duration: 1 }, 0);

        // Transition 1 (t=1..2): Card 2 arrives; Card 1 recedes; Card 0 deepens
        tl.fromTo(cards[2]!, { y: '100%' }, { y: '0%', ease: 'none', duration: 1 }, 1)
          .to(cards[1]!, { scale: 0.92, rotation: CARD_DATA[1].rotation, opacity: 0.80, ease: 'none', duration: 1 }, 1)
          .to(cards[0]!, { scale: 0.88, opacity: 0.72, ease: 'none', duration: 1 }, 1);

        // Transition 2 (t=2..3): Card 3 arrives
        tl.fromTo(cards[3]!, { y: '100%' }, { y: '0%', ease: 'none', duration: 1 }, 2)
          .to(cards[2]!, { scale: 0.92, rotation: CARD_DATA[2].rotation, opacity: 0.80, ease: 'none', duration: 1 }, 2)
          .to(cards[1]!, { scale: 0.88, opacity: 0.72, ease: 'none', duration: 1 }, 2)
          .to(cards[0]!, { scale: 0.85, opacity: 0.65, ease: 'none', duration: 1 }, 2);

        // Transition 3 (t=3..4): FINAL FRAME arrives at rotation=0 — the resolution
        tl.fromTo(cards[4]!, { y: '100%', rotation: 0 }, { y: '0%', rotation: 0, ease: 'none', duration: 1 }, 3)
          .to(cards[3]!, { scale: 0.92, rotation: CARD_DATA[3].rotation, opacity: 0.80, ease: 'none', duration: 1 }, 3)
          .to(cards[2]!, { scale: 0.88, opacity: 0.72, ease: 'none', duration: 1 }, 3)
          .to(cards[1]!, { scale: 0.85, opacity: 0.65, ease: 'none', duration: 1 }, 3);
        // Card 0 remains at 0.85 / 0.65 — set in transition 2

        // ── ScrollTrigger ─────────────────────────────────────────────
        ScrollTrigger.create({
          id:                  'bf-stack',
          trigger:             stackSection,
          start:               'top top',
          end:                 () => `+=${totalScroll}`,
          pin:                 sticky,
          scrub:               1.0,
          animation:           tl,
          invalidateOnRefresh: true,
          anticipatePin:       1,

          onUpdate(self) {
            const p = self.progress;

            // ── Counter (direct DOM — no React rerenders) ──────────────
            const activeIdx = Math.min(Math.floor(p * TRANSITIONS + 0.08), TOTAL_CARDS - 1);
            const numEl     = counterRef.current?.querySelector<HTMLElement>('.bf-btf-counter-num');
            const lblEl     = counterRef.current?.querySelector<HTMLElement>('.bf-btf-counter-label');
            if (numEl) numEl.textContent = CARD_DATA[activeIdx].index;
            if (lblEl) lblEl.textContent = CARD_DATA[activeIdx].title.replace('\n', ' ');

            // ── §17 Exit animation ─────────────────────────────────────
            // As Final Frame fully settles (p > 0.82), the ambient environment
            // simplifies — layers recede, surroundings calm — leaving only the
            // finished object. No fullscreen expansion (that was used in 2A).
            const exitPhase = Math.max(0, Math.min(1, (p - 0.82) / 0.18));
            const stackBgEl = stickyRef.current?.querySelector<HTMLElement>('.bf-btf-stack-bg');
            if (stackBgEl) gsap.set(stackBgEl, { opacity: 0.65 - exitPhase * 0.65 });
            if (counterRef.current) gsap.set(counterRef.current, { opacity: 1 - exitPhase * 0.65 });

            // ── §13 Internal card motion ───────────────────────────────
            // Each card is driven during a specific progress phase.
            // Phases correspond to: the card being dominant in the stack.
            // Card 4 (Final Frame) shares card 3's phase as it arrives.
            const PHASES: [number, number][] = [
              [0,    0.25],  // direction  — active at start
              [0.25, 0.50],  // interface  — active after card 1 arrives
              [0.50, 0.75],  // motion     — active after card 2 arrives
              [0.75, 1.00],  // engineering
              [0.75, 1.00],  // final-frame — arrives during same phase
            ];

            PHASES.forEach(([start, end], i) => {
              const localP = Math.max(0, Math.min(1, (p - start) / (end - start)));
              const el     = innerRefs.current[i];
              if (!el) return;
              switch (i) {
                case 0: gsap.set(el, { y: 5 - localP * 5 }); break;              // words settle downward
                case 1: gsap.set(el, { opacity: 0.10 + localP * 0.90 }); break;  // grid resolves
                case 2: gsap.set(el, { x: localP * 88 }); break;                 // dot travels
                case 3: gsap.set(el, { scale: 0.97 + localP * 0.03 }); break;    // viewports align
                case 4: gsap.set(el, { scale: 1.025 - localP * 0.025 }); break;  // image settles
              }
            });
          },
        });
      }, stackSection);
    }

    // Init order: fonts → rAF → build → rAF → ST.refresh (§21 §22)
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        buildStack();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    });

    // Single ResizeObserver scoped to stack section, debounced 160ms
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        requestAnimationFrame(buildStack);
      }, 160);
    });
    ro.observe(stackSection);

    return () => {
      clearTimeout(resizeTimer);
      ro.disconnect();
      ctx?.revert();
      // Kill only this section's trigger — never ST.getAll().kill() (§21)
      ScrollTrigger.getAll()
        .filter(t => t.vars?.id === 'bf-stack')
        .forEach(t => t.kill());
      if (stackSection) stackSection.style.height = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rm]);

  return (
    <section className="bf-btf-wrapper" aria-label="Behind the Frame — process layers">

      {/* ── A) Breathing room + conceptual intro ─────────────────── */}
      <BehindIntro />

      {/* ── B) Sticky card stack ─────────────────────────────────── */}
      <div ref={stackSectionRef} className="bf-btf-stack-section">
        <div ref={stickyRef} className="bf-btf-sticky">

          {/* Ambient vignette — fades as Final Frame resolves (§17) */}
          <div className="bf-btf-stack-bg" aria-hidden="true" />

          {/* Stack counter — orientation metadata (§16) */}
          <div ref={counterRef} className="bf-btf-counter" aria-hidden="true">
            <span className="bf-btf-counter-num">01</span>
            <span className="bf-btf-counter-sep">—</span>
            <span className="bf-btf-counter-total">05</span>
            <span className="bf-btf-counter-label">DIRECTION</span>
          </div>

          {/* Card stack container */}
          <div className="bf-btf-stack">
            {CARD_DATA.map((card, i) => (
              <BehindCard
                key={card.id}
                card={card}
                zIndex={i + 1}
                cardRef={el => { cardRefs.current[i] = el; }}
                onInner={el => { innerRefs.current[i] = el; }}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ── C) Post-stack quiet statement (§18) ──────────────────── */}
      <BehindOutro />

    </section>
  );
}
