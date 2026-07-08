import { useRef, useEffect } from 'react'

export default function NoiseOverlay({ opacity = 0.035 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const render = () => {
      const w = canvas.width
      const h = canvas.height
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = opacity * 255
      }
      ctx.putImageData(imageData, 0, 0)
    }

    const resize = () => {
      canvas.width = 256
      canvas.height = 256
      render()
    }
    resize()

    if (!prefersReducedMotion) {
      const intervalId = setInterval(render, 2000)
      return () => {
        clearInterval(intervalId)
      }
    }

    return () => {}
  }, [opacity])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9997,
        mixBlendMode: 'overlay',
        willChange: 'contents',
      }}
    />
  )
}
