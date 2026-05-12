import { useState } from 'react';
import type { FormEvent } from 'react';
import '../styles/Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info">
            <span className="contact__label">Get In Touch</span>
            <h2 className="section-title">
              Let&apos;s Build Something Amazing Together
            </h2>
            <p className="contact__desc">
              Have a project in mind? We&apos;d love to hear about it. Fill out the
              form and our team will get back to you within 24 hours.
            </p>
            <div className="contact__details">
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="contact__detail-title">Email Us</p>
                  <p className="contact__detail-value">hello@nexatech.com</p>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="contact__detail-title">Call Us</p>
                  <p className="contact__detail-value">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="contact__detail-title">Visit Us</p>
                  <p className="contact__detail-value">
                    123 Innovation Drive, San Francisco, CA 94107
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__form-wrapper">
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" />
                  </svg>
                </div>
                <h3>Message Sent!</h3>
                <p>
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours.
                </p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="contact__form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>
                <div className="contact__form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Your Company"
                  />
                </div>
                <div className="contact__form-group">
                  <label htmlFor="service">Service Interested In</label>
                  <select id="service" defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>Custom Software Development</option>
                    <option>Cloud & DevOps</option>
                    <option>UI/UX Design</option>
                    <option>AI & Machine Learning</option>
                    <option>Cybersecurity</option>
                    <option>IT Consulting</option>
                  </select>
                </div>
                <div className="contact__form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary contact__submit">
                  Send Message
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22,2 15,22 11,13 2,9" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
