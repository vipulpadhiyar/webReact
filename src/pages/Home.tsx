import Hero from '../components/Hero';
import Partner from '../components/Partner';
import ServicesSection from '../components/ServicesSection';
import CaseStudies from '../components/CaseStudies';
import Industries from '../components/Industries';
import WhyUs from '../components/WhyUs';
import Awards from '../components/Awards';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import Clientele from '../components/Clientele';
import CTASection from '../components/CTASection';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import TechStack from '../components/TechStack';

export default function Home() {
  return (
    <main>
      <Hero />
      <Partner />
      <ServicesSection />
      <CaseStudies />
      <Industries />
      <WhyUs />
      <Awards />
      <Testimonials />
      <BlogSection />
      <Clientele />
      <CTASection />
      <FAQ />
      <ContactForm />
      <TechStack />
    </main>
  );
}
