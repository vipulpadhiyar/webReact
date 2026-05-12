import '../styles/Team.css';

const team = [
  {
    name: 'Alex Morgan',
    role: 'CEO & Co-Founder',
    bio: '15+ years in tech leadership. Previously VP of Engineering at a Fortune 500.',
    initials: 'AM',
    color: '#2563eb',
  },
  {
    name: 'Sarah Chen',
    role: 'CTO & Co-Founder',
    bio: 'Full-stack architect. Built systems processing 10M+ requests/day.',
    initials: 'SC',
    color: '#7c3aed',
  },
  {
    name: 'James Wilson',
    role: 'VP of Engineering',
    bio: 'Cloud infrastructure expert. AWS certified solutions architect.',
    initials: 'JW',
    color: '#059669',
  },
  {
    name: 'Priya Patel',
    role: 'Head of Design',
    bio: 'Award-winning UX designer. Passionate about accessible, human-centered design.',
    initials: 'PP',
    color: '#d97706',
  },
];

export default function Team() {
  return (
    <section id="team" className="team section">
      <div className="container">
        <div className="team__header">
          <span className="team__label">Our Team</span>
          <h2 className="section-title">Meet the Leadership</h2>
          <p className="section-subtitle">
            Experienced professionals driving innovation and delivering results
            for our clients.
          </p>
        </div>
        <div className="team__grid">
          {team.map((m) => (
            <div key={m.name} className="team__card">
              <div
                className="team__avatar"
                style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}bb)` }}
              >
                <span className="team__initials">{m.initials}</span>
              </div>
              <h3 className="team__name">{m.name}</h3>
              <p className="team__role">{m.role}</p>
              <p className="team__bio">{m.bio}</p>
              <div className="team__socials">
                <a href="#team" className="team__social" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#team" className="team__social" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
