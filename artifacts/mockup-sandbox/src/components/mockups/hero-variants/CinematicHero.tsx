import React from 'react';

export function CinematicHero() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-[#141618] text-white overflow-hidden flex flex-col">
      {/* Non-blocking fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/__mockup/images/matt.jpg" 
          alt="Matt Shellenbagrer" 
          className="w-full h-full object-cover object-top sm:object-center" 
        />
        {/* Dark gradient overlay to make name legible */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            background: 'linear-gradient(to top, #141618 0%, rgba(20,22,24,0.9) 25%, rgba(20,22,24,0.5) 60%, transparent 100%)' 
          }} 
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col flex-grow w-full px-6 md:px-12 lg:px-20 py-8 md:py-12">
        
        {/* Navbar */}
        <nav 
          className="flex justify-between items-center w-full" 
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <div className="text-xl md:text-2xl font-medium tracking-widest text-white/90">
            MS
          </div>
          <div className="flex gap-6 md:gap-10 text-[10px] md:text-xs font-medium tracking-[0.2em] text-white/60 uppercase">
            <a href="#" className="hover:text-white transition-colors duration-300">About</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Work</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
          </div>
        </nav>

        {/* Bottom Content */}
        <div className="mt-auto mb-4 md:mb-12 flex flex-col items-start w-full">
          {/* Name */}
          <h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] leading-[0.85] tracking-tight font-light text-[#f4f4f5] mix-blend-plus-lighter"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Matt<br />Shellenbagrer
          </h1>

          {/* Tags */}
          <div 
            className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4 sm:gap-16 text-xs md:text-sm font-light text-white/70 uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 md:w-12 h-[1px] bg-white/40"></div>
              <span>Infrastructure & Systems</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 md:w-12 h-[1px] bg-white/40"></div>
              <span>Cybersecurity</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
