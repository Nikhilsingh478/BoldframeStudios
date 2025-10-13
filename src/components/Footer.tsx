import { motion } from 'motion/react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export function Footer({ onContactClick }: { onContactClick: () => void }) {
  return (
    <footer className="glass border-t border-[#7C8A96]/20 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', damping: 18, stiffness: 120 }}
            className="text-center mb-12"
          >
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] text-[#E6EEF3] mb-6" style={{ fontWeight: 600 }}>
              Ready to build? Let's move.
            </h3>
            <MagneticButton
              onClick={onContactClick}
              className="px-8 py-4 bg-[#5B3CFF] text-[#E6EEF3] rounded-lg hover:bg-[#7055ff] transition-colors shadow-lg shadow-[#5B3CFF]/30"
            >
              Start a Project
            </MagneticButton>
          </motion.div>

          {/* Links and Social */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <svg
                width="28"
                height="28"
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
              <span className="text-[#E6EEF3] tracking-tight">BoldFrame Studios</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0F1316] flex items-center justify-center text-[#98A3AA] hover:text-[#67E8F9] hover:bg-[#1a1f24] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0F1316] flex items-center justify-center text-[#98A3AA] hover:text-[#67E8F9] hover:bg-[#1a1f24] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0F1316] flex items-center justify-center text-[#98A3AA] hover:text-[#67E8F9] hover:bg-[#1a1f24] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Copyright and Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[#7C8A96]/20">
            <p className="text-[#98A3AA] text-sm">
              © 2025 BoldFrame Studios. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-[#98A3AA] hover:text-[#E6EEF3] text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[#98A3AA] hover:text-[#E6EEF3] text-sm transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
