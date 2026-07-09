import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/utils/cn'

/**
 * Card3D — the WHOLE card panel tilts as one rigid unit toward the cursor.
 *
 * This is the correct mental model:
 *   - A perspective "stage" div (no visible style) wraps the card
 *   - The card itself (the glass panel) is the thing that rotates
 *   - Card3DLayer children translate along Z *within* the rotating card
 *     for parallax depth, but the card border/background/shine all tilt too
 *
 * All className / style props you pass end up ON the rotating card panel —
 * so GlassCard's glass-strong, border, padding, rounded corners all move.
 */
export default function Card3D({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
  spotlight = true,
  glare = true,
  style = {},
}) {
  const ref = useRef(null)

  const rawX = useMotionValue(0)   // -0.5 to 0.5
  const rawY = useMotionValue(0)

  // Spring-smoothed rotation applied to the card itself
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [maxTilt, -maxTilt]),
    { stiffness: 260, damping: 22, mass: 0.5 }
  )
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-maxTilt, maxTilt]),
    { stiffness: 260, damping: 22, mass: 0.5 }
  )

  // Spotlight / glare positions (always computed — hook rules)
  const spotX = useTransform(rawX, [-0.5, 0.5], [0, 100])
  const spotY = useTransform(rawY, [-0.5, 0.5], [0, 100])
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 })

  const spotBg = useTransform(
    [spotX, spotY],
    ([x, y]) => `radial-gradient(380px circle at ${x}% ${y}%, rgba(110,114,255,0.18), transparent 55%)`
  )
  const glareBg = useTransform(
    [spotX, spotY],
    ([x, y]) => `radial-gradient(550px circle at ${x}% ${y}%, rgba(255,255,255,0.45), transparent 42%)`
  )

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
    glareOpacity.set(0.1)
  }

  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
    glareOpacity.set(0)
  }

  return (
    // Perspective stage — invisible, sets up the 3D space
    <div style={{ perspective: `${perspective}px`, perspectiveOrigin: '50% 50%' }}>
      {/*
        THE CARD — this is what tilts. All className/style land here so the
        glass border, background, border-radius, padding all rotate together.
      */}
      <motion.div
        ref={ref}
        className={cn('relative will-change-transform', className)}
        style={{
          ...style,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {/* Cursor spotlight — sits just above card surface */}
        {spotlight && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-[1]"
            style={{ background: spotBg, transform: 'translateZ(2px)' }}
          />
        )}

        {/* Glare sheen — sits above spotlight */}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-[2]"
            style={{
              background: glareBg,
              opacity: glareOpacity,
              transform: 'translateZ(3px)',
            }}
          />
        )}

        {/* Card content — passed through as-is */}
        <div className="relative z-[3]" style={{ transform: 'translateZ(0px)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * Card3DLayer — optional. Wrap individual pieces of card content to push
 * them forward along Z, adding parallax separation on top of the card tilt.
 * The card already tilts as a whole — layers add extra visual depth.
 *
 * depth=0  → flush with card surface (default)
 * depth=30 → floats 30px in front of the card surface when tilted
 */
export function Card3DLayer({ children, depth = 0, className = '' }) {
  return (
    <div
      className={cn('relative', className)}
      style={{ transform: `translateZ(${depth}px)`, transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}
