import { asset, clientLogos } from '../data/content';

function LogoItems() {
  return (
    <>
      {clientLogos.map((logo) => (
        <li key={logo.name} className="logo-tile">
          <img src={logo.src} width={logo.width} height={logo.height} alt={logo.name} />
        </li>
      ))}
      <li className="logo-tile">
        {/* Audlabs: mark is clipped by a mask in Figma, text sits beside it. */}
        <span className="logo-audlabs" role="img" aria-label="Audlabs">
          <span className="logo-audlabs__mark" style={{ maskImage: `url(${asset('logo-audlabs-mask.svg')})` }}>
            <img src={asset('logo-audlabs-mark.svg')} alt="" />
          </span>
          <img className="logo-audlabs__text" src={asset('logo-audlabs-text.svg')} alt="" />
        </span>
      </li>
      <li className="logo-tile">
        <img src={asset('logo-shape.svg')} width={106.935} height={31.451} alt="Shape" />
      </li>
    </>
  );
}

export default function Logos() {
  return (
    <section className="logos" aria-label="Clients">
      <p className="logos__caption">Trusted by leading organizations to manage the day-to-day running of their properties.</p>
      {/* On narrow screens the row scrolls as a marquee; the duplicate copy makes the loop seamless. */}
      <div className="logos__viewport">
        <div className="logos__track">
          <ul className="logos__list">
            <LogoItems />
          </ul>
          <ul className="logos__list logos__list--clone" aria-hidden="true">
            <LogoItems />
          </ul>
        </div>
      </div>
    </section>
  );
}
