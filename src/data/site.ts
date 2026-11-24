/**
 * Single source of truth for every word, link and list on the site.
 * Update content here — components never hardcode copy.
 */

export type IconName =
  | 'code'
  | 'layers'
  | 'spark'
  | 'cap'
  | 'pen'
  | 'monitor'
  | 'wordpress'
  | 'palette'
  | 'ai'
  | 'chart'
  | 'search'
  | 'brand'
  | 'bolt'
  | 'gauge'
  | 'mail'
  | 'arrow'
  | 'download'
  | 'close'
  | 'check';

export const site = {
  name: 'Mahdi Babaei',
  title: 'Software Engineer',
  tagline: 'Digital Experiences & Technology',
  url: 'https://mahdibabaei.com',
  description:
    'Mahdi Babaei — Software Engineer crafting premium digital experiences across web development, UI/UX design and AI-powered solutions.',
  locale: 'en',
};

export const nav = [
  { id: 'home', label: 'Home', index: '01' },
  { id: 'about', label: 'About', index: '02' },
  { id: 'skills', label: 'Skills', index: '03' },
  { id: 'projects', label: 'Projects', index: '04' },
  { id: 'services', label: 'Services', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
];

export const hero = {
  badge: 'Available for New Projects',
  greeting: "Hi, I'm",
  name: 'Mahdi Babaei',
  roles: ['Software Engineer', 'UI/UX Designer', 'AI-Powered Builder'],
  intro:
    'I build fast, accessible digital products — blending clean engineering, modern interface design and AI-assisted workflows into experiences that feel effortless.',
  primaryCta: { label: 'View My Work', href: '#projects' },
  secondaryCta: { label: 'Download CV', href: '/cv/mahdi-babaei-cv.pdf' },
  /**
   * Optional hero photograph. Add your own file to public/images and point
   * this at it (e.g. '/images/portrait.webp'). When empty, the art-directed
   * holographic bust renders instead.
   */
  portrait: '',
  portraitAlt: 'Portrait of Mahdi Babaei with cyan rim lighting',
};

export const overview = {
  eyebrow: '01',
  label: 'Professional Overview',
  title: 'A focused stack for building complete digital products.',
  cards: [
    {
      icon: 'code' as IconName,
      kicker: 'Core Expertise',
      title: 'Web Development',
      text: 'Semantic, responsive front-ends and dependable back-ends — engineered for speed, clarity and long-term maintenance.',
    },
    {
      icon: 'layers' as IconName,
      kicker: 'Creative Skills',
      title: 'UI/UX & Graphic Design',
      text: 'Interface systems, brand identities and visual assets that make products feel considered from the first pixel.',
    },
    {
      icon: 'spark' as IconName,
      kicker: 'Technology',
      title: 'AI-Powered Solutions',
      text: 'Practical AI workflows that compress repetitive production work and unlock smarter, faster digital delivery.',
    },
    {
      icon: 'cap' as IconName,
      kicker: 'Education',
      title: "Bachelor's Degree in Software Engineering",
      text: 'A formal engineering foundation in software architecture, databases, algorithms and system design.',
    },
  ],
};

export const about = {
  eyebrow: '02',
  label: 'About Me',
  title: 'Technology, creativity and business — in one workflow.',
  paragraphs: [
    "I'm Mahdi Babaei, a software engineering graduate with a strong passion for web technologies, modern design, artificial intelligence, and building useful digital products.",
    'My focus is combining technology, creativity, and business understanding to create professional digital experiences.',
  ],
  meta: [
    { label: 'Discipline', value: 'Software Engineering' },
    { label: 'Focus', value: 'Web · Design · AI' },
    { label: 'Location', value: 'Tehran, Iran' },
    { label: 'Status', value: 'Open to projects' },
  ],
  principles: [
    'Design decisions backed by engineering constraints.',
    'Performance treated as a feature, not a cleanup task.',
    'Interfaces that stay readable, accessible and calm.',
  ],
};

export const skills = {
  eyebrow: '03',
  label: 'Skills & Technologies',
  title: 'Four disciplines, one production workflow.',
  categories: [
    {
      icon: 'code' as IconName,
      title: 'Web Development',
      code: 'WEB',
      items: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'Responsive Web Design'],
    },
    {
      icon: 'palette' as IconName,
      title: 'Design & Creativity',
      code: 'DSN',
      items: [
        'Adobe Photoshop',
        'Adobe Illustrator',
        'UI/UX Design',
        'Logo Design',
        'Brand Identity',
        'Brochure & Catalog Design',
      ],
    },
    {
      icon: 'ai' as IconName,
      title: 'Artificial Intelligence',
      code: 'A.I',
      items: [
        'AI-Assisted Development',
        'Prompt Engineering',
        'AI Image Generation',
        'AI-Powered Workflows',
        'Claude AI',
        'Google Gemini',
      ],
    },
    {
      icon: 'chart' as IconName,
      title: 'Productivity & Business',
      code: 'BIZ',
      items: [
        'Microsoft Word',
        'Microsoft Excel',
        'Microsoft Office',
        'Digital Marketing',
        'Sales & Customer Relations',
      ],
    },
  ],
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  description: string;
  year: string;
  role: string;
  stack: string[];
  highlights: string[];
  accent: string;
  visual: 'gym' | 'app' | 'estate' | 'ai';
};

export const projects: Project[] = [
  {
    slug: 'iran-zamin-gym',
    index: '01',
    title: 'Iran Zamin Gym',
    category: 'Fitness Website',
    description:
      'A modern professional website concept for a fitness center, featuring premium visual design and a scalable structure for future membership and online payment integration.',
    year: '2025',
    role: 'Design & Development',
    stack: ['React', 'TypeScript', 'CSS', 'Responsive UI'],
    highlights: [
      'Cinematic dark visual language built around a single accent color.',
      'Scalable component structure prepared for memberships and payments.',
      'Mobile-first layouts with motion that respects reduced-motion users.',
    ],
    accent: '#39e75f',
    visual: 'gym',
  },
  {
    slug: 'pelan-app',
    index: '02',
    title: 'Pelan App',
    category: 'Productivity Application',
    description:
      'A modern productivity and reminder application designed to help users organize daily tasks, build habits, and manage personal goals.',
    year: '2025',
    role: 'Product Design & Front-end',
    stack: ['UI Systems', 'JavaScript', 'Local-first data'],
    highlights: [
      'Task, habit and goal flows kept in one calm, glanceable dashboard.',
      'Interaction patterns tuned for daily, low-friction use.',
      'Design system documented for future feature expansion.',
    ],
    accent: '#00f0e5',
    visual: 'app',
  },
  {
    slug: 'real-estate-experience',
    index: '03',
    title: 'Real Estate Digital Experience',
    category: 'Real Estate Website',
    description:
      'A premium real estate website concept focused on modern property presentation, cinematic visuals, and sophisticated user experience.',
    year: '2025',
    role: 'Art Direction & Development',
    stack: ['Web Design', 'Motion', 'Responsive Layout'],
    highlights: [
      'Property storytelling built around large-format imagery.',
      'Filtering and browsing patterns that stay fast on mobile.',
      'Refined typography and spacing for a high-trust brand feel.',
    ],
    accent: '#8fa9ff',
    visual: 'estate',
  },
  {
    slug: 'ai-digital-solutions',
    index: '04',
    title: 'AI-Powered Digital Solutions',
    category: 'Artificial Intelligence',
    description:
      'Exploring AI-powered tools and intelligent workflows to improve digital production, development, and business processes.',
    year: '2026',
    role: 'Research & Prototyping',
    stack: ['Prompt Engineering', 'AI Workflows', 'Automation'],
    highlights: [
      'Reusable prompt patterns for design and development tasks.',
      'Automated asset and copy pipelines that shorten delivery cycles.',
      'Human review kept in the loop for quality and accuracy.',
    ],
    accent: '#b18cff',
    visual: 'ai',
  },
];

export const services = {
  eyebrow: '05',
  label: 'What I Do',
  title: 'Services engineered around real business outcomes.',
  items: [
    {
      icon: 'monitor' as IconName,
      title: 'Professional Website Design',
      text: 'Complete website concepts with a clear visual system, strong hierarchy and a premium first impression.',
    },
    {
      icon: 'wordpress' as IconName,
      title: 'WordPress Development',
      text: 'Flexible, editor-friendly WordPress builds that clients can maintain without touching code.',
    },
    {
      icon: 'bolt' as IconName,
      title: 'Business Website Development',
      text: 'Fast, structured corporate sites built to convert visitors into enquiries.',
    },
    {
      icon: 'pen' as IconName,
      title: 'UI/UX Design',
      text: 'Wireframes, flows and polished interfaces designed around how people actually use a product.',
    },
    {
      icon: 'brand' as IconName,
      title: 'Logo & Brand Identity Design',
      text: 'Distinctive marks and identity systems that stay consistent across every touchpoint.',
    },
    {
      icon: 'palette' as IconName,
      title: 'Graphic Design',
      text: 'Brochures, catalogs and campaign assets that keep brand language coherent.',
    },
    {
      icon: 'ai' as IconName,
      title: 'AI-Powered Digital Solutions',
      text: 'Practical AI integration for content, imagery and production workflows.',
    },
    {
      icon: 'gauge' as IconName,
      title: 'Website Optimization',
      text: 'Performance, accessibility and SEO audits with fixes that measurably improve the experience.',
    },
  ],
};

export const contact = {
  eyebrow: '06',
  label: 'Contact',
  title: "Let's Build Something Amazing Together",
  description:
    "Have an idea or a project in mind? Let's turn your vision into a professional digital experience.",
  cta: 'Get In Touch',
  email: 'hello@mahdibabaei.com',
  location: 'Tehran, Iran',
  availability: 'Available for freelance & collaboration',
  responseTime: 'Replies within 1–2 business days',
  form: {
    title: 'Start a conversation',
    subtitle: 'Tell me a little about the project. Every message is read.',
    submit: 'Send Message',
    fields: {
      name: { label: 'Your name', placeholder: 'Jane Cooper' },
      email: { label: 'Email address', placeholder: 'jane@company.com' },
      message: { label: 'Project details', placeholder: 'What are you building, and what do you need?' },
    },
    successTitle: 'Message received',
    successText: "Thanks for reaching out — I'll get back to you within 1–2 business days.",
  },
  /** Add real profiles here and they render automatically. */
  socials: [] as { label: string; href: string }[],
};

export const footer = {
  note: 'Designed & engineered by Mahdi Babaei.',
  status: 'Available for new projects',
};
