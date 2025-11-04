import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'The Huuman redesign brought our concept to life — smooth GSAP motion, responsive behavior, and stunning visuals. Exactly how we imagined our brand should feel.',
    // author: 'Aarav Malhotra',
    role: 'Founder',
    company: 'Huuman',
  },
  {
    quote:
      'Our spa website turned out elegant, fast, and inviting. The booking experience feels natural and beautifully animated — clients often compliment the site.',
    // author: 'Sophie Williams',
    role: 'Owner',
    company: 'Roseberry Massage Spa',
  },
  {
    quote:
      'The redesign for HBL modernized our entire digital presence. It’s sleek, minimal, and loads under a second — a major credibility boost for our brand.',
    // author: 'Rohit Sharma',
    role: 'Marketing Head',
    company: 'HBL Industries',
  },
  {
    quote:
      'The organic store frontend feels both fresh and premium. From product pages to admin dashboards, everything runs fast and looks professional.',
    // author: 'Priya Singh',
    role: 'Operations Manager',
    company: 'Organic Green Tea Store',
  },
];

const clientLogos = [
  { name: 'Huuman', color: '#67E8F9' },
  { name: 'Roseberry Spa', color: '#5B3CFF' },
  { name: 'HBL', color: '#7C8A96' },
  { name: 'Organic Tea', color: '#67E8F9' },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // rotate testimonials every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#5B3CFF] rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [-50, -30, -50],
            y: [-50, -70, -50],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-[clamp(2rem,4vw,3rem)] text-[#E6EEF3] mb-4"
              style={{ fontWeight: 600 }}
            >
              Trusted by Teams
            </h2>
          </motion.div>

          <div className="relative min-h-[200px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  scale: activeIndex === index ? 1 : 0.9,
                  y: activeIndex === index ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
              >
                <Quote className="w-10 h-10 text-[#5B3CFF] mb-6 opacity-50" />
                <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-[#E6EEF3] mb-6 leading-relaxed max-w-2xl">
                  "{testimonial.quote}"
                </p>
                <div>
                  {/* <div
                    className="text-[#E6EEF3]"
                    style={{ fontWeight: 600 }}
                  >
                    {testimonial.author}
                  </div> */}
                  <div className="text-[#98A3AA] text-sm">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? 'bg-[#5B3CFF] w-8'
                    : 'bg-[#7C8A96]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Client Logos Infinite Loop Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-center text-[#98A3AA] text-sm mb-8 tracking-widest">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <div className="overflow-hidden relative">
            <motion.div
              className="flex gap-16"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 25,
                ease: 'linear',
                repeat: Infinity,
              }}
              style={{ width: '200%' }}
            >
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 text-[#7C8A96] opacity-50 hover:opacity-100 transition-opacity"
                  style={{ minWidth: '120px' }}
                >
                  <svg width="120" height="40" viewBox="0 0 120 40">
                    <text
                      x="60"
                      y="25"
                      textAnchor="middle"
                      fill="currentColor"
                      className="text-xl"
                      style={{ fontWeight: 700 }}
                    >
                      {logo.name}
                    </text>
                  </svg>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
