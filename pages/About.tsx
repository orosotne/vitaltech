import React from 'react';
import { Container } from '../components/ui/DesignSystem';
import { Target, Heart, Award, ArrowRight, Sparkles, Users, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const About: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* HERO SECTION - Bold asymmetrical layout */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Dynamic gradient background */}
        <div className="absolute inset-0 bg-vital-dark">
          {/* Mesh gradient atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_120%,rgba(0,109,101,0.4),transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_20%,rgba(252,176,22,0.15),transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(13,59,62,0.3),transparent_70%)]"></div>
          
          {/* Geometric accent lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-vital-green/20 to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-vital-yellow/10 to-transparent"></div>
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Animated badge */}
              <div 
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                style={{ animation: 'fadeUp 0.6s ease-out forwards', opacity: 0 }}
              >
                <Sparkles className="w-4 h-4 text-vital-yellow" />
                <span className="text-sm font-bold text-white/80 uppercase tracking-wider">Poznajte náš tím</span>
              </div>

              {/* Main headline with gradient text */}
              <h1 
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-white"
                style={{ animation: 'fadeUp 0.6s ease-out 0.1s forwards', opacity: 0 }}
              >
                Traja odborníci.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-vital-yellow via-orange-400 to-vital-yellow">
                  Jedna vízia.
                </span>
              </h1>

              {/* Subtext */}
              <p 
                className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-xl font-light"
                style={{ animation: 'fadeUp 0.6s ease-out 0.2s forwards', opacity: 0 }}
              >
                Prepojili sme svety eventov, IT a marketingu do jedného silného partnerstva.
              </p>

              {/* Stats row */}
              <div 
                className="flex flex-wrap gap-6 sm:gap-12 pt-8 border-t border-white/10"
                style={{ animation: 'fadeUp 0.6s ease-out 0.3s forwards', opacity: 0 }}
              >
                {[
                  { value: 8, suffix: '+', label: 'Rokov skúseností' },
                  { value: 120, suffix: '+', label: 'Spokojných klientov' },
                  { value: 500, suffix: '+', label: 'Projektov' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
                    </div>
                    <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - floating cards composition */}
            <div className="lg:col-span-5 relative h-[400px] md:h-[500px] hidden md:block overflow-hidden">
              {/* Main image card */}
              <div 
                className="absolute top-0 right-0 w-64 md:w-80 h-80 md:h-96 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border border-white/10"
                style={{ animation: 'fadeUp 0.8s ease-out 0.4s forwards', opacity: 0 }}
              >
                <img 
                  src="/images/team/anka.png" 
                  alt="Tím Vitaltech"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vital-dark/80 via-transparent to-transparent"></div>
              </div>

              {/* Floating accent card 1 */}
              <div 
                className="absolute bottom-20 left-0 bg-vital-yellow rounded-2xl p-4 md:p-6 shadow-xl shadow-yellow-500/20"
                style={{ animation: 'fadeUp 0.8s ease-out 0.5s forwards', opacity: 0 }}
              >
                <div className="text-vital-dark">
                  <div className="text-2xl md:text-3xl font-bold mb-1">
                  <AnimatedCounter end={50} suffix="+" duration={2000} />
                </div>
                  <div className="text-xs md:text-sm font-medium opacity-70">projektov ročne</div>
                </div>
              </div>

              {/* Floating accent card 2 */}
              <div 
                className="absolute top-20 left-4 md:left-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/20"
                style={{ animation: 'fadeUp 0.8s ease-out 0.6s forwards', opacity: 0 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-vital-green animate-pulse"></div>
                  <span className="text-white font-medium text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* STORY SECTION - Editorial layout */}
      <section className="py-16 md:py-32 bg-white relative">
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] bg-[length:24px_24px]"></div>
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left - Large typography */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vital-soft border border-slate-200">
                <span className="text-xs font-bold text-vital-green uppercase tracking-wider">Náš príbeh</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-vital-dark leading-tight">
                Od myšlienky<br />
                <span className="text-vital-green">k realizácii.</span>
              </h2>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Spoločnosť <strong className="text-vital-dark">vitaltech</strong> vznikla spojením troch odborníkov 
                  z rôznych oblastí – eventového manažmentu, IT infraštruktúry a marketingu.
                </p>
                <p>
                  Pochopili sme, že moderné firmy nepotrebujú troch rôznych dodávateľov, 
                  ale <strong className="text-vital-dark">jedného partnera</strong>, ktorý rozumie širším súvislostiam.
                </p>
              </div>

              <Link 
                to="/kontakt" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-vital-dark text-white rounded-full font-bold hover:bg-slate-800 transition-all hover:gap-5 shadow-xl shadow-vital-dark/20"
              >
                Spojme sa
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right - Overlapping images */}
            <div className="relative h-[400px] md:h-[600px] overflow-hidden">
              {/* Main large image */}
              <div className="absolute top-0 right-0 w-full md:w-4/5 h-4/5 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/50 border-4 md:border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-br from-vital-green to-teal-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Users className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 opacity-80" />
                    <div className="text-xl md:text-2xl font-bold">Tím profesionálov</div>
                  </div>
                </div>
              </div>

              {/* Accent card */}
              <div className="absolute bottom-0 left-0 bg-vital-yellow rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl shadow-yellow-500/30 max-w-[280px] md:max-w-xs">
                <blockquote className="text-vital-dark">
                  <p className="text-base md:text-lg font-medium leading-relaxed mb-3 md:mb-4">
                    "Technológie a kreativita majú ísť ruka v ruke."
                  </p>
                  <footer className="text-sm font-bold opacity-70">— Tím Vitaltech</footer>
                </blockquote>
              </div>

              {/* Decorative element */}
              <div className="absolute top-1/2 left-1/4 w-24 md:w-32 h-24 md:h-32 rounded-full bg-vital-soft border-4 border-white shadow-lg hidden md:flex items-center justify-center">
                <Sparkles className="w-8 md:w-10 h-8 md:h-10 text-vital-green" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* VALUES SECTION - Bold cards */}
      <section className="py-16 md:py-32 bg-vital-soft relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_100%_100%_at_100%_0%,rgba(0,109,101,0.08),transparent)]"></div>
        
        <Container className="relative z-10">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 mb-6">
              <span className="text-xs font-bold text-vital-dark uppercase tracking-wider">Naše hodnoty</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-vital-dark mb-6">
              Čo nás <span className="text-vital-green">definuje.</span>
            </h2>
            <p className="text-xl text-slate-600">
              Tri piliere, na ktorých staviame každý projekt.
            </p>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Target, 
                title: 'Misia', 
                text: 'Poskytovať komplexné služby na takej úrovni, aby sa naši klienti mohli plne sústrediť na svoj biznis.',
                accent: 'bg-vital-green',
                gradient: 'from-vital-green to-teal-500'
              },
              { 
                icon: Heart, 
                title: 'Hodnoty', 
                text: 'Transparentnosť, dodržiavanie termínov a ľudský prístup. Sme B2B partner s tvárou.',
                accent: 'bg-vital-yellow',
                gradient: 'from-vital-yellow to-orange-400'
              },
              { 
                icon: Award, 
                title: 'Vízia', 
                text: 'Stať sa prvou voľbou pre firmy a samosprávy pri riešení technických a eventových potrieb.',
                accent: 'bg-vital-dark',
                gradient: 'from-vital-dark to-slate-700'
              }
            ].map((val, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-10 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${val.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${val.accent} rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20 transition-colors`}>
                    <val.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Number */}
                  <div className="absolute top-8 right-8 text-7xl font-bold text-slate-100 group-hover:text-white/10 transition-colors">
                    0{idx + 1}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-vital-dark group-hover:text-white mb-4 transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-slate-600 group-hover:text-white/90 leading-relaxed transition-colors">
                    {val.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY US - Feature highlights */}
      <section className="py-16 md:py-32 bg-vital-dark text-white relative overflow-hidden">
        {/* Background gradient atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,109,101,0.3),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_100%,rgba(252,176,22,0.1),transparent)]"></div>
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left - Content */}
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vital-yellow/10 border border-vital-yellow/20">
                <span className="text-xs font-bold text-vital-yellow uppercase tracking-wider">Prečo my?</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Partner, ktorý<br />
                <span className="text-vital-yellow">preberá zodpovednosť.</span>
              </h2>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                Nie sme len dodávateľ služieb. Sme strategický partner, ktorý sa spoluzodpovedá za váš úspech.
              </p>

              <Link 
                to="/sluzby" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-vital-yellow text-vital-dark rounded-full font-bold hover:bg-white transition-all hover:gap-5 shadow-xl shadow-yellow-500/20"
              >
                Naše služby
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right - Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: 'Garancia termínov', desc: 'Čas sú peniaze. My neplytváme ani jedným.' },
                { icon: Users, title: 'Osobný manager', desc: 'Jeden kontakt pre všetky vaše potreby.' },
                { icon: Zap, title: 'Proaktívny prístup', desc: 'Riešime problémy skôr, ako vzniknú.' },
                { icon: Sparkles, title: 'All-in-one riešenie', desc: 'Event, IT aj marketing pod jednou strechou.' },
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <feature.icon className="w-8 h-8 text-vital-yellow mb-4" />
                  <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-32 bg-white">
        <Container>
          <div className="bg-gradient-to-br from-vital-green to-teal-600 rounded-3xl md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.2),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(0,0,0,0.2),transparent_50%)]"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Pripravení spolupracovať?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">
                Radi vám predstavíme, ako môžeme pomôcť vášmu biznisu rásť.
              </p>
              <Link 
                to="/kontakt" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-vital-dark rounded-full font-bold text-lg hover:bg-vital-yellow transition-all hover:gap-5 shadow-2xl shadow-black/20"
              >
                Kontaktujte nás
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Custom CSS animations */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default About;
