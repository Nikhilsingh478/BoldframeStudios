import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Palette, Code, Layers, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Design Systems',
    description: 'Pixel-perfect UI, engineered for performance.',
    metric: '99% satisfaction',
    details: ['Component libraries', 'Brand consistency', 'Scalable architecture'],
  },
  {
    icon: Code,
    title: 'Fast Frontends',
    description: 'Modern React applications built to scale.',
    metric: '60% faster sites',
    details: ['Next.js & React', 'Performance optimization', 'SEO-ready'],
  },
  {
    icon: Layers,
    title: 'Product Thinking',
    description: 'Full-stack solutions that drive results.',
    metric: '2x conversions',
    details: ['User research', 'MVP development', 'Data-driven iteration'],
  },
  {
    icon: Zap,
    title: 'Continuous Delivery',
    description: 'Optimized for speed and accessibility.',
    metric: '95+ Lighthouse',
    details: ['CI/CD pipelines', 'Automated testing', 'Zero-downtime deploys'],
  },
];

export function ServicesCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background gradient - optimized */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#5B3CFF] rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring', damping: 18, stiffness: 120 }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-[#E6EEF3] mb-4" style={{ fontWeight: 600 }}>
            What We Do
          </h2>
          <p className="text-[#98A3AA] max-w-2xl mx-auto text-[clamp(0.875rem,1.5vw,1rem)]">
            End-to-end digital solutions that blend design, performance, and conversion optimization.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Carousel */}
        <div className="hidden md:block relative">
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <motion.button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-[#5B3CFF]/20 transition-colors"
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ChevronLeft className="w-6 h-6 text-[#67E8F9]" />
            </motion.button>
          )}

          {canScrollRight && (
            <motion.button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-[#5B3CFF]/20 transition-colors"
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ChevronRight className="w-6 h-6 text-[#67E8F9]" />
            </motion.button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', damping: 18, stiffness: 120 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="flex-shrink-0 w-80 snap-center"
              >
                <div className="glass rounded-2xl p-8 h-full relative overflow-hidden group hover:shadow-lg hover:shadow-[#5B3CFF]/10 transition-all">
                  {/* Icon */}
                  <motion.div
                    animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    className="w-12 h-12 rounded-lg bg-[#5B3CFF]/10 flex items-center justify-center mb-6"
                  >
                    <service.icon className="w-6 h-6 text-[#5B3CFF]" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl text-[#E6EEF3] mb-2" style={{ fontWeight: 600 }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#98A3AA] text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2 mb-6">
                    {service.details.map((detail) => (
                      <li key={detail} className="text-[#7C8A96] text-xs flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#67E8F9]" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Metric Badge */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredIndex === index ? 'auto' : 0,
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-[#67E8F9] text-sm overflow-hidden"
                    style={{ fontWeight: 600 }}
                  >
                    ✓ {service.metric}
                  </motion.div>

                  {/* Hover Effect Gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#5B3CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: Stacked Cards */}
        <div className="md:hidden space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#5B3CFF]/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-[#5B3CFF]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-[#E6EEF3] mb-1" style={{ fontWeight: 600 }}>
                    {service.title}
                  </h3>
                  <p className="text-[#98A3AA] text-sm">{service.description}</p>
                </div>
              </div>
              <div className="pl-16">
                <div className="text-[#67E8F9] text-sm mb-3" style={{ fontWeight: 600 }}>
                  ✓ {service.metric}
                </div>
                <ul className="space-y-1">
                  {service.details.map((detail) => (
                    <li key={detail} className="text-[#7C8A96] text-xs flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#67E8F9]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
