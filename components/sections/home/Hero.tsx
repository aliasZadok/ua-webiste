'use client'

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

const logoSequence = [
  { path: '/logo.svg', duration: 0.75 },
  { path: '/yellow_logo.svg', duration: 0.75 },
  { path: '/pink_logo.svg', duration: 0.75 },
  { path: '/mario_miranda_goa.png', duration: 0.75 },
  { path: '/woman_with_a_parasol_madame_monet.png', duration: 0.75 },
  { path: '/lord_edwin_weeks.png', duration: 0.75 }
];

const Hero: React.FC = () => {
  const [[activeIndex, nextIndex], setIndexes] = useState([0, 1]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll('.logo-image');
    if (images.length !== 2) return;

    // Set initial state
    gsap.set(images[1], { opacity: 0 });

    const transitionDuration = 0.4; // Faster transition
    const stayDuration = 1.5;      // Shorter display time

    const transition = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIndexes(prev => {
            const newActive = prev[1];
            const newNext = (newActive + 1) % logoSequence.length;
            return [newActive, newNext];
          });
        }
      });

      // Smooth fade transition
      tl.to(images[1], {
        opacity: 1,
        duration: transitionDuration,
        ease: "sine.inOut" // Smoother easing function
      })
      .to(images[0], {
        opacity: 0,
        duration: transitionDuration,
        ease: "sine.inOut"
      }, "<"); // Simultaneous transition
    };

    const intervalId = setInterval(transition, (transitionDuration + stayDuration) * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="bg-[#fffdf4] py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center items-center">
            <div 
              ref={containerRef}
              className="relative w-[300px] h-[300px]"
            >
              {/* Active Image */}
              <div className="absolute inset-0 logo-image">
                <Image
                  src={logoSequence[activeIndex].path}
                  alt="Studio Unabridged Logo"
                  fill
                  priority
                  sizes="300px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              {/* Next Image */}
              <div className="absolute inset-0 logo-image">
                <Image
                  src={logoSequence[nextIndex].path}
                  alt="Studio Unabridged Logo"
                  fill
                  priority
                  sizes="300px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-3xl lg:text-4xl font-medium mb-4 text-[#102442] leading-tight">
              Become the #1 Brand for the Discerning Urban Consumer
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-8 text-[#102442]">
              Captivate consumers who demand and cherish premium quality.
            </p>
            <Link href="/contact" className="bg-[#102442] text-white px-8 py-3 text-lg font-normal rounded-full transition-colors duration-300 hover:bg-[#fcee4c] hover:text-[#102442]">
              Book A Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;