'use client'

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Carousel } from '@/components/ui/carousel';
import Image from 'next/image';
import { gsap } from 'gsap';

interface Service {
  name: string[];
  icon: string;
  description: string[];
}

const services: Service[] = [
  {
    name: ['Brand', 'Strategy'],
    icon: '/brand_strategy.svg',
    description: [
      'Naming (if needed)',
      'Taglines x5 (if needed)',
      'Brand DNA',
      'Brand Positioning',
      'Brand Attributes',
      'Mood-boards x2',
      'Annual Brand Plan'
    ]
  },
  {
    name: ['Visual', 'Identity'],
    icon: '/visual_identity.svg',
    description: [
      'Logo designs x2',
      'Colour Palette',
      'Typeface',
      'Photography/Iconography',
      'Business card mockup',
      'Packaging mockup',
      'Other branding & marketing collateral mockup',
      'Brand identity guide'
    ]
  },
  {
    name: ['Website', 'Design'],
    icon: '/website_design.svg',
    description: [
      'User Experience (UX) Design',
      'User Interface (UI) Design',
      'Responsive Web Design',
      'Content Strategy & Copywriting',
      'User Behaviour Analytics',
      'Website Maintenance & Support'
    ]
  },
  {
    name: ['Digital', 'Marketing'],
    icon: '/digital_marketing_&_advertising.svg',
    description: [
      'Search Engine Optimization (SEO)',
      'Pay-Per-Click (PPC) Advertising',
      'Social Media Marketing',
      'Email Marketing Campaigns',
      'Content Marketing Strategy'
    ]
  }
];

const ServiceSlide: React.FC<{ service: Service; isActive: boolean }> = ({ service, isActive }) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const nameRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const setNameRef = useCallback((el: HTMLHeadingElement | null, index: number) => {
    nameRefs.current[index] = el;
  }, []);

  useEffect(() => {
    if (slideRef.current && isActive) {
      const tl = gsap.timeline();

      tl.fromTo(imageRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 }
      );

      tl.fromTo(nameRefs.current, 
        { x: 100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 
        "-=0.5"
      );

      if (descriptionRef.current) {
        tl.fromTo(Array.from(descriptionRef.current.children), 
          { x: 100, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.5 }, 
          "-=0.3"
        );
      }

      return () => {
        tl.kill();
      };
    }
  }, [isActive, service.name]);

  return (
    <div ref={slideRef} className="relative p-8 bg-[#fffdf4] h-full">
      <h3 ref={(el) => setNameRef(el, 0)} className="text-[150px] font-normal text-[#1E1E1E] leading-none mb-4 z-10 relative">
        {service.name[0]}
      </h3>
      <div className="flex">
        <div className="w-1/3 relative">
          <Image 
            ref={imageRef as React.Ref<HTMLImageElement>}
            src={service.icon} 
            alt={service.name.join(' ')} 
            width={380} 
            height={380} 
            className="absolute top-0 left-0 -mt-16"
          />
        </div>
        <div className="w-2/3 pl-4">
          <div ref={descriptionRef} className="grid grid-cols-2 gap-x-8 gap-y-0 mb-8">
            {service.description.map((item: string, index: number) => (
              <p key={index} className="text-lg text-[#1E1E1E]">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <h3 ref={(el) => setNameRef(el, 1)} className="text-[150px] font-normal text-[#1E1E1E] leading-none mt-0 pl-[33.33%]">
        {service.name[1]}
      </h3>
    </div>
  );
};

const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="bg-[#fffdf4] py-20">
      <div className="container mx-auto">
        <Carousel autoPlay={true} interval={5000} onSlideChange={handleSlideChange}>
          {services.map((service, index) => (
            <ServiceSlide key={index} service={service} isActive={index === activeIndex} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Services;