import { Link } from 'react-router-dom';
import { caseStudies } from '../data/siteData';
import '../styles/Work.css';

const allProjects = [
  ...caseStudies,
  { title: 'VoiceAssist Pro', desc: 'Enterprise voice AI assistant handling 50K+ customer calls daily with 94% resolution rate', tags: ['AI', 'Enterprise'], color: '#0d9488' },
  { title: 'DataPulse', desc: 'Real-time data analytics dashboard processing 100TB+ of streaming data for e-commerce', tags: ['Data', 'USA'], color: '#4f46e5' },
  { title: 'GreenRoute', desc: 'AI-optimized fleet management reducing carbon emissions by 30% for delivery companies', tags: ['Sustainability', 'EU'], color: '#16a34a' },
  { title: 'SmartFactory', desc: 'Predictive maintenance system reducing unplanned downtime by 45% in manufacturing', tags: ['Manufacturing', 'Japan'], color: '#b45309' },
];

export default function Work() {
  return (
    <main className="work-page">
      <section className="work-hero">
        <div className="container">
          <span className="section-label">Our Work</span>
          <h1 className="work-hero__title">12 years of delivering AI success stories</h1>
          <p className="work-hero__desc">
            500+ active clients and a 95% retention rate. We accelerate their roadmap to AI-driven digital transformation.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="work-page__grid">
            {allProjects.map((p) => (
              <div key={p.title} className="work-page__card" style={{ background: p.color }}>
                <div className="work-page__tags">
                  {p.tags.map((t) => <span key={t} className="work-page__tag">{t}</span>)}
                </div>
                <div className="work-page__info">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="work-stats">
        <div className="container work-stats__inner">
          <div className="work-stats__item">
            <span className="work-stats__value">500+</span>
            <span className="work-stats__label">Clients Served</span>
          </div>
          <div className="work-stats__item">
            <span className="work-stats__value">95%</span>
            <span className="work-stats__label">Client Retention</span>
          </div>
          <div className="work-stats__item">
            <span className="work-stats__value">1200+</span>
            <span className="work-stats__label">Projects Delivered</span>
          </div>
          <div className="work-stats__item">
            <span className="work-stats__value">12+</span>
            <span className="work-stats__label">Industries Covered</span>
          </div>
        </div>
      </section>

      <section className="work-cta">
        <div className="container work-cta__inner">
          <h2>Have an AI project in mind?</h2>
          <p>Let our team of experts help you bring it to life.</p>
          <Link to="/contact" className="btn btn-white">Start Your Project &rarr;</Link>
        </div>
      </section>
    </main>
  );
}
