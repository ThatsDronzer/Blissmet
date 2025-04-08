import Hero from "./components/Hero"
import WhyChooseUs from "./components/WhyChooseUs"
import CategorySection from "./components/CategorySection"
import FeaturedVendors from "./components/FeaturedVendors"
import Testimonials from "./components/Testimonials"
import HowItWorks from "./components/HowItWorks"
import BecomeVendor from "./components/BecomeVendor"
import Support from "./components/Support"
import TrustAndSecurity from "./components/TrustAndSecurity"
import PopularVendors from "./components/PopularVendors"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <CategorySection />
      <PopularVendors />
      <FeaturedVendors />
      <WhyChooseUs />
      {/* <HowItWorks /> */}
      <Testimonials />
      <BecomeVendor />
      <Support />
      <TrustAndSecurity />
    </div>
  )
}

