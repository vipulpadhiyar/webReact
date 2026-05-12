import '../styles/Services.css';

const services = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
      </svg>
    ),
    title: 'Custom Software Development',
    desc: 'Tailored web and mobile applications built with modern frameworks like React, Node.js, Python, and Go to meet your exact business needs.',
    tags: ['React', 'Node.js', 'Python', 'Go'],
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" />
      </svg>
    ),
    title: 'Cloud & DevOps',
    desc: 'Migrate to the cloud, optimize infrastructure, and implement CI/CD pipelines with AWS, Azure, and Google Cloud Platform.',
    tags: ['AWS', 'Azure', 'GCP', 'Docker'],
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'UI/UX Design',
    desc: 'Human-centered design that delights users. We create intuitive interfaces backed by research, prototyping, and usability testing.',
    tags: ['Figma', 'Prototyping', 'User Research'],
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'AI & Machine Learning',
    desc: 'Leverage data with intelligent solutions — from predictive analytics and NLP to computer vision and recommendation engines.',
    tags: ['TensorFlow', 'PyTorch', 'NLP', 'MLOps'],
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Cybersecurity',
    desc: 'Protect your digital assets with penetration testing, security audits, compliance assessments, and 24/7 threat monitoring.',
    tags: ['Pen Testing', 'Compliance', 'SOC'],
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
    title: 'IT Consulting & Strategy',
    desc: 'Strategic technology roadmaps, digital transformation planning, and technical due diligence for informed decision-making.',
    tags: ['Strategy', 'Roadmapping', 'Digital Transformation'],
  },
];

export default function Services() {
  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="services__header">
          <span className="services__label">Our Services</span>
          <h2 className="section-title">
            Comprehensive Technology Solutions
          </h2>
          <p className="section-subtitle">
            From concept to deployment, we provide end-to-end technology
            services to accelerate your digital journey.
          </p>
        </div>
        <div className="services__grid">
          {services.map((s) => (
            <div key={s.title} className="services__card">
              <div className="services__card-icon">{s.icon}</div>
              <h3 className="services__card-title">{s.title}</h3>
              <p className="services__card-desc">{s.desc}</p>
              <div className="services__card-tags">
                {s.tags.map((t) => (
                  <span key={t} className="services__tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
