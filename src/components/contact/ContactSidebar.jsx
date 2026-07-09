import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import { socialLinks, availability } from '@/data/contact'
import AnimatedGlobe from './AnimatedGlobe'
import MagneticButton from '@/components/animations/MagneticButton'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { cn } from '@/utils/cn'

const ICON_MAP = {
  github: <FiGithub size={18} />,
  linkedin: <FiLinkedin size={18} />,
  mail: <FiMail size={18} />,
}

function SocialCard({ link, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <MagneticButton strength={0.2} className="block w-full">
        <a
          href={link.href}
          target={link.href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          data-cursor="hover"
          className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--color-border)] group
            hover:border-[var(--color-border-hover)] transition-all duration-300 w-full"
          style={{
            background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(14px)',
          }}
        >
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
            style={{ background: `${link.accent}18`, color: link.accent }}
          >
            {ICON_MAP[link.icon]}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-[var(--color-text)] mb-0.5">{link.label}</div>
            <div className="text-xs text-[var(--color-text-muted)] truncate">{link.handle}</div>
          </div>

          {/* Arrow */}
          <span
            className="text-[var(--color-text-faint)] group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0"
            style={{ color: link.accent }}
          >
            →
          </span>
        </a>
      </MagneticButton>
    </motion.div>
  )
}

export default function ContactSidebar() {
  return (
    <div className="space-y-8">
      {/* Globe */}
      <ScrollReveal variant="scale">
        <AnimatedGlobe />
      </ScrollReveal>

      {/* Availability card */}
      <ScrollReveal delay={0.1}>
        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            background: 'linear-gradient(155deg, rgba(110,114,255,0.08), rgba(255,255,255,0.02))',
            borderColor: 'rgba(110,114,255,0.25)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-3)] animate-pulse" />
              <span className="text-sm font-bold text-[var(--color-text)]">Currently available</span>
            </div>
            <div className="space-y-2.5">
              {availability.map(({ label, value, highlight }) => (
                <div key={label} className="flex items-center justify-between text-sm border-b border-[var(--color-border)] pb-2.5 last:border-0 last:pb-0">
                  <span className="text-[var(--color-text-muted)]">{label}</span>
                  <span
                    className="font-medium"
                    style={{ color: highlight ? 'var(--color-accent-3)' : 'var(--color-text)' }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Social links */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-faint)] mb-3 px-1">
          Find me on
        </p>
        <div className="space-y-3">
          {socialLinks.map((link, i) => (
            <SocialCard key={link.label} link={link} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
