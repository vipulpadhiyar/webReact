import { useState } from 'react';
import { techStack } from '../data/siteData';
import '../styles/TechStack.css';

const categories = Object.keys(techStack);

export default function TechStack() {
  const [active, setActive] = useState(categories[0]);

  return (
    <section className="tech-stack section">
      <div className="container">
        <span className="section-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          Techstacks
        </span>
        <h2 className="section-title">Techstack behind the AI-driven transformation</h2>
        <p className="section-desc">
          With expertise in 150+ AI-powered technological capabilities, we build robust, scalable, and customized solutions for every business.
        </p>
        <div className="tech-stack__tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tech-stack__tab ${cat === active ? 'tech-stack__tab--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="tech-stack__items">
          {techStack[active].map((tech) => (
            <div key={tech} className="tech-stack__item">
              <div className="tech-stack__item-icon">
                {tech.slice(0, 2).toUpperCase()}
              </div>
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
