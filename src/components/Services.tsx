import { motion } from 'motion/react';
import { Palette, Code, Layers, Zap } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: Palette,
    title: 'Design',
    description: 'Pixel-perfect UI, engineered for performance.',
    metric: '99% satisfaction',
  },
  {
    icon: Code,
    title: 'Frontend',
    description: 'Modern React applications built to scale.',
    metric: '60% faster sites',
  },
  {
    icon: Layers,
    title: 'Web Apps',
    description: 'Full-stack solutions that drive results.',
    metric: '2x conversions',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimized for speed and accessibility.',
    metric: '95+ Lighthouse',
  },
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', damping: 18, stiffness: 120 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="glass rounded-xl p-8 relative overflow-hidden group cursor-pointer"
            >
              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(254, 50, 10, 0.1), transparent)',
                }}
              />

              <div className="relative z-10">
                <motion.div
                  animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                  className="w-12 h-12 rounded-lg bg-[#5B3CFF]/10 flex items-center justify-center mb-6"
                >
                  <service.icon className="w-6 h-6 text-[#5B3CFF]" />
                </motion.div>

                <h3 className="text-xl text-[#E6EEF3] mb-3" style={{ fontWeight: 600 }}>
                  {service.title}
                </h3>
                <p className="text-[#98A3AA] mb-4 text-sm">
                  {service.description}
                </p>

                {/* Metric reveal on hover */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    height: hoveredIndex === index ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-[#67E8F9] text-sm overflow-hidden"
                  style={{ fontWeight: 600 }}
                >
                  {service.metric}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
