import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { MagneticButton } from './MagneticButton';

export function Header({ onContactClick }: { onContactClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'py-6 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 18, stiffness: 120 }}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('hero')}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="28"
              height="28"
              stroke="#5B3CFF"
              strokeWidth="1.5"
            />
            <path
              d="M10 8 L10 24 M10 8 L17 8 C19 8 19 12 17 12 L10 12 M10 12 L18 12 C20 12 20 16 20 17.5 C20 20 18 24 16 24 L10 24"
              stroke="#E6EEF3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[#E6EEF3] tracking-tight" style={{ fontWeight: 600 }}>
            BoldFrame
          </span>
        </motion.button>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Services', id: 'services' },
            { label: 'Work', id: 'work' },
            { label: 'About', id: 'about' },
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[#98A3AA] hover:text-[#E6EEF3] transition-colors relative"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', damping: 18, stiffness: 200 }}
            >
              {item.label}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-px bg-[#67E8F9]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <MagneticButton
          onClick={onContactClick}
          className="px-6 py-2.5 bg-[#5B3CFF] text-[#E6EEF3] rounded-lg hover:bg-[#7055ff] transition-colors text-sm shadow-lg shadow-[#5B3CFF]/30"
          strength={0.2}
        >
          Start a Project
        </MagneticButton>
      </nav>
    </motion.header>
  );
}
