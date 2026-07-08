import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiDownload, HiPlay, HiStar } from 'react-icons/hi'
import Button from '../ui/Button'
import { BsAndroid2 } from 'react-icons/bs'

import DownloadQR from '../ui/DownloadQR'
import { APK_DOWNLOAD_URL, APK_FILENAME } from '../../config/site'

function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let lastFrame = 0
    const FRAME_INTERVAL = 1000 / 30
    let particles = []
    let mouse = { x: -1000, y: -1000 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = Math.min(40, Math.floor(window.innerWidth * 0.02))
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    const onMouse = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const animate = (time) => {
      animationId = requestAnimationFrame(animate)
      if (time - lastFrame < FRAME_INTERVAL) return
      lastFrame = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const distSq = dx * dx + dy * dy
        if (distSq < 22500) {
          p.x -= dx * 0.005
          p.y -= dy * 0.005
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230, 0, 0, ${p.opacity})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const dist2Sq = dx2 * dx2 + dy2 * dy2
          if (dist2Sq < 14400) {
            const dist2 = Math.sqrt(dist2Sq)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(230, 0, 0, ${0.08 * (1 - dist2 / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }
    animate(0)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          willChange: 'contents',
      }}
    />
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const cursorGradRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    let rafId = null

    const onMouse = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const rect = hero.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        if (cursorGradRef.current) {
          cursorGradRef.current.style.background = `
            radial-gradient(ellipse 60% 50% at ${x}% ${y}%, rgba(230,0,0,0.08) 0%, transparent 60%)
          `
        }
      })
    }

    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        minHeight: '115dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--color-bg)',
        paddingTop: 'calc(var(--nav-height) + var(--safe-top) + var(--content-warning-height, 0px))',
        paddingBottom: 'var(--safe-bottom)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(230, 0, 0, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255, 26, 26, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(179, 0, 0, 0.04) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />
      <div
        ref={cursorGradRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          transition: 'background 0.25s ease-out',
          willChange: 'background',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          width: 'clamp(200px, 40vw, 500px)',
          height: 'clamp(200px, 40vw, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,0,0,0.03) 0%, transparent 70%)',
          top: '10%',
          right: '5%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          width: 'clamp(160px, 35vw, 400px)',
          height: 'clamp(160px, 35vw, 400px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,26,26,0.03) 0%, transparent 70%)',
          bottom: '10%',
          left: '5%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <ParticleField />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: 'min(800px, 100%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '32px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
           <img src="/logo.png" alt="MaheshStream logo" style={{ width: '150px'}}/>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: '20px',
          }}
        >
          <span className="gradient-text">Mahesh Stream</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 300,
            color: 'var(--color-text-secondary)',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
          }}
        >
          One Platform. <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>Endless Entertainment.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            color: 'var(--color-text-tertiary)',
            maxWidth: 'min(560px, 100%)',
            margin: '0 auto clamp(32px, 5vw, 48px)',
            lineHeight: 1.7,
          }}
        >
          Experience the ultimate entertainment platform. Stream movies, TV shows, web series,
          and live TV — all in one place, with a beautiful interface and powerful features.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button variant="primary" size="lg" href={APK_DOWNLOAD_URL} download={APK_FILENAME} icon={<HiDownload size={20} />}>
            Download APK
          </Button>
          <Button variant="secondary" size="lg" href="#demo" icon={<HiPlay size={20} />}>
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(20px, 4vw, 48px)',
            marginTop: 'clamp(48px, 8vw, 64px)',
            flexWrap: 'wrap',
            padding: '0 clamp(12px, 3vw, 24px)',
          }}
        >
          {[
            {
              icon: BsAndroid2,
              label: 'Free Forever',
              value: '100%',
              sub: 'No subscriptions',
            },
            {
              icon: HiStar,
              label: 'Content Types',
              value: '6+',
              sub: 'Movies, TV, Live & more',
            },
            {
              icon: HiDownload,
              label: 'APK Size',
              value: '18.5 MB',
              sub: 'Lightweight & fast',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', minWidth: 'clamp(140px, 30vw, 180px)' }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                }}
              >
                <item.icon size={20} style={{ color: 'var(--color-accent-light)' }} />
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>
                  {item.value}
                </div>
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* QR code scan-to-download hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 'clamp(40px, 6vw, 48px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(12px, 3vw, 16px)',
            flexWrap: 'wrap',
            padding: '0 clamp(12px, 3vw, 24px)',
          }}
        >
          <DownloadQR size={80} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
              Scan to Download
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              Point your Android camera<br />at the QR code to download
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
