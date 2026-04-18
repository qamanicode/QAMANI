export interface Template {
  id: string;
  name: string;
  description: string;
  promptPrefix: string;
}

export const TEMPLATES: Template[] = [
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Perfect for startups and product launches.',
    promptPrefix: 'Create a high-converting, modern SaaS landing page with a hero, features, testimonials, and a clear CTA. Use vibrant colors and clean typography.',
  },
  {
    id: 'portfolio',
    name: 'Personal Portfolio',
    description: 'Designed for developers and creative professionals.',
    promptPrefix: 'Create a professional personal portfolio with a clean about section, project showcase grid, skills section, and a contact form. Use minimal design and elegant fonts.',
  },
  {
    id: 'business',
    name: 'Corporate Business',
    description: 'Serious and trust-building for established companies.',
    promptPrefix: 'Create a professional corporate website with services, team section, company history, and trust signals like client logos. Use a blue/neutral color palette.',
  }
];
