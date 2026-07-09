import { useEffect, useRef } from 'react'
import { animate, createDrawable, stagger } from 'animejs'

/**
 * AnimatedUnderline — draws a hand-sketched underline stroke beneath
 * inline text using Anime.js's SVG line-drawing API (createDrawable + draw).
 *
 * This is something CSS/Framer Motion can't replicate naturally — true
 * stroke-path drawing animates the actual SVG path length, giving a
 * "being drawn by hand" look rather than a fade or scale.
 *
 * @param {string} color   - stroke color (defaults to the accent gradient start)
 * @param {number} delay   - ms before the draw starts
 * @param {number} duration - ms for the draw itself
 */
export default function AnimatedUnderline({
  color = '#6e72ff',
  delay = 600,
  duration = 700,
  className = '',
}) {
  const pathRef = useRef(null)

  useEffect(() => {
    if (!pathRef.current) return

    const drawable = createDrawable(pathRef.current)

    animate(drawable, {
      draw: ['0 0', '0 1'],
      duration,
      delay,
      ease: 'inOutQuad',
    })
  }, [delay, duration])

  return (
    <svg
      viewBox="0 0 200 20"
      className={`absolute left-0 -bottom-2 w-full h-4 pointer-events-none ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M2,14 C40,18 80,6 110,10 C140,14 170,16 198,8"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
