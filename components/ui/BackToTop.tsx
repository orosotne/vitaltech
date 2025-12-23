import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 400px
      setIsVisible(window.scrollY > 400);
      
      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[9990] group transition-all duration-500 ${
        isVisible 
          ? 'translate-y-0 opacity-100 pointer-events-auto' 
          : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
      aria-label="Späť na vrch stránky"
    >
      {/* Outer ring with progress indicator */}
      <div className="relative w-14 h-14">
        {/* Progress ring SVG */}
        <svg 
          className="absolute inset-0 w-14 h-14 -rotate-90 transform"
          viewBox="0 0 56 56"
        >
          {/* Background circle */}
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-200"
          />
          {/* Progress circle */}
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-vital-green transition-all duration-300"
            style={{
              strokeDasharray: `${2 * Math.PI * 26}`,
              strokeDashoffset: `${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`,
            }}
          />
        </svg>
        
        {/* Button content */}
        <div className="absolute inset-1 bg-white rounded-full shadow-xl shadow-slate-900/10 flex items-center justify-center group-hover:bg-vital-dark group-hover:shadow-vital-dark/30 transition-all duration-300">
          <ArrowUp 
            className="w-5 h-5 text-vital-dark group-hover:text-white transition-colors duration-300 group-hover:-translate-y-0.5 transform" 
          />
        </div>
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-vital-dark text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Späť hore
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-vital-dark"></span>
      </span>
    </button>
  );
};

export default BackToTop;

