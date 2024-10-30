import React from 'react';
import Hero from '@/components/sections/home/Hero';
import ProblemSolution from '@/components/sections/home/ProblemSolution';
import PortfolioHighlights from '@/components/sections/home/PortfolioHighlights';
import Services from '@/components/sections/home/Services';
import Process from '@/components/sections/home/Process';
import StakeSection from '@/components/sections/home/StakeSection';
import FinalCTA from '@/components/FinalCTA';

const HomePage: React.FC = () => {
  return (
    <main className="flex-grow">
      <Hero />
      <ProblemSolution />
      <PortfolioHighlights />
      <Services />
      <Process />
      {/* Testimonials section to be added later */}
      <StakeSection />
      <FinalCTA />
    </main>
  );
};

export default HomePage;