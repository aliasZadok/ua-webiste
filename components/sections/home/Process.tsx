'use client'

import React, { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import CustomCursor from '@/components/ui/CustomCursor';

const Process: React.FC = () => {
  const floppyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [floppyOrder, setFloppyOrder] = useState([0, 1, 2]);
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const setFloppyRef = useCallback((el: HTMLDivElement | null, index: number) => {
    floppyRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const floppies = floppyRefs.current;

    if (floppies.some(floppy => !floppy)) return;

    floppies.forEach((floppy) => {
      gsap.to(floppy, {
        y: '+=30',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);

  const handleClick = () => {
    const floppies = floppyRefs.current;
    const currentTopIndex = floppyOrder[0];
    const nextOrder = [...floppyOrder.slice(1), currentTopIndex];

    const currentFloppy = floppies[currentTopIndex];
    const nextFloppyIndex = floppyOrder[1];
    const nextFloppy = floppies[nextFloppyIndex];

    if (currentFloppy && nextFloppy) {
      gsap.to(currentFloppy, {
        y: '-150%',
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(currentFloppy, { y: '-150%' });
          setFloppyOrder(nextOrder);

          gsap.to(currentFloppy, {
            y: '0px',
            duration: 0.6,
            ease: 'power2.inOut'
          });
        }
      });

      gsap.to(nextFloppy, {
        y: '0px',
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (showCustomCursor) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <section className="bg-[#fffdf4] py-20">
      <CustomCursor 
        x={mousePos.x} 
        y={mousePos.y} 
        isVisible={showCustomCursor} 
      />
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-3xl lg:text-4xl font-medium mb-4 text-[#102442] leading-tight">
          Interested in collaborating with our <br /> strategic branding agency in Hyderabad?
        </h2>
        <h3 className="text-xl md:text-2xl font-medium mb-12 text-[#102442]">
          Here&apos;s how we work…
        </h3>
        <div className="relative h-[600px]">
          {['navy', 'yellow', 'pink'].map((color, index) => (
            <div 
              key={color} 
              ref={(el) => setFloppyRef(el, index)}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ 
                zIndex: 3 - floppyOrder.indexOf(index),
                top: `${(floppyOrder.length - 1 - floppyOrder.indexOf(index)) * 20}px`,
                cursor: 'none' // Hide default cursor
              }}
              onClick={handleClick}
              onMouseEnter={() => setShowCustomCursor(true)}
              onMouseLeave={() => setShowCustomCursor(false)}
              onMouseMove={handleMouseMove}
            >
              <Image 
                src={`/floppy_${color}.svg`}
                alt={`${color.charAt(0).toUpperCase() + color.slice(1)} Floppy`}
                width={500}
                height={500}
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start px-24" style={{ bottom: '15%' }}>
                <h4 className="text-[#ee589f] text-2xl font-normal mb-4 text-left">
                  {index === 0 ? "We Listen, You Share" :
                   index === 1 ? "We Co-create, You Shine" :
                   "We Deliver, You Grow"}
                </h4>
                <p className="text-[#102442] text-base text-normal text-left">
                  {index === 0 ? "Book an initial call, followed by a brand workshop, where we dive deep into your unique value proposition and market positioning." :
                   index === 1 ? "Collaborate to develop a tailored brand strategy and design elements that not only reflect your story but also enhance your competitiveness." :
                   "Receive your polished brand materials, along with guidance to leverage your new brand for increased sales and market share."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;