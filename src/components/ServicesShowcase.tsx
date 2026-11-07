import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { photo, services } from '../data/content';
import { prefersReducedMotion, useOnScreen } from '../lib/motion';

const SLIDE_MS = 6000;

export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  // Autoplay starts once hydrated (never on the server, never with reduced motion).
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Only photos that have been shown (plus the next one) are mounted, so they download on demand.
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const focusAfterChange = useRef(false);
  const onScreen = useOnScreen(panelRef);

  const current = services[active];
  const next = (active + 1) % services.length;
  const running = playing && onScreen && !hovered && !focused;

  useEffect(() => {
    setPlaying(!prefersReducedMotion());
  }, []);

  useEffect(() => {
    setMounted((m) => (m.has(active) && m.has(next) ? m : new Set([...m, active, next])));
  }, [active, next]);

  useEffect(() => {
    if (!focusAfterChange.current) return;
    focusAfterChange.current = false;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.focus();
  }, [active]);

  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    focusAfterChange.current = true;
    setActive((a) => (a + step + services.length) % services.length);
  };

  return (
    <section className="showcase" id="services">
      <header className="section-header" data-reveal>
        <h2 className="section-header__title">Made for you and your business to thrive</h2>
        <p className="section-header__subtitle showcase__subtitle">
          Whether you’re an homeowner, a small business or large corporation, we have excatly what you need.
        </p>
      </header>

      <div
        ref={panelRef}
        className="showcase__panel"
        data-reveal
        role="region"
        aria-roledescription="carousel"
        aria-label="Our services"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
      >
        {services.map((s, i) => {
          if (!mounted.has(i)) return null;
          const { name, widths, position } = s.image;
          return (
            <img
              key={s.title}
              className={`showcase__image${i === active ? ' is-active' : ''}`}
              {...photo(name, widths)}
              style={{ objectPosition: position }}
              sizes="(max-width: 1440px) calc(100vw - 32px), 1376px"
              width={1376}
              height={839}
              alt=""
              loading="lazy"
              decoding="async"
            />
          );
        })}

        <ul ref={listRef} className="showcase__list" onKeyDown={onKeyDown}>
          {services.map((s, i) =>
            i === active ? (
              <li key={s.title} className="service-card" data-index={i} tabIndex={-1} aria-live={running ? 'off' : 'polite'}>
                <h3 className="service-card__title">{current.title}</h3>
                <p className="service-card__text">{current.text}</p>
              </li>
            ) : (
              <li key={s.title}>
                <button type="button" className="service-pill" data-index={i} onClick={() => {
                    focusAfterChange.current = true;
                    setActive(i);
                  }}
                >
                  {s.title}
                  <span className="service-pill__icon" aria-hidden="true">
                    <span className="mask-icon mask-icon--plus" />
                  </span>
                </button>
              </li>
            ),
          )}
        </ul>

        <button
          type="button"
          className="progress-pill"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause service slideshow' : 'Play service slideshow'}
          aria-pressed={!playing}
        >
          <span className={`progress-pill__icon${playing ? ' is-playing' : ''}`} aria-hidden="true" />
          <span className="progress-pill__track">
            {playing ? (
              <span
                key={active}
                className="progress-pill__bar progress-pill__bar--timed"
                style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: running ? 'running' : 'paused' }}
                onAnimationEnd={() => setActive((a) => (a + 1) % services.length)}
              />
            ) : (
              <span className="progress-pill__bar" style={{ width: `${((active + 1) / services.length) * 100}%` }} />
            )}
          </span>
        </button>
      </div>
    </section>
  );
}
