import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface LegalModalsProps {
  activeModal: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export function LegalModals({ activeModal, onClose }: LegalModalsProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Trap focus inside modal
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeModal, onClose]);

  // Scroll to top when modal content changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeModal]);

  if (!activeModal) return null;

  return createPortal(
    <AnimatePresence>
      {activeModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 cursor-pointer"
            style={{ zIndex: 2147483645 }}
          />

          {/* Modal Container */}
          <div 
            className="fixed inset-0 flex justify-center p-4 pt-28 sm:pt-32"
            style={{ zIndex: 2147483646 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              className="relative w-full max-w-2xl h-[70vh] flex flex-col rounded-2xl bg-[#0F1316] border border-[#7C8A96]/20 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1A1F24] hover:bg-[#252b31] border border-[#7C8A96]/20 flex items-center justify-center transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-[#67E8F9] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-[#E6EEF3]" />
              </button>

              {/* Header */}
              <div className="p-8 pb-4 border-b border-[#7C8A96]/20 flex-shrink-0 bg-[#0F1316]">
                <h2 className="text-2xl md:text-3xl text-[#E6EEF3] font-semibold pr-12">
                  {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                </h2>
                <p className="text-[#98A3AA] text-sm mt-1">
                  Last updated: January 2026
                </p>
              </div>

              {/* Scrollable Content */}
              <div 
                className="overflow-y-auto p-8 pt-6 custom-scrollbar flex-grow bg-[#0F1316]" 
                ref={contentRef}
                style={{ overscrollBehavior: 'contain' }}
              >
                <div className="prose prose-invert prose-sm max-w-none text-[#98A3AA] space-y-6 pb-8">
                  {activeModal === 'privacy' ? (
                    <>
                      <p>
                        BoldFrame Studios ("we", "our", "us") respects your privacy and is committed to protecting the information you share with us. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or contact us.
                      </p>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">1. Information We Collect</h3>
                        <p className="mb-2">We collect limited personal information only when you voluntarily provide it to us, such as when you:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Fill out a contact or project inquiry form</li>
                          <li>Reach out via email or WhatsApp</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">2. How We Use Your Information</h3>
                        <p className="mb-2">We use the information collected solely to:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Respond to inquiries and messages</li>
                          <li>Communicate regarding potential projects or collaborations</li>
                          <li>Improve our website and user experience</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">3. Third-Party Services</h3>
                        <p className="mb-2">We may use trusted third-party tools and services to operate this website, such as:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Email delivery services (e.g., contact form handling)</li>
                          <li>Analytics tools to measure website performance</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">4. Data Security</h3>
                        <p>
                          We take reasonable technical and organizational measures to protect your information. However, please note that no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">5. Your Rights</h3>
                        <p className="mb-2">You have the right to:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Request access to the personal information you have shared</li>
                          <li>Request correction or deletion of your information</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">6. Contact Us</h3>
                        <p className="mb-2">If you have any questions about this Privacy Policy, please contact us at:</p>
                        <a href="mailto:hello@boldframestudios.com" className="text-[#67E8F9] hover:underline inline-flex items-center gap-1">
                          hello@boldframestudios.com
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>
                        By accessing or using the BoldFrame Studios website, you agree to the following Terms of Service. If you do not agree with these terms, please refrain from using the site.
                      </p>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">1. Use of the Website</h3>
                        <p>
                          This website is provided for informational and portfolio purposes only. You agree to use it lawfully and in a manner that does not infringe on the rights of others or restrict their use of the site.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">2. Services & Engagements</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>All services displayed or described on this website are indicative only.</li>
                          <li>Project scope, timelines, pricing, and deliverables are finalized only after direct communication and mutual agreement.</li>
                          <li>No service is guaranteed until a formal agreement is reached.</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">3. Intellectual Property</h3>
                        <p>
                          Unless stated otherwise, all content on this website — including but not limited to designs, layouts, text, graphics, animations, and code — is the intellectual property of BoldFrame Studios.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">4. Limitation of Liability</h3>
                        <p>
                          BoldFrame Studios is not responsible for any damages or losses arising from your use or inability to use this website. The website is provided on an "as-is" basis.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">5. External Links</h3>
                        <p>
                          This website may include links to third-party platforms. We are not responsible for the content, availability, or policies of these external websites.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-[#E6EEF3] text-lg font-medium mb-2">6. Contact Information</h3>
                        <p className="mb-2">For questions regarding these Terms of Service, please contact:</p>
                        <a href="mailto:hello@boldframestudios.com" className="text-[#67E8F9] hover:underline inline-flex items-center gap-1">
                          hello@boldframestudios.com
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
