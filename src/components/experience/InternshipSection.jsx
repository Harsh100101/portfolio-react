import { motion } from 'framer-motion'
import { FiBriefcase, FiMapPin, FiCalendar, FiCheck, FiClock } from 'react-icons/fi'
import { workExperience } from '@/data/experience'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'

function ImpactMetric({ label, value, accent, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="text-center p-4 rounded-2xl border"
      style={{
        background: `${accent}0e`,
        borderColor: `${accent}33`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="text-2xl font-bold mb-0.5" style={{ color: accent }}>{value}</div>
      <div className="text-xs text-[var(--color-text-faint)] leading-snug">{label}</div>
    </motion.div>
  )
}

export default function InternshipSection() {
  return (
    <section className="py-8 px-6 max-w-6xl mx-auto">
      <ScrollReveal className="mb-12">
        <SectionLabel className="mb-4">Work experience</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="text-gradient">Internship</span>
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-md">
          Real production work — not just side projects or tutorials.
        </p>
      </ScrollReveal>

      {workExperience.map((exp, ei) => (
        <ScrollReveal key={exp.id} delay={0.05}>
          <div
            className="relative rounded-3xl border overflow-hidden mb-6 last:mb-0"
            style={{
              background: `linear-gradient(155deg, ${exp.accentBg}, rgba(255,255,255,0.02))`,
              borderColor: `${exp.accent}33`,
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Top shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {/* Accent side bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
              style={{ background: `linear-gradient(to bottom, ${exp.accent}, ${exp.accent}44)` }}
            />

            <div className="p-7 pl-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent}99)`,
                      boxShadow: `0 8px 24px ${exp.accent}44`,
                    }}
                  >
                    {exp.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-1">{exp.role}</h3>
                    <div className="text-sm font-semibold mb-2" style={{ color: exp.accent }}>
                      {exp.company}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default">
                        <FiCalendar size={10} /> {exp.period}
                      </Badge>
                      <Badge variant="default">
                        <FiMapPin size={10} /> {exp.location}
                      </Badge>
                      <Badge variant="default">
                        <FiClock size={10} /> {exp.duration}
                      </Badge>
                    </div>
                  </div>
                </div>
                <span
                  className="self-start text-xs font-semibold px-3 py-1.5 rounded-xl border"
                  style={{ color: exp.accent, borderColor: `${exp.accent}44`, background: exp.accentBg }}
                >
                  {exp.type}
                </span>
              </div>

              {/* Description */}
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-7 max-w-2xl">
                {exp.desc}
              </p>

              {/* Impact metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {exp.impact.map((m, i) => (
                  <ImpactMetric
                    key={m.label}
                    label={m.label}
                    value={m.value}
                    accent={exp.accent}
                    delay={0.1 + i * 0.07}
                  />
                ))}
              </div>

              {/* Bullet points */}
              <div className="mb-7">
                <div className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-faint)] mb-4">
                  What I did
                </div>
                <ul className="space-y-3">
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
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: exp.accent }}
                      />
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </section>
  )
}
