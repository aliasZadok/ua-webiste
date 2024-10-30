'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Book {
  id: number;
  title: string;
  color: string;
  content: string;
}

const OurApproach: React.FC = () => {
  const [activeBook, setActiveBook] = useState<number | null>(null);
  const booksRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const booksData: Book[] = [
    { id: 1, title: 'Client-Centric Approach', color: 'bg-[#fcee4c]', content: 'We take the time to understand your unique needs and your target audiences. Our goal is to provide guidance that aligns creative solutions with your business objectives.' },
    { id: 2, title: 'Purposeful Design', color: 'bg-[#fffdf4] border-2 border-black', content: 'We create designs that balance visual appeal with functionality. Each element is carefully considered to ensure it contributes to your goals while resonating with your audience.' },
    { id: 3, title: 'Authentic Storytelling', color: 'bg-[#ee589f]', content: 'We dig deep to uncover the genuine story behind your brand. Our narratives aim to capture the higher purpose of your brand, fostering meaningful connections with your audiences.' },
    { id: 4, title: 'Strategic Planning', color: 'bg-[#fcee4c]', content: 'Our strategies are designed to be flexible, allowing us to adapt to your evolving needs. We work closely with you to ensure our plans remain aligned with your vision and goals.' },
  ];

  const leanAngle = -20;

  useEffect(() => {
    booksRef.current.forEach((book, index) => {
      if (book) {
        gsap.to(book, {
          rotation: index === booksData.length - 1 && activeBook !== index + 1 ? leanAngle : 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      }
    });

    contentRefs.current.forEach((content, index) => {
      if (content) {
        gsap.to(content, {
          width: activeBook === index + 1 ? '300px' : '0px',
          opacity: activeBook === index + 1 ? 1 : 0,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      }
    });
  }, [activeBook, booksData.length, leanAngle]);

  const handleBookClick = (id: number) => {
    setActiveBook(activeBook === id ? null : id);
  };

  return (
    <div className="bg-[#fffdf4] p-8 md:p-16">
      <h2 className="text-4xl font-medium mb-8">Our Approach</h2>
      <div className="flex items-end relative">
        {booksData.map((book, index) => (
          <div 
            key={book.id} 
            className="flex items-stretch" 
            style={{ 
              marginLeft: index === 0 ? '0' : (index === booksData.length - 1 && activeBook !== book.id) ? '8.3rem' : '1rem',
              transition: 'margin-left 0.5s ease-in-out'
            }}
          >
            <div
              ref={(el) => { booksRef.current[index] = el; }}
              className={`${book.color} cursor-pointer transition-all duration-300 ease-in-out`}
              onClick={() => handleBookClick(book.id)}
              style={{
                transformOrigin: 'bottom left',
              }}
            >
              <div className="h-96 w-24 flex items-center justify-center p-4">
                <span className="transform -rotate-90 whitespace-nowrap text-2xl font-medium">
                  {book.title}
                </span>
              </div>
            </div>
            <div
              ref={(el) => { contentRefs.current[index] = el; }}
              className="bg-[#fffdf4] h-96 overflow-hidden transition-all duration-300 ease-in-out"
              style={{ width: 0 }}
            >
              <div className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-4">{book.title}</h3>
                <p>{book.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurApproach;
