import { Link } from 'react-router-dom';
import '../styles/CTASection.css';

export default function CTASection() {
  return (
    <section className="cta-section section">
      <div className="container">
        <div className="cta-section__card">
          <div className="cta-section__content">
            <h2 className="cta-section__title">Want to build, modernize, or scale your AI product?</h2>
            <p className="cta-section__desc">
              Connect with our AI experts to evaluate your current processes, identify areas of improvement, and implement an intelligent solution.
            </p>
            <Link to="/contact" className="btn btn-white">Schedule a Call &rarr;</Link>
          </div>
          <div className="cta-section__features">
            <div className="cta-section__feature">
              <span className="cta-section__feature-icon">✦</span>
              Top 2% AI talent
            </div>
            <div className="cta-section__feature">
              <span className="cta-section__feature-icon">🔒</span>
              Transparent cost
            </div>
            <div className="cta-section__feature">
              <span className="cta-section__feature-icon">📊</span>
              Regular reporting
            </div>
            <div className="cta-section__feature">
              <span className="cta-section__feature-icon">⚡</span>
              2x faster delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
