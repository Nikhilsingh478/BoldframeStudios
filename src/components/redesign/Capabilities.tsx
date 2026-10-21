const services = [
  {
    number: '01',
    title: 'Strategy',
    details: 'Positioning · UX · Structure',
    description: 'A clear foundation for the message, audience and experience before visual decisions begin.',
  },
  {
    number: '02',
    title: 'Design',
    details: 'Art direction · UI · Motion',
    description: 'A visual system shaped around the brand, with considered interaction rather than decoration.',
  },
  {
    number: '03',
    title: 'Development',
    details: 'React · Frontend · Responsive',
    description: 'Responsive, production-ready frontend builds, designed to work across real screens.',
  },
  {
    number: '04',
    title: 'Performance',
    details: 'Speed · SEO · Optimization',
    description: 'Attention to load time, technical foundations and the details that make a site feel finished.',
  },
];

export function Capabilities() {
  return (
    <section className="services-section section-shell" id="capabilities" aria-labelledby="services-title">
      <div className="section-kicker">
        <span>What we do</span>
        <span className="kicker-rule" />
        <span>01 — 04</span>
      </div>
      <div className="services-heading">
        <h2 id="services-title">Thought through.<br /><em>Made to work.</em></h2>
        <p>From the first outline to the final browser check, each part of the work has a reason to be there.</p>
      </div>
      <div className="services-list">
        {services.map((service) => (
          <article className="service-row" key={service.number}>
            <span className="service-number">{service.number}</span>
            <h3>{service.title}</h3>
            <div className="service-description">
              <span className="service-details">{service.details}</span>
              <p>{service.description}</p>
            </div>
            <span className="service-arrow" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
