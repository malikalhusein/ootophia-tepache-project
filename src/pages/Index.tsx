import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatIsTepache from "@/components/WhatIsTepache";
import HalalAssurance from "@/components/HalalAssurance";
import OrderCTA from "@/components/OrderCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhatIsTepache />
      <HalalAssurance />
      <OrderCTA />
      <Footer />
    </div>
  );
};

export default Index;
