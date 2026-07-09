import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import MagneticButton from '@/components/animations/MagneticButton'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { to: '/',            label: 'Home' },
  { to: '/about',       label: 'About' },
  { to: '/projects',    label: 'Projects' },
  { to: '/experience',  label: 'Experience' },
  { to: '/achievements',label: 'Achievements' },
  { to: '/contact',     label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 40)
  })

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 inset-x-0 z-50 flex items-center justify-between',
          'px-6 md:px-10 h-16',
          'transition-[background,border-color,backdrop-filter] duration-500',
          scrolled
            ? 'bg-[rgba(8,9,13,0.6)] backdrop-blur-2xl border-b border-[var(--color-border)]'
            : 'bg-transparent border-b border-transparent',
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <MagneticButton strength={0.25}>
          <NavLink
            to="/"
            className="font-display font-bold text-xl tracking-tight"
            data-cursor="hover"
          >
            <span className="text-gradient">HS</span>
            <span className="text-[var(--color-text-faint)]">.</span>
          </NavLink>
        </MagneticButton>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <MagneticButton key={to} strength={0.2}>
              <NavLink
                to={to}
                data-cursor="hover"
                className={({ isActive }) =>
                  cn(
                    'relative px-3.5 py-2 text-sm font-medium rounded-xl',
                    'transition-colors duration-200',
                    isActive
                      ? 'text-[var(--color-text)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0.5 inset-x-3 h-px bg-[var(--color-accent)] rounded-full"
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </MagneticButton>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <MagneticButton className="hidden md:inline-flex">
            <NavLink
              to="/contact"
              data-cursor="hover"
              className={cn(
                'inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-2xl',
                'bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)]',
                'text-white border border-white/20',
                'shadow-[0_0_20px_rgba(110,114,255,0.3)]',
                'hover:shadow-[0_0_32px_rgba(110,114,255,0.5)] hover:brightness-110',
                'transition-all duration-200',
              )}
            >
              Hire me
            </NavLink>
          </MagneticButton>

          <button
            className="md:hidden p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            data-cursor="hover"
          >
            {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'fixed inset-x-0 top-16 z-40 md:hidden',
              'bg-[rgba(8,9,13,0.92)] backdrop-blur-2xl',
              'border-b border-[var(--color-border)]',
              'px-6 py-5 flex flex-col gap-1',
            )}
          >
            {NAV_LINKS.map(({ to, label }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      'block px-4 py-3 rounded-xl text-base font-medium transition-colors',
                      isActive
                        ? 'text-[var(--color-text)] bg-[var(--color-surface)]'
                        : 'text-[var(--color-text-muted)]',
                    )
                  }
                >
                  {label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.04 + 0.05, duration: 0.3 }}
              className="pt-2"
            >
              <NavLink
                to="/contact"
                className={cn(
                  'block text-center px-5 py-3 rounded-2xl text-sm font-semibold',
                  'bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)]',
                  'text-white',
                )}
              >
                Hire me
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
