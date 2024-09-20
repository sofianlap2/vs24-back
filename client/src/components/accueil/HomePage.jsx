import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import ValueAddedSection from './ValueAddedSection';
import OurServices from './OurServices';
import RecentProducts from './RecentProducts';
import OurValues from './OurValues';
import TrustedBy from './TrustedBy';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import WhereWeAre from './WhereWeAre';
import ContactForm from './ContactForm';
import Newsletter from './Newsletter';
import Footer from './Footer';
import './global.css';
function HomePage() {
  return (
    <div className="body">

      <main><Header />
        <HeroSection />
        <ValueAddedSection />
        <OurServices />
        {/* <RecentProducts /> */}
        <OurValues />
        
        {/* <Testimonials />
        

        <FAQ />

        <WhereWeAre /> */}

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;