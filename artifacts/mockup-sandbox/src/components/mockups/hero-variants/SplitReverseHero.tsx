import React from "react";

export function SplitReverseHero() {
  return (
    <div 
      className="relative min-h-screen w-full flex flex-col md:flex-row bg-[#141618] text-[#f4f4f5] overflow-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Font loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link 
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Outfit:wght@100..900&display=swap" 
        rel="stylesheet" 
      />

      {/* LEFT HALF - Photo */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative">
        <div className="absolute top-0 left-0 p-6 md:p-10 z-10 text-gray-900 pointer-events-auto">
          <div className="text-xl font-medium tracking-wider">MS</div>
        </div>
        <img 
          src="/__mockup/images/matt.jpg" 
          alt="Matt Shellenbagrer" 
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* RIGHT HALF - Text */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24 relative">
        <div className="absolute top-0 right-0 p-6 md:p-10 z-10 text-gray-400 pointer-events-auto">
          <div className="flex gap-6 md:gap-8 text-xs font-medium tracking-widest uppercase">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Work</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="max-w-xl w-full">
          <h1 
            className="text-[4.5rem] sm:text-[5rem] lg:text-[6.5rem] leading-[0.95] font-normal tracking-tight mb-16 text-white"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Matt<br />
            Shellenbagrer
          </h1>
          
          <div className="flex flex-col gap-6 w-full">
            <div className="border-t border-white/20 pt-4 flex justify-between items-start">
              <span className="text-xs md:text-sm tracking-widest uppercase text-white/50">01</span>
              <span className="text-lg md:text-xl lg:text-2xl font-light tracking-wide text-right">Infrastructure &<br/>Systems</span>
            </div>
            
            <div className="border-t border-white/20 pt-4 flex justify-between items-start">
              <span className="text-xs md:text-sm tracking-widest uppercase text-white/50">02</span>
              <span className="text-lg md:text-xl lg:text-2xl font-light tracking-wide text-right">Cybersecurity</span>
            </div>
            
            <div className="border-t border-white/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
