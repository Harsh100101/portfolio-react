import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * useTilt — returns refs + motion values + event handlers that make
 * any motion.div tilt toward the cursor as a rigid 3D unit.
 *
 * Usage:
 *   const tilt = useTilt()
 *   <div style={{ perspective: '1000px' }}>
 *     <motion.div
 *       ref={tilt.ref}
 *       style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
 *       onMouseMove={tilt.onMove}
 *       onMouseLeave={tilt.onLeave}
 *     >
 *       ...
 *     </motion.div>
 *   </div>
 */
export default function useTilt(maxTilt = 12) {
  const ref = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [maxTilt, -maxTilt]),
    { stiffness: 260, damping: 22, mass: 0.5 }
  )
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-maxTilt, maxTilt]),
    { stiffness: 260, damping: 22, mass: 0.5 }
  )

  const spotX = useTransform(rawX, [-0.5, 0.5], [0, 100])
  const spotY = useTransform(rawY, [-0.5, 0.5], [0, 100])
  const spotBg = useTransform(
    [spotX, spotY],
    ([x, y]) => `radial-gradient(380px circle at ${x}% ${y}%, rgba(110,114,255,0.16), transparent 55%)`
  )

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }

  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return { ref, rotateX, rotateY, spotBg, onMove, onLeave }
}
