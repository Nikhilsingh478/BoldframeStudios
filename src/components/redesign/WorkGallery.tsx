/**
 * WorkGallery — Sticky horizontal project exhibition (Chunk 2B)
 *
 * Vertical scroll drives a horizontal track left through 5 real projects.
 * Each project has a distinct composition variant (A / B / C / D / A2).
 * GSAP ScrollTrigger pins the sticky viewport and moves the track.
 * Center-focus system promotes the nearest project via opacity + scale +
 *   metadata color shift + accent line expansion + crop mark reveal.
 * Internal differential motion: image parallax, metadata x-drift, index
 *   number vertical float, crop marks resolve at center.
 * Progress indicator (02 ━ 03 ━ … 06) updates via direct DOM manipulation.
 * §20 Exit composition: "NOT EVERYTHING / NEEDS THE / SAME FRAME." resolves
 *   as track completes, with a ↓ directional marker implying vertical return.
 *
 * Mobile: no pin — vertical stacked editorial layout.
 * Reduced motion: pin suppressed, static stacked layout rendered via CSS.
 *
 * Initialization order (critical — spec §07 / §08):
 *   useLayoutEffect → document.fonts.ready → rAF → buildGallery → rAF → ST.refresh()
 * ResizeObserver on section (single, gallery-level), debounced 140ms.
 * Only kills triggers with id 'bf-gallery' — does NOT call ST.getAll().kill().
 */

import { useRef, useLayoutEffect, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Real project data ───────────────────────────────────────────────────────
// Sourced from Work.tsx. Huuman (001) is excluded — it is the FeaturedWork hero.

const GALLERY_PROJECTS = [
  {
    id:       'roseberry',
    index:    '002',
    title:    'Roseberry',
    subtitle: 'Massage Spa',
    category: 'Booking-Focused Landing Page',
    year:     '2024',
    services: 'Design — Development',
    image:    '/p2.webp',
    alt:      'Roseberry Massage Spa — booking-first landing page with warm palette and GSAP motion',
    url:      'https://spas-one.vercel.app/',
    variant:  'A',
    gapAfter: '10vw',
  },
  {
    id:       'hbl',
    index:    '003',
    title:    'HBL',
    subtitle: 'Company Redesign',
    category: 'Corporate UI Redesign',
    year:     '2024',
    services: 'Design — Development',
    image:    '/p3.webp',
    alt:      'HBL corporate website — clean minimal redesign with Locomotive Scroll',
    url:      'https://hbl-eight.vercel.app/',
    variant:  'B',
    gapAfter: '14vw',
  },
  {
    id:       'tea',
    index:    '004',
    title:    'Organic',
    subtitle: 'Green Tea Store',
    category: 'E-commerce Frontend',
    year:     '2024',
    services: 'Design — Development',
    image:    '/p4.webp',
    alt:      'Organic Green Tea Store — conversion-focused e-commerce with admin dashboard',
    url:      'https://organic-india-clone-garden.vercel.app/',
    variant:  'C',
    gapAfter: '8vw',
  },
  {
    id:       'halloween',
    index:    '005',
    title:    'Halloween',
    subtitle: 'Creative Landing Page',
    category: 'Seasonal Campaign',
    year:     '2024',
    services: 'Motion — Development',
    image:    '/p5.webp',
    alt:      'Halloween creative webpage — spooky GSAP micro-interactions and seasonal motion',
    url:      'https://halloween-two-rho.vercel.app/',
    variant:  'D',
    gapAfter: '12vw',
  },
  {
    id:       'christmas',
    index:    '006',
    title:    'Christmas',
    subtitle: 'Parallax Experience',
    category: 'Festive Campaign',
    year:     '2024',
    services: 'Motion — Development',
    image:    '/p6.webp',
    alt:      'Christmas parallax webpage — layered Rellax.js festive composition',
    url:      'https://christmas-webpage.vercel.app/',
    variant:  'A2',
    gapAfter: '0',
  },
] as const;

type GalleryProject = (typeof GALLERY_PROJECTS)[number];

// ─── Single project item ─────────────────────────────────────────────────────

interface GalleryItemProps {
  project:      GalleryProject;
  frameRef:     (el: HTMLDivElement | null) => void;
  imageRef:     (el: HTMLImageElement | null) => void;
  metaRef:      (el: HTMLDivElement | null) => void;
  indexNumRef:  (el: HTMLSpanElement | null) => void;
  accentRef:    (el: HTMLDivElement | null) => void;
}

function GalleryItem({ project, frameRef, imageRef, metaRef, indexNumRef, accentRef }: GalleryItemProps) {
  const { index, title, subtitle, category, year, services, image, alt, url, variant, gapAfter } = project;

  const meta = (
    <div className={`bf-gi-meta bf-gi-meta--${variant}`} ref={metaRef}>
      <span className="bf-gi-index" ref={indexNumRef}>{index}</span>
      <div className="bf-gi-name-block">
        <h3 className="bf-gi-title">{title}</h3>
        {subtitle && <span className="bf-gi-subtitle">{subtitle}</span>}
      </div>
      <span className="bf-gi-category">{category}</span>
      <div className="bf-gi-meta-row">
        <span className="bf-gi-services">{services}</span>
        {year && <span className="bf-gi-year">{year}</span>}
      </div>
      {/* Accent line — expands as project approaches center focus */}
      <div className="bf-gi-accent-line" ref={accentRef} aria-hidden="true" />
    </div>
  );

  const frame = (
    <div className={`bf-gi-frame bf-gi-frame--${variant}`} ref={frameRef}>
      {/* Crop marks — top-left and bottom-right corners; resolve at center focus */}
      <div className="bf-gi-crop-tl" aria-hidden="true" />
      <div className="bf-gi-crop-br" aria-hidden="true" />

      <img
        ref={imageRef}
        src={image}
        alt={alt}
        className="bf-gi-img"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 66vw"
      />
    </div>
  );

  const cta = url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bf-gi-cta"
      aria-label={`View ${title} project — opens in new tab`}
    >
      <span className="bf-gi-cta-text">VIEW PROJECT</span>
      <span className="bf-gi-cta-arrow" aria-hidden="true">↗</span>
    </a>
  ) : null;

  return (
    <div
      className={`bf-gi bf-gi--${variant}`}
      style={{ marginRight: gapAfter }}
      aria-label={`Project ${index}: ${title}`}
    >
      {variant === 'B' ? (
        /* TYPE B: meta left, frame right */
        <>
          <div className="bf-gi-aside">
            {meta}
            {cta}
          </div>
          {frame}
        </>
      ) : (
        /* TYPE A / A2 / C / D: frame on top, meta below */
        <>
          {frame}
          <div className="bf-gi-below">
            {meta}
            {cta}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Progress indicator ──────────────────────────────────────────────────────

function GalleryProgress({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={containerRef} className="bf-gp" aria-hidden="true">
      <div className="bf-gp-indices">
        {GALLERY_PROJECTS.map((p, i) => (
          <span key={p.id} className={`bf-gp-item${i === 0 ? ' bf-gp-active' : ''}`}>
            {p.index}
            {i < GALLERY_PROJECTS.length - 1 && (
              <span className="bf-gp-dash" />
            )}
          </span>
        ))}
      </div>
      {/* Thin overall progress line */}
      <div className="bf-gp-bar">
        <div className="bf-gp-fill" />
      </div>
    </div>
  );
}

// ─── Main gallery section ────────────────────────────────────────────────────

export function WorkGallery() {
  const sectionRef  = useRef<HTMLElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Ref arrays populated by callback refs during render
  const frameRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs    = useRef<(HTMLImageElement | null)[]>([]);
  const metaRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const indexNumRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const accentRefs   = useRef<(HTMLDivElement | null)[]>([]);
  // §20 Exit composition refs — lines + directional marker
  const exitLine1Ref  = useRef<HTMLSpanElement>(null);
  const exitLine2Ref  = useRef<HTMLSpanElement>(null);
  const exitLine3Ref  = useRef<HTMLSpanElement>(null);
  const exitArrowRef  = useRef<HTMLDivElement>(null);

  const rm = useReducedMotion() ?? false;

  // updateProgress is called inside GSAP onUpdate — stable ref to avoid stale closure
  const updateProgress = useCallback((p: number) => {
    const el = progressRef.current;
    if (!el) return;

    // Update active index text
    const items = el.querySelectorAll<HTMLElement>('.bf-gp-item');
    const n = GALLERY_PROJECTS.length;
    const activeIdx = Math.min(Math.floor(p * n + 0.15), n - 1);
    items.forEach((item, i) => item.classList.toggle('bf-gp-active', i === activeIdx));

    // Update progress fill bar
    const fill = el.querySelector<HTMLElement>('.bf-gp-fill');
    if (fill) fill.style.transform = `scaleX(${p})`;
  }, []);

  useLayoutEffect(() => {
    const section  = sectionRef.current;
    const sticky   = stickyRef.current;
    const track    = trackRef.current;
    if (!section || !sticky || !track || rm) return;

    let ctx: gsap.Context | null = null;
    let resizeTimer = 0;

    function buildGallery() {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isMobile = vw < 768;

        if (isMobile) {
          // Mobile: reset any leftover inline styles; CSS handles stacked layout
          section.style.height = '';
          gsap.set(track, { x: 0, clearProps: 'x' });
          return;
        }

        // Measure actual travel distance from live DOM
        const distance = track.scrollWidth - vw;
        if (distance <= 0) return;

        // Set section height so scroll space = pin duration + horizontal travel
        section.style.height = `${vh + distance}px`;

        // ── Initial states for differential-motion elements ─────────
        // Crop marks start dim (resolve toward center)
        frameRefs.current.forEach((frame) => {
          if (!frame) return;
          const tl = frame.querySelector<HTMLElement>('.bf-gi-crop-tl');
          const br = frame.querySelector<HTMLElement>('.bf-gi-crop-br');
          if (tl) gsap.set(tl, { opacity: 0.18 });
          if (br) gsap.set(br, { opacity: 0.18 });
        });
        // Accent lines start collapsed
        accentRefs.current.forEach((el) => {
          if (el) gsap.set(el, { scaleX: 0, transformOrigin: 'left' });
        });
        // §20 Exit lines start invisible and offset down
        [exitLine1Ref, exitLine2Ref, exitLine3Ref, exitArrowRef].forEach(r => {
          if (r.current) gsap.set(r.current, { opacity: 0, y: 10 });
        });

        // ── Main horizontal tween ──────────────────────────────────────
        gsap.to(track, {
          x:    -distance,
          ease: 'none',
          scrollTrigger: {
            id:                  'bf-gallery',
            trigger:             section,
            start:               'top top',
            end:                 () => `+=${distance}`,
            pin:                 sticky,
            scrub:               0.7,
            invalidateOnRefresh: true,
            anticipatePin:       1,

            onUpdate(self) {
              const p = self.progress;

              // ── §09 Internal image parallax (−3% → +3% over full scroll) ──
              imageRefs.current.forEach((img) => {
                if (img) gsap.set(img, { xPercent: 3 - p * 6 });
              });

              // ── §09 Metadata x-drift (slightly lagging differential) ──
              // Each meta block drifts 20px opposite to scroll direction at a
              // rate 15% slower than the track — simulating parallax depth.
              metaRefs.current.forEach((meta, i) => {
                if (!meta) return;
                const frame = frameRefs.current[i];
                if (!frame) return;
                const rect    = frame.getBoundingClientRect();
                const centerX = (rect.left + rect.right) / 2;
                const dist    = centerX - vw / 2;  // signed: negative = left of center
                // Pull metadata slightly opposite — creates tension with frame
                const xShift  = Math.max(-20, Math.min(20, dist * 0.04));
                gsap.set(meta, { x: xShift });
              });

              // ── §09 Index number subtle vertical float ─────────────────
              indexNumRefs.current.forEach((num, i) => {
                if (!num) return;
                const frame = frameRefs.current[i];
                if (!frame) return;
                const rect    = frame.getBoundingClientRect();
                const centerX = (rect.left + rect.right) / 2;
                const dist    = Math.abs(centerX - vw / 2);
                // Float up 4px when out of focus, settle at 0 when in center
                const yFloat  = Math.min(4, dist * 0.008);
                gsap.set(num, { y: yFloat });
              });

              // ── §10 Center-focus: promote nearest project ─────────────
              const viewportCenter = vw / 2;
              frameRefs.current.forEach((frame, i) => {
                if (!frame) return;
                const rect     = frame.getBoundingClientRect();
                const centerX  = (rect.left + rect.right) / 2;
                const absDist  = Math.abs(centerX - viewportCenter);
                // Normalised: 1 = fully focused (center), 0 = muted (>55vw away)
                const focus    = Math.max(0, 1 - absDist / (vw * 0.55));

                // Item opacity: 0.72 → 1.0
                const item = frame.closest('.bf-gi') as HTMLElement | null;
                if (item)  gsap.set(item,  { opacity: 0.72 + 0.28 * focus });

                // Frame scale: 0.985 → 1.0
                gsap.set(frame, { scale: 0.985 + 0.015 * focus });

                // §09 Crop marks resolve (dim → full opacity) at center focus
                const cropTL = frame.querySelector<HTMLElement>('.bf-gi-crop-tl');
                const cropBR = frame.querySelector<HTMLElement>('.bf-gi-crop-br');
                const cropOpacity = 0.18 + 0.62 * focus;  // 0.18 → 0.80
                if (cropTL) gsap.set(cropTL, { opacity: cropOpacity });
                if (cropBR) gsap.set(cropBR, { opacity: cropOpacity });

                // §10 Metadata color: muted → near-white
                // Using CSS custom prop via JS for smooth transition
                const meta = metaRefs.current[i];
                if (meta) {
                  // Category and services drift from tertiary to secondary at focus
                  const cat  = meta.querySelector<HTMLElement>('.bf-gi-category');
                  const srv  = meta.querySelector<HTMLElement>('.bf-gi-services');
                  const yr   = meta.querySelector<HTMLElement>('.bf-gi-year');
                  const opacityMeta = 0.45 + 0.55 * focus;
                  if (cat) cat.style.opacity = String(opacityMeta);
                  if (srv) srv.style.opacity = String(opacityMeta);
                  if (yr)  yr.style.opacity  = String(opacityMeta);
                  // Title stays near-white but lifts slightly in focus
                  const titleEl = meta.querySelector<HTMLElement>('.bf-gi-title');
                  if (titleEl) titleEl.style.opacity = String(0.75 + 0.25 * focus);
                }

                // §10 Accent line expands at center focus (scaleX 0 → 1)
                const accent = accentRefs.current[i];
                if (accent) gsap.set(accent, { scaleX: focus });
              });

              // ── §20 Exit composition — staggered line reveal ───────────
              // Lines fade in + settle as track approaches completion.
              // Thresholds: line1 @ 0.78, line2 @ 0.84, line3 @ 0.90, arrow @ 0.93
              // Each window is 8% of total travel — keeps the reveal tight.
              function lineState(start: number, window: number = 0.08) {
                const t = Math.max(0, Math.min(1, (p - start) / window));
                return { opacity: t, y: 10 - t * 10 };
              }
              const l1 = lineState(0.78);
              const l2 = lineState(0.84);
              const l3 = lineState(0.90);
              const la = lineState(0.93, 0.06);
              if (exitLine1Ref.current)  gsap.set(exitLine1Ref.current,  { opacity: l1.opacity, y: l1.y });
              if (exitLine2Ref.current)  gsap.set(exitLine2Ref.current,  { opacity: l2.opacity, y: l2.y });
              if (exitLine3Ref.current)  gsap.set(exitLine3Ref.current,  { opacity: l3.opacity, y: l3.y });
              if (exitArrowRef.current)  gsap.set(exitArrowRef.current,  { opacity: la.opacity, y: la.y });

              // ── Progress indicator ─────────────────────────────────────
              updateProgress(p);
            },
          },
        });
      }, section);
    }

    // Wait for fonts + one rAF for CSS to finish before measuring track width
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        buildGallery();
        // Second rAF: let other ST triggers (Manifesto, FeaturedWork) insert
        // pin-spacers so our section offset is accurate before ST.refresh()
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    });

    // Debounced ResizeObserver scoped to this section
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        requestAnimationFrame(buildGallery);
      }, 140);
    });
    ro.observe(section);

    return () => {
      clearTimeout(resizeTimer);
      ro.disconnect();
      ctx?.revert();
      // Kill ONLY this gallery's trigger — never ST.getAll().kill()
      ScrollTrigger.getAll()
        .filter(t => t.vars?.id === 'bf-gallery')
        .forEach(t => t.kill());
      section.style.height = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rm, updateProgress]);

  return (
    <section
      ref={sectionRef}
      id="work-gallery"
      className="bf-gallery-section"
      aria-label="Project exhibition — horizontal gallery"
    >
      <div ref={stickyRef} className="bf-gallery-sticky">

        {/* ── Section meta label ──────────────────────────────────── */}
        <div className="bf-gallery-header" aria-hidden="true">
          <span className="bf-micro">SELECTED WORK / 002 — 006</span>
        </div>

        {/* ── Horizontal track ────────────────────────────────────── */}
        <div ref={trackRef} className="bf-gallery-track">

          {/* Intro breathing space */}
          <div className="bf-gallery-intro-space" aria-hidden="true" />

          {GALLERY_PROJECTS.map((project, i) => (
            <GalleryItem
              key={project.id}
              project={project}
              frameRef={(el)    => { frameRefs.current[i]    = el; }}
              imageRef={(el)    => { imageRefs.current[i]    = el; }}
              metaRef={(el)     => { metaRefs.current[i]     = el; }}
              indexNumRef={(el) => { indexNumRefs.current[i] = el; }}
              accentRef={(el)   => { accentRefs.current[i]   = el; }}
            />
          ))}

          {/* ── §20 Exit composition — editorial negative space ─── */}
          <div className="bf-gallery-exit-space" aria-label="End of project exhibition">
            <div className="bf-gex-inner">
              <p className="bf-gex-statement" aria-label="Not everything needs the same frame">
                <span className="bf-gex-line bf-gex-line--1" ref={exitLine1Ref}>NOT EVERYTHING</span>
                <span className="bf-gex-line bf-gex-line--2" ref={exitLine2Ref}>NEEDS THE</span>
                <span className="bf-gex-line bf-gex-line--3 bf-gex-line--accent" ref={exitLine3Ref}>SAME FRAME.</span>
              </p>
              {/* Directional marker — implies return to vertical scroll */}
              <div className="bf-gex-return" ref={exitArrowRef} aria-hidden="true">
                <span className="bf-gex-return-label">SCROLL</span>
                <span className="bf-gex-return-arrow">↓</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Progress indicator ──────────────────────────────────── */}
        <GalleryProgress containerRef={progressRef} />

      </div>
    </section>
  );
}
