import { blogs } from '../data/siteData';
import '../styles/BlogSection.css';

export default function BlogSection() {
  return (
    <section className="blog-section section">
      <div className="container">
        <div className="blog-section__header">
          <div>
            <span className="section-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Our Blogs
            </span>
            <h2 className="section-title">Insights and tips on the latest AI trends</h2>
            <p className="section-desc">
              Read our information-rich blogs, which are collections of our research, capabilities, and fresh perspectives on AI technologies.
            </p>
          </div>
          <a href="/about" className="btn btn-outline">View All &rarr;</a>
        </div>
        <div className="blog-section__grid">
          {blogs.map((b) => (
            <article key={b.title} className="blog-section__card">
              <div className="blog-section__image" />
              <div className="blog-section__meta">
                <span className="blog-section__category">{b.category}</span>
                <span className="blog-section__date">{b.date}</span>
              </div>
              <h3 className="blog-section__title">{b.title}</h3>
              <div className="blog-section__author">
                <div className="blog-section__author-avatar">{b.author.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <p className="blog-section__author-name">{b.author}</p>
                  <p className="blog-section__author-role">{b.role}</p>
                </div>
                <span className="blog-section__read-more">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
