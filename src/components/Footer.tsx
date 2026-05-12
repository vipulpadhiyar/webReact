import { Link } from 'react-router-dom';
import { footerLinks, ratings } from '../data/siteData';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M2 12h20"/></svg>
              </span>
              AgileAI Solutions
            </Link>
            <p className="footer__brand-desc">
              AgileAI Solutions is an AI-powered software development company with 150+ AI engineers who augment your business capabilities and drive digital transformation at scale.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="YouTube">▶</a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">in</a>
              <a href="#" className="footer__social-link" aria-label="Twitter">𝕏</a>
              <a href="#" className="footer__social-link" aria-label="GitHub">⌂</a>
            </div>
          </div>
          <div className="footer__links-group">
            <h4>Services</h4>
            <ul>
              {footerLinks.services.map((l) => (
                <li key={l.label}><Link to={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer__links-group">
            <h4>Industries</h4>
            <ul>
              {footerLinks.industries.map((l) => (
                <li key={l.label}><Link to={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer__links-group">
            <h4>Company</h4>
            <ul>
              {footerLinks.company.map((l) => (
                <li key={l.label}><Link to={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer__ratings">
          {ratings.map((r) => (
            <div key={r.platform} className="footer__rating">
              <span className="footer__rating-name">{r.platform}</span>
              <span className="footer__rating-star">★</span>
              <span className="footer__rating-score">{r.score}</span>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <div className="footer__contact-row">
            <div className="footer__contact-item">
              <strong>Contact Us</strong>
            </div>
            <div className="footer__contact-item">
              <span>USA: +1 (555) 234-5678</span>
            </div>
            <div className="footer__contact-item">
              <span>✉ hello@agileai.com</span>
            </div>
            <div className="footer__contact-item">
              <span>✉ careers@agileai.com</span>
            </div>
          </div>
          <div className="footer__copyright">
            <p>&copy; {new Date().getFullYear()} AgileAI Solutions. All rights reserved.</p>
            <div className="footer__legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
