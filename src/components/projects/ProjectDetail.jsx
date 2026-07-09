import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiGithub, FiExternalLink, FiLayers, FiZap, FiBarChart2, FiCode } from 'react-icons/fi'
import { projects } from '@/data/projects'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { cn } from '@/utils/cn'

// ── Section wrapper used throughout ─────────────────────────────────────────
function DetailSection({ icon, title, children, delay = 0 }) {
  return (
    <ScrollReveal delay={delay} className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)]">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-[var(--color-text)]">{title}</h2>
      </div>
      {children}
    </ScrollReveal>
  )
}

// ── Architecture list ────────────────────────────────────────────────────────
function ArchitectureList({ items, accent }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-sm"
        >
          <span
            className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
            style={{ background: accent + '22', color: accent }}
          >
            {i + 1}
          </span>
          <span className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item}</span>
        </motion.div>
      ))}
    </div>
  )
}

// ── Challenge cards ──────────────────────────────────────────────────────────
function ChallengeCard({ challenge, accent, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl p-5 border overflow-hidden"
      style={{
        background: `linear-gradient(155deg, ${accent}12, rgba(255,255,255,0.02))`,
        borderColor: accent + '33',
        backdropFilter: 'blur(14px)',
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: accent + '22' }}
        >
          <FiZap size={14} style={{ color: accent }} />
        </div>
        <h3 className="text-sm font-bold text-[var(--color-text)] leading-snug pt-1">
          {challenge.title}
        </h3>
      </div>
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed pl-11">
        {challenge.desc}
      </p>
    </motion.div>
  )
}

// ── Metrics grid ─────────────────────────────────────────────────────────────
function MetricsGrid({ metrics, accent }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-center p-5 rounded-2xl border overflow-hidden"
          style={{
            background: `${accent}0e`,
            borderColor: `${accent}33`,
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="text-3xl font-bold mb-1" style={{ color: accent }}>{m.value}</div>
          <div className="text-xs text-[var(--color-text-muted)] leading-snug">{m.label}</div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full blur-2xl pointer-events-none" style={{ background: accent + '18' }} />
        </motion.div>
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <main className="min-h-screen pt-32 pb-16 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Project not found</h1>
        <Link to="/projects" className="text-[var(--color-accent)] hover:underline">
          ← Back to projects
        </Link>
      </main>
    )
  }

  const {
    title, tagline, desc, category, tags, github, live,
    accent, accentBg, year, status,
    architecture, challenges, screenshots, metrics,
  } = project

  // prev/next navigation
  const idx = projects.findIndex((p) => p.id === id)
  const prev = projects[idx - 1] ?? null
  const next = projects[idx + 1] ?? null

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <button
            onClick={() => navigate('/projects')}
            data-cursor="hover"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors group"
          >
            <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            All projects
          </button>
        </motion.div>

        {/* ── Hero header ── */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category + status badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full border"
                style={{ color: accent, borderColor: accent + '44', background: accentBg }}
              >
                {category}
              </span>
              <span
                className={cn(
                  'text-xs font-semibold px-3 py-1 rounded-full border',
                  status === 'Live'
                    ? 'text-[var(--color-accent-3)] border-[var(--color-accent-3)]/30 bg-[var(--color-accent-3)]/10'
                    : 'text-[var(--color-text-faint)] border-[var(--color-border)] bg-[var(--color-surface)]',
                )}
              >
                {status === 'Live' && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent-3)] mr-1.5 animate-pulse" />
                )}
                {status}
              </span>
              <span className="text-xs text-[var(--color-text-faint)] ml-2">{year}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              {title}
              <span style={{ color: accent }}>.</span>
            </h1>

            <p className="text-lg md:text-xl font-medium mb-4" style={{ color: accent }}>
              {tagline}
            </p>

            <p className="text-[var(--color-text-muted)] text-base leading-relaxed max-w-2xl mb-8">
              {desc}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-all backdrop-blur-sm"
              >
                <FiGithub size={15} /> View on GitHub
              </a>
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
                    boxShadow: `0 0 20px ${accent}44`,
                  }}
                >
                  <FiExternalLink size={15} /> Live demo
                </a>
              )}
            </div>

            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border-hover)] to-transparent mb-16" />

        {/* ── Metrics ── */}
        <DetailSection icon={<FiBarChart2 size={16} />} title="By the numbers" delay={0}>
          <MetricsGrid metrics={metrics} accent={accent} />
        </DetailSection>

        {/* ── Architecture ── */}
        <DetailSection icon={<FiLayers size={16} />} title="Architecture" delay={0.05}>
          <ArchitectureList items={architecture} accent={accent} />
        </DetailSection>

        {/* ── Challenges ── */}
        {challenges.length > 0 && (
          <DetailSection icon={<FiZap size={16} />} title="Challenges & solutions" delay={0.05}>
            <div className="space-y-4">
              {challenges.map((c, i) => (
                <ChallengeCard key={i} challenge={c} accent={accent} index={i} />
              ))}
            </div>
          </DetailSection>
        )}

        {/* ── Tech stack deep dive ── */}
        <DetailSection icon={<FiCode size={16} />} title="Tech stack" delay={0.05}>
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="px-4 py-2 rounded-xl border text-sm font-medium"
                style={{
                  background: accentBg,
                  borderColor: accent + '44',
                  color: 'var(--color-text)',
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </DetailSection>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border-hover)] to-transparent mb-12" />

        {/* ── Prev / Next navigation ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              to={`/projects/${prev.id}`}
              data-cursor="hover"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-hover)] transition-all backdrop-blur-sm"
            >
              <FiArrowLeft size={18} className="text-[var(--color-text-muted)] group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-xs text-[var(--color-text-faint)] mb-1">Previous</div>
                <div className="text-sm font-semibold text-[var(--color-text)]">{prev.title}</div>
              </div>
            </Link>
          ) : <div />}

          {next && (
            <Link
              to={`/projects/${next.id}`}
              data-cursor="hover"
              className="group flex items-center justify-end gap-4 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-hover)] transition-all backdrop-blur-sm text-right"
            >
              <div>
                <div className="text-xs text-[var(--color-text-faint)] mb-1">Next</div>
                <div className="text-sm font-semibold text-[var(--color-text)]">{next.title}</div>
              </div>
              <FiArrowLeft
                size={18}
                className="text-[var(--color-text-muted)] rotate-180 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </div>

      </div>
    </main>
  )
}
