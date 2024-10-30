'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const pathname = usePathname();
  const isHeroPage = pathname === '/' || pathname === '/about';
  const isHomePage = pathname === '/';

  useEffect(() => {
    // Listen for hero height updates
    const handleHeroHeight = (event: CustomEvent<number>) => {
      setHeroHeight(event.detail);
    };

    window.addEventListener('heroHeightChange', handleHeroHeight as EventListener);

    return () => {
      window.removeEventListener('heroHeightChange', handleHeroHeight as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = Math.max(heroHeight - 70, 0);

      setIsScrolled(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroHeight]);

  // Show logo if we're not on homepage OR if we've scrolled past hero section
  const showLogo = !isHomePage || isScrolled;
  // Show background if we're not on a hero page OR if we've scrolled past hero section
  const showBackground = !isHeroPage || isScrolled;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
         style={{ 
           backgroundColor: showBackground ? '#fffdf4' : 'transparent'
         }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-[70px]">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className={`transition-opacity duration-300 w-[40px] h-[40px] mr-4 ${
              showLogo ? 'opacity-100' : 'opacity-0'
            }`}>
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="Studio Unabridged Logo"
                  width={40}
                  height={40}
                  priority
                />
              </Link>
            </div>
            {/* Navigation Links */}
            <Link href="/" className="text-[#5A2B7F] hover:text-[#5A2B7F] font-medium">
              Home
            </Link>
            <Link href="/about" className="text-[#5A2B7F] hover:text-[#5A2B7F] font-medium">
              About
            </Link>
            <Link href="/work" className="text-[#5A2B7F] hover:text-[#5A2B7F] font-medium">
              Work
            </Link>
          </div>
          <Link 
            href="/contact" 
            className="border border-[#5A2B7F] text-[#5A2B7F] hover:bg-[#ee589f] hover:text-white hover:border-[#ee589f] px-4 py-1.5 rounded-full transition-colors duration-300 font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;