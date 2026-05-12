import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faqItems } from '../data/siteData';
import '../styles/FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="faq__inner">
          <div className="faq__left">
            <span className="section-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              FAQ
            </span>
            <h2 className="section-title">Find answers to your FAQs here</h2>
            <p className="section-desc">
              Got questions? We've got your back. Let's clear your doubts and find answers to the most commonly asked questions.
            </p>
            <div className="faq__cta">
              <p>Is your question not here? No Problem.</p>
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: 12 }}>Contact us &rarr;</Link>
            </div>
          </div>
          <div className="faq__list">
            {faqItems.map((item, i) => (
              <div key={i} className={`faq__item ${i === openIndex ? 'faq__item--open' : ''}`}>
                <button className="faq__question" onClick={() => setOpenIndex(i === openIndex ? -1 : i)}>
                  <span>{item.question}</span>
                  <span className="faq__toggle">{i === openIndex ? '−' : '+'}</span>
                </button>
                {i === openIndex && (
                  <div className="faq__answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
