'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { name: 'Judith Devasahayam', role: 'Founder, Managing Director' },
  { name: 'Sanjana Vuppala', role: 'Co- Founder, Creative Director' },
  { name: 'Judah Devasahayam', role: 'Brand Strategist & Copywriter' },
  { name: 'Samson Raj', role: 'Project Manager, CAO' },
  { name: 'Vaishnavi Bachala', role: 'UI/UX Designer' },
  { name: 'Ashish Enginr', role: 'Client Relationship Manager' },
  { name: 'Arpan Enginr', role: 'Social Media Manager' },
];

const Sprocket = () => (
  <div className="w-[14.59px] h-[20.49px] bg-[#fffdf4]" />
);

const TeamReel = () => {
  const sectionRef = useRef(null);
  const reelRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reel = reelRef.current;
    const text = textRef.current;

    if (!section || !reel || !text) return;

    const totalWidth = (teamMembers.length + 1) * (293.77 + 20); // Frame width + gutter, plus extra gutter
    gsap.set(reel, { width: totalWidth, x: '20%' }); // Start with 20% offset

    gsap.to(reel, {
      x: () => -(totalWidth - window.innerWidth + window.innerWidth * 0.2), // Adjust end position
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

  }, []);

  const renderSprockets = () => (
    <div className="flex justify-between py-2 px-1">
      <Sprocket />
      <Sprocket />
      <Sprocket />
      <Sprocket />
      <Sprocket />
      <Sprocket />
    </div>
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#fffdf4] py-20">
      <div ref={textRef} className="absolute left-10 top-1/2 -translate-y-1/2 z-10">
        <h2 className="text-[120px] font-normal leading-none text-[#ee589f]">
          Meet<br />The<br />Team
        </h2>
      </div>
      <div ref={reelRef} className="relative z-20 flex">
        {/* Initial purple gutter */}
        <div className="w-[20px] bg-[#5a2b7f]"></div>
        {teamMembers.map((member, index) => (
          <div key={index} className="flex">
            <div className="w-[293.77px] bg-[#5a2b7f]">
              {renderSprockets()}
              {/* Image placeholder with nameplate */}
              <div className="relative">
                <div className="bg-[#fffdf4] w-[293.77px] h-[297.91px]" />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#5a2b7f] p-2 text-[#fffdf4] text-center w-4/5">
                  <p className="font-semibold text-sm">{member.name}</p>
                  <p className="text-xs">{member.role}</p>
                </div>
              </div>
              {renderSprockets()}
            </div>
            {/* Purple gutter without sprocket */}
            <div className="w-[20px] bg-[#5a2b7f]"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamReel;