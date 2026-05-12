import { clients } from '../data/siteData';
import '../styles/Clientele.css';

export default function Clientele() {
  return (
    <section className="clientele section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="clientele__inner">
          <div className="clientele__text">
            <span className="section-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Clientele
            </span>
            <h2 className="section-title">Trusted by top brands</h2>
            <p className="section-desc">
              From enterprise-grade AI solutions to custom applications, we have empowered top brands with high-performing sustainable solutions.
            </p>
          </div>
          <div className="clientele__logos">
            {clients.map((c) => (
              <div key={c} className="clientele__logo">
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
