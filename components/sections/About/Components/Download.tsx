"use client";
import React, { useState } from 'react';
import { LuDownload } from 'react-icons/lu';
import { Button } from '@/components/shared/Button';

export function Download() {
  const [isHovered, setIsHovered] = useState(false);

  const downloadResume = () => {
  const link = document.createElement('a');
  link.href = '/assets/Haaris Resume.pdf'; 
  link.download = 'Haaris_Amin_Resume.pdf';
  link.click();
};


  return (
    <Button
      onClick={downloadResume}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-10 hover:opacity-75 cursor-pointer right-10 z-50 bg-black text-white border-2 border-white/20 hover:border-white/40 overflow-hidden whitespace-nowrap h-[55px] px-4"
      style={{
        width: isHovered ? '250px' : '55px',
        transition: 'width 300ms ease-in-out, border-color 300ms ease-in-out',
      }}
    >
      <div className="flex items-center justify-center w-full h-full relative">
        <LuDownload 
          className={`w-5 h-5 absolute transition-all duration-300 ease-in-out ${
            isHovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          }`} 
        />
        <span
          className={`transition-all duration-300 ease-in-out ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          Download My Resume
        </span>
      </div>
    </Button>
  );
}