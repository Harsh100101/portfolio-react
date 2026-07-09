import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/utils/cn'

/**
 * MagneticButton — wraps any element and makes it pull toward the cursor
 * when hovered, snapping back smoothly on leave.
 *
 * @param {number}  strength  - how strongly it pulls (0–1, default 0.35)
 * @param {string}  className - classes on the wrapper span
 */
export default function MagneticButton({
  children,
  strength = 0.35,
  className = '',
}) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 250, damping: 20, mass: 0.5 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn('will-change-transform', className)}
      data-cursor="hover"
    >
      {children}
    </motion.span>
  )
}
