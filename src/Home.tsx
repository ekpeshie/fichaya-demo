import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Logos from './components/Logos';
import ServicesShowcase from './components/ServicesShowcase';
import Outcomes from './components/Outcomes';
import Metrics from './components/Metrics';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { useScrollReveal } from './lib/motion';

export default function Home() {
  useScrollReveal();
  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero />
        <Logos />
        <ServicesShowcase />
        <Outcomes />
        <Metrics />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
