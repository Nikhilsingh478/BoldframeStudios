const SERVICES = [
  {
    title: 'Strategy',
    summary: 'Work out who the site is for and what it has to say before anything is designed.',
    items: ['Positioning and messaging', 'Sitemap and page structure', 'Content planning'],
  },
  {
    title: 'Design',
    summary: 'An on-screen identity that belongs to your brand, not to a template.',
    items: ['UI design for desktop and mobile', 'Art direction', 'Interaction and motion design'],
  },
  {
    title: 'Development',
    summary: 'Hand-built frontends that behave the same on every screen size.',
    items: ['React and Vite builds', 'Responsive layouts', 'Animation with GSAP and Motion'],
  },
  {
    title: 'Performance & SEO',
    summary: 'Fast loading and the technical groundwork search engines look for.',
    items: ['Image and asset optimisation', 'Technical SEO and metadata', 'Accessibility checks'],
  },
];

export function Services() {
  return (
    <section className="section section-tinted" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <h2 id="services-title">What we do</h2>
          <p>
            Strategy, design and development under one roof, so nothing gets lost between the
            person who designed it and the person who built it.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <article className="service" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ul>
                {service.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
