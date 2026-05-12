import '../styles/About.css';

const values = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Innovation First',
    desc: 'We stay ahead of the curve, adopting cutting-edge technologies to deliver forward-thinking solutions.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Client Partnership',
    desc: 'We become an extension of your team, understanding your goals deeply to deliver real business value.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
      </svg>
    ),
    title: 'Quality Driven',
    desc: 'Rigorous testing, code reviews, and best practices ensure every product we deliver exceeds expectations.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: 'Agile Process',
    desc: 'Transparent sprints, continuous delivery, and adaptive planning keep projects on track and on budget.',
  },
];

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about__grid">
          <div className="about__text">
            <span className="about__label">About Us</span>
            <h2 className="section-title">
              Engineering Excellence Since 2017
            </h2>
            <p className="about__desc">
              NexaTech Solutions is a full-service software development and IT
              consulting company. We partner with businesses of all sizes to
              architect, build, and scale digital products that solve real
              problems.
            </p>
            <p className="about__desc">
              Our team of 50+ engineers, designers, and strategists brings deep
              expertise across web, mobile, cloud, and data to every engagement.
              We don&apos;t just write code — we engineer solutions that drive
              measurable business outcomes.
            </p>
            <a href="#contact" className="btn btn-primary">
              Learn More About Us
            </a>
          </div>
          <div className="about__values">
            {values.map((v) => (
              <div key={v.title} className="about__value-card">
                <div className="about__value-icon">{v.icon}</div>
                <div>
                  <h3 className="about__value-title">{v.title}</h3>
                  <p className="about__value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
