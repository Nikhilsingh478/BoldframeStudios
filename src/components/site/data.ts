// Real BoldFrame content: projects, measured results, services, testimonials.
// Figures come from the original case studies; nothing here is invented.

export const CONTACT_EMAIL = 'boldframestudios4@gmail.com';
export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhilsingh14788' },
  { label: 'GitHub', href: 'https://github.com/Nikhilsingh478' },
  { label: 'Portfolio', href: 'https://nikhilsinghcv.vercel.app' },
];

export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  timeline: string;
  lcp: number;
  cls: string;
  inp: number;
  image: string;
  url: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Huuman',
    category: 'Brand experience redesign',
    description:
      'A redesigned concept for the streetwear brand Huuman: GSAP and Shery.js creative motion, responsive behaviour across viewports and an optimised hero.',
    tech: ['GSAP', 'Shery.js', 'Tailwind CSS', 'JavaScript'],
    timeline: '2–3 months',
    lcp: 2.24, cls: '0.00', inp: 24,
    image: '/p1.webp',
    url: 'https://huuman-responsive-updated.vercel.app/',
  },
  {
    title: 'Roseberry Massage Spa',
    category: 'Booking-focused landing page',
    description:
      'A landing page for a London spa built around bookings: contact form, WhatsApp call-to-action, service pages and session booking flows.',
    tech: ['GSAP', 'Tailwind CSS', 'JavaScript'],
    timeline: '1 month',
    lcp: 2.33, cls: '0', inp: 40,
    image: '/p2.webp',
    url: 'https://spas-one.vercel.app/',
  },
  {
    title: 'HBL',
    category: 'Corporate website redesign',
    description:
      'A clean, minimal redesign that communicates the company’s core offerings with clarity, with smooth scrolling and considered micro-interactions.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Locomotive Scroll'],
    timeline: '2 weeks',
    lcp: 0.98, cls: '0', inp: 40,
    image: '/p3.webp',
    url: 'https://hbl-eight.vercel.app/',
  },
  {
    title: 'Organic Green Tea Store',
    category: 'E-commerce frontend',
    description:
      'A sales-driven storefront for an organic tea brand, plus an admin dashboard with detailed tracking and graphs. Frontend complete for both.',
    tech: ['React', 'TypeScript', 'shadcn/ui', 'Tailwind CSS'],
    timeline: 'Frontend complete',
    lcp: 0.42, cls: '0', inp: 8,
    image: '/p4.webp',
    url: 'https://organic-india-clone-garden.vercel.app/',
  },
  {
    title: 'Halloween',
    category: 'Seasonal campaign page',
    description:
      'A playful seasonal landing page with spooky micro-interactions and custom GSAP motion, kept light so it loads fast and plays smoothly.',
    tech: ['GSAP', 'JavaScript', 'CSS'],
    timeline: '2 weeks',
    lcp: 0.88, cls: '0.00', inp: 48,
    image: '/p5.webp',
    url: 'https://halloween-two-rho.vercel.app/',
  },
  {
    title: 'Christmas',
    category: 'Parallax experience',
    description:
      'A festive page with layered parallax (Rellax.js) and polished seasonal visuals, with parallax intensity tuned down on small screens.',
    tech: ['GSAP', 'Rellax.js', 'JavaScript'],
    timeline: '2 weeks',
    lcp: 0.53, cls: '0', inp: 0,
    image: '/p6.webp',
    url: 'https://christmas-webpage.vercel.app/',
  },
];

export const SERVICES = [
  {
    title: 'Discovery & Strategy',
    tagline: 'Problem · Competitors · Workflow',
    description:
      'We start by understanding your problem end to end, study your competitors, and map a rough workflow and solution before anything is designed or built.',
    deliverables: ['End-to-end problem mapping', 'Competitor research', 'Workflow & solution outline'],
    image: '/p3.webp',
  },
  {
    title: 'Brand & UI/UX Design',
    tagline: 'Brand · Interface · Motion',
    description:
      'We study your brand (colour palette, typography, tone) and what you want people to feel and do, then design an interface that belongs to it, not to a template.',
    deliverables: ['Brand study: palette & typography', 'Desktop & mobile UI', 'Interaction & motion design'],
    image: '/p2.webp',
  },
  {
    title: 'Product Development',
    tagline: 'PRD · Tech stack · Build',
    description:
      'Everything is planned in a written product requirements document, with the tech stack and functionality decided up front, then built in focused, tested iterations.',
    deliverables: ['Product requirements (PRD)', 'Tech stack & architecture', 'Websites, web apps & e-commerce'],
    image: '/p1.webp',
  },
  {
    title: 'Security & Performance',
    tagline: 'Security · Speed · SEO',
    description:
      'Before launch we review security and optimise performance: fast loads, stable layouts and the technical groundwork search engines reward.',
    deliverables: ['Security review', 'Core Web Vitals & 90+ Lighthouse', 'SEO-ready structure'],
    image: '/p4.webp',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'The Huuman redesign brought our concept to life — smooth GSAP motion, responsive behavior, and stunning visuals. Exactly how we imagined our brand should feel.',
    role: 'Founder',
    company: 'Huuman',
    image: '/p1.webp',
  },
  {
    quote:
      'Our spa website turned out elegant, fast, and inviting. The booking experience feels natural and beautifully animated — clients often compliment the site.',
    role: 'Owner',
    company: 'Roseberry Massage Spa',
    image: '/p2.webp',
  },
  {
    quote:
      'The redesign for HBL modernized our entire digital presence. It’s sleek, minimal, and loads under a second — a major credibility boost for our brand.',
    role: 'Marketing Head',
    company: 'HBL Industries',
    image: '/p3.webp',
  },
  {
    quote:
      'The organic store frontend feels both fresh and premium. From product pages to admin dashboards, everything runs fast and looks professional.',
    role: 'Operations Manager',
    company: 'Organic Green Tea Store',
    image: '/p4.webp',
  },
];
