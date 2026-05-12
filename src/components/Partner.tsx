import '../styles/Partner.css';

export default function Partner() {
  return (
    <section className="partner section">
      <div className="container">
        <div className="partner__card">
          <span className="section-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            Partner
          </span>
          <h2 className="partner__title">
            Laying a solid foundation for AI-driven digital transformation for startups, SMEs, and enterprises with our pre-vetted resources and next-gen{' '}
            <a href="/services" className="partner__link">AI solutions</a>,{' '}
            <a href="/services" className="partner__link">ML models</a>, and{' '}
            <a href="/services" className="partner__link">intelligent automation</a>{' '}
            services
          </h2>
        </div>
      </div>
    </section>
  );
}
