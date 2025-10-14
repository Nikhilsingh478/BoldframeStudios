import { motion, AnimatePresence } from 'motion/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface FloatingContactProps {
  onContactClick: () => void;
}

export function FloatingContact({ onContactClick }: FloatingContactProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickLinks = [
    { label: 'Email Us', action: () => window.location.href = 'mailto:nikhilwebworks@gmail.com' },
    { label: 'Contact Form', action: onContactClick },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="mb-4 space-y-2"
          >
            {quickLinks.map((link, index) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  link.action();
                  setIsExpanded(false);
                }}
                className="glass px-6 py-3 rounded-full text-[#E6EEF3] text-sm hover:bg-[#5B3CFF]/20 transition-colors whitespace-nowrap block w-full text-left"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-16 h-16 rounded-full bg-[#5B3CFF] text-[#E6EEF3] flex items-center justify-center shadow-lg shadow-[#5B3CFF]/30"
        whileHover={{ scale: 1.1, backgroundColor: '#7055ff' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
