/**
 * WorkGalleryTransition — Bridge between FeaturedWork (2A) and the gallery (2B).
 *
 * Provides visual breathing room between two back-to-back pinned sections.
 * Picks up the lateral cue from FeaturedWork's exit and converts it into
 * "MORE FRAMES / 002—006" — confirming more work exists without heading + paragraph dump.
 *
 * Height: ~72vh — enough space for the two ScrollTrigger pins not to collide.
 */

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

// Must match the last GALLERY_PROJECT index — kept in sync with WorkGallery data.
const LAST_INDEX = '006';
const TOTAL = 5; // 002 through 006

export function WorkGalleryTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-12% 0px' });

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={sectionRef}
      className="bf-gt-section"
      aria-label="More project work"
    >
      <div className="bf-gt-inner">

        {/* Top row: micro-label + project count */}
        <motion.div
          className="bf-gt-head"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="bf-micro bf-gt-label">MORE FRAMES</span>
          <div className="bf-gt-count">
            <span className="bf-gt-range">002 — {LAST_INDEX}</span>
            <span className="bf-gt-total">/ {TOTAL} Projects</span>
          </div>
        </motion.div>

        {/* Horizontal rule extending toward the right — lateral expectation cue */}
        <div className="bf-gt-rule-wrap" aria-hidden="true">
          <motion.div
            className="bf-gt-rule"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, ease, delay: 0.18 }}
          />
          <motion.span
            className="bf-gt-arrow"
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.9 }}
          >
            →
          </motion.span>
        </div>

        {/* Editorial sub-copy */}
        <motion.p
          className="bf-gt-copy"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Each project has a frame of its own.
        </motion.p>

      </div>
    </section>
  );
}
