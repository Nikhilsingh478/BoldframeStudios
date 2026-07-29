/**
 * BehindTheFrame — GSAP sticky card stack (Master Part 2, Chunk 3/4)
 *
 * Reveals the 5 layers behind a finished web experience:
 * DIRECTION → INTERFACE → MOTION → ENGINEERING → FINAL FRAME
 *
 * Structure:
 *   A) Intro — ~35vh breathing room + conceptual headline (not pinned)
 *   B) Stack section — GSAP-pinned 100vh with 5 stacking cards
 *
 * Stacking choreography (spec §11–§12):
 *   Cards enter from y=100% → 0%.
 *   Previous cards: scale down + rotate (per-card pattern) + opacity mute.
 *   Depth: immediate-prev=0.92, two-behind=0.88, deeper=0.85.
 *   Rotation pattern: -2 / +2.5 / -1.5 / +2 / 0deg (final=0 is meaningful resolution).
 *
 * Internal motion (spec §13): one element per card responds to its arrival phase.
 * Counter (spec §16): "01 — 05" updates via direct DOM, no React rerenders.
 *
 * Init: useLayoutEffect → fonts.ready → rAF → buildStack → rAF → ST.refresh()
 * Single ResizeObserver on stack section, debounced 160ms.
 * Only kills 'bf-stack' trigger — never calls ST.getAll().kill().
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
    id:       'motion',
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
    rotation:  0,
    bg:       'var(--bf-bg-primary)',
  },
] as const;

type CardDatum = (typeof CARD_DATA)[number];
const TOTAL_CARDS = CARD_DATA.length;        // 5
const TRANSITIONS  = TOTAL_CARDS - 1;        // 4

type InnerRef = (el: HTMLElement | null) => void;

// ─── Card 01 Visual — DIRECTION ───────────────────────────────────────────────
// Abstract word scatter with grid coordinates and a focal highlight rectangle.
// Inner ref: the scatter container (subtle y-settle on arrival).

function VisualDirection({ onInner }: { onInner: InnerRef }) {
  return (
    <div className="bf-vis-direction" ref={el => onInner(el)} aria-hidden="true">
      {/* Grid coordinate ticks */}
      <span className="bf-dir-coord bf-dir-coord-1">A2</span>
      <span className="bf-dir-coord bf-dir-coord-2">B4</span>
      <span className="bf-dir-coord bf-dir-coord-3">C1</span>
      <span className="bf-dir-coord bf-dir-coord-4">D3</span>

      {/* Scattered concept words */}
      <span className="bf-dir-word bf-dir-word-1">HIERARCHY</span>
      <span className="bf-dir-word bf-dir-word-2">CLARITY</span>
      <span className="bf-dir-word bf-dir-word-3">FOCUS</span>
      <span className="bf-dir-word bf-dir-word-4">RHYTHM</span>
      <span className="bf-dir-word bf-dir-word-5">USER</span>
      <span className="bf-dir-word bf-dir-word-6">VOICE</span>

      {/* Focal highlight rectangle */}
      <div className="bf-dir-focal" />

      {/* Two competing path options */}
      <svg className="bf-dir-paths" viewBox="0 0 480 260" fill="none" preserveAspectRatio="none">
        {/* Path A — more direct */}
        <path
          d="M 50 210 Q 140 100 260 88 Q 340 78 430 42"
          stroke="rgba(115,87,255,0.40)"
          strokeWidth="1.5"
          strokeDasharray="5 7"
        />
        {/* Path B — wandering */}
        <path
          d="M 50 210 Q 90 175 155 180 Q 220 185 285 145 Q 360 108 430 42"
          stroke="rgba(243,242,238,0.12)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        {/* End convergence dot */}
        <circle cx="430" cy="42" r="3" fill="rgba(115,87,255,0.60)" />
      </svg>
    </div>
  );
}

// ─── Card 02 Visual — INTERFACE ───────────────────────────────────────────────
// Wireframe layout structure. Inner ref: grid-lines overlay (opacity reveal).

function VisualInterface({ onInner }: { onInner: InnerRef }) {
  return (
    <div className="bf-vis-interface" aria-hidden="true">
      <div className="bf-iface-layout">
        <div className="bf-iface-header">
          <span className="bf-iface-label">HEADER</span>
          <div className="bf-iface-nav">
            {['NAV', 'NAV', 'NAV', 'CTA'].map((t, i) => (
              <div key={i} className={`bf-iface-nav-item${t === 'CTA' ? ' bf-iface-nav-cta' : ''}`}>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bf-iface-hero-region">
          <div className="bf-iface-hero-text">
            <div className="bf-iface-txtblock bf-iface-txtblock--h" />
            <div className="bf-iface-txtblock bf-iface-txtblock--sub" />
          </div>
          <div className="bf-iface-hero-img" />
        </div>
        <div className="bf-iface-content-row">
          <div className="bf-iface-col-main">
            <div className="bf-iface-txtblock" />
            <div className="bf-iface-txtblock bf-iface-txtblock--sm" />
            <div className="bf-iface-txtblock bf-iface-txtblock--sm" />
            <div className="bf-iface-module" />
          </div>
          <div className="bf-iface-col-side">
            <span className="bf-iface-label">ASIDE</span>
            <div className="bf-iface-img-region" />
            <div className="bf-iface-txtblock bf-iface-txtblock--xs" />
          </div>
        </div>
      </div>
      {/* Grid lines — the animated element */}
      <div ref={el => onInner(el)} className="bf-iface-gridlines" />
    </div>
  );
}

// ─── Card 03 Visual — MOTION ──────────────────────────────────────────────────
// Three framed states connected by a trajectory.
// Inner ref: the trajectory dot (x-travel on arrival).

function VisualMotion({ onInner }: { onInner: InnerRef }) {
  return (
    <div className="bf-vis-motion" aria-hidden="true">
      <div className="bf-motion-track">
        {/* State frames */}
        {['ENTER', 'TRANSFORM', 'RESOLVE'].map((label, i) => (
          <div key={label} className="bf-motion-frame">
            <span className="bf-motion-frame-label">{`FRAME 0${i + 1}`}</span>
            <span className="bf-motion-frame-name">{label}</span>
            <div className={`bf-motion-state bf-motion-state--${i + 1}`} />
          </div>
        ))}

        {/* Trajectory line behind frames */}
        <svg className="bf-motion-line-svg" viewBox="0 0 600 4" preserveAspectRatio="none">
          <line
            x1="0" y1="2" x2="600" y2="2"
            stroke="rgba(115,87,255,0.22)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>

        {/* Moving dot — the GSAP-animated element */}
        <div ref={el => onInner(el)} className="bf-motion-dot" />
      </div>
    </div>
  );
}

// ─── Card 04 Visual — ENGINEERING ────────────────────────────────────────────
// Architectural blueprint: three viewport outlines.
// Inner ref: viewport container (scale settle on arrival).

function VisualEngineering({ onInner }: { onInner: InnerRef }) {
  return (
    <div className="bf-vis-engineering" aria-hidden="true">
      <div className="bf-eng-container" ref={el => onInner(el)}>
        {/* Device viewport outlines */}
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
            </div>
          </div>
        </div>

        <div className="bf-eng-vp bf-eng-vp--tablet">
          <span className="bf-eng-vp-label">TABLET</span>
          <div className="bf-eng-vp-screen">
            <div className="bf-eng-vp-chrome" />
            <div className="bf-eng-vp-body">
              <div className="bf-eng-row bf-eng-row--full" />
              <div className="bf-eng-row bf-eng-row--full bf-eng-row--sm" />
            </div>
          </div>
        </div>

        <div className="bf-eng-vp bf-eng-vp--mobile">
          <span className="bf-eng-vp-label">MOBILE</span>
          <div className="bf-eng-vp-screen">
            <div className="bf-eng-vp-chrome" />
            <div className="bf-eng-vp-body">
              <div className="bf-eng-row bf-eng-row--full" />
              <div className="bf-eng-row bf-eng-row--full bf-eng-row--sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Layer labels */}
      <div className="bf-eng-layers">
        {[
          { color: 'rgba(115,87,255,0.75)', name: 'LAYOUT' },
          { color: 'rgba(85,221,245,0.55)',  name: 'MOTION' },
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
// Real Huuman project in a browser chrome frame.
// Inner ref: the project image (scale settle 1.025→1 on arrival).

function VisualFinalFrame({ onInner }: { onInner: InnerRef }) {
  return (
    <div className="bf-vis-finalframe" aria-hidden="true">
      <div className="bf-ff-browser">
        <div className="bf-ff-chrome">
          <span className="bf-ff-dot" style={{ background: '#FF5F57' }} />
          <span className="bf-ff-dot" style={{ background: '#FEBC2E' }} />
          <span className="bf-ff-dot" style={{ background: '#28C840' }} />
          <div className="bf-ff-urlbar">boldframestudios.in</div>
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
  cardRef: (el: HTMLDivElement | null) => void;
  onInner: InnerRef;
}

function BehindCard({ card, cardRef, onInner }: BehindCardProps) {
  const { id, label, title, thought, bg } = card;

  return (
    <div
      ref={cardRef}
      className={`bf-btf-card bf-btf-card--${id}`}
      style={{ background: bg }}
      aria-label={`Layer ${card.index}: ${title.replace('\n', ' ')}`}
    >
      {/* Visual composition — behind all text */}
      <div className="bf-btf-card-visual">
        {id === 'direction'   && <VisualDirection   onInner={onInner} />}
        {id === 'interface'   && <VisualInterface   onInner={onInner} />}
        {id === 'motion'      && <VisualMotion      onInner={onInner} />}
        {id === 'engineering' && <VisualEngineering onInner={onInner} />}
        {id === 'final-frame' && <VisualFinalFrame  onInner={onInner} />}
      </div>

      {/* Upper-left: micro label */}
      <div className="bf-btf-card-micro" aria-hidden="true">
        <span>{label}</span>
      </div>

      {/* Upper-right: supporting thought */}
      <div className="bf-btf-card-thought">
        <p>{thought}</p>
      </div>

      {/* Lower-left: large title */}
      <div className="bf-btf-card-title">
        {title.split('\n').map((line, i) => (
          <span key={i} className="bf-btf-card-title-line">{line}</span>
        ))}
      </div>

      {/* Subtle border contrast for depth perception */}
      <div className="bf-btf-card-border" aria-hidden="true" />
    </div>
  );
}

// ─── Intro section ────────────────────────────────────────────────────────────
// Breathing room between the horizontal gallery and the card stack.
// Uses motion/react for simple scroll-triggered entry.

function BehindIntro() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
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

      {/* First statement */}
      <motion.div
        className="bf-btf-intro-headline"
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease, delay: 0.12 }}
      >
        <span className="bf-btf-intro-line-a">WHAT YOU SEE</span>
        <span className="bf-btf-intro-line-b">IS THE FINAL FRAME.</span>
      </motion.div>

      {/* Second statement — appears slightly later */}
      <motion.div
        className="bf-btf-intro-sub"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.35 }}
      >
        <span className="bf-btf-intro-sub-a">WHAT MAKES IT WORK</span>
        <span className="bf-btf-intro-sub-b">LIVES BEHIND IT.</span>
      </motion.div>

    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function BehindTheFrame() {
  // Stack section refs
  const stackSectionRef = useRef<HTMLDivElement>(null);
  const stickyRef       = useRef<HTMLDivElement>(null);
  const counterRef      = useRef<HTMLDivElement>(null);

  // Per-card refs
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

        if (isMobile) {
          stackSection.style.height = '';
          return;
        }

        // Scroll per card — spec §11: "approximately one viewport-height, adjusted after testing"
        const scrollPerCard = Math.min(vh * 0.82, 720);
        const totalScroll   = TRANSITIONS * scrollPerCard;

        stackSection.style.height = `${vh + totalScroll}px`;

        const cards = cardRefs.current;
        if (cards.some(c => !c)) return;  // bail if refs not ready

        // ── Initial card states ───────────────────────────────────────
        cards.forEach((card, i) => {
          if (!card) return;
          if (i === 0) {
            gsap.set(card, { y: 0, scale: 1, rotation: 0, opacity: 1, transformOrigin: 'center center' });
          } else {
            gsap.set(card, { y: '100%', scale: 1, rotation: 0, opacity: 1, transformOrigin: 'center center' });
          }
        });

        // ── Initial inner-element states ──────────────────────────────
        innerRefs.current.forEach((el, i) => {
          if (!el) return;
          switch (i) {
            case 0: gsap.set(el, { y: 5 }); break;
            case 1: gsap.set(el, { opacity: 0.12 }); break;
            case 2: gsap.set(el, { x: 0 }); break;
            case 3: gsap.set(el, { scale: 0.97, transformOrigin: 'center center' }); break;
            case 4: gsap.set(el, { scale: 1.025, transformOrigin: 'center center' }); break;
          }
        });

        // ── Stacking timeline ─────────────────────────────────────────
        // Duration = 4 units (one per transition). Scrub maps scroll → timeline.
        const tl = gsap.timeline({ paused: true });

        // Transition 0 (t=0..1): Card 1 arrives, Card 0 recedes
        tl.fromTo(cards[1]!, { y: '100%' }, { y: '0%', ease: 'none', duration: 1 }, 0)
          .to(cards[0]!, { scale: 0.92, rotation: CARD_DATA[0].rotation, opacity: 0.80, ease: 'none', duration: 1 }, 0);

        // Transition 1 (t=1..2): Card 2 arrives
        tl.fromTo(cards[2]!, { y: '100%' }, { y: '0%', ease: 'none', duration: 1 }, 1)
          .to(cards[1]!, { scale: 0.92, rotation: CARD_DATA[1].rotation, opacity: 0.80, ease: 'none', duration: 1 }, 1)
          .to(cards[0]!, { scale: 0.88, opacity: 0.72, ease: 'none', duration: 1 }, 1);

        // Transition 2 (t=2..3): Card 3 arrives
        tl.fromTo(cards[3]!, { y: '100%' }, { y: '0%', ease: 'none', duration: 1 }, 2)
          .to(cards[2]!, { scale: 0.92, rotation: CARD_DATA[2].rotation, opacity: 0.80, ease: 'none', duration: 1 }, 2)
          .to(cards[1]!, { scale: 0.88, opacity: 0.72, ease: 'none', duration: 1 }, 2)
          .to(cards[0]!, { scale: 0.85, opacity: 0.65, ease: 'none', duration: 1 }, 2);

        // Transition 3 (t=3..4): Card 4 (FINAL FRAME) arrives — rotation=0 = resolution
        tl.fromTo(cards[4]!, { y: '100%' }, { y: '0%', rotation: 0, ease: 'none', duration: 1 }, 3)
          .to(cards[3]!, { scale: 0.92, rotation: CARD_DATA[3].rotation, opacity: 0.80, ease: 'none', duration: 1 }, 3)
          .to(cards[2]!, { scale: 0.88, opacity: 0.72, ease: 'none', duration: 1 }, 3)
          .to(cards[1]!, { scale: 0.85, opacity: 0.65, ease: 'none', duration: 1 }, 3);
        // Card 0 stays at 0.85 (set during transition 2)

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

            // ── Counter (direct DOM, no React rerender) ────────────────
            const activeIdx = Math.min(Math.floor(p * TRANSITIONS + 0.08), TOTAL_CARDS - 1);
            const numEl  = counterRef.current?.querySelector<HTMLElement>('.bf-btf-counter-num');
            const lblEl  = counterRef.current?.querySelector<HTMLElement>('.bf-btf-counter-label');
            if (numEl) numEl.textContent = CARD_DATA[activeIdx].index;
            if (lblEl) lblEl.textContent = CARD_DATA[activeIdx].title.replace('\n', ' ');

            // ── Internal card motion (one element per card, §13) ───────
            // Each card is "driven" during a specific phase of total progress.
            // Card 0 → phase [0, 0.25], Card 1 → [0.25, 0.5], etc.
            // Card 4 shares Card 3's phase [0.75, 1.0] (it arrives during this phase).
            const PHASES: [number, number][] = [
              [0,    0.25],   // direction
              [0.25, 0.50],   // interface
              [0.50, 0.75],   // motion
              [0.75, 1.00],   // engineering
              [0.75, 1.00],   // final-frame (arrives same phase as engineering recedes)
            ];

            PHASES.forEach(([start, end], i) => {
              const localP = Math.max(0, Math.min(1, (p - start) / (end - start)));
              const el     = innerRefs.current[i];
              if (!el) return;
              switch (i) {
                case 0: gsap.set(el, { y: 5 - localP * 5 }); break;                     // words settle
                case 1: gsap.set(el, { opacity: 0.12 + localP * 0.88 }); break;          // grid reveals
                case 2: gsap.set(el, { x: localP * 90 }); break;                         // dot travels
                case 3: gsap.set(el, { scale: 0.97 + localP * 0.03 }); break;            // viewports align
                case 4: gsap.set(el, { scale: 1.025 - localP * 0.025 }); break;          // image settles
              }
            });
          },
        });
      }, stackSection);
    }

    // §08 Init order: fonts → rAF → build → rAF → ST.refresh
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        buildStack();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    });

    // Single gallery-level ResizeObserver, debounced 160ms
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
      ScrollTrigger.getAll()
        .filter(t => t.vars?.id === 'bf-stack')
        .forEach(t => t.kill());
      if (stackSection) stackSection.style.height = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rm]);

  return (
    <section className="bf-btf-wrapper" aria-label="Behind the Frame — process layers">

      {/* ── Part A: Non-pinned intro with breathing room ─────────── */}
      <BehindIntro />

      {/* ── Part B: Sticky card stack ─────────────────────────────── */}
      <div ref={stackSectionRef} className="bf-btf-stack-section">
        <div ref={stickyRef} className="bf-btf-sticky">

          {/* Stack counter — orientation metadata */}
          <div ref={counterRef} className="bf-btf-counter" aria-hidden="true">
            <span className="bf-btf-counter-num">01</span>
            <span className="bf-btf-counter-sep">—</span>
            <span className="bf-btf-counter-total">05</span>
            <span className="bf-btf-counter-label">DIRECTION</span>
          </div>

          {/* Ambient background darkness behind stack */}
          <div className="bf-btf-stack-bg" aria-hidden="true" />

          {/* Card stack container */}
          <div className="bf-btf-stack">
            {CARD_DATA.map((card, i) => (
              <BehindCard
                key={card.id}
                card={card}
                cardRef={el => { cardRefs.current[i] = el; }}
                onInner={el => { innerRefs.current[i] = el; }}
              />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
