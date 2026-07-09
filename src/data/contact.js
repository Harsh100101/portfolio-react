// ─────────────────────────────────────────────
//  DATA — Contact Page
// ─────────────────────────────────────────────
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi'

export const socialLinks = [
  {
    label: 'GitHub',
    handle: '@Harsh100101',
    href: 'https://github.com/Harsh100101',
    icon: 'github',
    accent: '#a78bfa',
    desc: '22+ repos — projects, research, experiments',
  },
  {
    label: 'LinkedIn',
    handle: 'harsh-sorathiya',
    href: 'https://linkedin.com/in/harsh-sorathiya',
    icon: 'linkedin',
    accent: '#0a66c2',
    desc: 'Professional updates, work history, posts',
  },
  {
    label: 'Email',
    handle: 'harshsorathiya01@gmail.com',
    href: 'mailto:harshsorathiya01@gmail.com',
    icon: 'mail',
    accent: '#6e72ff',
    desc: 'Fastest way to reach me — reply within 24h',
  },
]

export const availability = [
  { label: 'Status',     value: 'Available',         highlight: true },
  { label: 'Type',       value: 'Full-time · Freelance' },
  { label: 'Location',   value: 'Gujarat, India' },
  { label: 'Remote',     value: 'Open to remote' },
  { label: 'Response',   value: 'Within 24 hours' },
  { label: 'Notice',     value: 'Immediate joinee' },
]

export const faqs = [
  {
    q: 'What roles are you looking for?',
    a: 'React Native developer, React.js developer, or frontend engineer roles. Full-stack is fine if it is 60%+ frontend. Gujarat-first, but open to Pune, Noida, Bengaluru, and fully remote teams.',
  },
  {
    q: 'Are you open to freelance projects?',
    a: 'Yes — mobile apps, web apps, and frontend builds. I work best on well-scoped projects with clear requirements. Reach out with details and I\'ll give you a straight answer on timeline and fit.',
  },
  {
    q: 'What is your expected notice period?',
    a: 'Immediate joiner. No notice period required — I can start as soon as agreements are in place.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. I have worked with async remote setups and am comfortable with timezone overlap windows. Time zones in Europe, US East Coast, and Gulf are manageable.',
  },
]
