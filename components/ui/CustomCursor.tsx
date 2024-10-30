import React from 'react';

interface CustomCursorProps {
  x: number;
  y: number;
  isVisible: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ x, y, isVisible }) => {
  return (
    <div 
      className={`fixed pointer-events-none z-50 transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: `${x - 31}px`,
        top: `${y - 31}px`,
      }}
    >
      <div className="w-[72px] h-[72px] bg-[#ee589f] rounded-full flex items-center justify-center">
        <span className="text-white text-sm whitespace-nowrap">Click Me</span>
      </div>
    </div>
  );
};

export default CustomCursor;