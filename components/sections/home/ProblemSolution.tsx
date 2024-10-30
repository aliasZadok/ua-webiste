'use client'

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProblemSolution: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    const imageContainer = imageContainerRef.current;

    if (!section || !line1 || !line2 || !line3 || !imageContainer) return;

    gsap.set([line1, line2, line3], { opacity: 0.2 });
    gsap.set(imageContainer, { y: '100%' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 20%',
        end: 'bottom 80%',
        scrub: 1,
      },
    });

    tl.to(line1, { opacity: 1, duration: 0.3 })
      .to(line2, { opacity: 1, duration: 0.3 }, '-=0.1')
      .to(line3, { opacity: 1, duration: 0.3 }, '-=0.1')
      .to([line1, line2, line3], { opacity: 0.2, duration: 0.3 })
      .to(imageContainer, { y: '0%', duration: 0.5 }, '-=0.3');

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#fffdf4] py-40 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-[133px] text-center">
          <p ref={line1Ref} className="text-4xl text-[#102442] font-normal">
            Is your high-quality offering failing to command the premium prices it deserves?
          </p>
          <p ref={line2Ref} className="text-4xl text-[#102442] font-normal">
            Feeling frustrated and undervalued, knowing your offering isn&apos;t reaching its ideal market?
          </p>
          <p ref={line3Ref} className="text-4xl text-[#102442] font-normal">
            Ambitious small businesses shouldn&apos;t struggle to be recognised and rewarded for their excellence.
          </p>
        </div>
      </div>
      <div 
        ref={imageContainerRef}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 overflow-hidden"
      >
        <div className="relative">
          <Image
            src="/dot_grid_pink.svg"
            alt="Pink Dot Grid Paper"
            width={974}
            height={472}
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-2xl font-normal text-white text-center w-[550px] px-4">
              We are a strategic branding agency in Hyderabad that believes branding is as much a sales challenge as a creative one. Our solutions go beyond pretty visuals, helping you demand what you&apos;re worth and command attention.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
