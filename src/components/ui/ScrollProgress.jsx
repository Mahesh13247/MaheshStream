import { useRef, useEffect } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      if (barRef.current) {
        barRef.current.style.width = `${progress * 100}%`
      }
    }
    let rafId = null
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        update()
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 'calc(var(--safe-top) + var(--content-warning-height, 0px))',
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 10001,
        background: 'transparent',
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '0%',
          background: 'var(--color-gradient-primary)',
          boxShadow: 'var(--shadow-glow)',
          willChange: 'width',
        }}
      />
    </div>
  )
}
