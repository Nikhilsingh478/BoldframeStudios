const steps = [
  { number: '01', title: 'Discover', note: 'Get clear on the idea, the audience and what needs to be said.' },
  { number: '02', title: 'Frame', note: 'Set the structure and direction before the visual work begins.' },
  { number: '03', title: 'Design', note: 'Build a visual language that belongs to the project.' },
  { number: '04', title: 'Build', note: 'Bring the design to life as a responsive frontend experience.' },
  { number: '05', title: 'Refine', note: 'Test, tune and resolve the details across real devices.' },
];

export function Journey() {
  return (
    <section className="process-section" id="journey" aria-labelledby="process-title">
      <div className="process-inner">
        <div className="section-kicker section-kicker-light">
          <span>A considered process</span>
          <span className="kicker-rule" />
          <span>From idea to interface</span>
        </div>
        <div className="process-intro">
          <h2 id="process-title">Less theatre.<br /><em>More thought.</em></h2>
          <p>Good digital work takes a little space to get right. The process stays visible, practical and focused on the thing being made.</p>
        </div>
        <ol className="process-list">
          {steps.map((step) => (
            <li className="process-step" key={step.number}>
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
