import { useEffect, useRef } from 'react'

/**
 * AuroraBackground — fixed canvas behind all content.
 * Draws 4 slow-moving radial blobs that shift hue over time,
 * producing the aurora/gradient-mesh look seen on Vercel/Linear/Framer.
 * Uses a single 2D canvas and requestAnimationFrame — no Three.js,
 * very low GPU cost.
 */
export default function AuroraBackground() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = 0, H = 0

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Each blob: position expressed as fraction of viewport, plus drift params
    const blobs = [
      { xf: 0.15, yf: -0.1, vx:  0.00008, vy:  0.00005, r: 0.65, h: 238, s: 80, l: 35 },
      { xf: 0.85, yf:  0.2,  vx: -0.00006, vy:  0.00007, r: 0.55, h: 268, s: 70, l: 30 },
      { xf: 0.5,  yf:  0.7,  vx:  0.00004, vy: -0.00009, r: 0.70, h: 175, s: 65, l: 25 },
      { xf: 0.1,  yf:  0.9,  vx:  0.00010, vy: -0.00004, r: 0.45, h: 310, s: 60, l: 28 },
    ]

    let t = 0

    const draw = () => {
      t++
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#08090d'
      ctx.fillRect(0, 0, W, H)

      for (const b of blobs) {
        // drift the fraction positions
        b.xf += b.vx
        b.yf += b.vy
        // gentle bounce
        if (b.xf < -0.2 || b.xf > 1.2) b.vx *= -1
        if (b.yf < -0.2 || b.yf > 1.2) b.vy *= -1

        const cx = b.xf * W
        const cy = b.yf * H
        const radius = b.r * Math.max(W, H)
        // slow hue rotation
        const hue = (b.h + t * 0.03) % 360

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        grad.addColorStop(0,   `hsla(${hue}, ${b.s}%, ${b.l}%, 0.55)`)
        grad.addColorStop(0.4, `hsla(${hue}, ${b.s}%, ${b.l}%, 0.18)`)
        grad.addColorStop(1,   `hsla(${hue}, ${b.s}%, ${b.l}%, 0)`)

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      }

      // subtle noise overlay via tiny repeated pattern trick
      ctx.fillStyle = 'rgba(8, 9, 13, 0.35)'
      ctx.fillRect(0, 0, W, H)

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
