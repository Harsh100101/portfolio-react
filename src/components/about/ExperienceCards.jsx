import { motion } from 'framer-motion'
import { FiBriefcase, FiMapPin, FiCalendar, FiCheck } from 'react-icons/fi'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { experienceCards } from '@/data/about'

export default function ExperienceCards() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal className="mb-14">
        <SectionLabel className="mb-4">Where I've worked</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="text-gradient">Experience</span>
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-md">
          Real production work — not just side projects.
        </p>
      </ScrollReveal>

      <StaggerChildren stagger={0.1}>
        {experienceCards.map((exp) => (
          <StaggerItem key={exp.role}>
            <GlassCard tilt glow className="group mb-6 last:mb-0">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-2)]/10 border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
                    <FiBriefcase size={20} className="text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text)] leading-snug mb-1">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-[var(--color-accent)]">
                      {exp.company}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:text-right shrink-0">
                  <Badge variant="accent">
                    <FiCalendar size={10} />
                    {exp.period}
                  </Badge>
                  <Badge variant="default">
                    <FiMapPin size={10} />
                    {exp.location}
                  </Badge>
                </div>
              </div>

              {/* Bullet points */}
              <ul className="space-y-2.5 mb-6">
                {exp.points.map((pt, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3 text-sm text-[var(--color-text-muted)] leading-relaxed"
                  >
                    <FiCheck
                      size={14}
                      className="text-[var(--color-accent-3)] flex-shrink-0 mt-0.5"
                    />
                    {pt}
                  </motion.li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[var(--color-accent)]/8 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  )
}
