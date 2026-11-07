import { useEffect, useRef, useState, type RefObject } from 'react';

const isBrowser = typeof window !== 'undefined';

export function prefersReducedMotion() {
  return isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** True once the element has scrolled into view (stays true). Server render: false. */
export function useInView<T extends Element>(options: IntersectionObserverInit = { rootMargin: '0px 0px -15% 0px' }) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as const;
}

/** Live visibility (true while on screen), for pausing work like autoplay. */
export function useOnScreen<T extends Element>(ref: RefObject<T | null>) {
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return onScreen;
}

/**
 * Fade-up reveal for everything marked `data-reveal` that starts below the fold.
 * Content is visible in the prerendered HTML; only elements not yet on screen when JS
 * runs are hidden and then revealed, so nothing flashes and crawlers see everything.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    for (const el of els) {
      el.classList.add('reveal-pending');
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
}

/**
 * Counts 0 → target when the element scrolls into view. If the element is already on screen
 * (or motion is reduced, or this is the server render), it just shows the target.
 */
export function useCountUp<T extends Element>(target: number, duration = 1400) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(target);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || el.getBoundingClientRect().top < window.innerHeight) return;
    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);
  return [ref, value] as const;
}
