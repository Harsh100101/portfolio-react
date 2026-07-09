import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { skillCategories } from '@/data/about'
import SectionLabel from '@/components/ui/SectionLabel'
import GlassCard from '@/components/ui/GlassCard'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import useTilt from '@/hooks/useTilt'
import { cn } from '@/utils/cn'

const CATEGORY_COLORS = {
  Mobile:      { accent: '#6e72ff', bg: 'rgba(110,114,255,0.12)' },
  Frontend:    { accent: '#34d8c4', bg: 'rgba(52,216,196,0.12)' },
  'State & Data': { accent: '#b06bff', bg: 'rgba(176,107,255,0.12)' },
  Backend:     { accent: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  'AI & ML':   { accent: '#f43f5e', bg: 'rgba(244,63,94,0.12)' },
  Tools:       { accent: '#facc15', bg: 'rgba(250,204,21,0.12)' },
}

function SkillBar({ name, level, accent, inView, delay }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-[var(--color-text)]">{name}</span>
        <span className="text-xs font-semibold" style={{ color: accent }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full origin-left"
          style={{ background: `linear-gradient(90deg, ${accent}cc, ${accent})` }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

function CategoryCard({ cat, isActive, onClick }) {
  const inViewRef = useRef(null)
  const inView = useInView(inViewRef, { once: true, amount: 0.2 })
  const colors = CATEGORY_COLORS[cat.label] ?? { accent: '#6e72ff', bg: 'rgba(110,114,255,0.12)' }
  const tilt = useTilt(8)

  return (
    <div style={{ perspective: '1000px' }} onClick={onClick} data-cursor="hover" ref={inViewRef}>
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: 'preserve-3d',
          background: isActive
            ? `linear-gradient(155deg, ${colors.bg}, rgba(255,255,255,0.02))`
            : 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          borderColor: isActive ? colors.accent + '66' : undefined,
          backdropFilter: 'blur(16px)',
        }}
        className={cn(
          'relative rounded-2xl p-5 border transition-[border-color,background] duration-300 overflow-hidden cursor-pointer will-change-transform',
          isActive ? 'shadow-lg' : 'border-[var(--color-border)] hover:border-[var(--color-border-hover)]',
        )}
      >
        {/* Top shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* Cursor spotlight */}
        <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: tilt.spotBg }} />

        {/* Category header */}
        <div className="relative flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: colors.accent, boxShadow: `0 0 8px ${colors.accent}` }}
            />
            <span className="text-sm font-bold text-[var(--color-text)]">{cat.label}</span>
          </div>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full border"
            style={{ color: colors.accent, borderColor: colors.accent + '44', background: colors.bg }}
          >
            {cat.skills.length}
          </span>
        </div>

        {/* Skill bars */}
        {cat.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            accent={colors.accent}
            inView={inView}
            delay={0.1 + i * 0.08}
          />
        ))}

        {/* Active glow */}
        {isActive && (
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl pointer-events-none"
            style={{ background: colors.accent + '22' }}
          />
        )}
      </motion.div>
    </div>
  )
}

export default function SkillsGalaxy() {
  const [active, setActive] = useState(null)

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal className="mb-16">
        <SectionLabel className="mb-4">Capabilities</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          Skills <span className="text-gradient">Galaxy</span>
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-lg">
          Every skill category I've worked in — click a card to highlight it.
          Levels reflect honest self-assessment after real project use.
        </p>
      </ScrollReveal>

      <StaggerChildren
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        stagger={0.07}
      >
        {skillCategories.map((cat) => (
          <StaggerItem key={cat.label}>
            <CategoryCard
              cat={cat}
              isActive={active === cat.label}
              onClick={() => setActive(active === cat.label ? null : cat.label)}
            />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  )
}
