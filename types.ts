import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface ServicePillar {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  heroTagline: string;
  path: string;
  icon: LucideIcon;
  image: string;
  features: string[];
  benefits: { title: string; desc: string }[];
  targetAudience: string[];
  typicalProjects: string[];
  processSteps: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
}

export interface Realization {
  id: string;
  title: string;
  category: 'eventy' | 'it' | 'reklama';
  description: string;
  location?: string;
  year?: string;
  image: string;

}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}
