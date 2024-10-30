import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const WorkSectionAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectanglesRef = useRef<Array<HTMLDivElement | null>>([]);
  const workTextRef = useRef<HTMLDivElement>(null);
  const yellowRectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const rectangles = rectanglesRef.current;
    const workText = workTextRef.current;
    const yellowRect = yellowRectRef.current;

    if (!container || !workText || rectangles.some(rect => rect === null) || !yellowRect) {
      return;
    }

    // Initial setup
    gsap.set(workText, { 
      color: '#F0F0F0',
      opacity: 1,
      fontWeight: 500,
      fontSize: '29vw', // Responsive font size
      position: 'absolute', 
      zIndex: 1,
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: -50,
      pointerEvents: 'none',
      width: '100%',
      textAlign: 'center'
    });

    gsap.set(rectangles, { 
      width: '65.076px', 
      height: '323.992px',
      position: 'absolute',
      zIndex: 2
    });

    gsap.set(yellowRect, {
      width: '787.199px', 
      height: '508.855px',
      position: 'absolute',
      opacity: 0,
      backgroundColor: '#fcee4c',
      left: '50%',
      top: '50%',
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      zIndex: 3
    });

    const gap = 15;
    const initialWidth = 3 * 65.076 + 2 * gap;
    const totalHeight = 2 * 323.992 + gap;
    const startX = (container.offsetWidth - initialWidth) / 2;
    const startY = (container.offsetHeight - totalHeight) / 2;

    rectangles.forEach((rect, index) => {
      if (rect) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const x = startX + col * (65.076 + gap);
        const y = startY + row * (323.992 + gap);
        gsap.set(rect, { 
          x, 
          y, 
          backgroundColor: index === 1 ? '#ee589f' : '#5a2b7f'
        });
      }
    });

    // Hover animation
    const timeline = gsap.timeline({ paused: true });

    const finalLeftX = (container.offsetWidth - 1043.83) / 2;
    const finalRightX = finalLeftX + 1043.83 - 65.076;
    const yellowRectTopY = container.offsetHeight / 2 - 508.855 / 2;

    timeline
      .to(rectangles[1], { y: yellowRectTopY - 142 - 323.992, duration: 0.5 })
      .to(rectangles[4], { y: yellowRectTopY + 508.855 + 142, duration: 0.5 }, 0)
      .to(rectangles[0], { 
        x: finalLeftX, 
        rotation: 165, 
        transformOrigin: 'center', 
        duration: 0.5 
      }, 0)
      .to(rectangles[2], { 
        x: finalRightX, 
        rotation: -165, 
        transformOrigin: 'center', 
        duration: 0.5 
      }, 0)
      .to(rectangles[3], { 
        x: finalLeftX, 
        rotation: 165, 
        transformOrigin: 'center', 
        duration: 0.5 
      }, 0)
      .to(rectangles[5], { 
        x: finalRightX, 
        rotation: -165, 
        transformOrigin: 'center', 
        duration: 0.5 
      }, 0)
      .to(yellowRect, { opacity: 1, scale: 1, duration: 0.5 }, 0);

    const handleMouseEnter = () => timeline.play();
    const handleMouseLeave = () => timeline.reverse();

    const targetRect = rectangles[1];
    if (targetRect) {
      targetRect.addEventListener('mouseenter', handleMouseEnter);
      targetRect.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (targetRect) {
        targetRect.removeEventListener('mouseenter', handleMouseEnter);
        targetRect.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <div ref={workTextRef} className="absolute w-full h-full flex items-center justify-center select-none">
        WORK
      </div>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          ref={(el) => { rectanglesRef.current[index] = el; }}
          className="cursor-pointer"
        />
      ))}
      <div ref={yellowRectRef} />
    </div>
  );
};

export default WorkSectionAnimation;