import '../styles/Portfolio.css';

const projects = [
  {
    title: 'FinFlow Banking Platform',
    category: 'Fintech',
    desc: 'A next-generation digital banking platform with real-time payments, account management, and AI-driven fraud detection.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    color: '#2563eb',
  },
  {
    title: 'MediConnect Health Portal',
    category: 'Healthcare',
    desc: 'Telemedicine platform connecting patients with doctors through video consultations, e-prescriptions, and health records.',
    tech: ['React Native', 'Python', 'MongoDB', 'GCP'],
    color: '#059669',
  },
  {
    title: 'ShopSmart E-Commerce',
    category: 'Retail',
    desc: 'Scalable e-commerce marketplace with personalized recommendations, inventory management, and multi-vendor support.',
    tech: ['Next.js', 'Go', 'Redis', 'Kubernetes'],
    color: '#d97706',
  },
  {
    title: 'LogiTrack Fleet Management',
    category: 'Logistics',
    desc: 'Real-time fleet tracking and route optimization platform that reduced delivery times by 35% for a major logistics company.',
    tech: ['Vue.js', 'Python', 'IoT', 'Azure'],
    color: '#7c3aed',
  },
  {
    title: 'EduVerse Learning Platform',
    category: 'EdTech',
    desc: 'Interactive online learning platform with live classes, AI-powered assessments, and gamified progress tracking.',
    tech: ['React', 'Django', 'WebRTC', 'AWS'],
    color: '#dc2626',
  },
  {
    title: 'GreenEnergy Dashboard',
    category: 'Energy',
    desc: 'IoT-powered energy monitoring dashboard providing real-time analytics and predictive maintenance for solar installations.',
    tech: ['Angular', 'FastAPI', 'TimescaleDB', 'IoT'],
    color: '#0d9488',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <div className="portfolio__header">
          <span className="portfolio__label">Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of projects that showcase our expertise across industries
            and technologies.
          </p>
        </div>
        <div className="portfolio__grid">
          {projects.map((p) => (
            <div key={p.title} className="portfolio__card">
              <div
                className="portfolio__card-banner"
                style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}dd)` }}
              >
                <span className="portfolio__card-cat">{p.category}</span>
              </div>
              <div className="portfolio__card-body">
                <h3 className="portfolio__card-title">{p.title}</h3>
                <p className="portfolio__card-desc">{p.desc}</p>
                <div className="portfolio__card-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="portfolio__tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
