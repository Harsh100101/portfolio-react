// ─────────────────────────────────────────────
//  DATA — About Page
// ─────────────────────────────────────────────

export const journey = [
  {
    year: '2022',
    title: 'Started B.Tech CSE (AI)',
    org: 'Parul University, Vadodara',
    desc: 'Began specialisation in Artificial Intelligence — diving into ML, data structures, algorithms, and full-stack fundamentals.',
    type: 'education',
  },
  {
    year: '2024',
    title: 'Healthcare AI Hackathon — Team Lead',
    org: 'Parul University',
    desc: 'Led a team in a healthcare AI hackathon. Owned architecture, frontend, and coordination across ML and backend. Built a working AI health solution end-to-end inside the hackathon window.',
    type: 'achievement',
  },
  {
    year: 'Oct 2025',
    title: 'Published Research — IJSET',
    org: 'International Journal of Science, Engineering & Technology',
    desc: 'Authored a peer-reviewed paper on personalised recommendation systems — covering collaborative filtering, content-based approaches, and hybrid ML pipelines.',
    type: 'research',
  },
  {
    year: 'Jan 2026',
    title: 'React Native Developer Intern',
    org: 'Frontend Development · Vadodara',
    desc: 'Shipped real features on a live production React Native app. Worked with Redux Toolkit, REST APIs, and component-based architecture alongside design and backend teams.',
    type: 'work',
  },
  {
    year: 'Apr 2026',
    title: 'Internship Complete',
    org: 'Frontend Development · Vadodara',
    desc: 'Completed a 4-month internship cycle with successful delivery of mobile features in production. Now actively seeking full-time or freelance React Native / frontend roles.',
    type: 'work',
  },
  {
    year: '2026',
    title: 'B.Tech Graduation',
    org: 'Parul University, Vadodara',
    desc: 'Final year student — graduating with a B.Tech in Computer Science & Engineering (AI specialisation).',
    type: 'education',
  },
]

export const typeColors = {
  education:   { dot: '#6e72ff', label: 'Education',   bg: 'rgba(110,114,255,0.12)', border: 'rgba(110,114,255,0.3)' },
  work:        { dot: '#34d8c4', label: 'Work',        bg: 'rgba(52,216,196,0.12)',   border: 'rgba(52,216,196,0.3)' },
  achievement: { dot: '#fb923c', label: 'Achievement', bg: 'rgba(251,146,60,0.12)',   border: 'rgba(251,146,60,0.3)' },
  research:    { dot: '#b06bff', label: 'Research',    bg: 'rgba(176,107,255,0.12)', border: 'rgba(176,107,255,0.3)' },
}

export const skillCategories = [
  {
    label: 'Mobile',
    skills: [
      { name: 'React Native', level: 85 },
      { name: 'Expo',         level: 82 },
      { name: 'Android',      level: 70 },
    ],
  },
  {
    label: 'Frontend',
    skills: [
      { name: 'React.js',    level: 88 },
      { name: 'TypeScript',  level: 74 },
      { name: 'Vite',        level: 80 },
      { name: 'Tailwind CSS',level: 82 },
    ],
  },
  {
    label: 'State & Data',
    skills: [
      { name: 'Redux Toolkit', level: 80 },
      { name: 'REST APIs',     level: 85 },
      { name: 'React Query',   level: 68 },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js',  level: 70 },
      { name: 'Express',  level: 68 },
      { name: 'Flask',    level: 65 },
      { name: 'MongoDB',  level: 64 },
    ],
  },
  {
    label: 'AI & ML',
    skills: [
      { name: 'Python',            level: 72 },
      { name: 'Pandas / NumPy',    level: 70 },
      { name: 'Collab Filtering',  level: 68 },
      { name: 'NLP',               level: 62 },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git',      level: 82 },
      { name: 'Postman',  level: 78 },
      { name: 'JMeter',   level: 65 },
      { name: 'Supabase', level: 70 },
    ],
  },
]

export const techStack = [
  { name: 'React Native', category: 'Mobile' },
  { name: 'Expo',         category: 'Mobile' },
  { name: 'React.js',     category: 'Frontend' },
  { name: 'Vite',         category: 'Frontend' },
  { name: 'TypeScript',   category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Framer Motion',category: 'Frontend' },
  { name: 'GSAP',         category: 'Frontend' },
  { name: 'Redux Toolkit',category: 'State' },
  { name: 'React Query',  category: 'State' },
  { name: 'Node.js',      category: 'Backend' },
  { name: 'Express',      category: 'Backend' },
  { name: 'Flask',        category: 'Backend' },
  { name: 'MongoDB',      category: 'Backend' },
  { name: 'PostgreSQL',   category: 'Backend' },
  { name: 'Supabase',     category: 'Backend' },
  { name: 'Python',       category: 'AI/ML' },
  { name: 'Pandas',       category: 'AI/ML' },
  { name: 'NumPy',        category: 'AI/ML' },
  { name: 'Git',          category: 'Tools' },
  { name: 'Postman',      category: 'Tools' },
  { name: 'JMeter',       category: 'Tools' },
]

export const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering (AI)',
    institution: 'Parul University',
    location: 'Vadodara, Gujarat',
    period: '2022 – 2026',
    desc: 'Specialisation in Artificial Intelligence. Coursework: ML, data structures, algorithms, computer networks, digital electronics, and full-stack development.',
    highlight: 'Final year · Graduating 2026',
  },
]

export const experienceCards = [
  {
    role: 'React Native Developer — Intern',
    company: 'Frontend Development',
    location: 'Vadodara, Gujarat',
    period: 'Jan 2026 – Apr 2026',
    type: 'Full-time Internship',
    points: [
      'Built and maintained React Native mobile features for a live production app',
      'Implemented REST API integrations and Redux Toolkit state management',
      'Worked with component-based architecture across design and backend teams',
      'Iterated on UI components based on PR feedback for production readiness',
    ],
    tags: ['React Native', 'Expo', 'Redux Toolkit', 'REST APIs'],
  },
]
