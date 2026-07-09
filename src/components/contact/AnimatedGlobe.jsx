import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * AnimatedGlobe — pure CSS + canvas globe effect.
 * Draws a rotating wireframe sphere with animated latitude/longitude lines,
 * plus a pulsing location pin for Gujarat, India.
 * No external 3D library — single canvas, very low cost.
 */
export default function AnimatedGlobe() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const SIZE = 320
    canvas.width = SIZE
    canvas.height = SIZE
    const cx = SIZE / 2
    const cy = SIZE / 2
    const R = 130  // globe radius

    // Gujarat approx lat/lon
    const GUJARAT_LAT = 22.3 * (Math.PI / 180)
    const GUJARAT_LON = 72.6 * (Math.PI / 180)

    let angle = 0

    function project(lat, lon, rot) {
      // rotate lon by current angle
      const l = lon + rot
      const x = cx + R * Math.cos(lat) * Math.sin(l)
      const y = cy - R * Math.sin(lat)
      const z = Math.cos(lat) * Math.cos(l) // depth — positive = facing viewer
      return { x, y, z }
    }

    function drawGrid(rot) {
      ctx.strokeStyle = 'rgba(110,114,255,0.18)'
      ctx.lineWidth = 0.8

      // Latitude lines
      for (let lat = -80; lat <= 80; lat += 20) {
        const latR = lat * (Math.PI / 180)
        ctx.beginPath()
        let first = true
        for (let lon = -180; lon <= 180; lon += 3) {
          const lonR = lon * (Math.PI / 180)
          const p = project(latR, lonR, rot)
          if (p.z < 0) { first = true; continue }
          if (first) { ctx.moveTo(p.x, p.y); first = false }
          else ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      }

      // Longitude lines
      for (let lon = 0; lon < 360; lon += 20) {
        const lonR = lon * (Math.PI / 180)
        ctx.beginPath()
        let first = true
        for (let lat = -90; lat <= 90; lat += 3) {
          const latR = lat * (Math.PI / 180)
          const p = project(latR, lonR, rot)
          if (p.z < 0) { first = true; continue }
          if (first) { ctx.moveTo(p.x, p.y); first = false }
          else ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      }
    }

    function drawGlowRing() {
      const grad = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.2)
      grad.addColorStop(0, 'rgba(110,114,255,0.0)')
      grad.addColorStop(0.7, 'rgba(110,114,255,0.07)')
      grad.addColorStop(1, 'rgba(110,114,255,0.0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawPin(rot, t) {
      const p = project(GUJARAT_LAT, GUJARAT_LON, rot)
      if (p.z < 0.1) return  // behind the globe

      const pulseR = 6 + Math.sin(t * 0.06) * 3
      const alpha = 0.4 + Math.sin(t * 0.06) * 0.3

      // Outer pulse ring
      ctx.beginPath()
      ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(52,216,196,${alpha})`
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Inner dot
      ctx.beginPath()
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(52,216,196,0.95)'
      ctx.fill()

      // Label
      if (p.z > 0.25) {
        ctx.font = '10px Inter, sans-serif'
        ctx.fillStyle = 'rgba(52,216,196,0.8)'
        ctx.fillText('Gujarat, India', p.x + 7, p.y + 4)
      }
    }

    let t = 0
    function draw() {
      t++
      angle += 0.005  // slow rotation

      ctx.clearRect(0, 0, SIZE, SIZE)

      // Base sphere fill
      const baseGrad = ctx.createRadialGradient(cx - 30, cy - 30, 0, cx, cy, R)
      baseGrad.addColorStop(0, 'rgba(110,114,255,0.08)')
      baseGrad.addColorStop(1, 'rgba(8,9,13,0.0)')
      ctx.fillStyle = baseGrad
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()

      drawGlowRing()
      drawGrid(angle)
      drawPin(angle, t)

      // Outer circle border
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(110,114,255,0.25)'
      ctx.lineWidth = 1
      ctx.stroke()

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/10 blur-3xl scale-110 pointer-events-none" />
        <canvas
          ref={canvasRef}
          className="relative z-10"
          style={{ width: 320, height: 320 }}
          aria-label="Animated globe showing location in Gujarat, India"
        />
      </motion.div>

      {/* Location label below */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-4 flex items-center gap-2 text-sm text-[var(--color-text-muted)]"
      >
        <span className="w-2 h-2 rounded-full bg-[var(--color-accent-3)] animate-pulse" />
        Gujarat, India · Open to remote
      </motion.div>
    </div>
  )
}
