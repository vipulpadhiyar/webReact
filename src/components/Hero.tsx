import '../styles/Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
      </div>
      <div className="container hero__content">
        <span className="hero__badge">Trusted by 200+ Companies Worldwide</span>
        <h1 className="hero__title">
          We Build <span className="hero__highlight">Digital Products</span> That
          Drive Growth
        </h1>
        <p className="hero__subtitle">
          End-to-end software engineering, cloud solutions, and IT consulting to
          transform your business. From startups to enterprises, we deliver
          scalable technology that makes an impact.
        </p>
        <div className="hero__actions">
          <a href="#contact" className="btn btn-primary btn-lg">
            Start Your Project
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#portfolio" className="btn btn-outline btn-lg">
            View Our Work
          </a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">200+</span>
            <span className="hero__stat-label">Projects Delivered</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">50+</span>
            <span className="hero__stat-label">Team Members</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">98%</span>
            <span className="hero__stat-label">Client Satisfaction</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">8+</span>
            <span className="hero__stat-label">Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
