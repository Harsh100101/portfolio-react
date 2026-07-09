import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { appleTimeline, typeColors } from '@/data/experience'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'

// ── Single timeline node ─────────────────────────────────────────────────────
function TimelineNode({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const color = item.color
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center"
      style={{ minWidth: '180px', maxWidth: '200px' }}
    >
      {/* Content above or below the stem, alternating */}
      <div className={`flex flex-col items-center w-full ${isEven ? 'flex-col' : 'flex-col-reverse'}`}>
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: isEven ? -20 : 20, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full mb-4 ${isEven ? 'mt-0 mb-6' : 'mt-6 mb-0'}`}
        >
          <div
            className="rounded-xl p-3.5 border text-center"
            style={{
              background: `${color}14`,
              borderColor: `${color}33`,
              backdropFilter: 'blur(12px)',
            }}
          >
            {item.milestone && (
              <div
                className="text-[10px] font-bold tracking-widest uppercase mb-1.5"
                style={{ color }}
              >
                ★ Milestone
              </div>
            )}
            <div className="text-xs font-bold text-[var(--color-text)] leading-snug mb-1">
              {item.title}
            </div>
            <div className="text-[11px] text-[var(--color-text-muted)] leading-snug">
              {item.subtitle}
            </div>
          </div>
        </motion.div>

        {/* Stem connecting card to track */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.06 + 0.1 }}
          className="w-px h-8 origin-top flex-shrink-0"
          style={{ background: `linear-gradient(to bottom, ${color}66, ${color}22)` }}
        />
      </div>

      {/* Track dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{
          duration: 0.45,
          delay: index * 0.06 + 0.15,
          type: 'spring',
          stiffness: 280,
          damping: 18,
        }}
        className="w-4 h-4 rounded-full border-2 border-[var(--color-bg)] z-10 flex-shrink-0"
        style={{
          background: color,
          boxShadow: item.milestone
            ? `0 0 0 4px ${color}33, 0 0 20px ${color}88`
            : `0 0 0 3px ${color}22, 0 0 10px ${color}55`,
        }}
      />

      {/* Date label below dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.06 + 0.25 }}
        className="mt-3 text-center"
      >
        <div className="text-xs font-bold text-[var(--color-text-faint)]">{item.year}</div>
        <div className="text-[10px] text-[var(--color-text-faint)] opacity-70">{item.quarter}</div>
      </motion.div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AppleTimeline() {
  const scrollRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: scrollRef })
  const lineWidth = useTransform(scrollXProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="py-24 overflow-hidden">
      <div className="px-6 max-w-6xl mx-auto mb-12">
        <ScrollReveal>
          <SectionLabel className="mb-4">Career path</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            The <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-lg">
            Scroll horizontally to explore every milestone — education, work,
            research, and projects in chronological order.
          </p>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-8 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Fade edges */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-8 w-20 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-8 w-20 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-20 pointer-events-none" />

          <div className="flex items-center px-20 gap-0" style={{ width: 'max-content', minWidth: '100%' }}>
            {/* Nodes — alternating above/below */}
            <div className="flex items-center gap-0">
              {appleTimeline.map((item, i) => (
                <div key={item.year + item.title} className="flex items-center">
                  <TimelineNode item={item} index={i} />
                  {/* Track segment between nodes */}
                  {i < appleTimeline.length - 1 && (
                    <div className="w-10 flex-shrink-0 relative" style={{ marginTop: '2px' }}>
                      <div className="h-px w-full bg-[var(--color-border-hover)]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <ScrollReveal className="px-6 max-w-6xl mx-auto mt-6">
        <div className="flex flex-wrap gap-4 justify-center">
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] capitalize">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              {type}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
