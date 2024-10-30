'use client'

import { useState, useEffect } from 'react';

export const useHeroHeight = (heroRef: React.RefObject<HTMLElement>) => {
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    const updateHeroHeight = () => {
      if (heroRef.current) {
        const height = heroRef.current.offsetHeight;
        setHeroHeight(height);
      }
    };

    // Initial measurement
    updateHeroHeight();

    // Update on resize
    window.addEventListener('resize', updateHeroHeight);

    // Cleanup
    return () => window.removeEventListener('resize', updateHeroHeight);
  }, [heroRef]);

  return heroHeight;
};