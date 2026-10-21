import { motion } from 'motion/react';
import { Palette, Code, Zap, Check } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: Palette,
    title: 'Conversion-Focused Landing Pages',
    description: 'High-impact landing pages designed to communicate clearly, load fast, and convert visitors into leads or bookings.',
    bullets: ['UI/UX focused on clarity', 'Mobile-first layouts', 'CTA & funnel alignment'],
  },
  {
    icon: Code,
    title: 'Frontend Website Development',
    description: 'Modern, fast, and SEO-ready frontend websites built using proven technologies.',
    bullets: ['React / Next.js', 'Performance optimization', 'Clean, scalable code'],
  },
  {
    icon: Zap,
    title: 'Performance & Optimization',
    description: 'Websites engineered for speed, accessibility, and real-world performance.',
    bullets: ['90+ Lighthouse scores', 'SEO-ready structure', 'Core Web Vitals focus'],
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
            What We Build
          </h2>
          <p className="text-[#98A3AA] max-w-2xl mx-auto text-[clamp(0.875rem,1.5vw,1rem)]">
            We focus on designing and building high-performance landing pages and frontend websites that help businesses convert traffic into action.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', damping: 18, stiffness: 120 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="glass rounded-xl p-8 relative overflow-hidden group cursor-pointer h-full"
            >
              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(91, 60, 255, 0.1), transparent)',
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
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
                <p className="text-[#98A3AA] mb-6 text-sm">
                  {service.description}
                </p>

                {/* Bullets */}
                <div className="mt-auto space-y-2">
                  {service.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#E6EEF3]/80">
                      <Check className="w-4 h-4 text-[#67E8F9]" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

