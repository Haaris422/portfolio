import React from 'react';
import HeroBackgroundAnimation from './Components/HeroBackgroundAnimation';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <HeroBackgroundAnimation />
      
      <div className="relative animate-fade-in z-10 text-center px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent animate-fade-in">
          Mohd. Haaris Amin
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-delay">
          Front-End Developer
        </p>
        
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-2">
          Crafting beautiful, responsive, and user-friendly web experiences with modern technologies and creative design solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
          <a
            href="#experience"
            className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Explore My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white rounded-lg font-semibent transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}