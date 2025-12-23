import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Instagram, Facebook, Linkedin, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import { Container, Button } from './DesignSystem';

interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { 
    label: 'Služby', 
    path: '/sluzby',
    children: [
      { label: 'Eventy & Priestory', path: '/eventy-a-priestory' },
      { label: 'IT Servis & PC', path: '/it-servis' },
      { label: 'Marketing & Reklama', path: '/marketing-a-reklama' },
    ]
  },
  { label: 'Realizácie', path: '/realizacie' },
  { label: 'O nás', path: '/o-nas' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileSubmenuOpen(false);
  }, [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-vital-soft/80 backdrop-blur-xl border-b border-white/50 py-4' : 'bg-transparent py-6'}`}>
      <Container>
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <img 
              src="/logo_vitaltech.svg" 
              alt="vitaltech" 
              className="h-10 w-auto logo-pulse group-hover:scale-110 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-grow justify-center">
            <div className={`flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 ${
              scrolled 
                ? 'bg-white/50 border border-white/50 backdrop-blur-md' 
                : 'bg-transparent border border-transparent'
            }`}>
              {NAV_ITEMS.map((item) => (
                item.children ? (
                  <div key={item.path} className="relative group">
                    <button 
                      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                        location.pathname.startsWith('/eventy') || location.pathname.startsWith('/it-servis') || location.pathname.startsWith('/marketing') || location.pathname === '/sluzby'
                        ? 'bg-vital-dark text-white shadow-md' 
                        : scrolled 
                          ? 'text-slate-600 hover:text-vital-dark hover:bg-white/80'
                          : 'text-slate-700 hover:text-vital-dark hover:bg-white/30'
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 min-w-[220px] overflow-hidden">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-5 py-3 text-sm font-medium transition-colors ${
                              location.pathname === child.path
                              ? 'bg-vital-soft text-vital-dark'
                              : 'text-slate-600 hover:bg-vital-soft hover:text-vital-dark'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                        <div className="border-t border-slate-100 mt-2 pt-2">
                          <Link
                            to={item.path}
                            className="block px-5 py-3 text-sm font-bold text-vital-green hover:bg-vital-soft transition-colors"
                          >
                            Všetky služby →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                      location.pathname === item.path 
                      ? 'bg-vital-dark text-white shadow-md' 
                      : scrolled
                        ? 'text-slate-600 hover:text-vital-dark hover:bg-white/80'
                        : 'text-slate-700 hover:text-vital-dark hover:bg-white/30'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="hidden lg:block flex-shrink-0">
             <Button to="/kontakt" variant="primary" icon className="!py-2.5 !px-8 !text-sm shadow-xl shadow-vital-dark/10 hover:shadow-vital-yellow/20 transition-all duration-500">
               Konzultácia
             </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-3 bg-white rounded-full shadow-sm text-slate-800 hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-vital-soft flex flex-col p-6 animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-heading font-bold text-vital-dark">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-white rounded-full shadow-sm">
               <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              item.children ? (
                <div key={item.path}>
                  <button 
                    onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                    className="w-full text-left text-2xl font-heading font-bold text-slate-800 py-4 border-b border-slate-200/50 hover:text-vital-green transition-colors flex items-center justify-between"
                  >
                    {item.label}
                    <ChevronDown size={24} className={`transition-transform duration-300 ${mobileSubmenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSubmenuOpen && (
                    <div className="pl-4 py-2 space-y-1 bg-white/50 rounded-xl mb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block text-lg font-medium text-slate-600 py-3 px-4 hover:text-vital-green transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                      <Link
                        to={item.path}
                        className="block text-lg font-bold text-vital-green py-3 px-4"
                      >
                        Všetky služby →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className="text-2xl font-heading font-bold text-slate-800 py-4 border-b border-slate-200/50 hover:text-vital-green transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
          <div className="mt-auto">
             <Button to="/kontakt" variant="primary" className="w-full justify-center">
               Nezáväzná konzultácia
             </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-vital-dark text-slate-300 py-16 md:py-24 rounded-t-3xl md:rounded-t-[4rem] mt-12 relative overflow-hidden">
      {/* Clean Gradient Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent"></div>
      {/* Subtle teal glow - top left */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_0%,rgba(0,109,101,0.2),transparent)] pointer-events-none"></div>
      {/* Subtle accent - bottom right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_100%_100%,rgba(13,59,62,0.3),transparent)] pointer-events-none"></div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="/white.svg" 
                alt="vitaltech" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-slate-400 leading-relaxed text-lg max-w-sm">
              Váš partner pre eventy, IT riešenia a marketing. Prinášame kvalitu a spoľahlivosť pre vaše podnikanie.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-vital-yellow hover:text-vital-dark transition-all duration-300"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-vital-yellow hover:text-vital-dark transition-all duration-300"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-vital-yellow hover:text-vital-dark transition-all duration-300"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-6">
            <h3 className="text-white font-bold text-lg mb-6 md:mb-8 font-heading">Služby</h3>
            <ul className="space-y-4">
              <li><Link to="/eventy-a-priestory" className="hover:text-vital-yellow transition-colors">Eventy & Priestory</Link></li>
              <li><Link to="/it-servis" className="hover:text-vital-yellow transition-colors">IT Servis & PC</Link></li>
              <li><Link to="/marketing-a-reklama" className="hover:text-vital-yellow transition-colors">Marketing & Reklama</Link></li>
              <li><Link to="/realizacie" className="hover:text-vital-yellow transition-colors">Naše realizácie</Link></li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-6 md:mb-8 font-heading">Spoločnosť</h3>
            <ul className="space-y-4">
              <li><Link to="/o-nas" className="hover:text-vital-yellow transition-colors">O nás</Link></li>
              <li><Link to="/kontakt" className="hover:text-vital-yellow transition-colors">Kontakt</Link></li>
              <li><Link to="/ochrana-osobnych-udajov" className="hover:text-vital-yellow transition-colors">Ochrana údajov</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-white font-bold text-lg mb-6 md:mb-8 font-heading">Kontakt</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-vital-yellow/10 flex items-center justify-center text-vital-yellow mt-1">
                  <MapPin size={16} />
                </div>
                <span>Vitaltech s.r.o.<br />Landererova 8<br />811 09 Bratislava<br />Slovensko</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-vital-yellow/10 flex items-center justify-center text-vital-yellow">
                  <Mail size={16} />
                </div>
                <a href="mailto:info@vitaltech.sk" className="hover:text-white transition-colors">info@vitaltech.sk</a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-vital-yellow/10 flex items-center justify-center text-vital-yellow">
                  <Phone size={16} />
                </div>
                <a href="tel:+421908051379" className="hover:text-white transition-colors">+421 908 051 379</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Vitaltech s.r.o.</p>
          <p className="mt-2 md:mt-0">Vytvorené s dôrazom na detail.</p>
        </div>
      </Container>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-vital-soft font-sans text-slate-900 selection:bg-vital-yellow selection:text-vital-dark">
      <Navbar />
      <main className="flex-grow pt-28">
        {children}
      </main>
      <Footer />
    </div>
  );
};