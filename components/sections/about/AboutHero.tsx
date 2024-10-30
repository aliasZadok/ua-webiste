'use client'

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const element1Ref = useRef<HTMLDivElement>(null);
  const element2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    const contentElement = contentRef.current;

    if (!heroElement || !contentElement) return;

    // Set the height of the hero section to be the viewport height
    gsap.set(heroElement, { height: '100vh' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo(element1Ref.current, 
      { y: '100%', opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.3 }
    ).fromTo(element2Ref.current, 
      { y: '100%', opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.3 },
      '+=0.1'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="bg-[#fffdf4] relative overflow-hidden">
      <div ref={contentRef} className="container mx-auto px-4 h-screen flex items-center">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          <div className="max-w-[500px] mb-10 lg:mb-0 lg:mr-8">
            <h1 className="text-[30px] font-medium mb-4 leading-[140%] font-['ITC_Avant_Garde_Std']">
              We are a <span className="text-[#ee589f]">strategic</span><br />
              branding agency<br />
              in Hyderabad
            </h1>
            <p className="text-[20px] font-medium leading-[140%] font-['ITC_Avant_Garde_Std']">
              who help small businesses look<br />
              & feel unmistakably premium
            </p>
          </div>
          <div className="relative w-full lg:w-[800px] h-[730px]">
            <div ref={element1Ref} className="absolute top-0 left-0 w-[570px] h-[400px] text-[#FFFDF4] p-8 z-10">
              <Image
                src="/dot_grid_pink.svg"
                alt="Pink Dot Grid"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <p className="relative z-10 mt-24 text-[25px] font-normal leading-[140%] text-center">
                In a market flooded with quick fixes that are like bandaids on a haemorrhage, we believe true growth isn&apos;t just a patch job—it&apos;s a journey that demands time, creativity, and care.
              </p>
            </div>
            <div ref={element2Ref} className="absolute top-[330px] left-[230px] w-[500px] h-[400px] text-[#FFFDF4] p-8 z-20">
              <Image
                src="/dot_grid_purple.svg"
                alt="Purple Dot Grid"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <p className="relative z-10 mt-24 text-[25px] font-normal leading-[140%] text-center">
                At Studio Unabridged, we craft brands strategically to resonate with urban consumers who won&apos;t settle for anything less than premium quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;