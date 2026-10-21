import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { MagneticButton } from './MagneticButton';
import { HERO_ENTRANCE_DELAY } from './Intro';
import { scrollToId } from '../lib/smoothScroll';

const HERO_PROJECTS = [
  { title: 'Huuman', category: 'Brand experience redesign', image: '/p1.webp', url: 'huuman-responsive-updated.vercel.app' },
  { title: 'Roseberry Massage Spa', category: 'Booking-focused landing page', image: '/p2.webp', url: 'spas-one.vercel.app' },
  { title: 'HBL', category: 'Corporate website redesign', image: '/p3.webp', url: 'hbl-eight.vercel.app' },
  { title: 'Organic Green Tea Store', category: 'E-commerce frontend', image: '/p4.webp', url: 'organic-india-clone-garden.vercel.app' },
];

const MARQUEE = ['Strategy', 'UI / UX Design', 'Frontend Development', 'Motion', 'Performance', 'SEO'];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero({ onContactClick }: { onContactClick: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Headline drifts up and the content fades as the hero leaves.
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % HERO_PROJECTS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  // Cursor spotlight: written straight to CSS variables, no React renders.
  useEffect(() => {
    const section = ref.current;
    if (!section || reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        section.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        section.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
    };
    section.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener('pointermove', onMove);
    };
  }, [reduceMotion]);

  const d = HERO_ENTRANCE_DELAY;
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { y: '110%' },
    animate: { y: '0%' },
    transition: { duration: 1.1, ease: EASE, delay: d + delay },
  });
  const fadeIn = (delay: number, y = 16) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: d + delay },
  });

  return (
    <section ref={ref} id="hero" className="bfh" aria-labelledby="bfh-title">
      <div className="bfh-bg" aria-hidden="true">
        <div className="bfh-grid" />
        <div className="bfh-orb bfh-orb--a" />
        <div className="bfh-orb bfh-orb--b" />
        <div className="bfh-spot" />
      </div>

      <motion.div className="bfh-inner" style={reduceMotion ? undefined : { opacity: fade }}>
        <motion.div className="bfh-meta" {...fadeIn(0, 8)}>
          <span>BoldFrame Studios</span>
          <span className="bfh-meta-rule" />
          <span>Design &amp; development studio</span>
          <span className="bfh-meta-end">Based in India</span>
        </motion.div>

        <motion.h1 id="bfh-title" className="bfh-title" style={reduceMotion ? undefined : { y: titleY }}>
          <span className="bfh-line">
            <motion.span className="bfh-line-inner" {...rise(0.05)}>Websites</motion.span>
          </span>
          <span className="bfh-line">
            <motion.span className="bfh-line-inner" {...rise(0.17)}>
              <span className="bfh-word">That</span>{' '}
              <span className="bfh-framed">
                Convert.
                {['tl', 'tr', 'bl', 'br'].map((corner, i) => (
                  <motion.i
                    key={corner}
                    className={`bfh-corner bfh-corner--${corner}`}
                    aria-hidden="true"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: d + 0.75 + i * 0.06 }}
                  />
                ))}
              </span>
            </motion.span>
          </span>
        </motion.h1>

        <div className="bfh-bottom">
          <motion.div className="bfh-copy" {...fadeIn(0.55)}>
            <p className="bfh-tagline">
              A frontend-focused studio building high-performance landing pages and websites
              designed to convert, and measured to prove it.
            </p>
            <div className="bfh-actions">
              <MagneticButton onClick={onContactClick} className="bfh-btn bfh-btn--primary">
                Start a project <span aria-hidden="true">→</span>
              </MagneticButton>
              <button type="button" className="bfh-btn bfh-btn--ghost" onClick={() => scrollToId('selected-work')}>
                View work
              </button>
            </div>
          </motion.div>

          <motion.a
            href="#selected-work"
            onClick={(e) => { e.preventDefault(); scrollToId('selected-work'); }}
            className="bfh-reel"
            aria-label="See selected work"
            {...fadeIn(0.7, 24)}
          >
            <div className="hero-showcase-bar" aria-hidden="true">
              <span className="hero-showcase-dots"><i /><i /><i /></span>
              <span className="hero-showcase-url">{HERO_PROJECTS[active].url}</span>
            </div>
            <div className="hero-showcase-screen">
              {HERO_PROJECTS.map((project, i) => (
                <img
                  key={project.image}
                  src={project.image}
                  alt={i === active ? `${project.title} website` : ''}
                  aria-hidden={i !== active}
                  className={i === active ? 'is-active' : undefined}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
            <div className="hero-showcase-caption">
              <div>
                <strong>{HERO_PROJECTS[active].title}</strong>
                <span>{HERO_PROJECTS[active].category}</span>
              </div>
              <span className="hero-showcase-pager" aria-hidden="true">
                {HERO_PROJECTS.map((project, i) => (
                  <i key={project.title} className={i === active ? 'is-active' : undefined} />
                ))}
              </span>
            </div>
          </motion.a>
        </div>
      </motion.div>

      <motion.div className="bfh-marquee" aria-hidden="true" {...fadeIn(0.9, 0)}>
        <div className="bfh-marquee-track">
          {[0, 1].map((copy) => (
            <div className="bfh-marquee-group" key={copy}>
              {MARQUEE.map((item) => (
                <span key={item} className="bfh-marquee-item">
                  {item}
                  <span className="bfh-marquee-star">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
