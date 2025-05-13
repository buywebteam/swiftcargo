import About from "./About";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Services from "./Services";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";

function Home() {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
      <Services />
      <HowItWorks />
      <Testimonials />
      <About />
    </div>
  );
}

export default Home;
