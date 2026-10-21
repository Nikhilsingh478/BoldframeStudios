// Shared site content: contact details, links and portfolio entries.

export const CONTACT_EMAIL = 'nikhilwebworks@gmail.com';

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Nikhilsingh478' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhilsingh14788' },
];

export interface Project {
  title: string;
  type: string;
  services: string[];
  image: string;
  alt: string;
  href: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Huuman',
    type: 'Streetwear storefront',
    services: ['Design', 'Development', 'Motion'],
    image: '/p1.webp',
    alt: 'Huuman streetwear website homepage with a model wearing a printed black sweatshirt',
    href: 'https://huuman-responsive-updated.vercel.app/',
  },
  {
    title: 'Roseberry',
    type: 'Massage spa website',
    services: ['Design', 'Development'],
    image: '/p2.webp',
    alt: 'Roseberry Massage website with an illustrated hero on a red rose background',
    href: 'https://spas-one.vercel.app/',
  },
  {
    title: 'HBL Engineering',
    type: 'Corporate website redesign',
    services: ['Design', 'Development'],
    image: '/p3.webp',
    alt: 'HBL Engineering homepage with the headline Mission-Critical Systems Excellence',
    href: 'https://hbl-eight.vercel.app/',
  },
  {
    title: 'Organic',
    type: 'Green tea e-commerce store',
    services: ['Design', 'Development'],
    image: '/p4.webp',
    alt: 'Organic tea store product grid showing herbal and floral green tea blends',
    href: 'https://organic-india-clone-garden.vercel.app/',
  },
  {
    title: 'Halloween',
    type: 'Seasonal landing page',
    services: ['Design', 'Motion'],
    image: '/p5.webp',
    alt: 'Halloween landing page with a glowing pumpkin in front of a full moon',
    href: 'https://halloween-two-rho.vercel.app/',
  },
  {
    title: 'Christmas',
    type: 'Parallax holiday page',
    services: ['Design', 'Motion'],
    image: '/p6.webp',
    alt: 'Christmas parallax page with Santa’s sleigh crossing a full moon above a snowy village',
    href: 'https://christmas-webpage.vercel.app/',
  },
];

export const hostOf = (url: string) => new URL(url).host;
