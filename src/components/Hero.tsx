export function Hero({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-mark" /> BoldFrame Studios <span className="eyebrow-divider">/</span> Digital design & development</p>
          <h1 id="hero-title">Good work deserves a <em>good frame.</em></h1>
          <p className="hero-deck">We bring strategy, design and frontend development together to make websites with character and clarity.</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={onContactClick}>Start a conversation <span aria-hidden="true">↗</span></button>
            <a className="text-link" href="#work-gallery">See selected work <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <figure className="hero-figure">
          <a className="hero-image-link" href="https://huuman-responsive-updated.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View Huuman project in a new tab">
            <img src="/p1.webp" alt="Huuman website project shown in a full-page desktop composition" fetchPriority="high" />
            <span className="image-corner image-corner-top" aria-hidden="true" />
            <span className="image-corner image-corner-bottom" aria-hidden="true" />
          </a>
          <figcaption>
            <span><strong>Huuman</strong><small>Brand experience redesign</small></span>
            <span className="figure-index">001 <span aria-hidden="true">↗</span></span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}