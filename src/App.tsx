/// <reference types="vite/client" />
import { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { SiteLoader } from './components/site/SiteLoader';
import { SiteHeader } from './components/site/SiteHeader';
import { HeroSection } from './components/site/HeroSection';
import { initSmoothScroll } from './lib/smoothScroll';

const AboutSection = lazy(() => import('./components/site/AboutSection').then(m => ({ default: m.AboutSection })));
const ServicesSection = lazy(() => import('./components/site/ServicesSection').then(m => ({ default: m.ServicesSection })));
const WorkSection = lazy(() => import('./components/site/WorkSection').then(m => ({ default: m.WorkSection })));
const Journey = lazy(() => import('./components/redesign/Journey').then(m => ({ default: m.Journey })));
const ResultsSection = lazy(() => import('./components/site/ResultsSection').then(m => ({ default: m.ResultsSection })));
const TestimonialsSection = lazy(() => import('./components/site/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const ContactSection = lazy(() => import('./components/site/ContactSection').then(m => ({ default: m.ContactSection })));
const SiteFooter = lazy(() => import('./components/site/SiteFooter').then(m => ({ default: m.SiteFooter })));
const ContactModal = lazy(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));
const LegalModals = lazy(() => import('./components/LegalModals').then(m => ({ default: m.LegalModals })));

export default function App() {
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

  useEffect(() => initSmoothScroll(), []);

  const openContactModal = () => {
    loadContactScripts();
    setIsContactModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>BoldFrame Studios</title>
        <meta name="description" content="BoldFrame Studios designs and builds fast, conversion-focused websites and landing pages for forward-thinking brands." />
        <meta name="keywords" content="web development, frontend, react, nextjs, freelance, portfolio, india, spa, design" />
        <meta name="author" content="Nikhil Webworks" />
        <link rel="canonical" href="https://boldframestudios.in/" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BoldFrame Studios" />
        <meta property="og:description" content="BoldFrame Studios — building fast, modern, SEO-optimized websites." />
        <meta property="og:url" content="https://boldframestudios.in/" />
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
  "url": "https://boldframestudios.in/",
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
  "url": "https://boldframestudios.in/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://boldframestudios.in/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
        `}</script>
      </Helmet>
      <SiteLoader />

      <div className="bfx-site">
        <SiteHeader onContactClick={openContactModal} />
        <main>
          <HeroSection />
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <AboutSection />
            <ServicesSection />
            <WorkSection />
            <div className="bfx-journey">
              <Journey />
            </div>
            <ResultsSection />
            <TestimonialsSection />
            <ContactSection onContactClick={openContactModal} />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <SiteFooter
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
        </Suspense>
      </div>
    </>
  );
}
