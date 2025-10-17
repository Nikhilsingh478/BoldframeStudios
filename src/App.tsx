import { useState, useEffect, lazy, Suspense } from 'react';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CustomCursor } from './components/CustomCursor';

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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);

  // Load EmailJS and SweetAlert scripts - optimized with defer
  useEffect(() => {
    // Capture environment variable outside of callback scope
    const emailJsPublicKey = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY || 'NwMPwoO6mOuR1IeSD';
    
    const loadScript = (src: string, onLoad?: () => void): HTMLScriptElement => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      if (onLoad) script.onload = onLoad;
      document.body.appendChild(script);
      return script;
    };

    // Load scripts only after initial render
    const timer = setTimeout(() => {
      const sweetAlertScript = loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11');
      const emailScript = loadScript(
        'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js',
        () => {
          (window as any).emailjs?.init(emailJsPublicKey);
        }
      );

      return () => {
        if (document.body.contains(sweetAlertScript)) document.body.removeChild(sweetAlertScript);
        if (document.body.contains(emailScript)) document.body.removeChild(emailScript);
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="min-h-screen bg-[#0B0D0F]">
          <CustomCursor />
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
            <Footer onContactClick={openContactModal} />
            
            <ContactModal
              isOpen={isContactModalOpen}
              onClose={() => setIsContactModalOpen(false)}
            />
            
            <FloatingContact onContactClick={openContactModal} />
            <BackToTop />
          </Suspense>
        </div>
      )}
    </>
  );
}
