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
  { name: 'Huuman' },
  { name: 'Roseberry Massage Spa' },
  { name: 'HBL' },
  { name: 'Organic Green Tea Store' },
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
    <section id="testimonials" className="bf-section bf-tm" aria-labelledby="bf-tm-title">
      <div className="bf-container">
        <div className="bf-tm-head">
          <span className="bf-micro">04 / Clients</span>
          <h2 id="bf-tm-title" className="bf-tm-title">
            IN THEIR <span>WORDS.</span>
          </h2>
        </div>

        <div className="bf-tm-stage" aria-live="polite">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.company}
              className="bf-tm-quote"
              initial={false}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                y: activeIndex === index ? 0 : 16,
              }}
              transition={{ duration: 0.5 }}
              aria-hidden={activeIndex !== index}
            >
              <Quote className="bf-tm-mark" aria-hidden="true" />
              <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <figcaption>
                {testimonial.role} <span aria-hidden="true">·</span> {testimonial.company}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Dots indicator — padded to meet 44×44px minimum touch target */}
        <div className="bf-tm-dots">
          {testimonials.map((t, index) => (
            <button
              key={t.company}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show testimonial from ${t.company}`}
              aria-current={activeIndex === index}
            >
              <span className={activeIndex === index ? 'is-active' : undefined} />
            </button>
          ))}
        </div>

        {/* Client names — infinite loop */}
        <div className="bf-tm-clients">
          <span className="bf-micro">Projects for</span>
          <div className="bf-tm-marquee">
            <motion.div
              className="bf-tm-marquee-track"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            >
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <span key={index} className="bf-tm-client" aria-hidden={index >= clientLogos.length}>
                  {logo.name}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
