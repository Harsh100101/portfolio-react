import { motion } from 'framer-motion'
import { FiBookOpen, FiMapPin, FiCalendar, FiAward } from 'react-icons/fi'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { education } from '@/data/about'

export default function EducationSection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal className="mb-14">
        <SectionLabel className="mb-4">Academic background</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="text-gradient">Education</span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, i) => (
          <ScrollReveal key={i} delay={i * 0.1} variant="scale">
            <GlassCard tilt glow className="group h-full">
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-2)]/10 border border-[var(--color-border)] flex items-center justify-center mb-5">
                <FiBookOpen size={20} className="text-[var(--color-accent)]" />
              </div>

              <h3 className="text-lg font-bold text-[var(--color-text)] leading-snug mb-2">
                {edu.degree}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="accent">
                  <FiCalendar size={10} />
                  {edu.period}
                </Badge>
                <Badge variant="default">
                  <FiMapPin size={10} />
                  {edu.location}
                </Badge>
              </div>

              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                {edu.desc}
              </p>

              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border"
                style={{
                  background: 'rgba(52,216,196,0.1)',
                  borderColor: 'rgba(52,216,196,0.3)',
                  color: 'var(--color-accent-3)',
                }}
              >
                <FiAward size={11} />
                {edu.highlight}
              </div>

              {/* Glow */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--color-accent)]/8 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </GlassCard>
          </ScrollReveal>
        ))}

        {/* Research paper card */}
        <ScrollReveal delay={0.15} variant="scale">
          <GlassCard tilt className="group h-full"
            style={{
              background: 'linear-gradient(155deg, rgba(176,107,255,0.1), rgba(255,255,255,0.02))',
              borderColor: 'rgba(176,107,255,0.25)',
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-[rgba(176,107,255,0.15)] border border-[rgba(176,107,255,0.25)] flex items-center justify-center mb-5">
              <FiAward size={20} style={{ color: '#b06bff' }} />
            </div>

            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border mb-3"
              style={{ background: 'rgba(176,107,255,0.12)', borderColor: 'rgba(176,107,255,0.3)', color: '#b06bff' }}
            >
              Published Research
            </div>

            <h3 className="text-lg font-bold text-[var(--color-text)] leading-snug mb-2">
              Personalised Recommendation Systems
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="default">
                <FiCalendar size={10} />
                Oct 2025
              </Badge>
              <Badge variant="default">IJSET</Badge>
            </div>

            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Peer-reviewed paper covering collaborative filtering, content-based approaches,
              and hybrid ML pipelines for personalised recommendations. Directly informed
              the AI engine in The Next Read — load-tested at 200 concurrent users.
            </p>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#b06bff]/8 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  )
}
