import { awards } from '../data/siteData';
import '../styles/Awards.css';

export default function Awards() {
  return (
    <section className="awards section">
      <div className="container">
        <div className="awards__inner">
          <div className="awards__text">
            <span className="section-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Awards
            </span>
            <h2 className="section-title">Our recognitions & partnerships</h2>
            <p className="section-desc">Spotlighting success: Where innovation meets accolades at AgileAI</p>
            <a href="/about" className="btn btn-outline" style={{ marginTop: 24 }}>View All &rarr;</a>
          </div>
          <div className="awards__logos">
            {awards.map((a) => (
              <div key={a.name} className="awards__logo-card">
                <span className="awards__abbr">{a.abbr}</span>
                <span className="awards__name">{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
