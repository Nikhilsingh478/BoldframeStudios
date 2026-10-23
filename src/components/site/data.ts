// Real BoldFrame content: projects, measured results, services, testimonials.
// Figures come from the original case studies; nothing here is invented.

export const CONTACT_EMAIL = 'boldframestudios4@gmail.com';
export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhilsingh14788' },
  { label: 'GitHub', href: 'https://github.com/Nikhilsingh478' },
  { label: 'Portfolio', href: 'https://nikhilsinghcv.vercel.app' },
];

/** Field-style Core Web Vitals, measured per build (the Results chart uses these). */
export interface Vitals {
  lcp: number;
  cls: string;
  inp: number;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  timeline: string;
  /** Core Web Vitals, for the projects measured that way. */
  vitals?: Vitals;
  /** Lighthouse category scores, for projects measured with a Lighthouse run. */
  /** Lighthouse scores (mobile run), and which three to show on the card. */
  lighthouse?: {
    scores: { seo: number; bestPractices: number; accessibility: number; cls: string };
    show: ('seo' | 'bestPractices' | 'accessibility' | 'cls')[];
  };
  image: string;
  /** Which part of the screenshot to keep when a frame crops it (CSS object-position). */
  focus?: string;
  url: string;
}

export interface Metric {
  label: string; // long form, e.g. "Largest paint"
  short: string; // compact form, e.g. "LCP"
  value: string;
}

/** The three figures shown for a project, whichever way it was measured. */
export function projectMetrics(p: Project): Metric[] {
  if (p.vitals) {
    const { lcp, cls, inp } = p.vitals;
    return [
      { label: 'Largest paint', short: 'LCP', value: `${lcp.toFixed(2)}s` },
      { label: 'Layout shift', short: 'CLS', value: cls },
      { label: 'Interaction', short: 'INP', value: inp > 0 ? `${inp}ms` : '—' },
    ];
  }
  if (p.lighthouse) {
    const { scores, show } = p.lighthouse;
    const LH = {
      seo: { label: 'SEO score', short: 'SEO', value: String(scores.seo) },
      bestPractices: { label: 'Best practices', short: 'BP', value: String(scores.bestPractices) },
      accessibility: { label: 'Accessibility', short: 'A11Y', value: String(scores.accessibility) },
      cls: { label: 'Layout shift', short: 'CLS', value: scores.cls },
    };
    return show.map((k) => LH[k]);
  }
  return [];
}

export const PROJECTS: Project[] = [
  {
    title: 'Thunderbold',
    category: 'D2C fashion e-commerce platform',
    description:
      'An ongoing fashion commerce platform built beyond the storefront: product discovery, cart and checkout, customer accounts, inventory and a custom admin panel for orders, returns and reporting.',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Firebase'],
    timeline: 'Ongoing',
    lighthouse: {
      scores: { seo: 100, bestPractices: 100, accessibility: 93, cls: '0' },
      show: ['seo', 'bestPractices', 'cls'],
    },
    image: '/thunderbold.webp',
    focus: '4% top',
    url: 'https://www.thunderbold.shop/',
  },
  {
    title: 'Recurra',
    category: 'AI exam-prep web app',
    description:
      'An exam-pattern analysis tool for university students: upload a syllabus and previous question papers, and Recurra ranks the questions and topics most likely to appear, unit by unit.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    timeline: 'Early access',
    lighthouse: {
      scores: { seo: 100, bestPractices: 96, accessibility: 96, cls: '0' },
      show: ['seo', 'accessibility', 'cls'],
    },
    image: '/recurra.webp',
    url: 'https://recurraio.vercel.app/',
  },
  {
    title: 'Huuman',
    category: 'Brand experience redesign',
    description:
      'A redesigned concept for the streetwear brand Huuman: GSAP and Shery.js creative motion, responsive behaviour across viewports and an optimised hero.',
    tech: ['GSAP', 'Shery.js', 'Tailwind CSS', 'JavaScript'],
    timeline: '2–3 months',
    vitals: { lcp: 2.24, cls: '0.00', inp: 24 },
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
    vitals: { lcp: 2.33, cls: '0', inp: 40 },
    image: '/p2.webp',
    url: 'https://spas-one.vercel.app/',
  },
  {
    title: 'Halloween',
    category: 'Seasonal campaign page',
    description:
      'A playful seasonal landing page with spooky micro-interactions and custom GSAP motion, kept light so it loads fast and plays smoothly.',
    tech: ['GSAP', 'JavaScript', 'CSS'],
    timeline: '2 weeks',
    vitals: { lcp: 0.88, cls: '0.00', inp: 48 },
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
    vitals: { lcp: 0.53, cls: '0', inp: 0 },
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
    image: '/thunderbold.webp',
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
    image: '/recurra.webp',
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
];
