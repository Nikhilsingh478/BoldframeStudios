import { motion } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { Github, Linkedin } from 'lucide-react';

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
                href="https://github.com/Nikhilsingh478"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0F1316] flex items-center justify-center text-[#98A3AA] hover:text-[#67E8F9] hover:bg-[#1a1f24] transition-colors"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(103, 232, 249, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/nikhilsingh14788"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0F1316] flex items-center justify-center text-[#98A3AA] hover:text-[#67E8F9] hover:bg-[#1a1f24] transition-colors"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(103, 232, 249, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/webdevw_nikhil?igsh=aGs3Z2J2aDRybm52"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0F1316] flex items-center justify-center text-[#98A3AA] hover:text-[#67E8F9] hover:bg-[#1a1f24] transition-colors"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(103, 232, 249, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
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
