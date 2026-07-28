/**
 * BoldFrame Featured Work — Cinematic frame expansion
 *
 * Phase 1 (0–15%):   framed project object settles into view
 * Phase 2 (15–60%):  frame expands — metadata counter-motion
 * Phase 3 (60–80%):  border radius resolves, border fades
 * Phase 4 (80–100%): immersive viewport-scale state + overlay + exit cue
 *
 * Fixed in this revision:
 *  - Section 12:  rAF pointer follower (desktop only, immersive phase only)
 *  - Section 15:  aria-hidden removed from overlay (contains real <a>)
 *  - Section 15:  meaningful alt text
 *  - Section 15:  reduced-motion adds .bf-fw-rm class — CSS collapses height
 *  - Section 16:  ResizeObserver scoped to section, debounced
 *  - Section 16:  will-change removed from img CSS (controlled by GSAP)
 *  - Section 16:  aspect-ratio on frame prevents layout shift
 */

import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Real project data ────────────────────────────────────────────

const FEATURED_PROJECT = {
  index:    '001',
  title:    'Huuman',
  type:     'Digital Experience',
  services: 'Strategy / Design / Development',
  category: 'Frontend Web App · Brand Experience Redesign',
  tech:     ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Shery.js'],
  image:    '/p1.webp',
  // Meaningful alt text — describes the actual visual content
  imageAlt: 'Huuman brand experience website — cinematic hero with GSAP motion and full-bleed typography',
  url:      'https://huuman-responsive-updated.vercel.app/',
} as const;

// ─── Lerp helper ─────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ─── Main component ───────────────────────────────────────────────

export function FeaturedWork() {
  const sectionRef   = useRef<HTMLElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const frameRef     = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLImageElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const cornersRef   = useRef<HTMLDivElement>(null);
  const exitRef      = useRef<HTMLDivElement>(null);
  const followerRef  = useRef<HTMLDivElement>(null);

  const rm = useReducedMotion() ?? false;

  // ── Pointer follower (Section 12) ────────────────────────────────
  useEffect(() => {
    const frame    = frameRef.current;
    const follower = followerRef.current;
    if (!frame || !follower) return;

    // Disable on touch / mobile
    const isTouch = window.matchMedia('(pointer: coarse), (max-width: 767px)').matches;
    if (isTouch || rm) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isVisible = false;

    // Read current scroll progress from GSAP ST so follower only shows in immersive phase
    function getProgress(): number {
      const st = ScrollTrigger.getById('bf-featured-work');
      return st ? st.progress : 0;
    }

    function tick() {
      rafId = requestAnimationFrame(tick);
      const p = getProgress();

      if (p > 0.76 && isVisible) {
        currentX = lerp(currentX, targetX, 0.10);
        currentY = lerp(currentY, targetY, 0.10);
        gsap.set(follower, {
          x: currentX,
          y: currentY,
          force3D: true,
        });
      }
    }

    function onEnter(e: MouseEvent) {
      const p = getProgress();
      if (p <= 0.76) return;
      const rect = frame.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      currentX = targetX;
      currentY = targetY;
      isVisible = true;
      gsap.to(follower, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
    }

    function onMove(e: MouseEvent) {
      const rect = frame.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      const p = getProgress();
      if (p > 0.76 && !isVisible) {
        isVisible = true;
        gsap.to(follower, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' });
      } else if (p <= 0.76 && isVisible) {
        isVisible = false;
        gsap.to(follower, { opacity: 0, scale: 0.85, duration: 0.15, ease: 'power2.in' });
      }
    }

    function onLeave() {
      isVisible = false;
      gsap.to(follower, { opacity: 0, scale: 0.85, duration: 0.2, ease: 'power2.in' });
    }

    // Initialise follower off-screen
    gsap.set(follower, { opacity: 0, scale: 0.85, xPercent: -50, yPercent: -50 });

    rafId = requestAnimationFrame(tick);
    frame.addEventListener('mouseenter', onEnter, { passive: true });
    frame.addEventListener('mousemove', onMove,  { passive: true });
    frame.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      frame.removeEventListener('mouseenter', onEnter);
      frame.removeEventListener('mousemove', onMove);
      frame.removeEventListener('mouseleave', onLeave);
    };
  }, [rm]);

  // ── Main scroll animation (Section 16) ────────────────────────────
  useEffect(() => {
    const section  = sectionRef.current;
    const sticky   = stickyRef.current;
    const frame    = frameRef.current;
    const img      = imgRef.current;
    const meta     = metaRef.current;
    const titleEl  = titleRef.current;
    const overlay  = overlayRef.current;
    const corners  = cornersRef.current;
    const exit     = exitRef.current;
    if (!section || !sticky || !frame || !img || !meta || !titleEl || !overlay || !exit) return;

    // Reduced motion: section gets class, CSS handles everything statically
    if (rm) {
      section.classList.add('bf-fw-rm');
      return () => section.classList.remove('bf-fw-rm');
    }

    let ctx: gsap.Context | null = null;
    let resizeTimer = 0;

    function buildAnimation() {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isMobile = vw < 768;

        // ── Initial frame geometry ───────────────────────────────
        const initW = isMobile ? vw * 0.90 : vw * 0.50;
        const initH = initW * (9 / 16);
        const initL = isMobile ? (vw - initW) / 2 : vw * 0.53 - initW / 2;
        const initT = isMobile ? vh * 0.30 : vh * 0.50 - initH / 2;

        gsap.set(frame, {
          position: 'absolute',
          width:    initW,
          height:   initH,
          left:     initL,
          top:      initT,
          borderRadius: 18,
          overflow: 'hidden',
        });

        gsap.set([meta, titleEl], { opacity: 1, y: 0 });
        gsap.set(overlay, { opacity: 0 });
        gsap.set(exit,    { opacity: 0, y: 10 });
        if (corners) gsap.set(corners, { opacity: 0 });

        // ── Scrubbed timeline ────────────────────────────────────
        const tl = gsap.timeline({ paused: true });

        // 0.15–0.75 — frame expands to viewport
        tl.to(frame, {
          width: vw, height: vh, left: 0, top: 0, borderRadius: 0,
          ease: 'none', duration: 0.60,
        }, 0.15);

        // 0.15–0.55 — image settles (subtle counter-scale)
        tl.fromTo(img,
          { scale: 1.04, yPercent: isMobile ? 1 : 2 },
          { scale: 1.0,  yPercent: 0, ease: 'none', duration: 0.40 },
          0.15
        );

        // 0.15–0.55 — metadata drifts up + fades
        tl.to(meta, { y: isMobile ? -14 : -20, opacity: 0.25, ease: 'none', duration: 0.40 }, 0.15);

        // 0.15–0.50 — title drifts down (tension)
        tl.to(titleEl, { y: isMobile ? 18 : 30, opacity: 0.12, ease: 'none', duration: 0.35 }, 0.15);

        // 0.72–0.82 — BOLD/FRAME corner marks flash
        if (corners && !isMobile) {
          tl.to(corners, { opacity: 1, ease: 'none', duration: 0.06 }, 0.72);
          tl.to(corners, { opacity: 0, ease: 'power2.in', duration: 0.08 }, 0.82);
        }

        // 0.76–0.92 — overlay fades in
        tl.to(overlay, { opacity: 1, ease: 'none', duration: 0.16 }, 0.76);

        // 0.88–1.00 — exit cue appears
        tl.to(exit, { opacity: 1, y: 0, ease: 'none', duration: 0.12 }, 0.88);

        ScrollTrigger.create({
          id:                  'bf-featured-work',
          trigger:             section,
          start:               'top top',
          end:                 isMobile ? '+=140vh' : '+=200vh',
          pin:                 sticky,
          scrub:               1.1,
          invalidateOnRefresh: true,
          anticipatePin:       1,
          animation:           tl,
        });
      }, section);
    }

    // Wait for fonts + image before measuring (prevents wrong initH on slow loads)
    const imgEl = img;
    function whenReady() {
      requestAnimationFrame(() => {
        buildAnimation();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }

    document.fonts.ready.then(() => {
      if (imgEl.complete) {
        whenReady();
      } else {
        imgEl.addEventListener('load', whenReady, { once: true });
        // Fallback if load event already fired
        setTimeout(whenReady, 200);
      }
    });

    // ResizeObserver scoped to section element, debounced 120ms
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        requestAnimationFrame(buildAnimation);
      }, 120);
    });
    ro.observe(section);

    return () => {
      clearTimeout(resizeTimer);
      ro.disconnect();
      ctx?.revert();
      ScrollTrigger.getAll()
        .filter(t => t.vars?.id === 'bf-featured-work')
        .forEach(t => t.kill());
    };
  }, [rm]);

  const { title, type, services, category, index, image, imageAlt, url } = FEATURED_PROJECT;

  return (
    <section
      ref={sectionRef}
      id="featured-work"
      className="bf-fw-section"
      aria-label={`Featured project: ${title}`}
    >
      <div ref={stickyRef} className="bf-fw-sticky">

        {/* ── Metadata — counter-moves up ───────────────────────── */}
        <div ref={metaRef} className="bf-fw-meta" aria-hidden="true">
          <span className="bf-micro">FEATURED / {index}</span>
        </div>

        {/* ── Title block — counter-moves down ─────────────────── */}
        <div ref={titleRef} className="bf-fw-title-block">
          <div className="bf-fw-project-name">{title}</div>
          <div className="bf-fw-project-type">{type}</div>
          <div className="bf-fw-project-services">{services}</div>
        </div>

        {/* ── Expanding frame ───────────────────────────────────── */}
        <div ref={frameRef} className="bf-fw-frame">
          <img
            ref={imgRef}
            src={image}
            alt={imageAlt}
            className="bf-fw-img"
            loading="eager"
            decoding="async"
            width="1600"
            height="900"
          />

          {/* Two-corner crop marks on initial frame */}
          <div className="bf-fw-frame-mark-tr" aria-hidden="true" />
          <div className="bf-fw-frame-mark-bl" aria-hidden="true" />

          {/* Pointer follower — desktop only, immersive phase only */}
          <div ref={followerRef} className="bf-fw-follower" aria-hidden="true">
            <span>VIEW</span>
            <span>PROJECT&nbsp;↗</span>
          </div>
        </div>

        {/* ── BOLD/FRAME viewport corner marks ─────────────────── */}
        <div ref={cornersRef} className="bf-fw-corners" aria-hidden="true">
          <span className="bf-fw-corner bf-fw-corner-tl" />
          <span className="bf-fw-corner bf-fw-corner-tr" />
          <span className="bf-fw-corner bf-fw-corner-bl" />
          <span className="bf-fw-corner bf-fw-corner-br" />
        </div>

        {/* ── Immersive overlay ─────────────────────────────────── */}
        {/* NOTE: aria-hidden removed — contains real interactive link */}
        <div ref={overlayRef} className="bf-fw-overlay">
          <div className="bf-fw-overlay-info" aria-label={`Project: ${title}, ${category}`}>
            <span className="bf-fw-overlay-title">{title}</span>
            <span className="bf-fw-overlay-category">{category}</span>
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="bf-fw-overlay-cta"
              aria-label={`View the ${title} project — opens in new tab`}
            >
              VIEW PROJECT<span className="bf-fw-cta-arrow" aria-hidden="true">&nbsp;↗</span>
            </a>
          )}
        </div>

        {/* ── Exit cue ─────────────────────────────────────────── */}
        <div ref={exitRef} className="bf-fw-exit" aria-hidden="true">
          <span className="bf-fw-exit-label">001 / FEATURED</span>
          <span className="bf-fw-exit-rule" />
          <span className="bf-fw-exit-more">MORE WORK AHEAD&nbsp;→</span>
        </div>

      </div>
    </section>
  );
}
