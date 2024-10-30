'use client';

import React, { useState, useEffect, useCallback, ReactNode } from 'react';

interface CarouselProps {
  children: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  onSlideChange?: (index: number) => void;
}

export const Carousel: React.FC<CarouselProps> = ({ 
  children, 
  autoPlay = true, 
  interval = 5000,
  onSlideChange 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  }, [children.length]);

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isAutoPlaying) {
      timer = setInterval(goToNextSlide, interval);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isAutoPlaying, interval, goToNextSlide]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when manually changing slides
  };

  // Resume auto-play after a brief pause when manually changing slides
  useEffect(() => {
    if (!isAutoPlaying && autoPlay) {
      const resumeTimer = setTimeout(() => {
        setIsAutoPlaying(true);
      }, interval);

      return () => clearTimeout(resumeTimer);
    }
  }, [isAutoPlaying, autoPlay, interval]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {React.cloneElement(child as React.ReactElement, { isActive: index === currentIndex })}
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {React.Children.map(children, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-[#5a2b7f]' : 'bg-[#BCBCBC]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};