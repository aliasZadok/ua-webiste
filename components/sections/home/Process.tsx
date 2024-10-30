'use client'

import React, { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const Process: React.FC = () => {
  const floppyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [floppyOrder, setFloppyOrder] = useState([0, 1, 2]); // Order of floppies in the stack
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const setFloppyRef = useCallback((el: HTMLDivElement | null, index: number) => {
    floppyRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const floppies = floppyRefs.current;

    if (floppies.some(floppy => !floppy)) return;

    // Floating animation for all floppies
    floppies.forEach((floppy) => {
      gsap.to(floppy, {
        y: '+=30',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    // Check if user has clicked before
    const hasClickedBefore = localStorage.getItem('hasClickedFloppy') === 'true';
    setHasClicked(hasClickedBefore);
  }, []);

  const handleClick = () => {
    const floppies = floppyRefs.current;
    const currentTopIndex = floppyOrder[0]; // The top-most floppy
    const nextOrder = [...floppyOrder.slice(1), currentTopIndex]; // Move top floppy to the back

    const currentFloppy = floppies[currentTopIndex]; // The floppy that will be moved
    const nextFloppyIndex = floppyOrder[1]; // The next floppy in the stack
    const nextFloppy = floppies[nextFloppyIndex];

    if (currentFloppy && nextFloppy) {
      // Animate the current floppy moving up and then reappear from the top
      gsap.to(currentFloppy, {
        y: '-150%',   // Move up and out of view
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          // Reset the current floppy's position to the top (above the stack)
          gsap.set(currentFloppy, { y: '-150%' });
          setFloppyOrder(nextOrder); // Update the order of the stack

          // Animate it moving back down to its stack position
          gsap.to(currentFloppy, {
            y: '0px', // Reset to base position (top)
            duration: 0.6,
            ease: 'power2.inOut'
          });
        }
      });

      // Animate the next floppy coming to the top
      gsap.to(nextFloppy, {
        y: '0px',  // Bring the next floppy to the top
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }

    // Set hasClicked to true and store in localStorage
    setHasClicked(true);
    localStorage.setItem('hasClickedFloppy', 'true');
    
    // Hide tooltip immediately after click
    setShowTooltip(false);
  };

  const handleMouseEnter = () => {
    if (!hasClicked) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <section className="bg-[#fffdf4] py-20">
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
              className={`absolute left-1/2 -translate-x-1/2 cursor-pointer`}
              style={{ 
                zIndex: 3 - floppyOrder.indexOf(index), // Control z-index to manage stack
                top: `${(floppyOrder.length - 1 - floppyOrder.indexOf(index)) * 20}px`, // Higher floppies will be moved upward
              }}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Tooltip */}
              {showTooltip && !hasClicked && index === floppyOrder[0] && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#5a2b7f] text-white px-3 py-1 rounded transition-opacity duration-300 z-10">
                  Click me
                </div>
              )}
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
