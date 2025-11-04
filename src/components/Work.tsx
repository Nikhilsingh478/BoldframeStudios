import { motion } from 'motion/react';
import { useState } from 'react';
// Optional per-section SEO override (example):
// import { Helmet } from 'react-helmet-async';
// Inside the component return, you may add:
// <Helmet>
//   <title>Nikhil Webworks | Work</title>
//   <meta name="description" content="Featured case studies and projects." />
// </Helmet>
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink } from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';

const projects = [
  {
    title: 'Huuman',
    category: 'Web App (Frontend)',
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
    category: 'Landing / Web App (Spa)',
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
      // {
      //   metric: 'Notes',
      //   value:
      //     'Highly praised by peers — strong brand identity and meaningful animation',
      // },
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
    category: 'Web App / Corporate Website',
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
    category: 'E-commerce Web App (frontend ready)',
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
    title: 'Halloween — Creative Festive Project',
    category: 'Creative / Festive Webpage',
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
    title: 'Christmas — Parallax & Festive Webpage',
    category: 'Creative / Festive Webpage',
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
      'Strong festive visuals and motion',
      'Fast LCP and stable layout',
    ],
    url: 'https://christmas-webpage.vercel.app/',
  },
];


export function Work() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCase, setSelectedCase] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <section id="work" className="py-32 bg-[#0F1316]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', damping: 18, stiffness: 120 }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-[#E6EEF3] mb-4" style={{ fontWeight: 600 }}>
              Featured Work
            </h2>
            <p className="text-[#98A3AA] max-w-2xl mx-auto">
              Case studies showcasing our approach to design, development, and performance optimization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: 'spring',
                  damping: 18,
                  stiffness: 120,
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setSelectedCase(project)}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0B0D0F]">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Blur overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 backdrop-blur-sm bg-[#0B0D0F]/60 flex flex-col items-center justify-center p-6"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-[#5B3CFF] flex items-center justify-center mx-auto mb-4">
                        <ExternalLink className="w-6 h-6 text-[#E6EEF3]" />
                      </div>
                      <h3 className="text-xl text-[#E6EEF3] mb-2" style={{ fontWeight: 600 }}>
                        {project.title}
                      </h3>
                      <p className="text-[#67E8F9] text-sm mb-4">
                        {project.category}
                      </p>
                      <div className="space-y-2">
                        {project.highlights.map((highlight) => (
                          <p key={highlight} className="text-[#98A3AA] text-xs">
                            • {highlight}
                          </p>
                        ))}
                      </div>
                      <p className="text-[#67E8F9] text-xs mt-4">
                        Click to see full case study →
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Info bar */}
                <div className="glass p-4">
                  <h3 className="text-[#E6EEF3] mb-1" style={{ fontWeight: 600 }}>
                    {project.title}
                  </h3>
                  <p className="text-[#7C8A96] text-sm">{project.category}</p>
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
