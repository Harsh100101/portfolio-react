import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from '@/components/animations/MagneticButton'
import { cn } from '@/utils/cn'

const variantStyles = {
  primary: [
    'bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)]',
    'text-white font-semibold',
    'border border-white/20',
    'shadow-[0_0_24px_rgba(110,114,255,0.35)]',
    'hover:shadow-[0_0_36px_rgba(110,114,255,0.55)]',
    'hover:brightness-110',
  ].join(' '),

  secondary: [
    'bg-[var(--color-surface)] backdrop-blur-xl',
    'text-[var(--color-text)] font-medium',
    'border border-[var(--color-border)]',
    'hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)]',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--color-text-muted)] font-medium',
    'hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]',
  ].join(' '),

  outline: [
    'bg-transparent font-medium',
    'border border-[var(--color-border)]',
    'text-[var(--color-text)]',
    'hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
  ].join(' '),
}

const sizeStyles = {
  sm:  'px-4 py-2 text-sm rounded-xl gap-1.5',
  md:  'px-6 py-3 text-sm rounded-2xl gap-2',
  lg:  'px-8 py-4 text-base rounded-2xl gap-2.5',
  xl:  'px-10 py-5 text-lg rounded-3xl gap-3',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    magnetic = true,
    icon,
    iconPosition = 'right',
    disabled = false,
    onClick,
    type = 'button',
    as: Tag = 'button',
    href,
    ...rest
  },
  ref
) {
  const classes = cn(
    'inline-flex items-center justify-center',
    'transition-all duration-200',
    'select-none cursor-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
    'disabled:opacity-40 disabled:pointer-events-none',
    variantStyles[variant] ?? variantStyles.primary,
    sizeStyles[size] ?? sizeStyles.md,
    className,
  )

  const MotionTag = motion[Tag] ?? motion.button
  const finalProps = Tag === 'a' ? { href, ...rest } : { type, onClick, disabled, ...rest }

  const inner = (
    <MotionTag
      ref={ref}
      className={classes}
      whileTap={{ scale: 0.96 }}
      data-cursor="hover"
      {...finalProps}
    >
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </MotionTag>
  )

  if (magnetic && !disabled) {
    return <MagneticButton>{inner}</MagneticButton>
  }

  return inner
})

export default Button
