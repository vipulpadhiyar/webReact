import { useState } from 'react';
import '../styles/ContactForm.css';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-form section" style={{ background: 'var(--bg-dark)' }}>
      <div className="container">
        <div className="contact-form__inner">
          <div className="contact-form__left">
            <span className="section-label" style={{ background: 'rgba(37,99,235,.15)', borderColor: 'rgba(37,99,235,.2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Contact Us
            </span>
            <h2 className="contact-form__title">Get in Touch with Us</h2>
            <p className="contact-form__desc">We help your business grow with AI — all the answers you need.</p>
            <div className="contact-form__visual" />
            <div className="contact-form__info">
              <div className="contact-form__info-item">
                <span className="contact-form__info-icon">✉</span>
                <div>
                  <small>You can email us here</small>
                  <p>hello@agileai.com</p>
                </div>
              </div>
              <div className="contact-form__info-item">
                <span className="contact-form__info-icon">☏</span>
                <div>
                  <small>You can call us on this</small>
                  <p>+1 (555) 234-5678</p>
                </div>
              </div>
              <div className="contact-form__info-item">
                <span className="contact-form__info-icon">☏</span>
                <div>
                  <small>You can call us on this</small>
                  <p>+1 (555) 876-5432</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form__right">
            {submitted ? (
              <div className="contact-form__success">
                <div className="contact-form__success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our AI experts will get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)} type="button">Send Another</button>
              </div>
            ) : (
              <>
                <h3 className="contact-form__form-title">Send Us a Message</h3>
                <p className="contact-form__form-desc">Use our convenient contact form to reach out with questions, feedback, or collaboration inquiries.</p>
                <form onSubmit={handleSubmit}>
                  <div className="contact-form__row">
                    <input type="text" placeholder="Full Name" required />
                    <input type="tel" placeholder="Phone Number" />
                  </div>
                  <div className="contact-form__row">
                    <input type="email" placeholder="Email" required />
                    <input type="text" placeholder="Budget" />
                  </div>
                  <textarea placeholder="Project Details" rows={4} required />
                  <button type="submit" className="btn btn-primary">Send Message &rarr;</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
