'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const FoundersStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const foundersRef = useRef<(HTMLDivElement | null)[]>([]);
  const yellowRectRef = useRef<HTMLDivElement>(null);

  const setFounderRef = (el: HTMLDivElement | null) => {
    foundersRef.current.push(el);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const founders = foundersRef.current.filter(Boolean);
    const yellowRect = yellowRectRef.current;

    gsap.set(founders, { opacity: 0, y: 50 });
    if (yellowRect) gsap.set(yellowRect, { y: 100 });

    founders.forEach((founder) => {
      gsap.to(founder, {
        opacity: 1,
        y: 0,
        duration: 1.5, // Increased duration for a slower fade-in
        ease: 'power2.out',
        scrollTrigger: {
          trigger: founder,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          scrub: 0.5, // Added scrub for smoother animation during scroll
        },
      });
    });

    if (yellowRect) {
      gsap.to(yellowRect, {
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: yellowRect,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-[#FFFDF4]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-medium mb-12 text-left">
          Our founders, Judith and Sanjana bring a <br/>wealth of experience to help you navigate<br/> your marketing and branding challenges.
        </h2>
        <div className="space-y-12">
          {/* Judith */}
          <div ref={(el) => setFounderRef(el)} className="border-t border-[#F0F0F0] pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-medium text-[#5a2b7f]">Judith</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-lg">
                  Judith, with her <span className="font-semibold">extensive experience in branding and marketing</span> at UrbanKisaan and Captain Fresh, has developed <span className="font-semibold">strategies that drive REAL growth</span>. She has collaborated with the leadership of Captain Fresh&apos;s <span className="font-semibold">international offices</span> (in Europe, the UAE, and the US) to create and adapt <span className="font-semibold">branding and marketing</span> for niche, complex products across various regions, <span className="font-semibold">transforming intricate details into accessible insights</span>. Her skills have not only <span className="font-semibold">helped secure investments from top VCs</span> but also ensured that stakeholders, from investors to laymen like farmers and fishermen, understood the value of the products.
                </p>
              </div>
            </div>
          </div>
          
          {/* Sanjana */}
          <div ref={(el) => setFounderRef(el)} className="border-t border-[#F0F0F0] pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-medium text-[#5a2b7f]">Sanjana</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-lg">
                  Sanjana brings <span className="font-semibold">extensive experience from the media and entertainment industry</span>, having worked as an Assistant Manager of Programming at Zee Entertainment Enterprises. Her track record of spearheading the launch of <span className="font-semibold">record-breaking hit shows</span> demonstrates her <span className="font-semibold">ability to create content that captures audience attention</span>. Her background in <span className="font-semibold">journalism and communication</span>, coupled with her creative skills in <span className="font-semibold">multimedia and digital art</span>, allows her to approach <span className="font-semibold">branding from both strategic and visual perspectives</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Yellow rectangle with additional information */}
        <div ref={yellowRectRef} className="mt-16 flex justify-center">
          <div className="relative w-full max-w-[929px] bg-[#fcee4c]" style={{ aspectRatio: '929 / 386' }}>
            <div className="absolute -top-4 -left-4">
              <Image src="/pin.svg" alt="Pin" width={40} height={40} className='w-[40px] h-[40px]'/>
            </div>
            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center">
              <div className="max-w-3xl text-center">
                <p className="text-base sm:text-lg mb-4 sm:mb-6">
                  They&apos;ve <span className="font-semibold">spent countless hours interviewing business owners</span> and have seen firsthand the frustration they face, let down by <span className="font-semibold">agencies that overpromise and underdeliver</span>, push unnecessary extras, and hide behind confusing jargon.
                </p>
                <p className="text-base sm:text-lg">
                  That&apos;s why they started Studio Unabridged – to be the <span className="font-semibold">strategic branding agency in Hyderabad</span> that <span className="font-semibold">truly understands your needs</span> and<span className="font-semibold"> delivers results</span> without the fluff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersStory;
