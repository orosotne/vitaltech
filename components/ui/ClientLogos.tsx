import React from 'react';

// Official partners with their logos and websites
const partners = [
  { 
    name: 'Fortinet', 
    logo: '/images/partners/fortinet-logo.svg',
    website: 'https://www.fortinet.com/'
  },
  { 
    name: 'Cisco Networking Academy', 
    logo: '/images/partners/netacad_logo_black.svg',
    website: 'https://www.netacad.com/'
  },
  { 
    name: 'Palo Alto Networks', 
    logo: '/images/partners/pan-logo-light.svg',
    website: 'https://www.paloaltonetworks.com/'
  },
  { 
    name: 'Lenovo', 
    logo: '/images/partners/lenovo.avif',
    website: 'https://www.lenovo.com/sk/sk/'
  },
  { 
    name: 'Datacomp', 
    logo: '/images/partners/datacomp_white.svg',
    website: 'https://datacomp.sk/'
  },
];

interface ClientLogosProps {
  className?: string;
  title?: string;
}

const ClientLogos: React.FC<ClientLogosProps> = ({ 
  className = '', 
  title = 'Naši partneri' 
}) => {
  // Double the array for seamless infinite scroll
  const doubledPartners = [...partners, ...partners];

  return (
    <section className={`py-16 md:py-20 bg-white overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-wider">
          {title}
        </p>
      </div>

      {/* Infinite scroll container */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-scroll">
          {doubledPartners.map((partner, idx) => (
            <a
              key={`${partner.name}-${idx}`}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-8 md:mx-12 group"
              title={partner.name}
            >
              <div className="w-40 h-20 md:w-48 md:h-24 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-vital-soft group-hover:border-vital-green/20 group-hover:shadow-lg group-hover:shadow-vital-green/10 transition-all duration-300 p-4">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Custom animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ClientLogos;
