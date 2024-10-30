import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="space-x-6">
            <Link href="/" className="text-[#5A2B7F] hover:text-[#5A2B7F] font-medium">Home</Link>
            <Link href="/about" className="text-[#5A2B7F] hover:text-[#5A2B7F] font-medium">About</Link>
            <Link href="/work" className="text-[#5A2B7F] hover:text-[#5A2B7F] font-medium">Work</Link>
          </div>
          <Link href="/contact" className="border border-[#5A2B7F] text-[#5A2B7F] hover:bg-[#ee589f] hover:text-white hover:border-[#ee589f] px-4 py-1.5 rounded-full transition-colors duration-300 font-medium">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;