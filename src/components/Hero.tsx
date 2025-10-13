import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { MagneticButton } from './MagneticButton';
import { TrendingUp, Users, Zap } from 'lucide-react';

export function Hero({ onContactClick }: { onContactClick: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(91, 60, 255, 0.2), transparent 50%)',
          y,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Fog overlay */}
      <motion.div
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(103, 232, 249, 0.15), transparent 40%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#67E8F9] rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Content */}
          <motion.div style={{ opacity, scale }}>
            {/* Main heading - each word on separate line */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring', damping: 18, stiffness: 120 }}
              className="mb-6"
            >
              <h1 className="text-[clamp(3rem,8vw,6rem)] text-[#E6EEF3] tracking-tight leading-[0.95]" style={{ fontWeight: 600 }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Craft.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Move.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Convert.
                </motion.div>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, type: 'spring', damping: 18, stiffness: 120 }}
              className="text-[#98A3AA] tracking-[0.2em] mb-12 text-xs md:text-sm"
            >
              CRAFTING SEAMLESS WEB EXPERIENCES
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, type: 'spring', damping: 18, stiffness: 120 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton
                onClick={onContactClick}
                className="px-8 py-4 bg-[#5B3CFF] text-[#E6EEF3] rounded-lg hover:bg-[#7055ff] transition-colors shadow-lg shadow-[#5B3CFF]/30"
              >
                Start a Project
              </MagneticButton>
              <MagneticButton
                onClick={scrollToWork}
                className="px-8 py-4 border border-[#7C8A96] text-[#E6EEF3] rounded-lg hover:border-[#67E8F9] transition-colors"
              >
                View Work
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right: Redesigned Device Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring', damping: 18, stiffness: 120 }}
            className="hidden lg:block relative"
          >
            <motion.div
              style={{
                rotateY: useTransform(scrollYProgress, [0, 1], [0, -10]),
                rotateX: useTransform(scrollYProgress, [0, 1], [0, 5]),
              }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="relative perspective-1000"
            >
              {/* Background Layer - Blurred gradient with particles */}
              <div className="absolute -inset-8 opacity-40">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#5B3CFF]/30 via-[#67E8F9]/20 to-[#5B3CFF]/30 blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Main Device Container */}
              <div className="relative glass rounded-2xl p-6 shadow-2xl">
                {/* Top Layer - Realistic UI Snapshot */}
                <div className="relative bg-[#0B0D0F] rounded-xl overflow-hidden border border-[#7C8A96]/20">
                  {/* Header Bar */}
                  <div className="flex items-center justify-between p-4 border-b border-[#7C8A96]/20">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#5B3CFF]" />
                      <div className="w-3 h-3 rounded-full bg-[#67E8F9]" />
                      <div className="w-3 h-3 rounded-full bg-[#7C8A96]" />
                    </div>
                    <div className="text-[#7C8A96] text-xs">Dashboard</div>
                    <div className="w-6 h-6" />
                  </div>

                  {/* Stats Cards */}
                  <div className="p-4 grid grid-cols-2 gap-3">
                    <motion.div
                      className="glass rounded-lg p-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-[#67E8F9]" />
                        <span className="text-[#7C8A96] text-xs">Revenue</span>
                      </div>
                      <div className="text-[#E6EEF3] text-lg" style={{ fontWeight: 600 }}>
                        +152%
                      </div>
                    </motion.div>

                    <motion.div
                      className="glass rounded-lg p-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-[#67E8F9]" />
                        <span className="text-[#7C8A96] text-xs">Users</span>
                      </div>
                      <div className="text-[#E6EEF3] text-lg" style={{ fontWeight: 600 }}>
                        12.4K
                      </div>
                    </motion.div>
                  </div>

                  {/* Middle Layer - Animated Dashboard Graph */}
                  <div className="p-4">
                    <div className="glass rounded-lg p-4 h-32 relative overflow-hidden">
                      {/* Animated line chart */}
                      <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <motion.path
                          d="M0,80 Q75,20 150,40 T300,10"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 1.5, ease: 'easeInOut' }}
                        />
                        <motion.path
                          d="M0,80 Q75,20 150,40 T300,10 L300,100 L0,100 Z"
                          fill="url(#gradientFill)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.3 }}
                          transition={{ duration: 1, delay: 2 }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#5B3CFF" />
                            <stop offset="100%" stopColor="#67E8F9" />
                          </linearGradient>
                          <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#5B3CFF" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#5B3CFF" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Animated dot on line */}
                      <motion.div
                        className="absolute w-2 h-2 bg-[#67E8F9] rounded-full shadow-lg shadow-[#67E8F9]/50"
                        animate={{
                          x: [0, 150, 300],
                          y: [80, 40, 20],
                        }}
                        transition={{
                          duration: 3,
                          delay: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{ top: '20%', left: 0 }}
                      />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="p-4">
                    <motion.div
                      className="w-full py-3 bg-gradient-to-r from-[#5B3CFF] to-[#67E8F9] rounded-lg text-center text-[#E6EEF3] text-sm"
                      style={{ fontWeight: 600 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.8 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>Optimize Now</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating elements around device */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-lg bg-gradient-to-br from-[#5B3CFF] to-[#7055ff] opacity-60 blur-xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#67E8F9] to-[#85f0ff] opacity-60 blur-xl"
                animate={{
                  y: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#7C8A96] rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-[#67E8F9] rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
