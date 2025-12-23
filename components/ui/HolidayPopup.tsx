import React, { useState, useEffect } from 'react';
import { X, Sparkles, Gift, PartyPopper } from 'lucide-react';

const STORAGE_KEY = 'vitaltech_holiday_popup_dismissed_2024';

const HolidayPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Determine if it's New Year (Jan 1, 2026 or later)
  const isNewYear = (): boolean => {
    const now = new Date();
    return now >= new Date('2026-01-01T00:00:00');
  };

  useEffect(() => {
    // Check if user has already dismissed the popup
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      // Small delay for better UX - let page load first
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem(STORAGE_KEY, 'true');
    }, 300);
  };

  if (!isVisible) return null;

  const newYear = isNewYear();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-vital-dark/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Popup Container */}
      <div 
        className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none transition-all duration-300 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div 
          className="relative max-w-lg w-full pointer-events-auto overflow-hidden"
          style={{
            animation: 'popupEnter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
          }}
        >
          {/* Main Card */}
          <div className="relative bg-vital-dark rounded-4xl p-10 md:p-12 shadow-2xl border border-white/10 overflow-hidden">
            
            {/* Clean Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a3d3f] via-vital-dark to-vital-dark" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(0,109,101,0.12),transparent)]" />

            {/* Floating Particles */}
            {newYear ? (
              // New Year Sparkles
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-vital-yellow rounded-full"
                    style={{
                      left: `${10 + (i * 7)}%`,
                      top: `${20 + (i % 3) * 25}%`,
                      animation: `sparkle ${2 + (i % 3)}s ease-in-out ${i * 0.2}s infinite`,
                      boxShadow: '0 0 6px 2px rgba(252,176,22,0.4)'
                    }}
                  />
                ))}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`teal-${i}`}
                    className="absolute w-1.5 h-1.5 bg-vital-green rounded-full"
                    style={{
                      left: `${15 + (i * 10)}%`,
                      top: `${30 + (i % 4) * 15}%`,
                      animation: `sparkle ${2.5 + (i % 2)}s ease-in-out ${i * 0.3}s infinite`,
                      boxShadow: '0 0 8px 2px rgba(0,109,101,0.5)'
                    }}
                  />
                ))}
              </div>
            ) : (
              // Christmas Snowflakes
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-white/20"
                    style={{
                      left: `${5 + (i * 6)}%`,
                      fontSize: `${8 + (i % 4) * 4}px`,
                      animation: `snowfall ${4 + (i % 3) * 2}s linear ${i * 0.5}s infinite`
                    }}
                  >
                    ❄
                  </div>
                ))}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 z-10"
              aria-label="Zavrieť"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Icon */}
              <div 
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-vital-green/20 border border-vital-green/30 grid place-items-center" 
                style={{ animation: 'float 4s ease-in-out infinite' }}
              >
                {newYear ? (
                  <PartyPopper size={40} className="text-vital-yellow" />
                ) : (
                  <Gift size={40} className="text-vital-yellow" />
                )}
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-bold text-white/80 mb-6">
                <Sparkles size={14} className="text-vital-yellow" />
                {newYear ? 'Nový rok 2026' : 'Vianoce 2024'}
              </div>

              {/* Main Heading */}
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {newYear ? (
                  <>
                    <span className="text-white">Šťastný</span>{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-vital-yellow via-amber-300 to-vital-yellow">
                      Nový Rok 2026!
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-white">Krásne</span>{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-vital-yellow via-amber-300 to-vital-yellow">
                      Vianoce!
                    </span>
                  </>
                )}
              </h2>

              {/* Message */}
              <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-md mx-auto font-medium">
                {newYear ? (
                  <>
                    Prajeme vám úspešný rok plný nových príležitostí, 
                    <span className="text-vital-green"> inšpirácie</span> a 
                    <span className="text-vital-yellow"> splnených cieľov</span>.
                  </>
                ) : (
                  <>
                    Prajeme vám pokojné prežitie sviatkov, 
                    <span className="text-vital-green"> radosť</span> v kruhu najbližších a 
                    <span className="text-vital-yellow"> pohodu</span> do nového roka.
                  </>
                )}
              </p>

              {/* Signature */}
              <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-vital-green/20 flex items-center justify-center">
                  <img src="/logo_icon.svg" alt="" className="w-5 h-5 opacity-80" />
                </div>
                <span className="font-heading font-bold text-white/60 text-sm tracking-wide">
                  Váš tím vitaltech
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes popupEnter {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(400px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </>
  );
};

export default HolidayPopup;

