import { industries } from '../data/siteData';
import '../styles/Industries.css';

const iconPaths: Record<string, string> = {
  banknote: 'M2 6h20v12H2zM12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  'heart-pulse': 'M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0A5.4 5.4 0 0 0 3.58 12L12 21l8.42-9a5.4 5.4 0 0 0 0-7.42z',
  'shopping-cart': 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8z',
  'graduation-cap': 'M22 10 12 5 2 10l10 5 10-5zM6 12v5c0 2.5 3 4 6 4s6-1.5 6-4v-5',
  factory: 'M2 20V8l5 3V8l5 3V8l5 3v9zM22 20V12l-5 3V8',
  zap: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  film: 'M2 2h20v20H2zM7 2v20M17 2v20M2 7h5M2 12h20M2 17h5M17 7h5M17 17h5',
  plane: 'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z',
};

export default function Industries() {
  return (
    <section className="industries section">
      <div className="container">
        <span className="section-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          Industries We Serve
        </span>
        <h2 className="section-title">Customizable AI solutions for every industry</h2>
        <p className="section-desc">
          With deep industry expertise, we offer customized solutions using AI-powered 150+ technologies that address business challenges and drive growth.
        </p>
        <div className="industries__grid">
          {industries.map((ind) => (
            <div key={ind.name} className="industries__card">
              <div className="industries__card-visual" />
              <div className="industries__card-bottom">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={iconPaths[ind.icon]} /></svg>
                <span>{ind.name}</span>
                <span className="industries__arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
