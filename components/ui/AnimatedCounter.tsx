import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCount();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, end, duration]);

  const animateCount = () => {
    const startTime = performance.now();
    const startValue = 0;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutExpo
      const easeProgress = progress === 1 
        ? 1 
        : 1 - Math.pow(2, -10 * progress);
      
      const currentValue = startValue + (end - startValue) * easeProgress;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.round(count).toString();

  return (
    <span ref={counterRef} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

// Pre-built stat card component for easy use
interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  suffix = '',
  label,
  icon,
  className = '',
}) => {
  return (
    <div className={`text-center group ${className}`}>
      <div className="flex items-center justify-center gap-2 mb-2">
        {icon && (
          <div className="text-vital-green opacity-60 group-hover:opacity-100 transition-opacity">
            {icon}
          </div>
        )}
        <div className="text-4xl md:text-5xl font-bold text-vital-dark">
          <AnimatedCounter end={value} suffix={suffix} duration={2000} />
        </div>
      </div>
      <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
};

// Stats section component
interface StatsProps {
  stats: Array<{
    value: number;
    suffix?: string;
    label: string;
  }>;
  className?: string;
}

export const StatsSection: React.FC<StatsProps> = ({ stats, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 ${className}`}>
      {stats.map((stat, idx) => (
        <StatCard
          key={idx}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
        />
      ))}
    </div>
  );
};

export default AnimatedCounter;

