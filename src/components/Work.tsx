import { motion, useSpring, useMotionValue } from 'motion/react';
import { useState, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';

const projects = [
  {
    title: 'Huuman',
    category: 'Frontend Web App · Brand Experience Redesign',
    image: '/p1.webp',
    heroImage: '/p1.webp',
    description:
      "A redesigned concept for my cousin's personal brand 'Huuman'. Frontend only — HTML, CSS, JS with GSAP animations and Shery.js creative effects. The project focuses on creative, responsive GSAP-powered motion and optimized hero imagery.",
    timeline: '2–3 months',
    tech: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Tailwind CSS', 'Shery.js'],
    challenge:
      'Many large images and a video — optimizing them while keeping responsive GSAP animations intact.',
    solution:
      'Used lazy-loading, converted assets to .webp, and applied targeted image optimization for the hero to reduce payload while preserving visual fidelity.',
    outcomes: [
      { metric: 'LCP', value: '2.24 s' },
      { metric: 'CLS', value: '0.00' },
      { metric: 'INP', value: '24 ms' },
      { metric: 'LCP Element', value: 'h1' },
      { metric: 'Worst cluster', value: '5 shifts' },
    ],
    gallery: ['/p1.webp', '/p2.webp', '/p3.webp'],
    highlights: [
      'Full GSAP + Shery.js creative animations',
      'Hero image optimized (.webp + lazy-loading)',
      'Responsive animation behaviour across viewports',
    ],
    url: 'https://huuman-responsive-updated.vercel.app/',
  },

  {
    title: 'Roseberry Massage Spa',
    category: 'Booking-Focused Landing Page · Spa Website',
    image: '/p2.webp',
    heroImage: '/p2.webp',
    description:
      'Redesigned landing page for a London spa — booking-focused web app with contact form, WhatsApp CTA, service pages and session booking flows. UI, palette and motion crafted to drive bookings and brand trust.',
    timeline: '1 month',
    tech: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Tailwind CSS'],
    challenge:
      'Creating a professional, conversion-focused design where every animation and pixel has purpose — not just visual flair.',
    solution:
      'Deliberate UI decisions, purposeful motion language, and testing visuals with people to ensure the design drives trust and conversions.',
    outcomes: [
      { metric: 'LCP', value: '2.33 s' },
      { metric: 'CLS', value: '0' },
      { metric: 'INP', value: '40 ms' },
    ],
    gallery: ['/p4.webp', '/p5.webp', '/p6.webp'],
    highlights: [
      'Booking-first landing flow with clear CTAs (WhatsApp + form)',
      'Professional pixel-level UI & purposeful animations',
      'Designed to increase bookings and brand recognition',
    ],
    url: 'https://spas-one.vercel.app/',
  },

  {
    title: 'HBL (Company Redesign)',
    category: 'Corporate Frontend Website · UI Redesign',
    image: '/p3.webp',
    heroImage: '/p3.webp',
    description:
      'A clean, minimal redesign for HBL — modernized UI and color palette that communicates the brand’s core offerings with simplicity and clarity. Built to be friendly across devices while keeping a creative touch.',
    timeline: '2 weeks',
    tech: [
      'HTML',
      'CSS',
      'JavaScript',
      'Tailwind CSS',
      'React',
      'TypeScript',
      'Locomotive Scroll',
    ],
    challenge:
      'Making a design that looks simple but has clear personality — minimal UI that remains highly usable across devices.',
    solution:
      'Focused on typography, spacing and micro-interactions. Added smooth locomotion scroll for polished UX without overwhelming the content.',
    outcomes: [
      { metric: 'LCP', value: '0.98 s' },
      { metric: 'CLS', value: '0' },
      { metric: 'INP', value: '40 ms' },
    ],
    gallery: ['/p7.webp', '/p8.webp', '/p9.webp'],
    highlights: [
      'Minimal, professional corporate UI',
      'Fast performance and crisp LCP < 1s',
      'Smooth scrolling + thoughtful micro-interactions',
    ],
    url: 'https://hbl-eight.vercel.app/',
  },

  {
    title: 'Organic Green Tea Store',
    category: 'E-commerce Frontend · Conversion-Focused UI',
    image: '/p4.webp',
    heroImage: '/p4.webp',
    description:
      'An e-commerce app focused on organic tea — frontend (user & admin) complete. User-facing sales-driven UI inspired by successful organic brands; admin dashboard with hyper-detailed tracking and graphs.',
    timeline: 'In progress (frontend complete)',
    tech: [
      'HTML',
      'CSS',
      'JavaScript',
      'Tailwind CSS',
      'React',
      'TypeScript',
      'shadcn/ui',
    ],
    challenge:
      'Design a storefront and admin interface that are both sales-driven and easy to manage — complex dashboards and clear user flows.',
    solution:
      'Built a conversion-first UI for users and a focused admin dashboard with graphs and tracking to simplify store operations.',
    outcomes: [
      { metric: 'User LCP', value: '0.42 s' },
      { metric: 'User CLS', value: '0' },
      { metric: 'User INP', value: '8 ms' },
      { metric: 'Admin LCP', value: '0.99 s' },
      { metric: 'Admin CLS', value: '0' },
      { metric: 'Admin INP', value: '16 ms' },
    ],
    gallery: ['/p10.webp', '/p11.webp', '/p12.webp'],
    highlights: [
      'Frontend ready for both user and admin',
      'Sales-driven UI + intuitive checkout flows',
      'Admin dashboard with actionable analytics',
    ],
    url: 'https://organic-india-clone-garden.vercel.app/',
  },

  {
    title: 'Halloween',
    category: 'Creative Landing Page · Seasonal Campaign',
    image: '/p5.webp',
    heroImage: '/p5.webp',
    description:
      'A Halloween-themed creative webpage built for fun/seasonal showcase. Focused on spooky micro-interactions and custom GSAP motion.',
    timeline: '2 weeks',
    tech: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    challenge:
      'Deliver playful, performant animations without hurting page load or responsiveness.',
    solution:
      'Optimized assets, tuned animation timelines, and kept DOM light for smooth playback.',
    outcomes: [
      { metric: 'LCP', value: '0.88 s' },
      { metric: 'CLS', value: '0.00' },
      { metric: 'INP', value: '48 ms' },
    ],
    gallery: ['/p13.webp', '/p14.webp', '/p15.webp'],
    highlights: [
      'Seasonal creative motion using GSAP',
      'Lightweight and performant',
      'Perfect for portfolio/showcase',
    ],
    url: 'https://halloween-two-rho.vercel.app/',
  },

  {
    title: 'Christmas',
    category: 'Parallax Landing Page · Festive Campaign',
    image: '/p6.webp',
    heroImage: '/p6.webp',
    description:
      'A Christmas-themed page with parallax effects (Rellax.js) and layered motion. Built to showcase parallax composition and polished festival visuals.',
    timeline: '2 weeks',
    tech: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Rellax.js'],
    challenge:
      'Create immersive parallax while keeping performance optimal on a variety of devices.',
    solution:
      'Layered images, optimized assets, and limited parallax intensity on small screens for stable UX.',
    outcomes: [
      { metric: 'LCP', value: '0.53 s' },
      { metric: 'CLS', value: '0' },
      { metric: 'INP', value: '0 ms' },
    ],
    gallery: ['/p16.webp', '/p17.webp', '/p18.webp'],
    highlights: [
      'Polished parallax composition',
      'Spooky creative motion' // Custom fallback just in case
    ],
    url: 'https://christmas-webpage.vercel.app/',
  },
];

export function Work() {
  const [selectedCase, setSelectedCase] = useState<typeof projects[0] | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.12 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <>
      <section 
        id="work" 
        className="py-24 md:py-36 bg-[#0B0D0F] relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', damping: 18, stiffness: 120 }}
            className="text-center mb-20 md:mb-28"
          >
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] text-[#E6EEF3] mb-4" style={{ fontWeight: 600 }}>
              Featured Work
            </h2>
            <p className="text-[#98A3AA] max-w-2xl mx-auto text-sm md:text-base">
              Explore high-performance websites and web applications built with a focus on speed, conversions, and clean design.
            </p>
          </motion.div>

          {/* Desktop Hover-Reveal List */}
          <div ref={listRef} className="hidden md:block max-w-5xl mx-auto border-t border-[#7C8A96]/10">
            {projects.map((project, index) => (
              <div
                key={project.title}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setSelectedCase(project)}
                className="py-10 border-b border-[#7C8A96]/10 flex items-center justify-between group cursor-pointer relative transition-all duration-300"
              >
                {/* Expand hover background slightly */}
                <div className="absolute inset-0 bg-[#E6EEF3]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-center gap-10 z-10">
                  {/* Project Index */}
                  <span className="font-mono text-sm text-[#5B3CFF] opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                    0{index + 1}
                  </span>

                  {/* Project Title */}
                  <span className="text-4xl lg:text-5xl font-semibold text-[#98A3AA] group-hover:text-[#E6EEF3] transition-colors duration-300 tracking-tight">
                    {project.title}
                  </span>
                </div>

                {/* Category and Action Arrow */}
                <div className="flex items-center gap-6 z-10">
                  <span className="text-sm font-medium text-[#7C8A96] group-hover:text-[#67E8F9] transition-colors duration-300">
                    {project.category.split(' · ')[0]}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-[#7C8A96]/20 flex items-center justify-center text-[#98A3AA] group-hover:text-[#67E8F9] group-hover:border-[#67E8F9]/60 transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Image Preview Container for Desktop */}
          <motion.div
            style={{
              position: 'fixed',
              left: x,
              top: y,
              x: '20px', // slightly offset to the right of cursor
              y: '-50%',
              pointerEvents: 'none',
              zIndex: 100,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: hoveredIdx !== null ? 1 : 0.8, 
              opacity: hoveredIdx !== null ? 1 : 0 
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block w-[380px] h-[270px] rounded-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(91,60,255,0.3)] border border-[#7C8A96]/20 bg-[#0B0D0F]"
          >
            {projects.map((project, idx) => (
              <div
                key={project.title}
                style={{
                  display: hoveredIdx === idx ? 'block' : 'none',
                  width: '100%',
                  height: '100%',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>

          {/* Mobile Fallback: Elegant Card Stack */}
          <div className="block md:hidden space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onClick={() => setSelectedCase(project)}
                className="group bg-[#131619] rounded-2xl overflow-hidden border border-[#7C8A96]/10 shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131619] via-transparent to-transparent opacity-80" />
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#E6EEF3]">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-[#67E8F9]" />
                  </div>
                  <p className="text-sm text-[#98A3AA] mb-4">
                    {project.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 bg-[#5B3CFF]/10 text-[#67E8F9] rounded-md font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyModal
        isOpen={selectedCase !== null}
        onClose={() => setSelectedCase(null)}
        caseStudy={selectedCase}
      />
    </>
  );
}
