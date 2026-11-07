// Homepage copy and asset references, taken from the "Homepage" frame of the Fichaya Website Figma file.

export const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

/** Responsive WebP set: `<name>-<width>.webp` for each width (800/1400 plus the largest the source allows). */
export const photo = (name: string, widths: number[] = [800, 1400, 2752]) => ({
  src: asset(`${name}-1400.webp`),
  srcSet: widths.map((w) => `${asset(`${name}-${w}.webp`)} ${w}w`).join(', '),
});

export type Photo = { name: string; widths?: number[]; position?: string };

// Photos taken from the Fichaya Website Figma file (Homepage, Services and About Us pages).
const photos = {
  office: { name: 'services-bg-alt' },
  cleaningCrew: { name: 'services-bg' },
  housekeeping: { name: 'svc-housekeeping', widths: [800, 1400, 2000], position: '50% 30%' },
  ac: { name: 'svc-ac', widths: [800, 1400, 2000], position: '40% 50%' },
  power: { name: 'svc-power', widths: [800, 1400, 2000], position: '50% 45%' },
  diesel: { name: 'svc-diesel', widths: [800, 1400, 2000], position: '50% 60%' },
  deepCleaning: { name: 'svc-deep-cleaning', widths: [800, 1400, 2000], position: '50% 12%' },
  workforce: { name: 'svc-workforce', position: '50% 30%' },
  meeting: { name: 'svc-consumables', position: '60% 50%' },
} satisfies Record<string, Photo>;

export const navLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact Us', href: '#contact' },
];

// Nav "Services" dropdown (Figma: Services dropdown).
export const serviceMenu = [
  { title: 'Property Operations', text: 'Keep your property clean, safe, and guest-ready.' },
  { title: 'Cleaning & Janitorial', text: 'Professional cleaning that keeps your spaces spotless.' },
  { title: 'Upholstery cleaning', text: 'Deep-clean your furniture and refresh your interiors.' },
  { title: 'Housekeeping', text: 'Reliable housekeeping for a consistently comfortable space.' },
  { title: 'AC Servicing', text: 'Keep your cooling systems efficient and running smoothly.' },
  { title: 'Deep Cleaning', text: 'Thorough cleaning for a healthier, fresher environment.' },
  { title: 'Fumigation', text: 'Protect your property from pests with effective treatment.' },
  { title: 'Workforce Recruitment', text: 'Find reliable, skilled staff for your property needs.' },
];

export const clientLogos = [
  { name: 'Flutterwave', src: asset('logo-flutterwave.png'), width: 150, height: 24 },
  { name: 'Moniepoint', src: asset('logo-moniepoint.png'), width: 150, height: 36 },
  { name: 'Piggyvest', src: asset('logo-piggyvest.png'), width: 150, height: 106 },
];

// Services showcase (Figma: "3 items bento grid" → Background component).
export const services = [
  {
    title: 'General Property Operations',
    text: 'Comprehensive day-to-day property support, covering essential operational, maintenance, and facility management needs.',
    image: photos.office as Photo,
  },
  {
    title: 'Janitorial Management',
    text: 'Keep your property consistently clean, hygienic, and guest-ready with professionally managed janitorial services.',
    image: photos.cleaningCrew as Photo,
  },
  {
    title: 'Housekeeping Services',
    text: 'Reliable housekeeping for a consistently comfortable space.',
    image: photos.housekeeping as Photo,
  },
  {
    title: 'AC Servicing & Maintenance',
    text: 'Keep your cooling systems efficient and running smoothly.',
    image: photos.ac as Photo,
  },
  {
    // Copy not in the Figma file yet — placeholder.
    title: 'Generator & Power Management',
    text: 'Scheduled generator servicing and power monitoring so your building stays up when the grid goes down.',
    image: photos.power as Photo,
  },
  {
    // Copy not in the Figma file yet — placeholder.
    title: 'Diesel Supply',
    text: 'Planned diesel deliveries and stock tracking, so your generators never run dry.',
    image: photos.diesel as Photo,
  },
  {
    title: 'Deep Cleaning',
    text: 'Thorough cleaning for a healthier, fresher environment.',
    image: photos.deepCleaning as Photo,
  },
  {
    title: 'Fumigation',
    text: 'Protect your property from pests with effective treatment.',
    image: photos.cleaningCrew as Photo,
  },
  {
    title: 'Workforce Recruitment',
    text: 'Find reliable, skilled staff for your property needs.',
    image: photos.workforce as Photo,
  },
  {
    // Copy not in the Figma file yet — placeholder.
    title: 'Facility Consumables Supply',
    text: 'Restocking of cleaning supplies, toiletries, and everyday consumables, managed for you.',
    image: photos.meeting as Photo,
  },
];

export const outcomes = [
  { title: 'Fewer operational headaches', text: 'One team handles maintenance, staffing, cleaning, and power.' },
  {
    title: 'Facilities that stay ahead of problems',
    text: 'Scheduled maintenance and monitoring catch issues before they become downtime.',
  },
  { title: 'Staffing you can trust', text: "Vetted personnel, managed shifts, and backup coverage when someone's out." },
  {
    title: 'A cleaner, safer building, consistently',
    text: 'Standards set once and held to — not dependent on who shows up that day.',
  },
  { title: 'Complete on-site visibility', text: 'Reports on completed, pending tasks, and decisions needed.' },
  { title: 'One contact, not a list', text: 'For any issue, call one number — not multiple vendors.' },
];

// Positions/rotations of the photo stack above "Reliable Outcomes", relative to a 1440px-wide stage
// (each 229.5×222.8 photo is centred in its rotated Figma bounding box).
export const outcomePhotos: { src: string; alt: string; left: number; top: number; rotate: number }[] = [
  { src: asset('stack-cleaner.webp'), alt: 'Maintenance crew member at work', left: 272.97, top: 48.09, rotate: 8.97 },
  { src: asset('stack-kitchen.webp'), alt: 'Housekeeper cleaning an office kitchen', left: 437.28, top: 129.45, rotate: -11.25 },
  { src: asset('stack-team.webp'), alt: 'Property operations team', left: 634.9, top: 49.79, rotate: 0.81 },
  { src: asset('stack-ac.webp'), alt: 'Technician servicing an air-conditioning unit', left: 775.57, top: 141.17, rotate: -11 },
  { src: asset('stack-power.webp'), alt: 'Electrical distribution board', left: 935.16, top: 68.4, rotate: 10 },
];

export const metrics = [
  { value: '12 yrs', label: 'Operating across Lagos properties' },
  { value: '48 hrs', label: 'From site walk to costed plan' },
  { value: '100%', label: 'Vetted, payroll-managed crews' },
];

export const partners = [
  { name: 'Lagos State Employment Trust Fund', src: asset('partner-lsetf.png'), width: 150, height: 47 },
  { name: 'Strategic partner', src: asset('partner-2.png'), width: 64, height: 64 },
];

export const testimonials = [
  {
    quote:
      'Fichaya has successfully maintained a consistent track record of reliability, good customer service and professionalism',
    name: 'Renee',
    role: 'HR, Moniepoint',
    logo: asset('testimonial-logo.svg'),
  },
];

export const footerColumns = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '#top' },
      { label: 'About Us', href: '#about' },
      { label: 'Contacts', href: '#contact' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Blog', href: '#blog' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Book a Service', href: '#book' },
      { label: 'Customer Policy', href: '#policy' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Contact Info',
    links: [
      { label: 'Lekki Phase 1, Lekki, Lagos 101245, NG' },
      { label: '+234 (0) 817 360 2446', href: 'tel:+2348173602446' },
    ],
  },
];

export const socials = [
  { name: 'X', src: asset('social-1.svg'), href: '#' },
  { name: 'Facebook', src: asset('social-2.svg'), href: '#' },
  { name: 'Instagram', src: asset('social-3.svg'), href: '#' },
  { name: 'LinkedIn', src: asset('social-4.svg'), href: '#' },
];
