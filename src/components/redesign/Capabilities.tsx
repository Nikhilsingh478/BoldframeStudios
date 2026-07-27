import { useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'motion/react';

// ─── Capability Data ──────────────────────────────────────────────

const CAPABILITIES = [
  {
    id: '01',
    frameLabel: 'FRAME 001',
    title: 'STRATEGY',
    meta: 'POSITIONING — UX — STRUCTURE',
    copy: 'We find the sharpest way to frame the idea before a pixel gets polished.',
    visual: 'strategy' as const,
    gridClass: 'bf-card-strategy',
  },
  {
    id: '02',
    frameLabel: 'FRAME 002',
    title: 'DESIGN',
    meta: 'ART DIRECTION — UI — MOTION',
    copy: 'Distinct visual systems designed around the brand — not around a template.',
    visual: 'design' as const,
    gridClass: 'bf-card-design',
  },
  {
    id: '03',
    frameLabel: 'FRAME 003',
    title: 'DEVELOPMENT',
    meta: 'REACT — FRONTEND — RESPONSIVE',
    copy: 'Production-ready builds where motion, responsiveness and performance are part of the architecture.',
    visual: 'development' as const,
    gridClass: 'bf-card-development',
  },
  {
    id: '04',
    frameLabel: 'FRAME 004',
    title: 'PERFORMANCE',
    meta: 'SPEED — SEO — OPTIMIZATION',
    copy: 'Fast loads, deliberate interactions and the final 10% that separates functional from finished.',
    visual: 'performance' as const,
    gridClass: 'bf-card-performance',
  },
] as const;

// ─── Abstract Visuals ─────────────────────────────────────────────

function StrategyVisual() {
  return (
    <svg viewBox="0 0 160 110" fill="none" className="bf-card-visual" aria-hidden="true">
      {/* Scattered coordinate points */}
      <circle cx="16" cy="20" r="2"   fill="#7357FF" fillOpacity="0.45" />
      <circle cx="40" cy="80" r="2"   fill="#7357FF" fillOpacity="0.35" />
      <circle cx="120" cy="16" r="2"  fill="#7357FF" fillOpacity="0.40" />
      <circle cx="140" cy="84" r="1.5" fill="#7357FF" fillOpacity="0.30" />
      <circle cx="58" cy="92" r="1.5" fill="#7357FF" fillOpacity="0.28" />
      <circle cx="134" cy="52" r="1.5" fill="#55DDF5" fillOpacity="0.30" />
      {/* Faint convergence lines */}
      <line x1="16"  y1="20"  x2="62"  y2="43"  stroke="#7357FF" strokeOpacity="0.13" strokeWidth="0.7" />
      <line x1="40"  y1="80"  x2="62"  y2="64"  stroke="#7357FF" strokeOpacity="0.11" strokeWidth="0.7" />
      <line x1="120" y1="16"  x2="98"  y2="43"  stroke="#7357FF" strokeOpacity="0.11" strokeWidth="0.7" />
      <line x1="140" y1="84"  x2="98"  y2="64"  stroke="#7357FF" strokeOpacity="0.10" strokeWidth="0.7" />
      <line x1="58"  y1="92"  x2="72"  y2="67"  stroke="#7357FF" strokeOpacity="0.09" strokeWidth="0.7" />
      {/* Central emphasized frame */}
      <rect x="60" y="40" width="40" height="28" fill="none" stroke="#7357FF" strokeWidth="1.2" strokeOpacity="0.65" />
      {/* Crop marks — top-left */}
      <path d="M60 47 L60 40 L67 40" stroke="#F3F2EE" strokeWidth="1.2" strokeOpacity="0.55" strokeLinecap="square" />
      {/* Crop marks — top-right */}
      <path d="M93 40 L100 40 L100 47" stroke="#F3F2EE" strokeWidth="1.2" strokeOpacity="0.55" strokeLinecap="square" />
      {/* Crop marks — bottom-left */}
      <path d="M60 61 L60 68 L67 68" stroke="#F3F2EE" strokeWidth="1.2" strokeOpacity="0.55" strokeLinecap="square" />
      {/* Crop marks — bottom-right */}
      <path d="M93 68 L100 68 L100 61" stroke="#F3F2EE" strokeWidth="1.2" strokeOpacity="0.55" strokeLinecap="square" />
      {/* Center point */}
      <circle cx="80" cy="54" r="2.5" fill="#7357FF" fillOpacity="0.9" />
      <circle cx="80" cy="54" r="5"   fill="#7357FF" fillOpacity="0.12" />
    </svg>
  );
}

function DesignVisual() {
  return (
    <div className="bf-design-frames" aria-hidden="true">
      <div className="bf-frame bf-frame-3">
        <div className="bf-frame-bar" />
        <div className="bf-frame-body" />
      </div>
      <div className="bf-frame bf-frame-2">
        <div className="bf-frame-bar" />
        <div className="bf-frame-body" />
      </div>
      <div className="bf-frame bf-frame-1">
        <div className="bf-frame-bar" />
        <div className="bf-frame-body" />
      </div>
    </div>
  );
}

function DevelopmentVisual() {
  return (
    <svg viewBox="0 0 240 120" fill="none" className="bf-card-visual" aria-hidden="true">
      {/* Root node */}
      <rect x="88" y="4" width="64" height="22" rx="3"
        stroke="#7357FF" strokeWidth="1.2" strokeOpacity="0.75" />
      <rect x="95" y="10" width="24" height="3" rx="1.5"
        fill="#7357FF" fillOpacity="0.35" />
      <rect x="95" y="16" width="38" height="2" rx="1"
        fill="#F3F2EE" fillOpacity="0.12" />
      {/* Root → branch */}
      <line x1="120" y1="26" x2="120" y2="37" stroke="#7357FF" strokeOpacity="0.28" strokeWidth="1" />
      <line x1="60"  y1="37" x2="180" y2="37" stroke="#7357FF" strokeOpacity="0.22" strokeWidth="1" />
      <line x1="60"  y1="37" x2="60"  y2="48" stroke="#7357FF" strokeOpacity="0.22" strokeWidth="1" />
      <line x1="180" y1="37" x2="180" y2="48" stroke="#7357FF" strokeOpacity="0.22" strokeWidth="1" />
      {/* Left child */}
      <rect x="30" y="48" width="60" height="22" rx="3"
        stroke="#7357FF" strokeWidth="1" strokeOpacity="0.52" />
      <rect x="37" y="54" width="20" height="3" rx="1.5"
        fill="#7357FF" fillOpacity="0.25" />
      <rect x="37" y="60" width="34" height="2" rx="1"
        fill="#F3F2EE" fillOpacity="0.09" />
      {/* Right child */}
      <rect x="150" y="48" width="60" height="22" rx="3"
        stroke="#7357FF" strokeWidth="1" strokeOpacity="0.52" />
      <rect x="157" y="54" width="20" height="3" rx="1.5"
        fill="#55DDF5" fillOpacity="0.22" />
      <rect x="157" y="60" width="34" height="2" rx="1"
        fill="#F3F2EE" fillOpacity="0.09" />
      {/* Left grandchildren */}
      <line x1="60" y1="70" x2="60" y2="80" stroke="#7357FF" strokeOpacity="0.16" strokeWidth="1" />
      <line x1="38" y1="80" x2="82" y2="80" stroke="#7357FF" strokeOpacity="0.16" strokeWidth="1" />
      <line x1="38" y1="80" x2="38" y2="89" stroke="#7357FF" strokeOpacity="0.16" strokeWidth="1" />
      <line x1="82" y1="80" x2="82" y2="89" stroke="#7357FF" strokeOpacity="0.16" strokeWidth="1" />
      <rect x="22" y="89" width="32" height="16" rx="2"
        stroke="#7357FF" strokeWidth="0.75" strokeOpacity="0.32" />
      <rect x="66" y="89" width="32" height="16" rx="2"
        stroke="#7357FF" strokeWidth="0.75" strokeOpacity="0.32" />
      {/* Right grandchild */}
      <line x1="180" y1="70" x2="180" y2="80" stroke="#7357FF" strokeOpacity="0.16" strokeWidth="1" />
      <rect x="158" y="80" width="44" height="16" rx="2"
        stroke="#55DDF5" strokeWidth="0.75" strokeOpacity="0.22" />
    </svg>
  );
}

function PerformanceVisual() {
  return (
    <svg viewBox="0 0 220 100" fill="none" className="bf-card-visual" aria-hidden="true">
      <defs>
        <linearGradient id="bf-perf-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7357FF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7357FF" stopOpacity="0"    />
        </linearGradient>
      </defs>
      {/* Dashed guide lines */}
      <line x1="28" y1="22" x2="205" y2="22" stroke="#F3F2EE" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="28" y1="50" x2="205" y2="50" stroke="#F3F2EE" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="28" y1="78" x2="205" y2="78" stroke="#F3F2EE" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 5" />
      {/* Y-axis labels */}
      <text x="16" y="26"  fill="#F3F2EE" fillOpacity="0.18" fontSize="7" textAnchor="middle" fontFamily="Inter, sans-serif">100</text>
      <text x="16" y="54"  fill="#F3F2EE" fillOpacity="0.18" fontSize="7" textAnchor="middle" fontFamily="Inter, sans-serif">50</text>
      <text x="16" y="82"  fill="#F3F2EE" fillOpacity="0.18" fontSize="7" textAnchor="middle" fontFamily="Inter, sans-serif">0</text>
      {/* Area fill */}
      <path
        d="M32 76 C55 74, 72 68, 88 54 C104 40, 116 28, 138 24 C158 20, 175 20, 198 18 L198 82 L32 82 Z"
        fill="url(#bf-perf-grad)"
      />
      {/* Performance curve */}
      <path
        id="bf-perf-path"
        d="M32 76 C55 74, 72 68, 88 54 C104 40, 116 28, 138 24 C158 20, 175 20, 198 18"
        stroke="#7357FF"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeOpacity="0.9"
        className="bf-perf-line"
      />
      {/* Animated dot */}
      <circle r="3.5" fill="#7357FF">
        <animateMotion dur="3.2s" repeatCount="indefinite" calcMode="spline"
          keySplines="0.42 0 0.58 1" keyTimes="0;1">
          <mpath href="#bf-perf-path" />
        </animateMotion>
      </circle>
      {/* Glow ring on dot */}
      <circle r="7" fill="#7357FF" fillOpacity="0.15">
        <animateMotion dur="3.2s" repeatCount="indefinite" calcMode="spline"
          keySplines="0.42 0 0.58 1" keyTimes="0;1">
          <mpath href="#bf-perf-path" />
        </animateMotion>
      </circle>
    </svg>
  );
}

const VISUALS = {
  strategy:    StrategyVisual,
  design:      DesignVisual,
  development: DevelopmentVisual,
  performance: PerformanceVisual,
} as const;

// ─── Bento Card ───────────────────────────────────────────────────

interface CardProps {
  cap: typeof CAPABILITIES[number];
  cardRef: (el: HTMLDivElement | null) => void;
  onCardClick: (e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement) => void;
  isMobile: boolean;
}

function BentoCard({ cap, cardRef, onCardClick, isMobile }: CardProps) {
  const localRef = useRef<HTMLDivElement | null>(null);
  const Visual = VISUALS[cap.visual];

  const setRef = useCallback((el: HTMLDivElement | null) => {
    localRef.current = el;
    cardRef(el);
  }, [cardRef]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !localRef.current) return;
    onCardClick(e, localRef.current);
  };

  return (
    <div
      ref={setRef}
      className="bf-bento-card"
      style={{ height: '100%' }}
      onClick={handleClick}
      role="article"
      aria-label={`Capability: ${cap.title}`}
    >
      {/* Top row: index + frame label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <span className="bf-card-index">BFS / CAPABILITY {cap.id}</span>
        <span className="bf-card-index">{cap.frameLabel}</span>
      </div>

      {/* Abstract visual */}
      <div className="bf-card-visual-area">
        <Visual />
      </div>

      {/* Title + metadata + copy */}
      <div style={{ marginTop: 'auto' }}>
        <div className="bf-card-title">{cap.title}</div>
        <div className="bf-card-meta">{cap.meta}</div>
        <p className="bf-card-copy">{cap.copy}</p>
      </div>
    </div>
  );
}

// ─── Editorial Header ─────────────────────────────────────────────

const LINE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function EditorialHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  const line = (delay: number, children: React.ReactNode, style?: React.CSSProperties) => (
    <div style={{ overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ y: '105%' }}
        animate={inView ? { y: 0 } : { y: '105%' }}
        transition={{ duration: 1.0, ease: LINE_EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );

  return (
    <div ref={ref} style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>

      {/* Micro label */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: LINE_EASE, delay: 0.05 }}
        style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}
      >
        <span className="bf-micro" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{
            display: 'inline-block', width: '1.5rem', height: '1px',
            background: 'var(--bf-accent)', verticalAlign: 'middle',
          }} />
          01 / CAPABILITIES
        </span>
      </motion.div>

      {/* Editorial headline */}
      <div style={{ marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
        {/* "WE DON'T JUST" — hard left */}
        {line(0.15,
          <span style={{
            fontFamily: 'var(--bf-font-display)',
            fontSize: 'var(--bf-text-4xl)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1,
            color: 'var(--bf-text-primary)',
            display: 'block',
          }}>
            WE DON&rsquo;T JUST
          </span>
        )}

        {/* "BUILD PAGES." — inset */}
        {line(0.26,
          <span style={{
            fontFamily: 'var(--bf-font-display)',
            fontSize: 'var(--bf-text-4xl)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1,
            color: 'var(--bf-text-primary)',
            display: 'block',
          }}>
            BUILD PAGES.
          </span>,
          { marginLeft: 'clamp(1.5rem, 5vw, 4.5rem)' }
        )}
      </div>

      {/* Gap */}
      <div style={{ height: 'clamp(1rem, 2vw, 1.75rem)' }} />

      {/* "WE BUILD" + "MOMENTUM." — shifted right, large */}
      <div style={{
        marginLeft: 'clamp(15%, 28vw, 35%)',
        overflow: 'hidden',
      }}>
        {line(0.38,
          <span style={{
            fontFamily: 'var(--bf-font-display)',
            fontSize: 'var(--bf-text-3xl)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: 'var(--bf-text-secondary)',
            display: 'block',
          }}>
            WE BUILD
          </span>
        )}
      </div>

      {/* "MOMENTUM." — giant, approaches right edge */}
      <div style={{ overflow: 'hidden', marginLeft: 'clamp(8%, 18vw, 25%)' }}>
        {line(0.50,
          <span style={{
            fontFamily: 'var(--bf-font-display)',
            fontSize: 'var(--bf-text-display)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: 'var(--bf-text-primary)',
            display: 'block',
            whiteSpace: 'nowrap',
          }}>
            MOMENTUM.
          </span>
        )}
      </div>

      {/* Body copy */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: LINE_EASE, delay: 0.72 }}
        style={{
          fontFamily: 'var(--bf-font-body)',
          fontSize: 'clamp(0.875rem, 1.3vw, 1rem)',
          lineHeight: 1.7,
          color: 'var(--bf-text-secondary)',
          maxWidth: '52ch',
          marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
          marginLeft: 'clamp(1.5rem, 5vw, 4.5rem)',
        }}
      >
        Strategy, design and development working as one system — built to look distinctive,
        load fast and move with purpose.
      </motion.p>
    </div>
  );
}

// ─── Main Capabilities Section ────────────────────────────────────

export function Capabilities() {
  const bentoRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse), (max-width: 767px)').matches
      : false
  );

  // ── Interaction: spotlight + magnetism + border glow ─────────────
  useEffect(() => {
    if (isMobile.current) return;

    const container = bentoRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const inBounds =
          relX >= 0 && relX <= rect.width &&
          relY >= 0 && relY <= rect.height;

        if (inBounds) {
          // Spotlight
          card.style.setProperty('--spot-x', `${relX}px`);
          card.style.setProperty('--spot-y', `${relY}px`);
          card.style.setProperty('--spot-opacity', '1');
          // Magnetism — max 3px
          const cx = rect.width  / 2;
          const cy = rect.height / 2;
          const mx = ((relX - cx) / cx) * 3;
          const my = ((relY - cy) / cy) * 3;
          card.style.transform = `translate(${mx.toFixed(2)}px, ${my.toFixed(2)}px)`;
          card.setAttribute('data-active', 'true');
        } else {
          card.style.setProperty('--spot-opacity', '0');
          card.style.removeProperty('transform');
          card.removeAttribute('data-active');
        }
      });
    };

    const onLeave = () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.setProperty('--spot-opacity', '0');
        card.style.removeProperty('transform');
        card.removeAttribute('data-active');
      });
    };

    container.addEventListener('mousemove', onMove, { passive: true });
    container.addEventListener('mouseleave', onLeave);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── Particles on click ───────────────────────────────────────────
  const spawnParticles = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
      if (isMobile.current) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const count = 6;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.8;
        const dist  = 28 + Math.random() * 36;
        const size  = 2 + Math.random() * 2;
        const p = document.createElement('div');
        p.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: #7357FF;
          pointer-events: none;
          z-index: 10;
          transform: translate(-50%, -50%);
          animation: bf-particle 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          --dx: ${(Math.cos(angle) * dist).toFixed(1)}px;
          --dy: ${(Math.sin(angle) * dist).toFixed(1)}px;
        `;
        card.appendChild(p);
        // Clean up after animation
        const timer = window.setTimeout(() => p.remove(), 700);
        // Store timer on element for potential early cleanup
        (p as any)._timer = timer;
      }
    },
    []
  );

  // ── Card ref collector ───────────────────────────────────────────
  const makeCardRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[i] = el;
    },
    []
  );

  // ── Bento section entrance ───────────────────────────────────────
  const bentoInViewRef = useRef<HTMLDivElement>(null);
  const bentoInView = useInView(bentoInViewRef, { once: true, margin: '-5%' });

  return (
    <section
      id="capabilities"
      className="bf-section"
      aria-label="Capabilities"
      style={{
        paddingTop: 'clamp(12vh, 20vw, 20vh)', /* breathing room after hero */
        overflowX: 'hidden', /* contain MOMENTUM. giant type */
      }}
    >
      <div className="bf-container">

        {/* Editorial Header */}
        <EditorialHeader />

        {/* Bento Grid */}
        <div ref={bentoInViewRef}>
          <motion.div
            ref={bentoRef}
            className="bf-bento-grid"
            initial={{ opacity: 0 }}
            animate={bentoInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.id}
                className={cap.gridClass}
                style={{ height: '100%', minHeight: 'inherit' }}
                initial={{ opacity: 0, y: 28 }}
                animate={bentoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.09,
                }}
              >
                <BentoCard
                  cap={cap}
                  cardRef={makeCardRef(i)}
                  onCardClick={spawnParticles}
                  isMobile={isMobile.current}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom breathing room — no divider */}
        <div style={{ height: 'clamp(6rem, 12vw, 10rem)' }} />
      </div>
    </section>
  );
}
