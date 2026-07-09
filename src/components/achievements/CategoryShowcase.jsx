import { motion } from 'framer-motion'
import { categoryMeta } from '@/data/achievements'
import { AchievementIcon } from '@/utils/achievementIcons'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import useTilt from '@/hooks/useTilt'

function DomainCard({ cat, meta }) {
  const tilt = useTilt(9)

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
          background: `linear-gradient(155deg, ${meta.color}12, rgba(255,255,255,0.02))`,
          borderColor: `${meta.color}33`,
          backdropFilter: 'blur(14px)',
        }}
        className="relative rounded-2xl border p-5 overflow-hidden group cursor-default will-change-transform
          transition-[border-color] duration-300"
      >
        {/* Top shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* Hover glow */}
        <div
          className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `${meta.color}25` }}
        />
        {/* Cursor spotlight */}
        <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: tilt.spotBg }} />

        <div className="relative">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: `${meta.color}20` }}
          >
            <AchievementIcon name={meta.icon} size={22} color={meta.color} />
          </div>
          <h3 className="text-base font-bold text-[var(--color-text)] mb-1">{cat}</h3>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{meta.desc}</p>

          <div
            className="mt-4 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-full"
            style={{ background: `linear-gradient(90deg, ${meta.color}, transparent)` }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function CategoryShowcase() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <ScrollReveal className="mb-10">
        <SectionLabel className="mb-4">By domain</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          What I've <span className="text-gradient">pursued</span>
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-md">
          Achievements span technical, academic, leadership, and athletic domains.
        </p>
      </ScrollReveal>

      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.07}>
        {Object.entries(categoryMeta).map(([cat, meta]) => (
          <StaggerItem key={cat}>
            <DomainCard cat={cat} meta={meta} />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  )
}
