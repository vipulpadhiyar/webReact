import { useState } from 'react';
import '../styles/ContactPage.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact-page">
      <section className="contact-page-hero">
        <div className="container">
          <span className="section-label">Contact Us</span>
          <h1 className="contact-page-hero__title">Let's build something amazing together</h1>
          <p className="contact-page-hero__desc">
            Have a project in mind? We'd love to hear about it. Fill out the form and our AI experts will get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-page__grid">
            <div className="contact-page__info-cards">
              <div className="contact-page__info-card">
                <div className="contact-page__info-icon">✉</div>
                <h3>Email Us</h3>
                <p>hello@agileai.com</p>
                <p>careers@agileai.com</p>
              </div>
              <div className="contact-page__info-card">
                <div className="contact-page__info-icon">☏</div>
                <h3>Call Us</h3>
                <p>+1 (555) 234-5678</p>
                <p>+1 (555) 876-5432</p>
              </div>
              <div className="contact-page__info-card">
                <div className="contact-page__info-icon">⌂</div>
                <h3>Visit Us</h3>
                <p>123 AI Innovation Drive</p>
                <p>San Francisco, CA 94107</p>
              </div>
              <div className="contact-page__info-card">
                <div className="contact-page__info-icon">◷</div>
                <h3>Business Hours</h3>
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p>24/7 Support Available</p>
              </div>
            </div>
            <div className="contact-page__form-card">
              {submitted ? (
                <div className="contact-page__success">
                  <div className="contact-page__success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button className="btn btn-primary" onClick={() => setSubmitted(false)} type="button">Send Another Message</button>
                </div>
              ) : (
                <>
                  <h2>Send Us a Message</h2>
                  <p className="contact-page__form-desc">
                    Use our convenient contact form to reach out with questions, feedback, or collaboration inquiries.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="contact-page__form-row">
                      <div className="contact-page__field">
                        <label>Full Name *</label>
                        <input type="text" placeholder="John Doe" required />
                      </div>
                      <div className="contact-page__field">
                        <label>Phone Number</label>
                        <input type="tel" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                    <div className="contact-page__form-row">
                      <div className="contact-page__field">
                        <label>Email *</label>
                        <input type="email" placeholder="john@company.com" required />
                      </div>
                      <div className="contact-page__field">
                        <label>Budget Range</label>
                        <select>
                          <option value="">Select budget range</option>
                          <option value="10k-25k">$10K - $25K</option>
                          <option value="25k-50k">$25K - $50K</option>
                          <option value="50k-100k">$50K - $100K</option>
                          <option value="100k+">$100K+</option>
                        </select>
                      </div>
                    </div>
                    <div className="contact-page__field">
                      <label>Project Details *</label>
                      <textarea placeholder="Tell us about your project, goals, and any specific requirements..." rows={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary contact-page__submit">Send Message &rarr;</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-page__map">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 32 }}>Our Global Offices</h2>
          <div className="contact-page__offices">
            <div className="contact-page__office">
              <h3>🇺🇸 San Francisco, USA</h3>
              <p>123 AI Innovation Drive, Suite 400</p>
              <p>San Francisco, CA 94107</p>
            </div>
            <div className="contact-page__office">
              <h3>🇬🇧 London, UK</h3>
              <p>45 Machine Learning Lane</p>
              <p>London, EC2A 1NT</p>
            </div>
            <div className="contact-page__office">
              <h3>🇮🇳 Bangalore, India</h3>
              <p>Tech Park, 7th Floor</p>
              <p>Whitefield, Bangalore 560066</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
