import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CaseStudy {
  title: string;
  category: string;
  image: string;
  heroImage: string;
  description: string;
  timeline: string;
  tech: string[];
  challenge: string;
  solution: string;
  outcomes: {
    metric: string;
    value: string;
  }[];
  gallery: string[];
  url?: string; // Optional live site URL
}

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

export function CaseStudyModal({ isOpen, onClose, caseStudy }: CaseStudyModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!caseStudy) return null;

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
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-3 py-14 md:px-4 md:py-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="max-w-5xl mx-auto bg-[#0F1316] rounded-2xl overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center hover:bg-[#5B3CFF]/20 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-[#E6EEF3]" />
                </button>

                {/* Hero Image */}
                <div className="relative aspect-[21/9] overflow-hidden bg-[#0B0D0F]">
                  <ImageWithFallback
                    src={caseStudy.heroImage}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1316] via-transparent to-transparent" />
                </div>

                <div className="p-6 md:p-12">
                  {/* Header */}
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide bg-[#5B3CFF]/10 text-[#5B3CFF] border border-[#5B3CFF]/20">
                        {caseStudy.category}
                      </span>
                      <span className="text-[#7C8A96] text-sm">
                        {caseStudy.timeline}
                      </span>
                    </div>
                    <h2 className="text-[clamp(2rem,4vw,3rem)] text-[#E6EEF3] mb-4 font-semibold">
                      {caseStudy.title}
                    </h2>
                    <p className="text-[#98A3AA] text-lg leading-relaxed">
                      {caseStudy.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-12">
                    <h3 className="text-[#E6EEF3] mb-4 font-semibold">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 rounded-lg bg-[#0B0D0F] text-[#7C8A96] text-sm border border-[#7C8A96]/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                    <div>
                      <h3 className="text-[#E6EEF3] mb-3 font-semibold">Challenge</h3>
                      <p className="text-[#98A3AA] leading-relaxed">
                        {caseStudy.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[#E6EEF3] mb-3 font-semibold">Solution</h3>
                      <p className="text-[#98A3AA] leading-relaxed">
                        {caseStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="mb-12">
                    <h3 className="text-[#E6EEF3] mb-6 font-semibold">
                      Key Outcomes
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                      {caseStudy.outcomes.map((outcome, index) => (
                        <motion.div
                          key={outcome.metric}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="glass p-4 md:p-6 rounded-xl text-center"
                        >
                          <div className="text-2xl md:text-3xl text-[#5B3CFF] mb-1.5 md:mb-2 font-bold">
                            {outcome.value}
                          </div>
                          <div className="text-[#98A3AA] text-sm">
                            {outcome.metric}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA (Live Site) */}
                  {caseStudy.url && (
                    <div className="pt-8 border-t border-[#7C8A96]/20">
                      <motion.a
                        href={caseStudy.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#67E8F9] hover:text-[#E6EEF3] transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-semibold">View live site</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.a>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
