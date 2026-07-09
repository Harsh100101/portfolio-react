import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/utils/cn'

const presets = {
  fadeUp:    { hidden: { opacity: 0, y: 32 },    visible: { opacity: 1, y: 0 } },
  fadeDown:  { hidden: { opacity: 0, y: -32 },   visible: { opacity: 1, y: 0 } },
  fadeLeft:  { hidden: { opacity: 0, x: -32 },   visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 32 },    visible: { opacity: 1, x: 0 } },
  scale:     { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
  fade:      { hidden: { opacity: 0 },           visible: { opacity: 1 } },
}

/**
 * ScrollReveal — wraps any children in a Framer Motion observer.
 * Plays the entrance animation once when scrolled into view.
 *
 * @param {string}  variant   - one of the preset keys above
 * @param {number}  delay     - seconds before animation starts
 * @param {number}  duration  - seconds for the animation
 * @param {string}  className - extra classes on the wrapper
 * @param {string}  as        - HTML element to render as (default 'div')
 */
export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  className = '',
  as = 'div',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  const vars = presets[variant] ?? presets.fadeUp

  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={vars}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  )
}
