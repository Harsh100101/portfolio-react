import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import Badge from '@/components/ui/Badge'
import useTilt from '@/hooks/useTilt'
import { cn } from '@/utils/cn'

export default function ProjectCard({ project, index }) {
  const { id, title, tagline, desc, category, tags, github, live, size, accent, accentBg, year, status } = project
  const tilt = useTilt(10)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={cn(size === 'large' && 'md:col-span-2')}
      style={{ perspective: '1000px' }}
    >
      <Link to={`/projects/${id}`} data-cursor="hover" className="block h-full group">
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMove}
          onMouseLeave={tilt.onLeave}
          style={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            transformStyle: 'preserve-3d',
            background: `linear-gradient(155deg, ${accentBg}, rgba(255,255,255,0.02))`,
            backdropFilter: 'blur(16px)',
          }}
          className="relative h-full rounded-2xl border border-[var(--color-border)] overflow-hidden will-change-transform
            transition-[border-color] duration-300 group-hover:border-[var(--color-border-hover)]"
        >
          {/* Top shine */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {/* Accent top bar on hover */}
          <div className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
          {/* Cursor spotlight */}
          <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: tilt.spotBg }} />

          <div className="relative p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                    style={{ color: accent, borderColor: `${accent}44`, background: accentBg }}>
                    {category}
                  </span>
                  <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full border',
                    status === 'Live'
                      ? 'text-[var(--color-accent-3)] border-[var(--color-accent-3)]/30 bg-[var(--color-accent-3)]/10'
                      : 'text-[var(--color-text-faint)] border-[var(--color-border)] bg-[var(--color-surface)]')}>
                    {status === 'Live' && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent-3)] mr-1.5 animate-pulse" />
                    )}
                    {status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0" onClick={e => e.preventDefault()}>
                {live && (
                  <a href={live} target="_blank" rel="noopener noreferrer" data-cursor="hover"
                    className="p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all">
                    <FiExternalLink size={14} />
                  </a>
                )}
                <a href={github} target="_blank" rel="noopener noreferrer" data-cursor="hover"
                  className="p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all">
                  <FiGithub size={14} />
                </a>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[var(--color-text)] leading-snug mb-1">{title}</h3>
            <p className="text-sm font-medium mb-3" style={{ color: accent }}>{tagline}</p>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1 mb-5">{desc}</p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {tags.slice(0, 5).map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                  {t}
                </span>
              ))}
              {tags.length > 5 && (
                <span className="text-xs px-2.5 py-1 rounded-lg text-[var(--color-text-faint)]">+{tags.length - 5}</span>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
              <span className="text-xs text-[var(--color-text-faint)]">{year}</span>
              <span className="flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all duration-200"
                style={{ color: accent }}>
                View details
                <FiArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
