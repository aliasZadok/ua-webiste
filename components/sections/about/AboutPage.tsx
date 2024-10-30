import React from 'react';
import AboutHero from '@/components/sections/about/AboutHero';
import FoundersStory from '@/components/sections/about/FoundersStory';
import TeamReel from '@/components/sections/about/TeamReel';
import OurApproach from '@/components/sections/about/OurApproach';
import TransformationSection from '@/components/sections/about/TransformationSection';
import FinalCTA from '@/components/FinalCTA';

const AboutPage: React.FC = () => {
  return (
    <main className="bg-[#fffdf4] min-h-screen">
      <AboutHero />
      
      {/* Founders Story */}
      <FoundersStory />

      {/* Meet the Team */}
      <TeamReel />

      {/* Our Approach */}
      <OurApproach />

      {/* Transformation */}
      <TransformationSection />

      <FinalCTA />
    </main>
  );
};

export default AboutPage;