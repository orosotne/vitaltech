import React, { useState, useEffect } from 'react';
import { Cookie, X, Shield, Settings, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'vitaltech_cookie_consent';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (accepted: boolean) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      const consentData = {
        accepted,
        preferences: accepted ? preferences : { necessary: true, analytics: false, marketing: false },
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    }, 300);
  };

  const handleAcceptAll = () => {
    setPreferences({ necessary: true, analytics: true, marketing: true });
    setTimeout(() => handleClose(true), 100);
  };

  const handleAcceptSelected = () => {
    handleClose(true);
  };

  const handleRejectAll = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    handleClose(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[9997] p-4 md:p-6 transition-all duration-500 ${
          isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{ animation: !isClosing ? 'slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' : undefined }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden">
            
            {/* Main Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                
                {/* Icon & Text */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-vital-yellow/20 items-center justify-center flex-shrink-0">
                      <Cookie className="w-7 h-7 text-vital-dark" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-vital-dark mb-2 flex items-center gap-2">
                        <Cookie className="w-5 h-5 sm:hidden text-vital-yellow" />
                        Cookies & Súkromie
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        Používame cookies na zlepšenie vášho zážitku, analýzu návštevnosti a personalizáciu obsahu. 
                        Kliknutím na "Prijať všetky" súhlasíte s ich používaním, alebo si môžete{' '}
                        <button 
                          onClick={() => setShowDetails(!showDetails)}
                          className="text-vital-green font-semibold hover:underline"
                        >
                          prispôsobiť nastavenia
                        </button>.
                      </p>
                      <Link 
                        to="/ochrana-osobnych-udajov" 
                        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-vital-green mt-2 transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        Zásady ochrany osobných údajov
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={handleRejectAll}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-300"
                  >
                    Odmietnuť
                  </button>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-bold text-vital-dark border-2 border-slate-200 hover:border-vital-dark transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Nastavenia
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-bold text-white bg-vital-dark hover:bg-slate-800 shadow-lg shadow-vital-dark/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Prijať všetky
                  </button>
                </div>
              </div>

              {/* Detailed Settings */}
              {showDetails && (
                <div className="mt-6 pt-6 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
                    Nastavenia cookies
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Necessary Cookies */}
                    <div className="bg-slate-50 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-vital-dark">Nevyhnutné</span>
                        <div className="w-12 h-7 rounded-full bg-vital-green flex items-center justify-end px-1 cursor-not-allowed">
                          <div className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center">
                            <Check className="w-3 h-3 text-vital-green" />
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">
                        Potrebné pre základné fungovanie stránky. Vždy aktívne.
                      </p>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="bg-slate-50 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-vital-dark">Analytické</span>
                        <button
                          onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                          className={`w-12 h-7 rounded-full transition-colors duration-300 flex items-center px-1 ${
                            preferences.analytics ? 'bg-vital-green justify-end' : 'bg-slate-300 justify-start'
                          }`}
                        >
                          <div className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center">
                            {preferences.analytics && <Check className="w-3 h-3 text-vital-green" />}
                          </div>
                        </button>
                      </div>
                      <p className="text-sm text-slate-500">
                        Pomáhajú nám pochopiť, ako používate našu stránku.
                      </p>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="bg-slate-50 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-vital-dark">Marketingové</span>
                        <button
                          onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                          className={`w-12 h-7 rounded-full transition-colors duration-300 flex items-center px-1 ${
                            preferences.marketing ? 'bg-vital-green justify-end' : 'bg-slate-300 justify-start'
                          }`}
                        >
                          <div className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center">
                            {preferences.marketing && <Check className="w-3 h-3 text-vital-green" />}
                          </div>
                        </button>
                      </div>
                      <p className="text-sm text-slate-500">
                        Používané na zobrazovanie relevantnej reklamy.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleAcceptSelected}
                      className="px-6 py-3 rounded-full text-sm font-bold text-white bg-vital-green hover:bg-teal-600 shadow-lg shadow-vital-green/20 transition-all duration-300"
                    >
                      Uložiť nastavenia
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animation */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default CookieConsent;

