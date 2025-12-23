import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// --- WRAPPERS ---
export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

export const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
  <section id={id} className={`py-20 md:py-32 ${className}`}>
    {children}
  </section>
);

// --- TYPOGRAPHY ---
export const H1: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-vital-dark leading-[1.05] ${className}`}>
    {children}
  </h1>
);

export const H2: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-vital-dark ${className}`}>
    {children}
  </h2>
);

export const Subtext: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-lg md:text-xl text-slate-600 leading-relaxed font-medium ${className}`}>
    {children}
  </p>
);

// --- COMPONENTS ---
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  to?: string;
  onClick?: () => void;
  className?: string;
  icon?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', to, onClick, className = '', icon = false, disabled = false }) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";
  
  const radius = "rounded-full"; 
  const size = "px-8 py-4 text-base";

  const variants = {
    primary: "bg-vital-dark hover:bg-slate-900 text-white shadow-xl shadow-vital-dark/25 border border-transparent hover:-translate-y-1",
    secondary: "bg-vital-yellow text-vital-dark hover:bg-[#eab308] border border-transparent shadow-lg shadow-yellow-500/20 hover:-translate-y-1",
    outline: "bg-transparent border-2 border-vital-dark/10 text-vital-dark hover:border-vital-dark hover:bg-vital-dark hover:text-white",
    ghost: "bg-transparent text-vital-dark hover:bg-vital-dark/5",
  };

  const combined = `${baseStyles} ${radius} ${size} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {icon && <ArrowRight className="ml-2 h-5 w-5" />}
    </>
  );

  if (to) {
    return <Link to={to} className={combined}>{content}</Link>;
  }
  return <button onClick={onClick} disabled={disabled} className={combined}>{content}</button>;
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; hover?: boolean }> = ({ children, className = '', hover = true }) => (
  <div className={`bg-white rounded-4xl p-8 md:p-10 border border-white shadow-sm ${hover ? 'transition-all duration-500 hover:shadow-2xl hover:shadow-vital-dark/5 hover:-translate-y-2' : ''} ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'green' | 'yellow' | 'dark' }> = ({ children, variant = 'green' }) => {
  const styles = {
    green: "bg-teal-50 text-teal-800 ring-teal-600/20",
    yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
    dark: "bg-slate-100 text-slate-700 ring-slate-500/10",
  }[variant];

  return (
    <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wider ring-1 ring-inset mb-6 ${styles}`}>
      {children}
    </span>
  );
};

export const CheckItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start group">
    <div className="flex-shrink-0">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-vital-green/10 group-hover:bg-vital-green/20 transition-colors">
        <svg className="h-4 w-4 text-vital-green" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    <span className="ml-3 text-slate-700 font-medium">{children}</span>
  </li>
);