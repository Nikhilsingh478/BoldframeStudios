/// <reference types="vite/client" />
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Capabilities } from './components/redesign/Capabilities';
import { Journey } from './components/redesign/Journey';
import { WorkGallery } from './components/redesign/WorkGallery';
import { ContactModal } from './components/ContactModal';
import { LegalModals } from './components/LegalModals';
import { Footer } from './components/Footer';

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
        <meta name="description" content="BoldFrame Studios brings strategy, design and frontend development together to make distinctive websites." />
        <meta name="keywords" content="web development, frontend, react, nextjs, freelance, portfolio, india, spa, design" />
        <meta name="author" content="Nikhil Webworks" />
        <link rel="canonical" href="https://boldframestudios.in/" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BoldFrame Studios" />
        <meta property="og:description" content="Strategy, design and frontend development for distinctive websites." />
        <meta property="og:url" content="https://boldframestudios.in/" />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:site_name" content="BoldFrame Studios" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BoldFrame Studios" />
        <meta name="twitter:description" content="Strategy, design and frontend development for distinctive websites." />
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
      <div className="studio-site">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header onContactClick={openContactModal} />
        <main id="main-content">
          <Hero onContactClick={openContactModal} />
          <Capabilities />
          <Journey />
          <WorkGallery />
        </main>
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
      </div>
    </>
  );
}
