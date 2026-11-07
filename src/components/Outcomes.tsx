import { useEffect, useState, type CSSProperties } from 'react';
import { outcomePhotos, outcomes } from '../data/content';
import { prefersReducedMotion, useInView } from '../lib/motion';

const STAGE_CENTER = 720 - 229.524 / 2;

export default function Outcomes() {
  const [ref, inView] = useInView<HTMLDivElement>();
  // Prerendered as the final fanned-out layout. If the section starts off screen, the photos are
  // gathered into a pile on hydration and dealt out when it scrolls into view.
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el && !prefersReducedMotion() && el.getBoundingClientRect().top > window.innerHeight) setStacked(true);
  }, [ref]);

  useEffect(() => {
    if (inView) setStacked(false);
  }, [inView]);

  return (
    <section className="outcomes" id="about">
      <div ref={ref} className={`outcomes__photos${stacked ? ' is-stacked' : ''}`}>
        {outcomePhotos.map((p, i) => (
          <img
            key={p.src}
            className="outcomes__photo"
            src={p.src}
            alt={p.alt}
            width={230}
            height={223}
            loading="lazy"
            decoding="async"
            style={
              {
                left: p.left,
                top: p.top,
                '--rotate': `${p.rotate}deg`,
                '--stack-x': `${STAGE_CENTER - p.left}px`,
                '--stack-y': `${110 - p.top}px`,
                '--stack-rotate': `${(i - 2) * 4}deg`,
                '--i': i,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <header className="section-header outcomes__header" data-reveal>
        <h2 className="section-header__title section-header__title--medium">Reliable Outomes</h2>
        <p className="section-header__subtitle outcomes__subtitle">
          No guesswork, no vendor juggling, just a property that runs the way it should, every day.
        </p>
      </header>

      <ul className="outcomes__grid">
        {outcomes.map((o, i) => (
          <li key={o.title} className="outcome-card" data-reveal style={{ '--i': i % 3 } as CSSProperties}>
            <h3 className="outcome-card__title">{o.title}</h3>
            <p className="outcome-card__text">{o.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
