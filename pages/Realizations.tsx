import React, { useState } from 'react';
import { realizationsData } from '../data/content';
import { Container, Section, H1, Subtext, Card } from '../components/ui/DesignSystem';
import { MapPin, Calendar } from 'lucide-react';

const Realizations: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'eventy' | 'it' | 'reklama'>('all');

  const filteredData = filter === 'all' 
    ? realizationsData 
    : realizationsData.filter(item => item.category === filter);

  return (
    <>
      <Section className="bg-slate-50 pt-12 pb-12">
        <Container>
          <H1 className="mb-6">Naše realizácie</H1>
          <Subtext className="max-w-2xl mb-12">
            Pozrite si ukážky našich projektov. Za každou realizáciou stojí precízna príprava a profesionálny prístup.
          </Subtext>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Všetko' },
              { id: 'eventy', label: 'Eventy & Priestory' },
              { id: 'it', label: 'IT Servis' },
              { id: 'reklama', label: 'Marketing' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === tab.id 
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white min-h-[50vh]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((project) => (
              <Card key={project.id} className="h-full flex flex-col p-0 overflow-hidden border-0 shadow-lg shadow-slate-200/50">
                {/* Image Area */}
                <div className="h-48 w-full relative bg-slate-100 group">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                   <div className="absolute top-4 left-4">
                     <span className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-slate-800 uppercase tracking-wider shadow-sm">
                       {project.category}
                     </span>
                   </div>
                </div>
                
                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                    {project.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {project.location}
                      </span>
                    )}
                    {project.year && (
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {project.year}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              V tejto kategórii zatiaľ nie sú žiadne projekty.
            </div>
          )}
        </Container>
      </Section>
    </>
  );
};

export default Realizations;
