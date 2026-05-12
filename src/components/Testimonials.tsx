import '../styles/Testimonials.css';

const testimonials = [
  {
    quote:
      'NexaTech transformed our legacy systems into a modern cloud platform. The migration was seamless and our performance improved by 300%. Truly world-class engineering.',
    name: 'David Kim',
    title: 'CTO, FinFlow Inc.',
    initials: 'DK',
    color: '#2563eb',
  },
  {
    quote:
      'Their team feels like an extension of ours. They understood our vision from day one and delivered a product that exceeded every expectation. Highly recommend.',
    name: 'Maria Rodriguez',
    title: 'CEO, MediConnect',
    initials: 'MR',
    color: '#059669',
  },
  {
    quote:
      'The e-commerce platform NexaTech built handles our Black Friday traffic without breaking a sweat. Professional, responsive, and technically brilliant.',
    name: 'Robert Chang',
    title: 'VP Product, ShopSmart',
    initials: 'RC',
    color: '#d97706',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="testimonials__header">
          <span className="testimonials__label">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Don&apos;t take our word for it — hear from the companies we&apos;ve helped
            transform.
          </p>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonials__card">
              <div className="testimonials__stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="testimonials__quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonials__author">
                <div
                  className="testimonials__avatar"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}bb)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="testimonials__name">{t.name}</p>
                  <p className="testimonials__title">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
