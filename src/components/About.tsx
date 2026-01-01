import { motion } from 'motion/react';
// Optional per-section SEO override (example):
// import { Helmet } from 'react-helmet-async';
// Inside the component return, you may add:
// <Helmet>
//   <title>Nikhil Webworks | About</title>
//   <meta name="description" content="About section details." />
// </Helmet>
import { Lightbulb, Pencil, Rocket } from 'lucide-react';

const process = [
  {
    icon: Lightbulb,
    step: '01',
    title: 'Discovery',
    description: 'We dive deep into your goals, audience, and competitive landscape.',
  },
  {
    icon: Pencil,
    step: '02',
    title: 'Design & Build',
    description: 'Rapid prototyping, iterative design, and clean code—built to scale.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Launch & Optimize',
    description: 'Deploy with confidence. Monitor, test, and continuously improve.',
  },
];

export function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', damping: 18, stiffness: 120 }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-[#E6EEF3] mb-6" style={{ fontWeight: 600 }}>
              About BoldFrame
            </h2>
            <p className="text-[#98A3AA] text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed max-w-2xl mx-auto">
              We're a boutique digital studio specializing in high-performance web experiences. 
              Every project is an opportunity to craft something meaningful, fast, and beautiful.
            </p>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-[clamp(1.5rem,3vw,2rem)] text-[#E6EEF3] text-center mb-12" style={{ fontWeight: 600 }}>
              Our Process
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {process.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Step number */}
                  <div className="text-[#5B3CFF] opacity-20 text-6xl absolute -top-4 -left-2" style={{ fontWeight: 700 }}>
                    {item.step}
                  </div>

                  <div className="relative z-10 pt-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#5B3CFF]/20 to-[#67E8F9]/20 flex items-center justify-center mb-6"
                    >
                      <item.icon className="w-8 h-8 text-[#67E8F9]" />
                    </motion.div>

                    <h4 className="text-xl text-[#E6EEF3] mb-3" style={{ fontWeight: 600 }}>
                      {item.title}
                    </h4>
                    <p className="text-[#98A3AA] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Connector line (hidden on mobile and last item) */}
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-[#7C8A96]/50 to-transparent -z-10" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-xl p-8 md:p-12 mt-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10+', label: 'Projects Shipped' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '3x', label: 'Avg. Performance Gain' },
                { value: '24/7', label: 'Support & Maintenance' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl text-[#5B3CFF] mb-2" style={{ fontWeight: 700 }}>
                    {stat.value}
                  </div>
                  <div className="text-[#98A3AA] text-xs md:text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
