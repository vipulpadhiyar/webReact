import { Link } from 'react-router-dom';
import { caseStudies } from '../data/siteData';
import '../styles/CaseStudies.css';

export default function CaseStudies() {
  return (
    <section className="case-studies section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="case-studies__header">
          <div>
            <span className="section-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Case Studies
            </span>
            <h2 className="section-title">12 years of delivering AI success stories</h2>
            <p className="section-desc">500+ active clients and a 95% retention rate, we accelerate their roadmap to AI transformation</p>
          </div>
          <Link to="/work" className="btn btn-outline">View All &rarr;</Link>
        </div>
        <div className="case-studies__grid">
          {caseStudies.slice(0, 3).map((cs) => (
            <div key={cs.title} className="case-studies__card" style={{ background: cs.color }}>
              <div className="case-studies__tags">
                {cs.tags.map((t) => <span key={t} className="case-studies__tag">{t}</span>)}
              </div>
              <div className="case-studies__info">
                <h3>{cs.title}</h3>
                <p>{cs.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="case-studies__row">
          {caseStudies.slice(3).map((cs) => (
            <div key={cs.title} className="case-studies__card case-studies__card--wide" style={{ background: cs.color }}>
              <div className="case-studies__tags">
                {cs.tags.map((t) => <span key={t} className="case-studies__tag">{t}</span>)}
              </div>
              <div className="case-studies__info">
                <h3>{cs.title}</h3>
                <p>{cs.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
