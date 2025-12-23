import React from 'react';
import { servicesData } from '../data/content';
import { Container, Section, H1, Subtext, Button, Card } from '../components/ui/DesignSystem';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesHub: React.FC = () => {
  return (
    <>
      <Section className="bg-slate-50 pt-12 pb-20">
        <Container>
          <div className="max-w-3xl">
            <H1 className="mb-6">Naše služby</H1>
            <Subtext>
              Poskytujeme tri hlavné piliere služieb, ktoré pokrývajú potreby moderných firiem a samospráv. 
              Zameriavame sa na kvalitu, profesionalitu a dlhodobé partnerstvá.
            </Subtext>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-12">
            {servicesData.map((service, index) => (
              <div key={service.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Image */}
                <div className="w-full lg:w-1/2 aspect-[4/3] bg-slate-100 rounded-2xl md:rounded-[2.5rem] relative overflow-hidden group shadow-2xl shadow-slate-200">
                   <img 
                     src={service.image} 
                     alt={service.title} 
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     loading="lazy"
                   />
                   {/* Subtle overlay */}
                   <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="inline-flex items-center gap-2 text-teal-700 font-bold uppercase tracking-wider text-sm">
                    <service.icon size={16} /> 0{index + 1}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{service.title}</h2>
                  <p className="text-xl text-teal-700 font-medium italic mb-2">
                    {service.heroTagline}
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {service.fullDesc}
                  </p>
                  
                  <div className="pt-4">
                    <ul className="space-y-3 mb-8">
                      {service.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700">
                          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Button to={service.path} variant="primary" icon>
                      Zistiť viac
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-900 text-white text-center py-20">
        <Container>
          <h2 className="text-3xl font-bold mb-6">Nenašli ste, čo hľadáte?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Sme flexibilní. Ak máte špecifickú požiadavku, ktorá spadá do nášho portfólia, ozvite sa nám.
          </p>
          <Button to="/kontakt" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
            Kontaktovať s požiadavkou
          </Button>
        </Container>
      </Section>
    </>
  );
};

export default ServicesHub;
