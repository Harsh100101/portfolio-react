import { motion } from 'framer-motion'
import { FiCalendar } from 'react-icons/fi'
import { certifications } from '@/data/experience'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import useTilt from '@/hooks/useTilt'

const CATEGORY_ICONS = {
  Research:   '📄',
  Leadership: '🏆',
  Education:  '🎓',
}

function CertCard({ cert }) {
  const { title, issuer, date, category, accent, desc, credentialId, skills } = cert
  const tilt = useTilt(10)

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: 'preserve-3d',
          background: `linear-gradient(155deg, ${accent}10, rgba(255,255,255,0.02))`,
          borderColor: `${accent}33`,
          backdropFilter: 'blur(16px)',
        }}
        className="relative rounded-2xl p-6 border h-full overflow-hidden group will-change-transform
          transition-[border-color] duration-300 hover:border-[var(--color-border-hover)]"
      >
        {/* Top shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* Hover glow */}
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `${accent}22` }} />
        {/* Cursor spotlight */}
        <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: tilt.spotBg }} />

        <div className="relative flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `${accent}20` }}>
              {CATEGORY_ICONS[category] ?? '🏅'}
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border self-start"
              style={{ color: accent, borderColor: `${accent}44`, background: `${accent}15` }}>
              {category}
            </span>
          </div>

          <h3 className="text-base font-bold text-[var(--color-text)] leading-snug mb-2">{title}</h3>
          <div className="text-xs font-semibold mb-1" style={{ color: accent }}>{issuer}</div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-faint)] mb-4">
            <FiCalendar size={10} />{date}
          </div>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5 flex-1">{desc}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills.map(s => (
              <span key={s} className="text-xs px-2 py-1 rounded-lg border"
                style={{ background: `${accent}10`, borderColor: `${accent}33`, color: 'var(--color-text-muted)' }}>
                {s}
              </span>
            ))}
          </div>
          <div className="text-[10px] font-mono text-[var(--color-text-faint)] border-t border-[var(--color-border)] pt-3">
            ID: {credentialId}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function CertificationsSection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal className="mb-14">
        <SectionLabel className="mb-4">Credentials & achievements</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="text-gradient">Certifications</span>
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-md">
          Research, leadership, and academic credentials that shaped my thinking.
        </p>
      </ScrollReveal>
      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
        {certifications.map(cert => (
          <StaggerItem key={cert.id}>
            <CertCard cert={cert} />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  )
}
