/**
 * BoldFrame Manifesto — Horizontal typographic sentence
 *
 * Desktop: GSAP ScrollTrigger-pinned horizontal track.
 * Mobile/reduced-motion: vertical editorial stack.
 *
 * Sentence: "Strategy gives it direction — design gives it character
 *  — development gives it life — performance keeps it moving
 *  — and every frame should earn its place."
 *
 * Emphasis techniques (max 3):
 *   1. Violet fill   → DIRECTION, LIFE
 *   2. Outline type  → CHARACTER
 *   3. Italic frame  → FRAME word (framed box)
 *   MOVING gets italic weight shift
 *
 * Inline visual punctuation: browser-frame | SVG-curve | crosshair | project-frame
 */

import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Inline visual: mini browser frame ───────────────────────────

function InlineBrowserFrame({ className = '' }: { className?: string }) {
  return (
    <span
      className={`bf-mani-screen ${className}`}
      aria-hidden="true"
    >
      <span className="bf-mani-screen-chrome">
        <span className="bf-mani-screen-dot" style={{ background: '#FF5F57' }} />
        <span className="bf-mani-screen-dot" style={{ background: '#FEBC2E' }} />
        <span className="bf-mani-screen-dot" style={{ background: '#28C840' }} />
      </span>
      <span className="bf-mani-screen-body">
        <span className="bf-mani-screen-line" style={{ width: '72%' }} />
        <span className="bf-mani-screen-line" style={{ width: '52%' }} />
        <span className="bf-mani-screen-line" style={{ width: '38%' }} />
      </span>
    </span>
  );
}

// ─── Inline visual: SVG flowing curve connector ───────────────────

function InlineCurve() {
  return (
    <span className="bf-mani-sep" aria-hidden="true">
      <svg
        width="72"
        height="32"
        viewBox="0 0 72 32"
        fill="none"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <path
          d="M 0 16 C 12 4 24 2 36 16 C 48 30 60 28 72 16"
          stroke="rgba(115,87,255,0.45)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}

// ─── Inline visual: crosshair / coordinate marker ─────────────────

function InlineCrosshair() {
  return (
    <span className="bf-mani-sep" aria-hidden="true">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        style={{ display: 'block' }}
      >
        <circle cx="14" cy="14" r="5" stroke="rgba(115,87,255,0.5)" strokeWidth="1" />
        <line x1="14" y1="0" x2="14" y2="8"  stroke="rgba(115,87,255,0.35)" strokeWidth="1" strokeLinecap="round" />
        <line x1="14" y1="20" x2="14" y2="28" stroke="rgba(115,87,255,0.35)" strokeWidth="1" strokeLinecap="round" />
        <line x1="0"  y1="14" x2="8"  y2="14" stroke="rgba(115,87,255,0.35)" strokeWidth="1" strokeLinecap="round" />
        <line x1="20" y1="14" x2="28" y2="14" stroke="rgba(115,87,255,0.35)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// ─── Inline visual: small project/preview frame ───────────────────

function InlineProjectFrame() {
  return (
    <span
      className="bf-mani-screen"
      aria-hidden="true"
      style={{
        width: 'clamp(58px,6vw,92px)',
        height: 'clamp(40px,4vw,62px)',
        borderColor: 'rgba(115,87,255,0.5)',
      }}
    >
      <span className="bf-mani-screen-chrome" style={{ background: 'rgba(115,87,255,0.08)' }}>
        <span className="bf-mani-screen-dot" style={{ background: 'rgba(115,87,255,0.6)' }} />
        <span className="bf-mani-screen-dot" style={{ background: 'rgba(115,87,255,0.35)' }} />
      </span>
      <span className="bf-mani-screen-body" style={{ background: 'rgba(115,87,255,0.04)' }}>
        <span className="bf-mani-screen-line" style={{ width: '80%', background: 'rgba(115,87,255,0.25)' }} />
        <span className="bf-mani-screen-line" style={{ width: '55%', background: 'rgba(115,87,255,0.15)' }} />
      </span>
    </span>
  );
}

// ─── Continuation entry line (echoes Journey path's final move) ───

function EntryLine() {
  return (
    <span className="bf-mani-entry" aria-hidden="true">
      <svg width="120" height="2" viewBox="0 0 120 2" fill="none" style={{ display: 'block' }}>
        <line
          x1="0" y1="1" x2="120" y2="1"
          stroke="url(#mani-entry-grad)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="mani-entry-grad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#7357FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7357FF" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

// ─── Desktop horizontal track content ────────────────────────────

function DesktopTrack() {
  return (
    <div className="bf-manifesto-track" aria-hidden="true">
      {/* Entry continuation from Journey */}
      <EntryLine />

      {/* Strategy gives it */}
      <span className="bf-mani-text">Strategy gives it</span>
      <span className="bf-mani-space" style={{ width: 'clamp(0.5rem,1.2vw,1.5rem)' }} />

      {/* DIRECTION — violet fill */}
      <span className="bf-mani-word bf-mani-violet">DIRECTION</span>

      {/* browser frame visual */}
      <InlineBrowserFrame />

      {/* design gives it */}
      <span className="bf-mani-text">design gives it</span>
      <span className="bf-mani-space" style={{ width: 'clamp(0.5rem,1.2vw,1.5rem)' }} />

      {/* CHARACTER — outline type */}
      <span className="bf-mani-word bf-mani-outline">CHARACTER</span>

      {/* SVG curve separator */}
      <InlineCurve />

      {/* development gives it */}
      <span className="bf-mani-text">development gives it</span>
      <span className="bf-mani-space" style={{ width: 'clamp(0.5rem,1.2vw,1.5rem)' }} />

      {/* LIFE — violet fill */}
      <span className="bf-mani-word bf-mani-violet">LIFE</span>

      {/* crosshair separator */}
      <InlineCrosshair />

      {/* performance keeps it */}
      <span className="bf-mani-text">performance keeps it</span>
      <span className="bf-mani-space" style={{ width: 'clamp(0.5rem,1.2vw,1.5rem)' }} />

      {/* MOVING — italic weight shift */}
      <span className="bf-mani-word bf-mani-italic">MOVING</span>

      {/* project frame visual */}
      <InlineProjectFrame />

      {/* and every */}
      <span className="bf-mani-text">and every</span>
      <span className="bf-mani-space" style={{ width: 'clamp(0.5rem,1.2vw,1.5rem)' }} />

      {/* FRAME — italic + border box */}
      <span className="bf-mani-word bf-mani-frame-word">FRAME</span>
      <span className="bf-mani-space" style={{ width: 'clamp(0.5rem,1.2vw,1.5rem)' }} />

      {/* should earn its place. */}
      <span className="bf-mani-text bf-mani-tail">should earn its place.</span>

      {/* breathing room at end */}
      <span className="bf-mani-end-pad" />
    </div>
  );
}

// ─── Mobile vertical stack ────────────────────────────────────────

function MobileStack() {
  return (
    <div className="bf-manifesto-mobile">
      {/* Section metadata */}
      <div className="bf-mani-meta">
        <span className="bf-micro">BFS / MANIFESTO</span>
      </div>

      <div className="bf-mani-phrase">
        <span className="bf-mani-phrase-small">Strategy gives it</span>
        <span className="bf-mani-phrase-big bf-mani-violet">DIRECTION</span>
      </div>

      <InlineBrowserFrame />

      <div className="bf-mani-phrase" style={{ marginTop: 'clamp(1.5rem,4vw,2.5rem)' }}>
        <span className="bf-mani-phrase-small">design gives it</span>
        <span className="bf-mani-phrase-big bf-mani-outline">CHARACTER</span>
      </div>

      <InlineCurve />

      <div className="bf-mani-phrase" style={{ marginTop: 'clamp(1rem,3vw,2rem)' }}>
        <span className="bf-mani-phrase-small">development gives it</span>
        <span className="bf-mani-phrase-big bf-mani-violet">LIFE</span>
      </div>

      <InlineCrosshair />

      <div className="bf-mani-phrase" style={{ marginTop: 'clamp(1rem,3vw,2rem)' }}>
        <span className="bf-mani-phrase-small">performance keeps it</span>
        <span className="bf-mani-phrase-big bf-mani-italic">MOVING</span>
      </div>

      <InlineProjectFrame />

      <div className="bf-mani-phrase" style={{ marginTop: 'clamp(1.5rem,4vw,2.5rem)' }}>
        <span className="bf-mani-phrase-small">and every</span>
        <span className="bf-mani-phrase-big bf-mani-frame-word">FRAME</span>
        <span className="bf-mani-phrase-small" style={{ marginTop: '0.25em' }}>should earn its place.</span>
      </div>
    </div>
  );
}

// ─── Main Manifesto section ───────────────────────────────────────

export function Manifesto() {
  const sectionRef  = useRef<HTMLElement>(null);
  const pinRef      = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const rm          = useReducedMotion() ?? false;

  // Accessible readable version of the sentence for screen readers
  const accessibleText =
    'Strategy gives it direction — design gives it character — development gives it life — performance keeps it moving — and every frame should earn its place.';

  useEffect(() => {
    // Skip on mobile/tablet or reduced-motion — vertical layout is shown via CSS
    const isMobile = () => window.innerWidth < 768;
    if (rm || isMobile()) return;

    const pin   = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    let st: ScrollTrigger | null = null;

    function buildTrigger() {
      if (!pin || !track) return;

      // Kill any previous trigger for this element
      ScrollTrigger.getAll()
        .filter(t => t.vars?.id === 'bf-manifesto')
        .forEach(t => t.kill());

      const travelDistance = track.scrollWidth - window.innerWidth;
      if (travelDistance <= 0) return;

      st = ScrollTrigger.create({
        id: 'bf-manifesto',
        trigger: pin,
        start: 'top top',
        end: () => `+=${travelDistance}`,
        pin: true,
        scrub: 0.85,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!track) return;
          gsap.set(track, {
            x: -travelDistance * self.progress,
            force3D: true,
          });
        },
        onRefresh: (self) => {
          if (!track) return;
          const newTravel = track.scrollWidth - window.innerWidth;
          gsap.set(track, {
            x: -newTravel * self.progress,
            force3D: true,
          });
        },
      });
    }

    // Wait for fonts then measure; rAF ensures layout is fully committed
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        buildTrigger();
        // One additional refresh after a minimal delay handles
        // any late layout shifts from images/icons
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    });

    // Resize: rebuild the trigger so measurements stay accurate
    const ro = new ResizeObserver(() => {
      if (isMobile()) {
        ScrollTrigger.getAll()
          .filter(t => t.vars?.id === 'bf-manifesto')
          .forEach(t => t.kill());
        gsap.set(track, { x: 0 });
        return;
      }
      buildTrigger();
    });
    ro.observe(document.documentElement);

    return () => {
      ro.disconnect();
      st?.kill();
      if (track) gsap.set(track, { x: 0 });
    };
  }, [rm]);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="bf-manifesto-section"
      aria-label="BoldFrame studio philosophy"
    >
      {/* Hidden accessible text for screen readers */}
      <p className="sr-only">{accessibleText}</p>

      {/* Continuation line from Journey */}
      <div className="bf-manifesto-transition" aria-hidden="true">
        <div className="bf-manifesto-transition-line" />
      </div>

      {/* ── Desktop: pinned horizontal track ── */}
      <div ref={pinRef} className="bf-manifesto-pin" aria-hidden="true">
        <div ref={trackRef}>
          <DesktopTrack />
        </div>
      </div>

      {/* ── Mobile: vertical editorial stack ── */}
      <MobileStack />
    </section>
  );
}
