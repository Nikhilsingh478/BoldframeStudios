import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
// Optional per-section SEO override (example):
// import { Helmet } from 'react-helmet-async';
// Inside the rendered fragment when open, you may add:
// <Helmet>
//   <title>Nikhil Webworks | Contact</title>
//   <meta name="description" content="Contact modal for project inquiries." />
// </Helmet>
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// EmailJS Configuration - Use environment variables for security
const EMAILJS_PUBLIC_KEY = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY || 'NwMPwoO6mOuR1IeSD';
const EMAILJS_SERVICE_ID = import.meta.env?.VITE_EMAILJS_SERVICE_ID || 'service_7ys7xff';
const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env?.VITE_EMAILJS_ADMIN_TEMPLATE_ID || 'template_hl5a33o';

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trap focus inside modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keep keyboard focus within the modal and return focus to the opener.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusFrame = window.requestAnimationFrame(() => {
      modalRef.current?.querySelector<HTMLElement>('input, textarea, button:not(:disabled)')?.focus();
    });
    const handleModalKeys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      ));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleModalKeys);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleModalKeys);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailjs = (window as any).emailjs;
      
      if (!emailjs || typeof emailjs.send !== 'function') {
        throw new Error('EmailJS not loaded. Please refresh the page and try again.');
      }

      // Send only admin notification email
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          to_email: 'nikhilwebworks@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message,
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      void response;
      
      // Show success message
      if ((window as any).Swal) {
        await (window as any).Swal.fire({
          icon: 'success',
          title: 'Message sent',
          html: '<p>Thanks for getting in touch. Your message has been received.</p>',
          background: '#f2eee4',
          color: '#292b25',
          confirmButtonColor: '#b64e35',
          confirmButtonText: 'Close',
          showConfirmButton: true,
        });
      } else {
        alert('Message sent successfully. Your message has been received.');
      }

      // Reset form and close modal
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      // Show error message
      if ((window as any).Swal) {
        (window as any).Swal.fire({
          icon: 'error',
          title: 'Message could not be sent',
          text: 'Something went wrong. Please try again or contact us directly at nikhilwebworks@gmail.com',
          background: '#f2eee4',
          color: '#292b25',
          confirmButtonColor: '#b64e35',
        });
      } else {
        alert('Failed to send message. Please email us at nikhilwebworks@gmail.com');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : undefined}
            onClick={onClose}
            className="contact-backdrop fixed inset-0 bg-black/80 z-50"
            style={{ backdropFilter: 'blur(4px)' }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={reduceMotion ? { duration: 0 } : { type: 'spring', damping: 25, stiffness: 400 }}
              className="contact-shell glass rounded-2xl p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="contact-close absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0F1316] flex items-center justify-center hover:bg-[#1a1f24] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-[#98A3AA]" />
              </button>

              {/* Header */}
              <div className="mb-8">
                <h2 id="contact-title" className="text-3xl text-[#E6EEF3] mb-2" style={{ fontWeight: 600 }}>
                  Tell us what you&rsquo;re building
                </h2>
                <p className="text-[#98A3AA]">
                  A few details about your project are a good place to start.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-[#E6EEF3] mb-2 block">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-[#0F1316] border-[#7C8A96]/30 text-[#E6EEF3] focus:border-[#67E8F9]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#E6EEF3] mb-2 block">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#0F1316] border-[#7C8A96]/30 text-[#E6EEF3] focus:border-[#67E8F9]"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#E6EEF3] mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-[#0F1316] border-[#7C8A96]/30 text-[#E6EEF3] focus:border-[#67E8F9]"
                    placeholder="+1 (555) 000-0000 (optional)"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-[#E6EEF3] mb-2 block">
                    Project Details / Message *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-[#0F1316] border-[#7C8A96]/30 text-[#E6EEF3] focus:border-[#67E8F9] min-h-[120px]"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit w-full py-4 bg-gradient-to-r from-[#5B3CFF] to-[#7055ff] text-[#E6EEF3] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#5B3CFF]/30 flex items-center justify-center"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  style={{ fontWeight: 600 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
