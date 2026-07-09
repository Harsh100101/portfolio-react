import { cn } from '@/utils/cn'

const variantStyles = {
  default:  'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-muted)]',
  accent:   'bg-[var(--color-accent)]/15 border-[var(--color-accent)]/30 text-[var(--color-accent)]',
  accent2:  'bg-[var(--color-accent-2)]/15 border-[var(--color-accent-2)]/30 text-[var(--color-accent-2)]',
  green:    'bg-[var(--color-accent-3)]/15 border-[var(--color-accent-3)]/30 text-[var(--color-accent-3)]',
  orange:   'bg-[var(--color-accent-4)]/15 border-[var(--color-accent-4)]/30 text-[var(--color-accent-4)]',
  gradient: 'bg-gradient-to-r from-[var(--color-accent)]/20 to-[var(--color-accent-2)]/20 border-[var(--color-accent)]/30 text-[var(--color-text)]',
}

export default function Badge({
  children,
  variant = 'default',
  className = '',
  dot = false,
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        'px-2.5 py-1 rounded-full text-xs font-medium',
        'border backdrop-blur-sm',
        variantStyles[variant] ?? variantStyles.default,
        className,
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </span>
  )
}
