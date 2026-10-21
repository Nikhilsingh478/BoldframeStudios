import { PROJECTS } from '../site';
import { BrowserFrame } from './BrowserFrame';

export function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-head">
          <h2 id="work-title">Selected work</h2>
          <p>
            Fashion, wellness, engineering, retail and seasonal campaigns. Every project here is
            live, so click through and try it for yourself.
          </p>
        </div>

        <ul className="work-grid">
          {PROJECTS.map((project) => (
            <li key={project.title}>
              <a className="work-card" href={project.href} target="_blank" rel="noopener noreferrer">
                <BrowserFrame src={project.image} alt={project.alt} url={project.href} />
                <div className="work-meta">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.type}</p>
                  </div>
                  <span className="work-visit">
                    Visit site <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </div>
                <ul className="tags" aria-label="Services">
                  {project.services.map((service) => <li key={service}>{service}</li>)}
                </ul>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
