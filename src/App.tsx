import { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { Work } from './components/Work';
import { Playroom } from './components/Playroom';
import { Testimonials } from './components/Testimonials';
import { About } from './components/About';
import { ContactModal } from './components/ContactModal';
import { FloatingContact } from './components/FloatingContact';
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);

  // Load EmailJS and SweetAlert scripts
  useEffect(() => {
    // SweetAlert2
    const sweetAlertScript = document.createElement('script');
    sweetAlertScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    sweetAlertScript.async = true;
    document.body.appendChild(sweetAlertScript);

    // EmailJS
    const emailScript = document.createElement('script');
    emailScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    emailScript.async = true;
    emailScript.onload = () => {
      (window as any).emailjs?.init('NwMPwoO6mOuR1IeSD');
    };
    document.body.appendChild(emailScript);

    return () => {
      document.body.removeChild(sweetAlertScript);
      if (document.body.contains(emailScript)) {
        document.body.removeChild(emailScript);
      }
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
            <ServicesCarousel />
            <Playroom />
            <Work />
            <Testimonials />
            <About />
          </main>
          <Footer onContactClick={openContactModal} />
          
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />
          
          <FloatingContact onContactClick={openContactModal} />
          <BackToTop />
        </div>
      )}
    </>
  );
}
