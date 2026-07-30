/**
 * WorkGallery — Sticky horizontal project exhibition (Chunk 2B)
 * FIXED & OPTIMIZED: Bug-free React lifecycle, zero layout thrashing, native GSAP matchMedia.
 */

import { useRef, useLayoutEffect, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Real project data ───────────────────────────────────────────────────────
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
    alt:      'Roseberry Massage Spa — booking-first landing page with warm palette',
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
    alt:      'HBL corporate website — clean minimal redesign',
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
    alt:      'Organic Green Tea Store — conversion-focused e-commerce',
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
    alt:      'Halloween creative webpage — spooky GSAP micro-interactions',
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
    alt:      'Christmas parallax webpage',
    url:      'https://christmas-webpage.vercel.app/',
    variant:  'A2',
    gapAfter: '0',
  },
] as const;

type GalleryProject = (typeof GALLERY_PROJECTS)[number];

// ─── Single project item ─────────────────────────────────────────────────────

interface GalleryItemProps {
  project:      GalleryProject;
  itemRef:      (el: HTMLDivElement | null) => void; // Added for performance
  frameRef:     (el: HTMLDivElement | null) => void;
  imageRef:     (el: HTMLImageElement | null) => void;
  metaRef:      (el: HTMLDivElement | null) => void;
  indexNumRef:  (el: HTMLSpanElement | null) => void;
  accentRef:    (el: HTMLDivElement | null) => void;
}

function GalleryItem({ project, itemRef, frameRef, imageRef, metaRef, indexNumRef, accentRef }: GalleryItemProps) {
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
      <div className="bf-gi-accent-line" ref={accentRef} aria-hidden="true" />
    </div>
  );

  const frame = (
    <div className={`bf-gi-frame bf-gi-frame--${variant}`} ref={frameRef}>
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
    <a href={url} target="_blank" rel="noopener noreferrer" className="bf-gi-cta">
      <span className="bf-gi-cta-text">VIEW PROJECT</span>
      <span className="bf-gi-cta-arrow" aria-hidden="true">↗</span>
    </a>
  ) : null;

  return (
    <div
      ref={itemRef}
      className={`bf-gi bf-gi--${variant}`}
      style={{ marginRight: gapAfter }}
      aria-label={`Project ${index}: ${title}`}
    >
      {variant === 'B' ? (
        <>
          <div className="bf-gi-aside">
            {meta}
            {cta}
          </div>
          {frame}
        </>
      ) : (
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

function GalleryProgress({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={containerRef} className="bf-gp" aria-hidden="true">
      <div className="bf-gp-indices">
        {GALLERY_PROJECTS.map((p, i) => (
          <span key={p.id} className={`bf-gp-item${i === 0 ? ' bf-gp-active' : ''}`}>
            {p.index}
            {i < GALLERY_PROJECTS.length - 1 && <span className="bf-gp-dash" />}
          </span>
        ))}
      </div>
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

  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const frameRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs    = useRef<(HTMLImageElement | null)[]>([]);
  const metaRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const indexNumRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const accentRefs   = useRef<(HTMLDivElement | null)[]>([]);
  
  const exitLine1Ref = useRef<HTMLSpanElement>(null);
  const exitLine2Ref = useRef<HTMLSpanElement>(null);
  const exitLine3Ref = useRef<HTMLSpanElement>(null);
  const exitArrowRef = useRef<HTMLDivElement>(null);

  const rm = useReducedMotion() ?? false;

  const updateProgress = useCallback((p: number) => {
    const el = progressRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.bf-gp-item');
    const n = GALLERY_PROJECTS.length;
    const activeIdx = Math.min(Math.floor(p * n + 0.15), n - 1);
    items.forEach((item, i) => item.classList.toggle('bf-gp-active', i === activeIdx));
    const fill = el.querySelector<HTMLElement>('.bf-gp-fill');
    if (fill) fill.style.transform = `scaleX(${p})`;
  }, []);

  useLayoutEffect(() => {
    if (rm || !sectionRef.current || !stickyRef.current || !trackRef.current) return;

    let isUnmounted = false; // Fix #1: Prevents zombie triggers if unmounted before fonts load
    let ctx = gsap.context(() => {}); // Initialize empty context securely

    // Wait for fonts to ensure accurate width calculations
    document.fonts.ready.then(() => {
      if (isUnmounted) return;

      ctx.add(() => {
        // Fix #2: Use GSAP matchMedia to natively handle mobile vs desktop layout switching
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          const section = sectionRef.current!;
          const sticky = stickyRef.current!;
          const track = trackRef.current!;
          
          // Fix #3: Calculate values safely for resize without layout thrashing
          let vw = window.innerWidth;
          let distance = 0;
          let frameCenters: number[] = [];

          const calculateMetrics = () => {
            vw = window.innerWidth;
            distance = Math.max(0, track.scrollWidth - vw);
            
            // Cache centers ONCE during resize/init, not during 60fps scrolling
            frameCenters = frameRefs.current.map(frame => {
              if (!frame) return 0;
              const rect = frame.getBoundingClientRect();
              return rect.left + rect.width / 2;
            });
          };

          // Initial States
          frameRefs.current.forEach(frame => {
            if (!frame) return;
            const tl = frame.querySelector<HTMLElement>('.bf-gi-crop-tl');
            const br = frame.querySelector<HTMLElement>('.bf-gi-crop-br');
            if (tl) gsap.set(tl, { opacity: 0.18 });
            if (br) gsap.set(br, { opacity: 0.18 });
          });
          
          accentRefs.current.forEach(el => el && gsap.set(el, { scaleX: 0, transformOrigin: 'left' }));
          
          [exitLine1Ref, exitLine2Ref, exitLine3Ref, exitArrowRef].forEach(r => {
            if (r.current) gsap.set(r.current, { opacity: 0, y: 10 });
          });

          // Fix #4: Use functional values + invalidateOnRefresh so we don't need a custom ResizeObserver
          const scrollTween = gsap.to(track, {
            x: () => -distance,
            ease: 'none',
            scrollTrigger: {
              id: 'bf-gallery',
              trigger: section,
              pin: sticky, // GSAP handles the padding/height automatically now
              start: 'top top',
              end: () => `+=${distance}`,
              scrub: 0.7,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onRefreshInit: calculateMetrics, // Triggers before ST does math
              onUpdate: (self) => {
                const p = self.progress;
                const currentScrollX = p * distance;
                const viewportCenter = vw / 2;

                imageRefs.current.forEach(img => {
                  if (img) gsap.set(img, { xPercent: 3 - p * 6 });
                });

                frameRefs.current.forEach((frame, i) => {
                  if (!frame) return;
                  
                  // Fix #5: Pure math positioning. ZERO getBoundingClientRect() calls in the loop!
                  const currentCenterX = frameCenters[i] - currentScrollX;
                  const dist = currentCenterX - viewportCenter;
                  const absDist = Math.abs(dist);
                  const focus = Math.max(0, 1 - absDist / (vw * 0.55));

                  const item = itemRefs.current[i];
                  if (item) gsap.set(item, { opacity: 0.72 + 0.28 * focus });
                  gsap.set(frame, { scale: 0.985 + 0.015 * focus });

                  const meta = metaRefs.current[i];
                  if (meta) {
                    const xShift = Math.max(-20, Math.min(20, dist * 0.04));
                    gsap.set(meta, { x: xShift });

                    const cat = meta.querySelector<HTMLElement>('.bf-gi-category');
                    const srv = meta.querySelector<HTMLElement>('.bf-gi-services');
                    const yr  = meta.querySelector<HTMLElement>('.bf-gi-year');
                    const titleEl = meta.querySelector<HTMLElement>('.bf-gi-title');
                    const opacityMeta = 0.45 + 0.55 * focus;
                    
                    if (cat) cat.style.opacity = String(opacityMeta);
                    if (srv) srv.style.opacity = String(opacityMeta);
                    if (yr) yr.style.opacity = String(opacityMeta);
                    if (titleEl) titleEl.style.opacity = String(0.75 + 0.25 * focus);
                  }

                  const num = indexNumRefs.current[i];
                  if (num) {
                    const yFloat = Math.min(4, absDist * 0.008);
                    gsap.set(num, { y: yFloat });
                  }

                  const cropTL = frame.querySelector<HTMLElement>('.bf-gi-crop-tl');
                  const cropBR = frame.querySelector<HTMLElement>('.bf-gi-crop-br');
                  const cropOpacity = 0.18 + 0.62 * focus;
                  if (cropTL) gsap.set(cropTL, { opacity: cropOpacity });
                  if (cropBR) gsap.set(cropBR, { opacity: cropOpacity });

                  const accent = accentRefs.current[i];
                  if (accent) gsap.set(accent, { scaleX: focus });
                });

                // Exit composition staggering
                const lineState = (start: number, window = 0.08) => {
                  const t = Math.max(0, Math.min(1, (p - start) / window));
                  return { opacity: t, y: 10 - t * 10 };
                };
                
                const l1 = lineState(0.78), l2 = lineState(0.84), l3 = lineState(0.90), la = lineState(0.93, 0.06);
                if (exitLine1Ref.current) gsap.set(exitLine1Ref.current, l1);
                if (exitLine2Ref.current) gsap.set(exitLine2Ref.current, l2);
                if (exitLine3Ref.current) gsap.set(exitLine3Ref.current, l3);
                if (exitArrowRef.current) gsap.set(exitArrowRef.current, la);

                updateProgress(p);
              }
            }
          });
        });
      });

      // One clean refresh to ensure all downstream layout is settled
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      isUnmounted = true; // Tell the async promise to abort if we unmount
      ctx.revert(); // Kills all ScrollTriggers, animations, and matchMedia listeners cleanly
    };
  }, [rm, updateProgress]);

  return (
    <section ref={sectionRef} id="work-gallery" className="bf-gallery-section">
      <div ref={stickyRef} className="bf-gallery-sticky">
        <div className="bf-gallery-header" aria-hidden="true">
          <span className="bf-micro">SELECTED WORK / 002 — 006</span>
        </div>

        <div ref={trackRef} className="bf-gallery-track">
          <div className="bf-gallery-intro-space" aria-hidden="true" />
          
          {GALLERY_PROJECTS.map((project, i) => (
            <GalleryItem
              key={project.id}
              project={project}
              itemRef={(el)     => { itemRefs.current[i] = el; }}
              frameRef={(el)    => { frameRefs.current[i] = el; }}
              imageRef={(el)    => { imageRefs.current[i] = el; }}
              metaRef={(el)     => { metaRefs.current[i] = el; }}
              indexNumRef={(el) => { indexNumRefs.current[i] = el; }}
              accentRef={(el)   => { accentRefs.current[i] = el; }}
            />
          ))}

          <div className="bf-gallery-exit-space" aria-label="End of project exhibition">
            <div className="bf-gex-inner">
              <p className="bf-gex-statement">
                <span className="bf-gex-line bf-gex-line--1" ref={exitLine1Ref}>NOT EVERYTHING</span>
                <span className="bf-gex-line bf-gex-line--2" ref={exitLine2Ref}>NEEDS THE</span>
                <span className="bf-gex-line bf-gex-line--3 bf-gex-line--accent" ref={exitLine3Ref}>SAME FRAME.</span>
              </p>
              <div className="bf-gex-return" ref={exitArrowRef} aria-hidden="true">
                <span className="bf-gex-return-label">SCROLL</span>
                <span className="bf-gex-return-arrow">↓</span>
              </div>
            </div>
          </div>
        </div>

        <GalleryProgress containerRef={progressRef} />
      </div>
    </section>
  );
}