import { PROJECTS } from '../site';
import { BrowserFrame } from './BrowserFrame';

// Three real projects stacked behind each other, front to back.
const STACK = [PROJECTS[2], PROJECTS[1], PROJECTS[0]];

export function Hero({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Design &amp; development studio · India</p>
          <h1 id="hero-title">Websites that make your brand look as good as it is.</h1>
          <p className="hero-lede">
            BoldFrame Studios plans, designs and builds websites for brands, shops and service
            businesses. One small team takes your project from first idea to a fast, responsive
            site that&rsquo;s live and working.
          </p>
          <div className="hero-actions">
            <button className="btn btn-accent" type="button" onClick={onContactClick}>
              Start a project <span aria-hidden="true">→</span>
            </button>
            <a className="btn btn-ghost" href="#work">See our work</a>
          </div>
        </div>

        <a className="hero-stack" href="#work" aria-label="Jump to selected work">
          {STACK.map((project, i) => (
            <BrowserFrame
              key={project.title}
              className={`hero-frame hero-frame-${i + 1}`}
              src={project.image}
              alt={project.alt}
              url={project.href}
              eager
            />
          ))}
        </a>
      </div>
    </section>
  );
}
