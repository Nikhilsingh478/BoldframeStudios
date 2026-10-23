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
const loadContactModal = () => import('./components/ContactModal');
const ContactModal = lazy(() => loadContactModal().then(m => ({ default: m.ContactModal })));
const LegalModals = lazy(() => import('./components/LegalModals').then(m => ({ default: m.LegalModals })));

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  // Load EmailJS (on idle after page load, and again as a no-op on open)
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

  // Fetch the contact dialog and EmailJS while the visitor is browsing, so
  // the first "Let's Connect" opens instantly instead of stalling on
  // downloading and parsing them mid-animation.
  useEffect(() => {
    const idle = (cb: () => void) =>
      'requestIdleCallback' in window
        ? (window as any).requestIdleCallback(cb, { timeout: 4000 })
        : window.setTimeout(cb, 2500);
    const handle = window.setTimeout(() => idle(() => {
      loadContactModal();
      loadContactScripts();
    }), 3500);
    return () => window.clearTimeout(handle);
  }, []);

  const openContactModal = () => {
    loadContactScripts();
    setIsContactModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>BoldFrame Studios</title>
        <meta name="description" content="BoldFrame Studios is a design and development studio. We understand your problem end to end, research your market and brand, plan the product, and build secure, fast websites and web apps." />
        <meta name="keywords" content="web design, web development, web apps, e-commerce, UI UX design, product development, React, Next.js, India, BoldFrame Studios" />
        <meta name="author" content="Nikhil Webworks" />
        <link rel="canonical" href="https://boldframestudios.in/" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BoldFrame Studios" />
        <meta property="og:description" content="BoldFrame Studios: research, design and development for secure, fast websites and web apps." />
        <meta property="og:url" content="https://boldframestudios.in/" />
        <meta property="og:image" content="https://boldframestudios.in/preview.png" />
        <meta property="og:site_name" content="BoldFrame Studios" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BoldFrame Studios" />
        <meta name="twitter:description" content="BoldFrame Studios: research, design and development for secure, fast websites and web apps." />
        <meta name="twitter:image" content="https://boldframestudios.in/preview.png" />
        {/* Viewport & Fallbacks */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, interactive-widget=resizes-content" />
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
