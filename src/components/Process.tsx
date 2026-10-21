import { useEffect, useRef, useState, type CSSProperties } from 'react';

const STEPS = [
  {
    title: 'Discover',
    copy: 'We talk through your business, your audience and your goals, and look at what is and isn’t working today.',
    output: 'Project brief',
  },
  {
    title: 'Frame',
    copy: 'We plan the structure: which pages you need, what goes on them, and the path a visitor takes.',
    output: 'Sitemap and wireframes',
  },
  {
    title: 'Design',
    copy: 'We design the key pages for desktop and mobile, then refine them with your feedback.',
    output: 'Approved designs',
  },
  {
    title: 'Build',
    copy: 'We develop the site, add motion where it helps, and test it across browsers and devices.',
    output: 'Working preview link',
  },
  {
    title: 'Launch',
    copy: 'We tune speed and SEO, put the site live, and fix anything that comes up after launch.',
    output: 'Live website',
  },
];

// The client-journey section: five stages joined by a line that draws once
// when the section scrolls into view. No pinning or scroll-jacking.
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section-dark" id="process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head">
          <h2 id="process-title">How a project runs</h2>
          <p>
            Five stages from the first call to launch. You see real progress at every step, not
            just at the end.
          </p>
        </div>

        <ol ref={listRef} className={`journey${visible ? ' is-visible' : ''}`}>
          {STEPS.map((step, i) => (
            <li className="journey-step" key={step.title} style={{ '--i': i } as CSSProperties}>
              <span className="journey-node" aria-hidden="true">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
              <p className="journey-output"><span>You get</span>{step.output}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
