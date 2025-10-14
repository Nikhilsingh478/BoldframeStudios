import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = 'NwMPwoO6mOuR1IeSD';
const EMAILJS_SERVICE_ID = 'service_7ys7xff';
const EMAILJS_ADMIN_TEMPLATE_ID = 'template_hl5a33o';
const EMAILJS_CLIENT_TEMPLATE_ID = 'template_tgqw9ag';

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
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

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailjs = (window as any).emailjs;
      
      if (!emailjs || typeof emailjs.send !== 'function') {
        throw new Error('EmailJS not loaded. Please refresh the page and try again.');
      }

      console.log('📧 Sending emails...');

      // Send both emails in parallel
      await Promise.all([
        // 1️⃣ Admin notification email
        emailjs.send(
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
        ).then((response: any) => {
          console.log('✅ Admin email sent:', response);
          return response;
        }),

        // 2️⃣ Client auto-reply email
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_CLIENT_TEMPLATE_ID,
          {
            to_email: formData.email,
            to_name: formData.name,
            from_name: 'BoldFrame Studios',
            reply_to: 'nikhilwebworks@gmail.com',
          },
          EMAILJS_PUBLIC_KEY
        ).then((response: any) => {
          console.log('✅ Client auto-reply sent:', response);
          return response;
        }),
      ]);

      console.log('🎉 All emails sent successfully!');
      
      // Show success message
      if ((window as any).Swal) {
        await (window as any).Swal.fire({
          icon: 'success',
          title: '✅ Message Sent!',
          html: '<p style="color: #E6EEF3;">We\'ve received your details and will get back to you within 24 hours.</p>',
          background: '#0F1316',
          color: '#E6EEF3',
          confirmButtonColor: '#5B3CFF',
          confirmButtonText: 'Great!',
          showConfirmButton: true,
        });
      } else {
        alert('Message sent successfully! Check your email for confirmation.');
      }

      // Reset form and close modal
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    } catch (error: any) {
      console.error('❌ Error submitting form:', error);
      
      // Show error message
      if ((window as any).Swal) {
        (window as any).Swal.fire({
          icon: 'error',
          title: '⚠️ Oops...',
          text: 'Something went wrong. Please try again or contact us directly at nikhilwebworks@gmail.com',
          background: '#0F1316',
          color: '#E6EEF3',
          confirmButtonColor: '#5B3CFF',
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50"
            style={{ backdropFilter: 'blur(4px)' }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              className="glass rounded-2xl p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0F1316] flex items-center justify-center hover:bg-[#1a1f24] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-[#98A3AA]" />
              </button>

              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl text-[#E6EEF3] mb-2" style={{ fontWeight: 600 }}>
                  Start a Project
                </h2>
                <p className="text-[#98A3AA]">
                  Tell us about your project and we'll get back to you within 24 hours.
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
                  className="w-full py-4 bg-gradient-to-r from-[#5B3CFF] to-[#7055ff] text-[#E6EEF3] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#5B3CFF]/30 flex items-center justify-center"
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
