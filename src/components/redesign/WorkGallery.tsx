const projects = [
  {
    number: '001',
    title: 'Huuman',
    category: 'Brand experience redesign',
    services: 'Strategy · Design · Development',
    image: '/p1.webp',
    alt: 'Huuman website, a full-page brand experience composition',
    href: 'https://huuman-responsive-updated.vercel.app/',
    size: 'work-card--large',
  },
  {
    number: '002',
    title: 'Roseberry',
    category: 'Massage spa',
    services: 'Design · Development',
    image: '/p2.webp',
    alt: 'Roseberry Massage Spa website',
    href: 'https://spas-one.vercel.app/',
    size: 'work-card--small',
  },
  {
    number: '003',
    title: 'HBL',
    category: 'Company redesign',
    services: 'Design · Development',
    image: '/p3.webp',
    alt: 'HBL company website redesign',
    href: 'https://hbl-eight.vercel.app/',
    size: 'work-card--small',
  },
  {
    number: '004',
    title: 'Organic',
    category: 'Green tea store',
    services: 'Design · Development',
    image: '/p4.webp',
    alt: 'Organic Green Tea Store frontend',
    href: 'https://organic-india-clone-garden.vercel.app/',
    size: 'work-card--large',
  },
  {
    number: '005',
    title: 'Halloween',
    category: 'Creative landing page',
    services: 'Motion · Development',
    image: '/p5.webp',
    alt: 'Halloween seasonal landing page',
    href: 'https://halloween-two-rho.vercel.app/',
    size: 'work-card--small',
  },
  {
    number: '006',
    title: 'Christmas',
    category: 'Parallax experience',
    services: 'Motion · Development',
    image: '/p6.webp',
    alt: 'Christmas festive parallax webpage',
    href: 'https://christmas-webpage.vercel.app/',
    size: 'work-card--small',
  },
];

export function WorkGallery() {
  return (
    <section className="work-section section-shell" id="work-gallery" aria-labelledby="work-title">
      <div className="section-kicker">
        <span>A few projects</span>
        <span className="kicker-rule" />
        <span>001 — 006</span>
      </div>
      <div className="work-heading">
        <h2 id="work-title">Selected <em>work.</em></h2>
        <p>A mix of brand experiences, company sites and campaign pages. Each one starts with a different brief.</p>
      </div>
      <div className="work-grid">
        {projects.map((project) => (
          <article className={`work-card ${project.size}`} key={project.number}>
            <a className="work-image-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} project in a new tab`}>
              <img src={project.image} alt={project.alt} loading={project.number === '001' ? 'eager' : 'lazy'} decoding="async" />
              <span className="work-image-number">{project.number}</span>
              <span className="work-image-arrow" aria-hidden="true">↗</span>
            </a>
            <div className="work-card-info">
              <div>
                <h3>{project.title}</h3>
                <p className="work-category">{project.category}</p>
              </div>
              <p className="work-services">{project.services}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="work-endnote">
        <span className="endnote-mark" aria-hidden="true" />
        <p>Different briefs call for different answers.<br />The work should always feel like it belongs to its subject.</p>
      </div>
    </section>
  );
}
