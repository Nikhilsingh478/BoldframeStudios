/**
 * ClosingCTA — the last word before the footer.
 *
 * Mirrors the hero: oversized type rising out of line masks, the key word
 * held in the BoldFrame viewfinder, and one round, magnetic action.
 */

import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { MagneticButton } from '../MagneticButton';

const EMAIL = 'nikhilwebworks@gmail.com';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ClosingCTA({ onContactClick }: { onContactClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { y: '110%' },
    animate: inView ? { y: '0%' } : undefined,
    transition: { duration: 1.1, ease: EASE, delay },
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="bf-cta" aria-labelledby="bf-cta-title">
      <div className="bf-cta-glow" aria-hidden="true" />
      <div ref={ref} className="bf-container bf-cta-inner">
        <span className="bf-micro">05 / Start a project</span>

        <h2 id="bf-cta-title" className="bf-cta-title">
          <span className="bf-cta-line">
            <motion.span className="bf-cta-line-inner" {...rise(0)}>Let&rsquo;s build</motion.span>
          </span>
          <span className="bf-cta-line">
            <motion.span className="bf-cta-line-inner" {...rise(0.12)}>
              <span className="bf-cta-muted">something</span>{' '}
              <span className="bfh-framed">
                bold.
                <i className="bfh-corner bfh-corner--tl" aria-hidden="true" />
                <i className="bfh-corner bfh-corner--tr" aria-hidden="true" />
                <i className="bfh-corner bfh-corner--bl" aria-hidden="true" />
                <i className="bfh-corner bfh-corner--br" aria-hidden="true" />
              </span>
            </motion.span>
          </span>
        </h2>

        <motion.div
          className="bf-cta-row"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        >
          <p className="bf-cta-copy">
            Tell us what you&rsquo;re building. We&rsquo;ll reply with next steps and an honest
            read on scope, timeline and what it will take to make it convert.
          </p>

          <div className="bf-cta-actions">
            <MagneticButton onClick={onContactClick} className="bf-cta-orb" strength={0.25}>
              <span>Start a project</span>
              <span className="bf-cta-orb-arrow" aria-hidden="true">↗</span>
            </MagneticButton>

            <div className="bf-cta-email">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <button type="button" onClick={copyEmail} aria-live="polite">
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
