/**
 * BoldFrame Selected Work Intro
 *
 * Quiet anticipation header — enormous editorial heading + mounting point.
 * NO portfolio cards here. MASTER PART 2 will populate .bf-work-grid-mount.
 *
 * Energy: quiet, confident, creates anticipation after the Manifesto's kinetics.
 */

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export function WorkIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12% 0px' });

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="bf-work-intro-section"
      aria-label="Selected work"
    >
      {/* Section metadata */}
      <motion.div
        className="bf-work-intro-meta"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="bf-micro">02 / Selected Work</span>
      </motion.div>

      {/* SELECTED WORK. heading */}
      <div aria-label="Selected Work">
        <motion.span
          className="bf-work-selected"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
        >
          SELECTED
        </motion.span>
        <motion.span
          className="bf-work-work"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
        >
          WORK.
        </motion.span>
      </div>

      {/* Supporting copy */}
      <motion.p
        className="bf-work-intro-copy"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
      >
        A selection of digital experiences shaped from strategy through final frame.
      </motion.p>

      {/* Mounting point for MASTER PART 2 work grid */}
      <div className="bf-work-grid-mount" id="work-grid-mount" />
    </section>
  );
}
