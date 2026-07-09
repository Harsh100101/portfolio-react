import { motion } from 'framer-motion'
import { FiCheck, FiCalendar } from 'react-icons/fi'
import { AchievementIcon } from '@/utils/achievementIcons'
import useTilt from '@/hooks/useTilt'
import { cn } from '@/utils/cn'

export default function AchievementCard({ item, index, featured = false }) {
  const { icon, title, org, date, accent, accentBg, desc, highlights, tags, impact, category } = item
  const tilt = useTilt(10)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={cn(featured && 'md:col-span-2')}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.onLeave}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: 'preserve-3d',
          background: `linear-gradient(155deg, ${accentBg}, rgba(255,255,255,0.02))`,
          borderColor: `${accent}33`,
          backdropFilter: 'blur(18px)',
        }}
        className="relative h-full rounded-2xl border overflow-hidden will-change-transform"
      >
        {/* Top shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        {/* Accent hover top bar */}
        <div className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
        {/* Cursor spotlight */}
        <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: tilt.spotBg }} />

        <div className="relative p-6 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${accent}20` }}>
                <AchievementIcon name={icon} size={22} color={accent} />
              </div>
              <div>
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border mb-2"
                  style={{ color: accent, borderColor: `${accent}44`, background: `${accent}15` }}>
                  {category}
                </span>
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-faint)]">
                  <FiCalendar size={10} />
                  <span>{date}</span>
                  <span>·</span>
                  <span>{org}</span>
                </div>
              </div>
            </div>
            {featured && (
              <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border flex-shrink-0"
                style={{ color: accent, borderColor: `${accent}44`, background: `${accent}15` }}>
                ★ Featured
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-[var(--color-text)] leading-snug mb-2">{title}</h3>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5 flex-1">{desc}</p>

          <ul className="space-y-2 mb-5">
            {highlights.map((h, i) => (
              <motion.li key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-2.5 text-sm text-[var(--color-text-muted)]">
                <FiCheck size={13} className="flex-shrink-0 mt-0.5" style={{ color: accent }} />
                {h}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {tags.map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-lg border"
                style={{ background: `${accent}0e`, borderColor: `${accent}2a`, color: 'var(--color-text-muted)' }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm"
            style={{ background: `${accent}10`, borderColor: `${accent}33` }}>
            <span style={{ color: accent }}>→</span>
            <span className="text-[var(--color-text-muted)]">{impact}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
