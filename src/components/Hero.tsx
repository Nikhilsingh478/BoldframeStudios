import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { MagneticButton } from './MagneticButton';
// Optional per-section SEO override (example):
// import { Helmet } from 'react-helmet-async';
// Inside the component return, you may add:
// <Helmet>
//   <title>Nikhil Webworks | Hero</title>
//   <meta name="description" content="Hero section overview." />
// </Helmet>

const HERO_PROJECTS = [
  { title: 'Huuman', category: 'Brand experience redesign', image: '/p1.webp', url: 'huuman-responsive-updated.vercel.app' },
  { title: 'Roseberry Massage Spa', category: 'Booking-focused landing page', image: '/p2.webp', url: 'spas-one.vercel.app' },
  { title: 'HBL', category: 'Corporate website redesign', image: '/p3.webp', url: 'hbl-eight.vercel.app' },
];

export function Hero({ onContactClick }: { onContactClick: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % HERO_PROJECTS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById('work-gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Professional animated background - optimized for performance */}
      {/* Video Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Desktop Video - Added poster for LCP optimization */}
        <video
          className="absolute inset-0 w-full h-full object-cover hidden md:block hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/videos/horizontalbfs.webp"
        >
          <source src="/videos/horizontal.webm" type="video/webm" />
          <track kind="captions" src="" label="No dialogue" default />
        </video>

        {/* Mobile Video - Added poster for LCP optimization */}
        <video
          className="absolute inset-0 w-full h-full object-cover md:hidden hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/videos/verticalbfs.webp"
        >
          <source src="/videos/vertical.webm" type="video/webm" />
          <track kind="captions" src="" label="No dialogue" default />
        </video>

        {/* Overlay for text readability — darker behind the copy on the left */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="hero-readability-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Content */}
          <motion.div style={{ opacity, scale }}>
            {/* Main heading - optimized animations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, type: 'spring', damping: 20, stiffness: 150 }} // Reduced duration
              className="mb-6"
            >
              <h1 className="text-[clamp(3rem,8vw,6rem)] text-[#E6EEF3] tracking-tight leading-[0.95]" style={{ fontWeight: 600 }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }} // Reduced from 0.6s
                >
                  Websites
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 }} // Reduced from 0.6s
                >
                  That
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }} // Reduced from 0.6s
                >
                  Convert.
                </motion.div>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, type: 'spring', damping: 20, stiffness: 150 }} // Reduced from 0.8s
              className="hero-tagline"
            >
              A frontend-focused studio building high-performance landing pages designed to convert.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, type: 'spring', damping: 20, stiffness: 150 }} // Reduced from 0.8s
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton
                onClick={onContactClick}
                className="px-8 py-4 bg-[#5B3CFF] text-[#E6EEF3] rounded-lg hover:bg-[#7055ff] transition-colors shadow-lg shadow-[#5B3CFF]/30"
              >
                Start a Project
              </MagneticButton>
              <MagneticButton
                onClick={scrollToWork}
                className="px-8 py-4 border border-[#7C8A96] text-[#E6EEF3] rounded-lg hover:border-[#67E8F9] transition-colors"
              >
                View Work
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right: Redesigned Device Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', damping: 20, stiffness: 150 }} // Reduced from 1s
            className="hidden lg:block relative"
          >
            <motion.div
              style={{
                rotateY: useTransform(scrollYProgress, [0, 1], [0, -10]),
                rotateX: useTransform(scrollYProgress, [0, 1], [0, 5]),
              }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: 'spring', damping: 20, stiffness: 150 }}
              className="relative perspective-1000"
            >
              {/* Background Layer - Static gradient for better performance */}
              <div className="absolute -inset-8 opacity-40 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#5B3CFF]/30 via-[#67E8F9]/20 to-[#5B3CFF]/30 blur-3xl" />
              </div>

              {/* Main Device Container — rotates through real project screenshots */}
              <div className="relative glass rounded-2xl hero-showcase">
                <a
                  href="#work-gallery"
                  onClick={(e) => { e.preventDefault(); scrollToWork(); }}
                  className="hero-showcase-window"
                  aria-label="See selected work"
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
                </a>
              </div>

              {/* Floating elements around device - faster animation */}
              {/* <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-lg bg-gradient-to-br from-[#5B3CFF] to-[#7055ff] opacity-60 blur-xl pointer-events-none"
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} // Reduced from 5s
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#67E8F9] to-[#85f0ff] opacity-60 blur-xl pointer-events-none"
                animate={{
                  y: [0, 6, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} // Reduced from 6s
              /> */}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }} // Reduced movement
        transition={{ duration: 1.5, repeat: Infinity }} // Reduced from 2s
      >
        <div className="w-6 h-10 border-2 border-[#7C8A96] rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-[#67E8F9] rounded-full"
            animate={{ y: [0, 12, 0] }} // Reduced movement
            transition={{ duration: 1.5, repeat: Infinity }} // Reduced from 2s
          />
        </div>
      </motion.div> */}
    </section>
  );
}