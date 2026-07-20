import React from "react";

export function StackedHero() {
  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "#141618", fontFamily: "'Outfit', sans-serif" }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      
      {/* Navbar */}
      <nav className="w-full p-6 md:px-12 flex justify-between items-center z-10 shrink-0">
        <div className="text-xl tracking-[0.3em] font-light text-white">MS</div>
        <div className="flex gap-6 md:gap-10 text-[10px] md:text-xs tracking-[0.2em] text-[#888]">
          <a href="#" className="hover:text-white transition-colors">ABOUT</a>
          <a href="#" className="hover:text-white transition-colors">WORK</a>
          <a href="#" className="hover:text-white transition-colors">CONTACT</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center w-full pt-8">
        {/* Name block */}
        <div 
          className="text-center w-full px-4 mb-6 flex flex-col items-center justify-center shrink-0 z-10"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          <h1 className="text-[14vw] sm:text-[12vw] md:text-[9rem] lg:text-[11rem] font-light leading-[0.85] tracking-tight text-[#f0f0f0]">
            <span className="block">Matt</span>
            <span className="block italic text-[#d0d0d0] -ml-4 md:-ml-8">Shellenbarger</span>
          </h1>
        </div>

        {/* Photo Strip */}
        <div className="w-full relative shrink-0 my-4" style={{ height: "35vh" }}>
          {/* Overlays to blend the harsh cream background */}
          <div className="absolute inset-x-0 top-0 h-16 z-10 bg-gradient-to-b from-[#141618] to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-16 z-10 bg-gradient-to-t from-[#141618] to-transparent"></div>
          
          <img 
            src="/__mockup/images/matt.jpg" 
            alt="Matt Shellenbarger" 
            className="w-full h-full object-cover object-top opacity-80"
            style={{ 
              filter: "grayscale(100%) contrast(1.1) brightness(0.9)",
              mixBlendMode: "lighten"
            }}
          />
        </div>

        {/* Footer/Details */}
        <div className="w-full flex flex-col items-center justify-center mt-12 pb-16 shrink-0 z-10 px-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs md:text-sm tracking-[0.25em] uppercase font-light text-[#b0b0b0]">
            <span>Infrastructure & Systems</span>
            <span className="hidden md:block w-12 h-[1px] bg-[#444]"></span>
            <span className="md:hidden w-8 h-[1px] bg-[#444]"></span>
            <span>Cybersecurity</span>
          </div>
          
          <div className="mt-8 text-[#555] tracking-widest text-[10px] md:text-xs uppercase font-light border border-[#333] px-6 py-2 rounded-full">
            IT Professional · 10+ Years
          </div>
        </div>
      </main>
    </div>
  );
}
