import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';
import { Container } from '../components/ui/DesignSystem';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-112px)] flex items-center relative overflow-hidden bg-vital-soft">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,109,101,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(252,176,22,0.08),transparent)]" />
        
        {/* Floating 404 background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span 
            className="text-[30vw] font-bold text-slate-200/50 leading-none"
            style={{ fontFamily: 'system-ui' }}
          >
            404
          </span>
        </div>
        
        {/* Decorative dots pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] bg-[length:32px_32px]" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Icon */}
          <div 
            className="mb-8 inline-flex items-center justify-center"
            style={{ animation: 'float 4s ease-in-out infinite' }}
          >
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-vital-yellow/20 rounded-full blur-2xl scale-150" />
              
              {/* Icon container */}
              <div className="relative w-32 h-32 bg-white rounded-full shadow-2xl shadow-slate-200/50 flex items-center justify-center border-4 border-vital-yellow/20">
                <Search className="w-14 h-14 text-vital-dark" strokeWidth={1.5} />
                {/* X mark overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-1 bg-vital-yellow/80 rounded-full rotate-45 translate-y-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Error Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-600 mb-6">
            <span className="w-2 h-2 rounded-full bg-vital-yellow animate-pulse" />
            Chyba 404
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-vital-dark mb-6 leading-tight">
            Stránka sa<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vital-green to-teal-500">
              nenašla
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto">
            Ľutujeme, ale stránka, ktorú hľadáte, neexistuje alebo bola presunutá.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-vital-dark text-white rounded-full font-bold hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-vital-dark/20"
            >
              <Home className="w-5 h-5" />
              Späť na úvod
            </Link>
            <Link 
              to="/kontakt"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-vital-dark rounded-full font-bold border-2 border-slate-200 hover:border-vital-dark hover:bg-vital-dark hover:text-white transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Kontaktujte nás
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-100/50 border border-slate-100">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
              Mohlo by vás zaujímať
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Naše služby', path: '/sluzby', emoji: '🎯' },
                { label: 'O nás', path: '/o-nas', emoji: '👥' },
                { label: 'Realizácie', path: '/realizacie', emoji: '✨' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group flex items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-vital-soft transition-all duration-300"
                >
                  <span className="text-2xl">{link.emoji}</span>
                  <span className="font-medium text-slate-700 group-hover:text-vital-dark transition-colors">
                    {link.label}
                  </span>
                  <ArrowLeft className="w-4 h-4 text-slate-400 ml-auto rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Float animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;

