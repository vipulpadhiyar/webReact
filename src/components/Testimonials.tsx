import { testimonials } from '../data/siteData';
import '../styles/Testimonials.css';

export default function Testimonials() {
  return (
    <section className="testimonials section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <span className="section-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          Our Testimonials
        </span>
        <h2 className="section-title">See what our clients are saying</h2>
        <p className="section-desc">
          Client testimonials speak to our proven track record of delivering high-quality AI solutions that meet unique business challenges.
        </p>
        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonials__card">
              <div className="testimonials__header">
                <div className="testimonials__avatar" style={{ background: t.color }}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="testimonials__name">{t.name}</h4>
                  <p className="testimonials__role">{t.role}</p>
                  <p className="testimonials__location">{t.location}</p>
                </div>
              </div>
              <div className="testimonials__quote-mark">&ldquo;</div>
              <p className="testimonials__quote">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
