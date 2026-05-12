import { useState } from 'react';
import { services } from '../data/siteData';
import '../styles/ServicesSection.css';

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

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const svc = services[active];

  return (
    <section className="services-section section" id="services">
      <div className="container">
        <span className="section-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          Our Services
        </span>
        <h2 className="section-title">Our end-to-end AI engineering capabilities</h2>
        <p className="section-desc">
          From intelligent automation to advanced ML solutions, we help you move from ideas to production with our AI-driven 150+ technological capabilities and 150+ pre-vetted AI engineers.
        </p>
        <div className="services-section__grid">
          <div className="services-section__cards">
            {services.map((s, i) => (
              <button
                key={s.title}
                className={`services-section__card ${i === active ? 'services-section__card--active' : ''}`}
                onClick={() => setActive(i)}
              >
                <svg className="services-section__card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={iconMap[s.icon]} /></svg>
                <span>{s.title}</span>
              </button>
            ))}
          </div>
          <div className="services-section__detail">
            <h3 className="services-section__detail-title">{svc.title}</h3>
            <p className="services-section__detail-desc">{svc.desc}</p>
            <ul className="services-section__detail-list">
              {svc.items.map((item) => (
                <li key={item}>
                  <span className="services-section__arrow">○</span>
                  {item} →
                </li>
              ))}
            </ul>
            <a href="/services" className="btn btn-primary services-section__detail-btn">{svc.title} &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  );
}
