import { cn } from '@/utils/cn'
import Card3D from '@/components/animations/Card3D'

/**
 * GlassCard — frosted glass card panel.
 *
 * Add `tilt` for the 3D tilt effect (the whole card tilts as one piece).
 * The old flat TiltCard is removed — Card3D handles everything now.
 *
 * All cards on all pages use the same effect when `tilt` is true.
 */
export default function GlassCard({
  children,
  className = '',
  tilt = false,
  spotlight = true,
  glow = false,
  padding = 'p-6',
  style = {},
}) {
  const base = cn(
    // Glass surface
    'glass-strong rounded-[var(--radius-glass)] relative overflow-hidden',
    'transition-[border-color] duration-300',
    'hover:border-[var(--color-border-hover)]',
    // Top-edge refraction highlight
    'before:absolute before:inset-x-0 before:top-0 before:h-px',
    'before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent',
    // Optional glow shadow
    glow && 'shadow-[0_0_40px_rgba(110,114,255,0.12)] hover:shadow-[0_0_60px_rgba(110,114,255,0.2)]',
    padding,
    className,
  )

  if (tilt) {
    return (
      <Card3D className={base} style={style} spotlight={spotlight}>
        {children}
      </Card3D>
    )
  }

  return <div className={cn(base)} style={style}>{children}</div>
}
