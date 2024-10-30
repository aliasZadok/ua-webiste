'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const yPosition = index === 1 ? '50%' : '80%';
        gsap.set(card, { y: yPosition });

        const revealCard = () => {
          gsap.to(card, {
            y: index === 1 ? '0%' : '0%', // Changed to 0% for all cards
            duration: 0.5,
            ease: 'power2.out'
          });
        };

        const hideCard = () => {
          gsap.to(card, {
            y: yPosition,
            duration: 0.5,
            ease: 'power2.in'
          });
        };

        card.addEventListener('mouseenter', revealCard);
        card.addEventListener('mouseleave', hideCard);

        return () => {
          card.removeEventListener('mouseenter', revealCard);
          card.removeEventListener('mouseleave', hideCard);
        };
      }
    });
  }, []);

  return (
    <footer className="relative h-[500px] overflow-hidden bg-[#fffdf4]">
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl mx-auto">
        <div className="relative h-[400px]">
          {/* Connect With Us Card */}
          <div
            ref={(el) => { if (el) cardsRef.current[0] = el; }}
            className="absolute left-0 bottom-0 w-[691px] h-[348px] bg-[#ee589f] text-[#FFFDF4] p-14 z-10"
            style={{ transform: 'rotate(-8deg)', transformOrigin: 'bottom left' }}
          >
            <h2 className="text-[40.495px] font-medium leading-[110%] mb-5 text-center">CONNECT WITH US</h2>
            <div className="flex justify-center gap-5 mt-[57.586px]">
              <FontAwesomeIcon icon={faWhatsapp} style={{ width: '61.867px', height: '61.867px' }} />
              <FontAwesomeIcon icon={faInstagram} style={{ width: '61.867px', height: '61.867px' }} />
              <Phone size={61.867} />
            </div>
          </div>

          {/* About Us Card */}
          <div
            ref={(el) => { if (el) cardsRef.current[1] = el; }}
            className="absolute left-1/2 bottom-0 w-[691px] h-[348px] bg-[#5a2b7f] text-[#FFFDF4] p-14 transform -translate-x-1/2 z-20"
          >
            <h2 className="text-[40.495px] font-medium leading-[110%] mb-5 text-center">ABOUT US</h2>
            <p className="text-[26.996px] font-medium leading-[140%] text-center">
              We are a strategic branding agency in Hyderabad, who help small businesses look & feel unmistakably premium
            </p>
          </div>

          {/* Our Work Card */}
          <div
            ref={(el) => { if (el) cardsRef.current[2] = el; }}
            className="absolute right-0 bottom-0 w-[691px] h-[309.108px] bg-[#102442] text-[#FFFDF4] p-14 z-30"
            style={{ transform: 'rotate(5deg)', transformOrigin: 'bottom right' }}
          >
            <h2 className="text-[40.495px] font-medium leading-[110%] mb-5 text-center">OUR WORK</h2>
            <div className="w-full h-[200px] bg-white bg-opacity-10 mt-5"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;