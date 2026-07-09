import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar, FiBookOpen, FiCheckCircle } from 'react-icons/fi'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'

const INFO = [
  { icon: <FiMapPin size={14} />,      label: 'Location',   value: 'Gujarat, India' },
  { icon: <FiCalendar size={14} />,    label: 'Graduation', value: '2026 · Parul University' },
  { icon: <FiBookOpen size={14} />,    label: 'Degree',     value: 'B.Tech CSE (AI)' },
  { icon: <FiCheckCircle size={14} />, label: 'Status',     value: 'Available for work' },
]

export default function AboutHero() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <div>
          <ScrollReveal>
            <SectionLabel className="mb-4">Who I am</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              About{' '}
              <span className="text-gradient">me</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-4">
              I'm <strong className="text-[var(--color-text)]">Harsh Sorathiya</strong>, a React Native
              and frontend developer from Gujarat, India. I completed my React Native
              internship (Jan–Apr 2026) and I'm in my final year of B.Tech CSE (AI) at
              Parul University, Vadodara.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[var(--color-text-muted)] text-base leading-relaxed mb-4">
              My focus is on <strong className="text-[var(--color-text)]">mobile and web apps that feel right</strong> —
              fast to load, intuitive to use, clean to maintain. I've been writing React Native
              since early 2026, and I've worked across the stack with React.js, Redux Toolkit,
              Node.js, Flask, PostgreSQL, and Supabase.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-[var(--color-text-muted)] text-base leading-relaxed mb-8">
              In Oct 2025, I published a paper in{' '}
              <strong className="text-[var(--color-text)]">IJSET</strong> on personalised
              recommendation systems, which I then built into a real full-stack platform
              (The Next Read) — load-tested at 200 concurrent users. I also led my team in
              a healthcare AI hackathon at Parul University.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <div className="flex flex-wrap gap-2">
              <Badge variant="accent" dot>Available for work</Badge>
              <Badge variant="gradient">Gujarat · Remote OK</Badge>
              <Badge variant="accent2">React Native · React.js</Badge>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — info card */}
        <ScrollReveal delay={0.15} variant="scale">
          <GlassCard tilt glow className="group">
            <div className="mb-6 flex items-center gap-4">
              {/* Avatar placeholder with initials */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center shadow-[0_0_24px_rgba(110,114,255,0.4)]">
                <span className="text-2xl font-bold text-white">HS</span>
              </div>
              <div>
                <div className="font-bold text-lg text-[var(--color-text)]">Harsh Sorathiya</div>
                <div className="text-sm text-[var(--color-text-muted)]">React Native & Frontend Developer</div>
              </div>
            </div>

            <div className="space-y-3">
              {INFO.map(({ icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between py-2.5 border-b border-[var(--color-border)] last:border-0"
                >
                  <div className="flex items-center gap-2 text-[var(--color-text-faint)] text-sm">
                    {icon}
                    <span>{label}</span>
                  </div>
                  <span
                    className="text-sm font-medium text-[var(--color-text)]"
                    style={{ color: label === 'Status' ? 'var(--color-accent-3)' : undefined }}
                  >
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none" />
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  )
}
