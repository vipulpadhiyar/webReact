import { Link } from 'react-router-dom';
import { services, industries } from '../data/siteData';
import '../styles/Services.css';

const iconMap: Record<string, string> = {
  brain: 'M12 2a9 9 0 0 0-9 9c0 4 2.5 7 6 8.5V22h6v-2.5c3.5-1.5 6-4.5 6-8.5a9 9 0 0 0-9-9Z',
  cpu: 'M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3M6 6h12v12H6z',
  cloud: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z',
  smartphone: 'M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm6 16h.01',
  database: 'M12 2C7 2 3 3.5 3 5.5V18c0 2 4 3.5 9 3.5s9-1.5 9-3.5V5.5C21 3.5 17 2 12 2Z',
  message: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
};

export default function ServicesPage() {
  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="container">
          <span className="section-label">Our Services</span>
          <h1 className="services-hero__title">End-to-end AI engineering capabilities</h1>
          <p className="services-hero__desc">
            Whether you require complex enterprise AI solutions or intelligent automation, we help you move from THOUGHTS TO ACTION with our AI-driven capabilities.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-page__grid">
            {services.map((s) => (
              <div key={s.title} className="services-page__card">
                <div className="services-page__card-header">
                  <div className="services-page__card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={iconMap[s.icon]} /></svg>
                  </div>
                  <h3>{s.title}</h3>
                </div>
                <p className="services-page__card-desc">{s.desc}</p>
                <ul className="services-page__card-items">
                  {s.items.map((item) => (
                    <li key={item}>
                      <span className="services-page__check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="services-page__card-link">Learn More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <span className="section-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            Industries
          </span>
          <h2 className="section-title">Industry-specific AI solutions</h2>
          <div className="services-industries">
            {industries.map((ind) => (
              <div key={ind.name} className="services-industries__card">
                <span>{ind.name}</span>
                <span className="services-industries__arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container services-cta__inner">
          <h2>Ready to leverage AI for your business?</h2>
          <p>Our team of 150+ AI engineers is ready to help you build, scale, and optimize.</p>
          <Link to="/contact" className="btn btn-white">Schedule a Consultation &rarr;</Link>
        </div>
      </section>
    </main>
  );
}
