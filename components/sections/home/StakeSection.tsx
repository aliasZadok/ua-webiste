'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const stakes = [
  {
    title: 'Avoid unreliable partners',
    description: 'End the cycle of overpromised, under delivered branding.',
    icon: '/unreliable_partners.svg'
  },
  {
    title: 'Escape DIY pitfalls',
    description: 'Stop second-guessing your branding decisions.',
    icon: '/diy_pitfalls.svg'
  },
  {
    title: 'Stand out',
    description: 'Don\'t let uninspiring visuals undermine your hard work.',
    icon: '/stand_out.svg'
  },
  {
    title: 'Maximise ROI',
    description: 'Ensure every marketing investment drives real results.',
    icon: '/roi.svg'
  }
];

const StakeSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setContentRef = (el: HTMLDivElement | null, index: number) => {
    contentRefs.current[index] = el;
  };

  const setIconRef = (el: HTMLDivElement | null, index: number) => {
    iconRefs.current[index] = el;
  };

  useEffect(() => {
    // Reset all items to default state
    contentRefs.current.forEach((content, index) => {
      if (content) {
        gsap.to(content, {
          opacity: activeIndex === null ? 0.5 : index <= activeIndex! ? 1 : 0.5,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      }
    });

    // Animate the active icon
    iconRefs.current.forEach((icon, index) => {
      if (icon) {
        if (index === activeIndex) {
          gsap.fromTo(icon,
            {
              opacity: 0,
              x: 40,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              ease: 'power2.out'
            }
          );
        } else {
          gsap.to(icon, {
            opacity: 0,
            x: 40,
            duration: 0.3,
            ease: 'power2.in'
          });
        }
      }
    });
  }, [activeIndex]);

  return (
    <section className="bg-[#FFFDF4] py-20">
      <div className="container mx-auto px-4">
        <div className="space-y-8 mb-12">
          {stakes.map((item, index) => (
            <div 
              key={index} 
              className={`pb-8 ${
                index < stakes.length - 1 ? 'border-b border-[#F0F0F0]' : ''
              }`}
            >
              <div 
                className="inline-flex items-center gap-4 w-auto"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div 
                  ref={(el) => setContentRef(el, index)}
                  className="max-w-2xl"
                >
                  <h3 className="text-2xl font-medium text-[#5a2b7f] mb-2">
                    {item.title}:
                  </h3>
                  <p className="text-lg">{item.description}</p>
                </div>
                <div 
                  ref={(el) => setIconRef(el, index)}
                  className="w-24 h-24 flex items-center justify-center"
                >
                  <Image
                    src={item.icon}
                    alt={`${item.title} Icon`}
                    width={80}
                    height={80}
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StakeSection;