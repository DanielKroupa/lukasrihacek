import Navbar from "@/components/layout/Navbar";
import Banner from "@/components/layout/Banner";
import About from "@/components/layout/About";
import Footer from "@/components/layout/Footer";
import Pricing from "@/components/layout/Pricing";
import Contact from "@/components/layout/Contact";
import ForestTherapy from "@/components/layout/ForestTherapy";

import CookieBanner from "@/components/layout/CookieBanner";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <About />
      <Pricing />
      <ForestTherapy />

      <Contact />
      <Footer />

      <CookieBanner />
    </div>
  );
}
