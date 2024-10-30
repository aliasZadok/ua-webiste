import React from 'react';
import Link from 'next/link';

const FinalCTA: React.FC = () => {
  return (
    <section className="bg-[#FFFDF4] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-medium text-[#ee589f] mb-8">
          Ready for a brand that truly reflects your ambition?
        </h2>
        <Link href="/contact" className="bg-[#102442] text-white px-8 py-3 text-lg font-normal rounded-full transition-colors duration-300 hover:bg-[#fcee4c] hover:text-[#102442]">
          Book A Call
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;