import { Link } from 'react-router-dom';
import { teamMembers, awards } from '../data/siteData';
import '../styles/About.css';

const timeline = [
  { year: '2014', title: 'Founded', desc: 'AgileAI was founded with a vision to democratize AI for businesses of all sizes.' },
  { year: '2016', title: 'First 100 Clients', desc: 'Reached milestone of 100 clients across healthcare, fintech, and retail verticals.' },
  { year: '2018', title: 'Global Expansion', desc: 'Opened offices in London and Singapore, growing our team to 80+ AI engineers.' },
  { year: '2020', title: 'AI Lab Launch', desc: 'Launched dedicated AI Research Lab focusing on NLP, computer vision, and GenAI.' },
  { year: '2022', title: 'GenAI Pioneer', desc: 'Early adopter of LLM technologies, delivering enterprise GenAI solutions.' },
  { year: '2024', title: '500+ Clients', desc: 'Serving 500+ clients globally with 150+ AI engineers across 3 development centers.' },
];

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <span className="section-label">Our Story</span>
          <h1 className="about-hero__title">Unlocking tomorrow's AI, today!</h1>
          <p className="about-hero__desc">
            Experience the journey of AgileAI: We embrace challenges, celebrate breakthroughs, and make every AI model count.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ marginTop: 16 }}>Get Started &rarr;</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="section-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            Our Journey
          </span>
          <h2 className="section-title">The AgileAI Timeline</h2>
          <div className="about-timeline">
            {timeline.map((t) => (
              <div key={t.year} className="about-timeline__item">
                <div className="about-timeline__year">{t.year}</div>
                <div className="about-timeline__content">
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <span className="section-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            Our Team
          </span>
          <h2 className="section-title">Meet the leadership team</h2>
          <p className="section-desc">Our team brings together world-class AI researchers, engineers, and business leaders.</p>
          <div className="about-team">
            {teamMembers.map((m) => (
              <div key={m.name} className="about-team__card">
                <div className="about-team__avatar" style={{ background: m.color }}>
                  {m.initials}
                </div>
                <h3 className="about-team__name">{m.name}</h3>
                <p className="about-team__role">{m.role}</p>
                <p className="about-team__bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="section-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            Certifications
          </span>
          <h2 className="section-title">Our recognitions & partnerships</h2>
          <div className="about-awards">
            {awards.map((a) => (
              <div key={a.name} className="about-awards__card">
                <span className="about-awards__abbr">{a.abbr}</span>
                <span className="about-awards__name">{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta__inner">
          <h2>Ready to transform your business with AI?</h2>
          <p>Join 500+ companies already leveraging our AI expertise.</p>
          <Link to="/contact" className="btn btn-white">Get in Touch &rarr;</Link>
        </div>
      </section>
    </main>
  );
}
