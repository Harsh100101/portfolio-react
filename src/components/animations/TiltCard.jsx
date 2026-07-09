import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/utils/cn'

/**
 * TiltCard — adds a perspective tilt + spotlight glow that follows the cursor.
 * Wrap any card content with this.
 *
 * @param {number}  maxTilt    - degrees of tilt (default 8)
 * @param {boolean} spotlight  - show inner radial glow on hover
 * @param {string}  className  - classes on the card wrapper
 */
export default function TiltCard({
  children,
  maxTilt = 8,
  spotlight = true,
  className = '',
}) {
  const ref = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 200, damping: 20, mass: 0.5,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 200, damping: 20, mass: 0.5,
  })

  const spotX = useTransform(mouseX, [-0.5, 0.5], ['5%', '95%'])
  const spotY = useTransform(mouseY, [-0.5, 0.5], ['5%', '95%'])

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={cn('relative will-change-transform', className)}
    >
      {spotlight && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${spotX.get() || '50%'} ${spotY.get() || '50%'}, rgba(110,114,255,0.12), transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
