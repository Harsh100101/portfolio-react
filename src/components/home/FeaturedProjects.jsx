import { Link } from 'react-router-dom'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { cn } from '@/utils/cn'

const PROJECTS = [
  {
    title: 'The Next Read',
    desc: 'Full-stack AI book recommendation platform with hybrid ML engine, JWT auth, OTP verification, admin dashboard, and Supabase storage. Load-tested at 200 concurrent users.',
    tags: ['React.js', 'Flask', 'PostgreSQL', 'Supabase', 'JMeter'],
    badge: 'AI · Full-stack',
    badgeVariant: 'accent2',
    github: 'https://github.com/Harsh100101/Next-Read',
    live: null,
    featured: true,
    gradient: 'from-[var(--color-accent-2)]/20 to-[var(--color-accent)]/5',
  },
  {
    title: 'Amrutam Doctor Portal',
    desc: 'Doctor onboarding & practice management frontend for an Ayurvedic health platform. Live on GitHub Pages.',
    tags: ['React.js', 'Vite', 'CSS3'],
    badge: 'Healthcare · React',
    badgeVariant: 'green',
    github: 'https://github.com/Harsh100101/amrutam-doc-portal',
    live: 'https://harsh100101.github.io/amrutam-doc-portal/',
    featured: false,
    gradient: 'from-[var(--color-accent-3)]/15 to-transparent',
  },
  {
    title: 'Wellness Hub',
    desc: 'Dual-sided React Native marketplace connecting wellness providers and clients. Built with Expo and Redux Toolkit.',
    tags: ['React Native', 'Expo', 'Redux Toolkit'],
    badge: 'Mobile · React Native',
    badgeVariant: 'accent',
    github: 'https://github.com/Harsh100101',
    live: null,
    featured: false,
    gradient: 'from-[var(--color-accent)]/15 to-transparent',
  },
]

function ProjectCard({ project }) {
  const { title, desc, tags, badge, badgeVariant, github, live, featured, gradient } = project
  return (
    <StaggerItem>
      <GlassCard
        tilt
        glow={featured}
        className={cn('group h-full flex flex-col', featured && 'md:col-span-2')}
      >
        {/* Background gradient wash */}
        <div className={cn('absolute inset-0 rounded-[inherit] bg-gradient-to-br opacity-60 pointer-events-none', gradient)} />

        <div className="relative flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <Badge variant={badgeVariant}>{badge}</Badge>
            <div className="flex items-center gap-2" onClick={e => e.preventDefault()}>
              {live && (
                <a href={live} target="_blank" rel="noopener noreferrer" data-cursor="hover"
                  className="p-2 glass rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                  <FiExternalLink size={14} />
                </a>
              )}
              <a href={github} target="_blank" rel="noopener noreferrer" data-cursor="hover"
                className="p-2 glass rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                <FiGithub size={14} />
              </a>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-gradient transition-all duration-300">{title}</h3>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1 mb-4">{desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </StaggerItem>
  )
}

export default function FeaturedProjects() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal className="mb-12">
        <SectionLabel>Selected work</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-3">Projects</h2>
        <p className="text-[var(--color-text-muted)] max-w-md">Real products — from AI recommendation engines to healthcare portals.</p>
      </ScrollReveal>
      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10" stagger={0.1}>
        {PROJECTS.map(p => <ProjectCard key={p.title} project={p} />)}
      </StaggerChildren>
      <ScrollReveal delay={0.2}>
        <Link to="/projects" data-cursor="hover"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors group">
          View all projects
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
        </Link>
      </ScrollReveal>
    </section>
  )
}
