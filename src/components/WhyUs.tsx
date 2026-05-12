import { whyUsFeatures } from '../data/siteData';
import '../styles/WhyUs.css';

export default function WhyUs() {
  return (
    <section className="why-us section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <span className="section-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          Why Us
        </span>
        <h2 className="section-title">Access the strategic, technological, and AI expertise</h2>
        <p className="section-desc">
          Backed by 12+ years of experience and 150+ AI engineers, we offer bespoke AI solutions, ensuring sustainable business growth and innovation.
        </p>
        <div className="why-us__grid">
          <div className="why-us__features">
            {whyUsFeatures.map((f) => (
              <div key={f.label} className={`why-us__feature ${f.value ? 'why-us__feature--highlight' : ''}`}>
                <span className="why-us__feature-label">{f.label}</span>
                {f.value && <span className="why-us__feature-value">{f.value}</span>}
              </div>
            ))}
            <div className="why-us__feature">
              <span className="why-us__feature-label">NPS Score</span>
              <span className="why-us__feature-value">90%</span>
            </div>
            <div className="why-us__feature why-us__feature--highlight">
              <span className="why-us__feature-label">Happy Clients</span>
              <span className="why-us__feature-value">500+</span>
            </div>
          </div>
          <div className="why-us__media">
            <div className="why-us__video-placeholder">
              <div className="why-us__play">▶</div>
            </div>
            <p className="why-us__media-text">
              Providing AI-driven digital transformation to progressive companies with modern infrastructure
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
