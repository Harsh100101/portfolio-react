import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { techStack } from '@/data/about'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'

const CATEGORY_COLORS = {
  Mobile:   '#6e72ff',
  Frontend: '#34d8c4',
  State:    '#b06bff',
  Backend:  '#fb923c',
  'AI/ML':  '#f43f5e',
  Tools:    '#facc15',
}

// Split into two rows for the dual-direction marquee
const ROW_1 = techStack.filter((_, i) => i % 2 === 0)
const ROW_2 = techStack.filter((_, i) => i % 2 !== 0)

function MarqueeRow({ items, direction = 1, speed = 40 }) {
  const duration = items.length * (80 / speed)
  return (
    <div className="overflow-hidden relative">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-3 w-max py-2"
        animate={{ x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {/* doubled for seamless loop */}
        {[...items, ...items].map((tech, i) => {
          const color = CATEGORY_COLORS[tech.category] ?? '#6e72ff'
          return (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border whitespace-nowrap"
              style={{
                background: `${color}12`,
                borderColor: `${color}33`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              <span className="text-sm font-medium text-[var(--color-text-muted)]">
                {tech.name}
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default function TechStackSection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="px-6 max-w-6xl mx-auto mb-12">
        <ScrollReveal>
          <SectionLabel className="mb-4">What I build with</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-lg">
            The tools and technologies I reach for across mobile, web, backend, and AI — colour-coded by category.
          </p>
        </ScrollReveal>
      </div>

      {/* Legend */}
      <ScrollReveal className="px-6 max-w-6xl mx-auto mb-10">
        <div className="flex flex-wrap gap-3">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              {cat}
            </div>
          ))}
        </div>
      </ScrollReveal>

      <div className="space-y-3">
        <MarqueeRow items={ROW_1} direction={1}  speed={35} />
        <MarqueeRow items={ROW_2} direction={-1} speed={28} />
      </div>
    </section>
  )
}
