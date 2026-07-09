import { NavLink } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import MagneticButton from '@/components/animations/MagneticButton'
import { cn } from '@/utils/cn'

const SOCIAL = [
  { icon: <FiGithub size={18} />,   href: 'https://github.com/Harsh100101',                label: 'GitHub' },
  { icon: <FiLinkedin size={18} />, href: 'https://linkedin.com/in/harsh-sorathiya',        label: 'LinkedIn' },
  { icon: <FiMail size={18} />,     href: 'mailto:harshsorathiya01@gmail.com',               label: 'Email' },
]

const LINKS = [
  { to: '/about',         label: 'About' },
  { to: '/projects',      label: 'Projects' },
  { to: '/experience',    label: 'Experience' },
  { to: '/achievements',  label: 'Achievements' },
  { to: '/contact',       label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--color-border)] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <NavLink to="/" className="text-xl font-bold tracking-tight">
              <span className="text-gradient">HS</span>
              <span className="text-[var(--color-text-faint)]">.</span>
            </NavLink>
            <p className="mt-2 text-sm text-[var(--color-text-faint)] max-w-xs">
              React Native & Frontend Developer. Building products people love.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                data-cursor="hover"
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {SOCIAL.map(({ icon, href, label }) => (
              <MagneticButton key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="hover"
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-xl',
                    'glass transition-[background,border-color] duration-200',
                    'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
                    'hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)]',
                  )}
                >
                  {icon}
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-faint)]">
          <span>© 2026 Harsh Sorathiya. All rights reserved.</span>
          <span>Built with React 19 · Vite · Tailwind · Framer Motion</span>
        </div>
      </div>
    </footer>
  )
}
