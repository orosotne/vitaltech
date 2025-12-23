import React from 'react';
import { ArrowRight, CheckCircle2, Layers, Zap, Shield, Users, BarChart3, Settings, Calendar, Monitor, Megaphone } from 'lucide-react';
import { Container, Section, H1, H2, Subtext, Button, Card, Badge } from '../components/ui/DesignSystem';
import { servicesData, realizationsData } from '../data/content';
import { Link } from 'react-router-dom';
import ClientLogos from '../components/ui/ClientLogos';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Clean Gradient Background - Mesh style without blur noise */}
      <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none overflow-hidden -mt-28 z-0">
        {/* Primary warm gradient - top right */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-50/60 to-vital-yellow/15" />
        {/* Secondary teal accent - bottom left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_100%,rgba(0,109,101,0.08),transparent)]" />
        {/* Top edge subtle highlight */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white/40 to-transparent" />
        {/* Right side warm glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-vital-yellow/8 via-orange-100/20 to-transparent" />
      </div>

      {/* 1. HERO SECTION - Asymmetrical Layout with Floating UI Elements */}
      <section className="relative pt-6 pb-24 lg:pt-8 lg:pb-32 min-h-[calc(100vh-112px)] flex items-center z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-10 relative z-10 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-vital-green animate-pulse"></span>
                B2B Partner pre rast
              </div>
              
              <H1 className="!leading-[1.1]">
                Riešenia, ktoré <br/>
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-vital-dark via-vital-green to-teal-500">
                    definujú štandard.
                  </span>
                  {/* Underline decoration */}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-vital-yellow opacity-80 z-0" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 125.75 -3.50005 197.75 2.49995" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                </span>
              </H1>
              
              <Subtext className="max-w-xl text-xl">
                Eventy, IT infraštruktúra a marketing v perfektnej symbióze. 
                Prinášame technickú precíznosť do kreatívneho sveta.
              </Subtext>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Button to="/kontakt" variant="primary" icon>
                  Konzultovať projekt
                </Button>
                <Button to="/sluzby" variant="outline" className="bg-white/50 backdrop-blur-sm">
                  Naše služby
                </Button>
              </div>
              
              <div className="pt-8 border-t border-slate-200/60 flex flex-wrap gap-8">
                {[
                  { label: "Overená kvalita", icon: Shield },
                  { label: "Rýchle nasadenie", icon: Zap },
                  { label: "24/7 Support", icon: Users },
                ].map((feature, i) => (
                   <div key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                     <div className="p-1.5 bg-white rounded-lg shadow-sm text-vital-green">
                       <feature.icon size={16} />
                     </div>
                     {feature.label}
                   </div>
                ))}
              </div>
            </div>
            
            {/* Right Visual - Service Command Center */}
            <div className="lg:col-span-5 relative h-[600px] w-full hidden lg:block animate-fade-up-delay">
              
              {/* Main Dashboard Card */}
              <div className="absolute top-10 left-10 right-0 bottom-0 bg-vital-dark rounded-4xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 group hover:scale-[1.02] transition-transform duration-700">
                 {/* Clean gradient atmosphere - no blur */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-vital-dark via-vital-dark to-teal-900/50"></div>
                 {/* Subtle radial highlight in corner */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(0,109,101,0.25),transparent_50%)]"></div>
                 {/* Warm accent gradient from bottom */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(252,176,22,0.08),transparent_40%)]"></div>
                 {/* Bottom fade for depth */}
                 <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
                 
                 {/* Dashboard Header */}
                 <div className="relative z-10 p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full bg-vital-green animate-pulse"></div>
                       <span className="text-white/60 text-sm font-medium">Naše služby</span>
                    </div>
                 </div>

                 {/* Service Status List */}
                 <div className="relative z-10 p-6 space-y-4">
                    {[
                      { icon: Calendar, label: 'Event', project: 'Konferencia TechMeet', status: 'V príprave', statusColor: 'bg-vital-yellow' },
                      { icon: Monitor, label: 'IT', project: '24 staníc spravovaných', status: 'Online', statusColor: 'bg-vital-green' },
                      { icon: Megaphone, label: 'Marketing', project: 'B2B Lead-gen kampaň', status: 'Aktívne', statusColor: 'bg-vital-green' },
                    ].map((service, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item">
                         <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover/item:bg-vital-green/20 transition-colors">
                            <service.icon size={20} />
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-0.5">{service.label}</div>
                            <div className="text-white font-medium text-sm truncate">{service.project}</div>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${service.statusColor}`}></div>
                            <span className="text-xs text-white/60 font-medium">{service.status}</span>
                         </div>
                      </div>
                    ))}
                 </div>

                 {/* Bottom Stats Bar */}
                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/40 to-transparent">
                    <div className="flex justify-between items-center text-white/80">
                       <span className="font-heading font-bold text-xl">vitaltech</span>
                       <div className="flex items-center gap-4">
                          <div className="text-right">
                             <div className="text-2xl font-bold text-white">
                               <AnimatedCounter end={50} suffix="+" duration={2000} />
                             </div>
                             <div className="text-xs text-white/50">projektov ročne</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Floating Card: Right Side - Results Metric */}
              <div className="absolute top-0 right-0 bg-vital-yellow rounded-3xl py-5 px-6 shadow-xl shadow-yellow-500/20 border border-white/20 animate-fade-up-delay-2 text-center">
                 <div className="text-xs text-vital-dark/60 font-bold uppercase tracking-wider mb-2">ROI klientov</div>
                 <div className="text-3xl font-bold text-vital-dark mb-1">
                   <AnimatedCounter end={127} prefix="+" suffix="%" duration={2500} />
                 </div>
                 <div className="text-xs text-vital-dark/50 font-medium">priemer 2024</div>
              </div>

              {/* Floating Card 3: Bottom Left - Client Badge */}
              <div className="absolute bottom-16 left-0 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 pr-6 animate-float" style={{animationDelay: '1s'}}>
                 <div className="w-12 h-12 rounded-xl bg-vital-green/10 flex items-center justify-center text-vital-green">
                    <CheckCircle2 size={24} />
                 </div>
                 <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Spokojných</div>
                    <div className="font-heading font-bold text-vital-dark text-lg">
                    <AnimatedCounter end={120} suffix="+" duration={2000} /> klientov
                 </div>
                 </div>
              </div>

              {/* Small floating pill - Quick Stat */}
              <div className="absolute bottom-40 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-float" style={{animationDelay: '1.5s'}}>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-vital-green animate-pulse"></div>
                    <span className="text-xs font-bold text-vital-dark">24/7 Support</span>
                 </div>
              </div>

            </div>
          </div>
        </Container>
      </section>

      {/* CLIENT LOGOS */}
      <ClientLogos className="relative z-10" />

      {/* 2. SERVICES - BENTO GRID STYLE */}
      <Section className="bg-white relative z-10 !pt-0">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <Badge variant="dark">Naša expertíza</Badge>
              <H2>Tri piliere, jedno <span className="text-vital-green">riešenie.</span></H2>
            </div>
            <p className="max-w-md text-slate-600 font-medium text-lg text-right md:text-left">
              Prepájame svety technológií a eventov do funkčného celku.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesData.map((service, idx) => (
              <div key={service.id} className="group relative bg-vital-soft rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-10 transition-all duration-500 hover:bg-vital-dark hover:text-white hover:-translate-y-2 overflow-hidden">
                {/* Clean hover gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(0,109,101,0.3),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-vital-dark shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <service.icon size={32} />
                    </div>
                    <span className="font-mono text-sm font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                      0{idx + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-heading font-bold mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-10 flex-grow font-medium group-hover:text-slate-300 leading-relaxed">
                    {service.shortDesc}
                  </p>
                  
                  <div className="pt-6 border-t border-slate-200 group-hover:border-white/10">
                    <Link to={service.path} className="inline-flex items-center gap-3 font-bold group-hover:gap-5 transition-all">
                      Preskúmať službu 
                      <div className="w-8 h-8 rounded-full bg-white text-vital-dark flex items-center justify-center">
                        <ArrowRight size={14} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. WHY US - Grid Layout */}
      <section id="why-us" className="py-16 md:py-32 bg-vital-dark text-white relative overflow-hidden">
        {/* Clean Gradient Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
        {/* Top-right radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_0%,rgba(0,109,101,0.25),transparent)]"></div>
        {/* Left side accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_0%_50%,rgba(13,59,62,0.4),transparent)]"></div>
        {/* Bottom warm accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_70%_100%,rgba(252,176,22,0.06),transparent)]"></div>

        <Container className="relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-10">
                 <Badge variant="yellow">Prečo vitaltech?</Badge>
                 <H2 className="!text-white">
                   Pretože rozumieme <br/>
                   <span className="text-vital-yellow">biznis kontextu.</span>
                 </H2>
                 <p className="text-xl text-slate-300 leading-relaxed max-w-md">
                   Nie sme len dodávateľ techniky. Sme strategický partner, ktorý preberá zodpovednosť za výsledok.
                 </p>
                 <Button to="/o-nas" variant="secondary">
                   Viac o našom tíme
                 </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                   { icon: Shield, title: 'Garancia termínov', desc: 'Čas sú peniaze. My neplytváme ani jedným.' },
                   { icon: Layers, title: 'All-in-one', desc: 'Jeden partner pre event, IT aj marketing.' },
                   { icon: Zap, title: 'Proaktívny prístup', desc: 'Riešime problémy skôr, ako vzniknú.' },
                   { icon: Users, title: 'Osobný manager', desc: 'Jeden kontakt pre všetko.' },
                 ].map((item, idx) => (
                   <div key={idx} className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                      <item.icon className="text-vital-yellow mb-6" size={32} />
                      <h4 className="font-heading font-bold text-xl mb-2">{item.title}</h4>
                      <p className="text-slate-400 font-medium text-sm leading-relaxed">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </Container>
      </section>

      {/* 4. PROCESS - Horizontal Timeline */}
      <Section className="bg-vital-soft">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="green">Ako pracujeme</Badge>
            <H2>Transparentný proces od A po Z.</H2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
             
             {[
               { step: "01", title: "Briefing", desc: "Počúvame. Analyzujeme potreby a definujeme ciele." },
               { step: "02", title: "Stratégia", desc: "Navrhneme riešenie na mieru s jasným rozpočtom." },
               { step: "03", title: "Exekúcia", desc: "Dodáme výsledok v dohodnutej kvalite a termíne." }
             ].map((s, i) => (
               <div key={i} className="relative flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-vital-soft shadow-lg flex items-center justify-center font-heading font-bold text-3xl text-vital-green relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {s.step}
                  </div>
                  <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl w-full shadow-sm border border-white group-hover:shadow-xl transition-all">
                    <h3 className="font-heading font-bold text-xl mb-3 text-vital-dark">{s.title}</h3>
                    <p className="text-slate-600 font-medium">{s.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </Container>
      </Section>

      {/* 5. CTA SECTION - Large Typography */}
      <section className="py-16 md:py-32 bg-white">
        <Container>
          <div className="bg-vital-yellow rounded-3xl md:rounded-[4rem] p-8 md:p-24 text-center relative overflow-hidden">
             {/* Abstract organic blob gradients */}
             {/* Large warm blob - top left */}
             <div className="absolute -top-20 -left-20 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.4),transparent_70%)] rounded-full"></div>
             
             {/* Medium orange blob - bottom right */}
             <div className="absolute -bottom-16 -right-16 w-96 h-72 bg-[radial-gradient(ellipse_at_center,rgba(234,88,12,0.25),transparent_65%)] rounded-full rotate-12"></div>
             
             {/* Small accent blob - center right */}
             <div className="absolute top-1/3 right-10 w-48 h-48 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.3),transparent_60%)] rounded-full"></div>
             
             {/* White highlight blob - top */}
             <div className="absolute -top-10 left-1/3 w-64 h-40 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4),transparent_70%)] rounded-full"></div>
             
             {/* Subtle warm glow - bottom left */}
             <div className="absolute bottom-10 left-20 w-56 h-56 bg-[radial-gradient(ellipse_at_center,rgba(253,186,116,0.35),transparent_65%)] rounded-full -rotate-6"></div>

             <div className="relative z-10 max-w-4xl mx-auto">
               <H2 className="!text-3xl sm:!text-5xl md:!text-7xl mb-10 leading-tight">
                 Máte víziu? <br/>
                 <span className="text-white drop-shadow-sm">My máme riešenie.</span>
               </H2>
               <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button to="/kontakt" className="bg-vital-dark text-white hover:bg-white hover:text-vital-dark border-0 shadow-xl shadow-vital-dark/30 !px-12 !py-5 !text-lg">
                  Začať spoluprácu
                </Button>
               </div>
             </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
