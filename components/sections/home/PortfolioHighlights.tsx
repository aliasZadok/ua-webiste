'use client';

import React from 'react';
import { usePortfolioItems } from '@/lib/hooks/useData';
import WorkSectionAnimation from '@/components/sections/home/WorkSectionAnimation';

const PortfolioHighlights: React.FC = () => {
  // const { items, loading, error } = usePortfolioItems();
  const { loading, error } = usePortfolioItems();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading portfolio items: {error.message}</div>;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <WorkSectionAnimation />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {items.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default PortfolioHighlights;