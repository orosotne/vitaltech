import React from 'react';
import { useParams, useLocation, Navigate, Link } from 'react-router-dom';
import { CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';
import { servicesData } from '../data/content';
import { Container, Section, H1, Subtext, Button, Card, CheckItem } from '../components/ui/DesignSystem';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  
  // Extract service ID from pathname (e.g., "/eventy-a-priestory" -> "eventy-a-priestory")
  const pathId = location.pathname.replace('/', '');
  const serviceId = id || pathId;
  
  const service = servicesData.find(s => s.id === serviceId);

  if (!service) {
    // If accessed directly via URL, or handle 404
    return <Navigate to="/sluzby" replace />;
  }

  return (
    <>
      {/* Hero */}
      <Section className="bg-slate-50 pt-12 pb-20 overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex flex-col items-start gap-6 lg:w-1/2 relative z-10">
              <Link to="/sluzby" className="text-teal-600 font-medium hover:underline mb-2">← Späť na všetky služby</Link>
              <div className="bg-white p-3 rounded-2xl shadow-sm inline-flex text-teal-700 mb-2">
                <service.icon size={32} />
              </div>
              <p className="text-lg font-bold text-teal-700 tracking-wide uppercase">{service.heroTagline}</p>
              <H1>{service.title}</H1>
              <Subtext>{service.fullDesc}</Subtext>
              <Button to="/kontakt" variant="primary" className="mt-4">Nezáväzná konzultácia</Button>
            </div>
            
            {/* Hero Image */}
            <div className="w-full lg:w-1/2 relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-teal-500/10 blur-[80px] rounded-full pointer-events-none" />
               <div className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/10 lg:rotate-2 lg:hover:rotate-0 transition-all duration-700 group">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-auto aspect-[4/3] object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700" 
                  />
               </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section className="bg-vital-dark text-white py-16">
        <Container>
          <h2 className="text-2xl font-bold text-white mb-10 text-center">Prečo práve my?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-vital-yellow/20 flex items-center justify-center text-vital-yellow mb-6">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-300 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Typical Projects */}
      <Section className="bg-vital-soft py-16">
        <Container>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Najčastejšie typy zákaziek</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.typicalProjects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed">{project}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Content Grid */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Deliverables */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Čo dodáme</h2>
                <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <CheckItem key={idx}>{feature}</CheckItem>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Ako prebieha spolupráca</h2>
                <div className="space-y-6">
                  {service.processSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-900">{step.title}</h4>
                        <p className="text-slate-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Časté otázky</h2>
                <div className="space-y-4">
                  {service.faq.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                        <HelpCircle size={18} className="text-teal-600" />
                        {item.q}
                      </h4>
                      <p className="text-slate-600 ml-7">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Target Audience */}
              <Card className="bg-slate-900 text-white border-slate-800">
                <h3 className="font-bold text-xl mb-4 text-white">Pre koho je služba určená?</h3>
                <ul className="space-y-3">
                  {service.targetAudience.map((target, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      {target}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Contact Mini */}
              <Card className="bg-orange-50 border-orange-100">
                <h3 className="font-bold text-xl mb-2 text-slate-900">Potrebujete poradiť?</h3>
                <p className="text-slate-600 mb-6 text-sm">
                  Neváhajte nás kontaktovať pre nezáväznú ponuku na mieru.
                </p>
                <Button to="/kontakt" variant="outline" className="w-full justify-center bg-white border-orange-200 text-orange-800 hover:bg-orange-100 hover:text-orange-900 hover:border-orange-300">
                  Kontaktovať
                </Button>
              </Card>
            </div>

          </div>
        </Container>
      </Section>

      {/* Bottom CTA */}
      <Section className="bg-vital-yellow py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-vital-dark mb-6">
              Máte konkrétnu požiadavku?
            </h2>
            <p className="text-vital-dark/70 text-lg mb-8">
              Napíšte nám stručný popis a ozveme sa vám do 24 hodín s návrhom riešenia.
            </p>
            <Button to="/kontakt" className="bg-vital-dark text-white hover:bg-white hover:text-vital-dark border-0 shadow-xl !px-10 !py-4 !text-lg">
              Začať spoluprácu
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ServiceDetail;
