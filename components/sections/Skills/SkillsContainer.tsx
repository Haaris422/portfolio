import React, { useState } from 'react';
import { AnimatedSkills } from './SkillCanvas';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/Button';





interface HeadingProps {
  text: string;
  size: string;
  className?: string;
}


export function SkillsContainer() {
  const [category, setCategory] = useState('all');

  const tabs = [
    'all',
    'frontend', 
    'backend',
    'other',
  ];

  return (
    <div className="min-h-screen p-2 pb-8 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <Heading text="Skills" size="4xl" className="mb-4 md:mb-8" />
          
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-6 md:mb-8">
            {tabs.map((tab) => (
              <Button 
                key={tab} 
                onClick={() => setCategory(tab)} 
                className={`${
                  category === tab ? 'bg-white/20 backdrop-blur-md border-white/40' : 'bg-transparent'
                } min-w-[100px] cursor-pointer md:min-w-[120px]`}
              >
                          <Heading text={`${tab.charAt(0).toUpperCase() + tab.slice(1)} Skills`} size="xl" />

                {/* <span className="font-medium">
                  {`${tab.charAt(0).toUpperCase() + tab.slice(1)}`}
                  <span className="hidden md:inline"> Skills</span>
                </span> */}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <AnimatedSkills category={category} />
        </div>

       
      </div>
    </div>
  );
}