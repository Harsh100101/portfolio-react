import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { journey, typeColors } from '@/data/about'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const color = typeColors[item.type]
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0
        ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content card — takes up ~45% each side on desktop */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-[45%]"
      >
        <div
          className="relative rounded-2xl p-5 border transition-all duration-300 group
            hover:border-[var(--color-border-hover)] hover:-translate-y-1"
          style={{
            background: `linear-gradient(155deg, ${color.bg}, rgba(255,255,255,0.02))`,
            border: `1px solid ${color.border}`,
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Top shine */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-t-2xl" />

          {/* Year badge */}
          <div
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 border"
            style={{ background: color.bg, borderColor: color.border, color: color.dot }}
          >
            {item.year}
          </div>

          <h3 className="text-base font-bold text-[var(--color-text)] mb-1 leading-snug">
            {item.title}
          </h3>
          <div className="text-xs font-medium mb-3" style={{ color: color.dot }}>
            {item.org}
          </div>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {item.desc}
          </p>

          {/* Type label badge */}
          <div className="mt-4 flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: color.dot }}
            />
            <span className="text-xs tracking-wider uppercase font-semibold" style={{ color: color.dot }}>
              {color.label}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Center stem + dot — visible on md+ */}
      <div className="hidden md:flex flex-col items-center w-[10%] flex-shrink-0 self-stretch">
        {/* Connecting line above */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex-1 w-px origin-top"
          style={{ background: `linear-gradient(to bottom, ${color.dot}55, ${color.dot}11)` }}
        />

        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
          className="w-4 h-4 rounded-full border-2 border-[var(--color-bg)] flex-shrink-0 z-10"
          style={{
            background: color.dot,
            boxShadow: `0 0 0 4px ${color.bg}, 0 0 16px ${color.dot}80`,
          }}
        />

        {/* Connecting line below */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="flex-1 w-px origin-top"
          style={{ background: `linear-gradient(to bottom, ${color.dot}11, transparent)` }}
        />
      </div>

      {/* Spacer for the other side on desktop */}
      <div className="hidden md:block w-[45%]" />

      {/* Mobile-only: left dot + line */}
      <div className="flex md:hidden flex-col items-center w-5 flex-shrink-0 mt-1">
        <div
          className="w-3 h-3 rounded-full border-2 border-[var(--color-bg)]"
          style={{ background: color.dot, boxShadow: `0 0 8px ${color.dot}80` }}
        />
        <div className="w-px flex-1 mt-1" style={{ background: `${color.dot}33` }} />
      </div>
    </div>
  )
}

export default function JourneyTimeline() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal className="mb-16 text-center">
        <SectionLabel className="justify-center mb-4">My path</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold">
          The <span className="text-gradient">Journey</span>
        </h2>
        <p className="text-[var(--color-text-muted)] mt-3 max-w-md mx-auto">
          From first semester to production code — the milestones that shaped me.
        </p>
      </ScrollReveal>

      {/* Legend */}
      <ScrollReveal delay={0.1} className="flex flex-wrap justify-center gap-4 mb-16">
        {Object.entries(typeColors).map(([key, c]) => (
          <div key={key} className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-muted)]">
            <span className="w-2 h-2 rounded-full" style={{ background: c.dot }} />
            {c.label}
          </div>
        ))}
      </ScrollReveal>

      <div className="relative">
        {journey.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
