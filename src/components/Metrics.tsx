import type { CSSProperties } from 'react';
import { asset, metrics, partners } from '../data/content';
import { useCountUp } from '../lib/motion';

function Metric({ value, label, index }: { value: string; label: string; index: number }) {
  // "12 yrs" → 12 + " yrs", "100%" → 100 + "%"
  const [, num, suffix] = value.match(/^(\d+)(.*)$/) ?? [, '0', value];
  const [ref, count] = useCountUp<HTMLParagraphElement>(Number(num));
  return (
    <li className="metric" data-reveal style={{ '--i': index } as CSSProperties}>
      <img className="metric__rule" src={asset('metric-line.svg')} width={780} height={1} alt="" />
      <p ref={ref} className="metric__value">
        <span className="sr-only">{value}</span>
        <span aria-hidden="true">
          {count}
          {suffix}
        </span>
      </p>
      <p className="metric__label">{label}</p>
    </li>
  );
}

export default function Metrics() {
  return (
    <section className="metrics" aria-label="Partners and results">
      <div className="metrics__partners" data-reveal>
        <h2 className="eyebrow">Our strategic partners</h2>
        <ul className="metrics__logos">
          {partners.map((p, i) => (
            <li key={p.name} className={`logo-tile${i === 0 ? ' logo-tile--start' : ''}`}>
              <img src={p.src} width={p.width} height={p.height} alt={p.name} />
            </li>
          ))}
        </ul>
      </div>

      <ul className="metrics__list">
        {metrics.map((m, i) => (
          <Metric key={m.value} value={m.value} label={m.label} index={i} />
        ))}
      </ul>
    </section>
  );
}
