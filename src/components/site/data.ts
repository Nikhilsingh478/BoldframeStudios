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
    scores: { performance?: number; seo: number; bestPractices: number; accessibility: number; cls: string };
    show: ('performance' | 'seo' | 'bestPractices' | 'accessibility' | 'cls')[];
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

/** The three figures shown on a project card: Lighthouse scores if measured that way, else vitals. */
export function projectMetrics(p: Project): Metric[] {
  if (p.lighthouse) {
    const { scores, show } = p.lighthouse;
    const LH = {
      performance: { label: 'Performance', short: 'PERF', value: String(scores.performance ?? '—') },
      seo: { label: 'SEO score', short: 'SEO', value: String(scores.seo) },
      bestPractices: { label: 'Best practices', short: 'BP', value: String(scores.bestPractices) },
      accessibility: { label: 'Accessibility', short: 'A11Y', value: String(scores.accessibility) },
      cls: { label: 'Layout shift', short: 'CLS', value: scores.cls },
    };
    return show.map((k) => LH[k]);
  }
  if (p.vitals) {
    const { lcp, cls, inp } = p.vitals;
    return [
      { label: 'Largest paint', short: 'LCP', value: `${lcp.toFixed(2)}s` },
      { label: 'Layout shift', short: 'CLS', value: cls },
      { label: 'Interaction', short: 'INP', value: inp > 0 ? `${inp}ms` : '—' },
    ];
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
      'Paste a syllabus and previous papers, and Recurra finds the questions that keep repeating, drops anything off-syllabus and ranks what to study unit by unit, with a skip plan and a PDF report.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini 2.5'],
    timeline: 'Early access',
    lighthouse: {
      scores: { performance: 96, seo: 100, bestPractices: 100, accessibility: 100, cls: '0' },
      show: ['performance', 'accessibility', 'seo'],
    },
    // From the same mobile Lighthouse run (lab test: no INP measured).
    vitals: { lcp: 2.3, cls: '0', inp: 0 },
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
    title: 'Silky’s Coaching Classes',
    category: 'Coaching institute website',
    description:
      'A website for a coaching institute in Bhusawal with 30+ years of teaching: tuition from Jr KG to 10th, built around local search and getting parents to call or WhatsApp in one tap.',
    tech: ['React', 'Vite'],
    timeline: 'Live',
    lighthouse: {
      scores: { performance: 91, seo: 100, bestPractices: 100, accessibility: 100, cls: '0.004' },
      show: ['performance', 'accessibility', 'seo'],
    },
    image: '/silkys.webp',
    url: 'https://silkyscoachingclasses.vercel.app/',
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
    image: '/silkys.webp',
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
];
