import { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

// Lazy load non-critical components for better performance
const ServicesCarousel = lazy(() => import('./components/ServicesCarousel').then(m => ({ default: m.ServicesCarousel })));
const Work = lazy(() => import('./components/Work').then(m => ({ default: m.Work })));
const Playroom = lazy(() => import('./components/Playroom').then(m => ({ default: m.Playroom })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const ContactModal = lazy(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));
const FloatingContact = lazy(() => import('./components/FloatingContact').then(m => ({ default: m.FloatingContact })));
const BackToTop = lazy(() => import('./components/BackToTop').then(m => ({ default: m.BackToTop })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const CustomCursor = lazy(() => import('./components/ui/CustomCursor'));
const LegalModals = lazy(() => import('./components/LegalModals').then(m => ({ default: m.LegalModals })));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  // Load EmailJS and SweetAlert only when needed
  const loadContactScripts = () => {
    const emailJsPublicKey = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY || 'NwMPwoO6mOuR1IeSD';
    
    const loadScript = (src: string, onLoad?: () => void) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        if (onLoad) onLoad();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      if (onLoad) script.onload = onLoad;
      document.body.appendChild(script);
    };

    loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11');
    loadScript(
      'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js',
      () => {
        if ((window as any).emailjs) {
          (window as any).emailjs.init(emailJsPublicKey);
        }
      }
    );
  };

  const openContactModal = () => {
    loadContactScripts();
    setIsContactModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>BoldFrame Studios</title>
        <meta name="description" content="We build lightning-fast, elegant, SEO-ready websites and web apps tailored for modern businesses." />
        <meta name="keywords" content="web development, frontend, react, nextjs, freelance, portfolio, india, spa, design" />
        <meta name="author" content="Nikhil Webworks" />
        <link rel="canonical" href="https://boldframe-studios.vercel.app/" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BoldFrame Studios" />
        <meta property="og:description" content="BoldFrame Studios — building fast, modern, SEO-optimized websites." />
        <meta property="og:url" content="https://boldframe-studios.vercel.app/" />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:site_name" content="BoldFrame Studios" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BoldFrame Studios" />
        <meta name="twitter:description" content="BoldFrame Studios — building fast, modern, SEO-optimized websites." />
        <meta name="twitter:image" content="/preview.png" />
        {/* Viewport & Fallbacks */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BoldFrame Studios",
  "url": "https://boldframe-studios.vercel.app/",
  "logo": "/favicon.svg",
  "sameAs": [
    "https://github.com/Nikhilsingh478",
    "https://www.linkedin.com/in/nikhilsingh14788"
  ]
}
        `}</script>
        <script type="application/ld+json">{`
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "BoldFrame Studios",
  "url": "https://boldframe-studios.vercel.app/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://boldframe-studios.vercel.app/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
        `}</script>
      </Helmet>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="min-h-screen bg-[#0B0D0F]">
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>
          <Header onContactClick={openContactModal} />
          <main>
            <Hero onContactClick={openContactModal} />
            <Suspense fallback={<div className="min-h-screen" />}>
              <ServicesCarousel />
              <Playroom />
              <Work />
              <Testimonials />
              <About />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer 
              onContactClick={openContactModal} 
              onPrivacyClick={() => setActiveLegalModal('privacy')}
              onTermsClick={() => setActiveLegalModal('terms')}
            />
            
            <ContactModal
              isOpen={isContactModalOpen}
              onClose={() => setIsContactModalOpen(false)}
            />

            <LegalModals
              activeModal={activeLegalModal}
              onClose={() => setActiveLegalModal(null)}
            />
            
            <FloatingContact onContactClick={openContactModal} />
            <BackToTop />
          </Suspense>
        </div>
      )}
    </>
  );
}
