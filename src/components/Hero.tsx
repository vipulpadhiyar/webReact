import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { heroSlides, stats } from '../data/siteData';
import '../styles/Hero.css';

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[activeSlide];

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="section-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            {slide.tag}
          </span>
          <h1 className="hero__title">{slide.title}</h1>
          <div className="hero__actions">
            <Link to="/contact" className="btn btn-primary">Get Started &rarr;</Link>
            <Link to="/work" className="btn btn-outline">View Our Work</Link>
          </div>
          <div className="hero__dots">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`hero__dot ${i === activeSlide ? 'hero__dot--active' : ''}`}
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__visual-card">
            <div className="hero__visual-grid">
              <div className="hero__node hero__node--1" />
              <div className="hero__node hero__node--2" />
              <div className="hero__node hero__node--3" />
              <div className="hero__node hero__node--4" />
              <div className="hero__node hero__node--5" />
              <svg className="hero__connections" viewBox="0 0 300 200">
                <line x1="50" y1="40" x2="150" y2="100" stroke="rgba(37,99,235,.3)" strokeWidth="1" />
                <line x1="250" y1="40" x2="150" y2="100" stroke="rgba(37,99,235,.3)" strokeWidth="1" />
                <line x1="80" y1="160" x2="150" y2="100" stroke="rgba(6,182,212,.3)" strokeWidth="1" />
                <line x1="220" y1="160" x2="150" y2="100" stroke="rgba(6,182,212,.3)" strokeWidth="1" />
              </svg>
            </div>
            <div className="hero__badge hero__badge--rating">
              <span className="hero__stars">★★★★★</span>
              <span>4.9 Ratings</span>
            </div>
            <div className="hero__badge hero__badge--clients">
              <span className="hero__badge-icon">👥</span>
              <div>
                <small>Trusted By</small>
                <strong>500+ Clients</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__stats">
        <div className="container hero__stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
