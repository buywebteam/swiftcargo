import About from "./About";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Newsletter from "./Newsletter";
import Services from "./Services";
import Testimonials from "./Testimonials";
import StickyWhatsappIcon from "./WhatsappIcon";
import WhyChooseUs from "./WhyChooseUs";

function Home() {
  return (
    <div id="home" className="scroll-mt-20">
      <Hero />
      <WhyChooseUs />
      <Services />
      <HowItWorks />
      <Testimonials />
      <About />
      <Contact />
      <FAQ />
      <Newsletter />
      <Footer />
      <StickyWhatsappIcon />
    </div>
  );
}

export default Home;
