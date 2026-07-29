/**
 * WorkGallery — Sticky horizontal project exhibition (Chunk 2B)
 *
 * Vertical scroll drives a horizontal track left through 5 real projects.
 * Each project has a distinct composition variant (A / B / C / D / A2).
 * GSAP ScrollTrigger pins the sticky viewport and moves the track.
 * Center-focus system promotes the nearest project via opacity + scale.
 * Internal image parallax adds subtle depth within the moving track.
 * Progress indicator (02 ━ 03 ━ … 06) updates via direct DOM manipulation.
 *
 * Mobile: no pin — vertical stacked editorial layout.
 *
 * Initialization order (critical — spec §07 / §08):
 *   useLayoutEffect → document.fonts.ready → rAF → buildGallery → rAF → ST.refresh()
 * ResizeObserver on section, debounced 140ms.
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
  project:   GalleryProject;
  frameRef:  (el: HTMLDivElement | null) => void;
  imageRef:  (el: HTMLImageElement | null) => void;
}

function GalleryItem({ project, frameRef, imageRef }: GalleryItemProps) {
  const { index, title, subtitle, category, services, image, alt, url, variant, gapAfter } = project;

  const meta = (
    <div className={`bf-gi-meta bf-gi-meta--${variant}`}>
      <span className="bf-gi-index">{index}</span>
      <div className="bf-gi-name-block">
        <h3 className="bf-gi-title">{title}</h3>
        {subtitle && <span className="bf-gi-subtitle">{subtitle}</span>}
      </div>
      <span className="bf-gi-category">{category}</span>
      <span className="bf-gi-services">{services}</span>
    </div>
  );

  const frame = (
    <div className={`bf-gi-frame bf-gi-frame--${variant}`} ref={frameRef}>
      {/* Crop marks — top-left and bottom-right corners */}
      <div className="bf-gi-crop-tl" aria-hidden="true" />
      <div className="bf-gi-crop-br" aria-hidden="true" />

      <img
        ref={imageRef}
        src={image}
        alt={alt}
        className="bf-gi-img"
        loading="lazy"
        decoding="async"
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
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

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

              // ── Internal image parallax (−3% → +3% over full scroll) ──
              imageRefs.current.forEach((img) => {
                if (img) gsap.set(img, { xPercent: 3 - p * 6 });
              });

              // ── Center-focus: promote nearest project ─────────────────
              const viewportCenter = vw / 2;
              frameRefs.current.forEach((frame) => {
                if (!frame) return;
                const rect     = frame.getBoundingClientRect();
                const centerX  = (rect.left + rect.right) / 2;
                const dist     = Math.abs(centerX - viewportCenter);
                // Normalise: fully focused at 0 distance, fully muted at >55vw away
                const focus    = Math.max(0, 1 - dist / (vw * 0.55));
                const item     = frame.closest('.bf-gi') as HTMLElement | null;
                if (item)  gsap.set(item,  { opacity: 0.72 + 0.28 * focus });
                gsap.set(frame, { scale: 0.985 + 0.015 * focus });
              });

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
              frameRef={(el) => { frameRefs.current[i] = el; }}
              imageRef={(el) => { imageRefs.current[i] = el; }}
            />
          ))}

          {/* Exit space */}
          <div className="bf-gallery-exit-space" aria-hidden="true" />
        </div>

        {/* ── Progress indicator ──────────────────────────────────── */}
        <GalleryProgress containerRef={progressRef} />

      </div>
    </section>
  );
}
