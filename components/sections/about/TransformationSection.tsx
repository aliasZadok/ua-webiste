'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const transformations = [
  {
    from: 'Overwhelmed',
    to: 'Empowered',
    description: 'No more confusion. With us, your brand will be clear, consistent, and compelling.',
    icon: '/empowered.svg'
  },
  {
    from: 'Generic',
    to: 'Memorable',
    description: 'Your brand will stand out with a distinct identity that resonates with your audience.',
    icon: '/memorable.svg'
  },
  {
    from: 'Stagnant',
    to: 'Growing',
    description: 'Watch your business flourish as we help you attract and retain the right clients.',
    icon: '/growing.svg'
  },
  {
    from: 'Frustrated',
    to: 'Confident',
    description: 'Trust us to manage your branding, so you can focus on what you do best.',
    icon: '/confident.svg'
  }
];

const TransformationSection = () => {
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
        <h2 className="text-4xl font-medium text-[#5a2b7f] mb-12">
          At Studio Unabridged, we take you from:
        </h2>
        <div className="space-y-8 mb-12">
          {transformations.map((item, index) => (
            <div 
              key={index} 
              className={`pb-8 ${
                index < transformations.length - 1 ? 'border-b border-[#F0F0F0]' : ''
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
                    {item.from} to {item.to}:
                  </h3>
                  <p className="text-lg">{item.description}</p>
                </div>
                <div 
                  ref={(el) => setIconRef(el, index)}
                  className="w-24 h-24 flex items-center justify-center"
                >
                  <Image
                    src={item.icon}
                    alt={`${item.to} Icon`}
                    width={80}
                    height={80}
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[#102442] text-3xl font-medium space-y-6">
          <p>
            Imagine a brand that not only stands out but also truly connects with your audience, supported by a partner you can count on.
          </p>
          <p>
            With us, your brand becomes a symbol of quality and trust, leading your niche with confidence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;