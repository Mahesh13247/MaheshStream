import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HiPlay, HiEye, HiX, HiExternalLink, HiClock } from 'react-icons/hi'
import Section, { SectionHeader } from '../ui/Section'
import { DEMO_VIDEOS } from '../../config/site'

const videos = DEMO_VIDEOS.map((v) => ({
  ...v,
  thumb: v.youtubeId
    ? `https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`
    : null,
  comingSoon: !v.youtubeId,
}))

function VideoCard({ video, index, onPlay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        transition: 'all var(--transition-base)',
      }}
      whileHover={{
        y: -4,
        borderColor: 'var(--color-border-hover)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}
    >
      {/* Thumbnail + play button */}
      <button
        onClick={video.comingSoon ? undefined : onPlay}
        disabled={video.comingSoon}
        aria-label={video.comingSoon ? `${video.title} — coming soon` : `Play ${video.title}`}
        style={{
          display: 'block',
          width: '100%',
          position: 'relative',
          aspectRatio: '16/9',
          overflow: 'hidden',
          border: 'none',
          cursor: video.comingSoon ? 'default' : 'pointer',
          padding: 0,
          background: 'var(--color-bg-tertiary)',
          opacity: video.comingSoon ? 0.85 : 1,
        }}
      >
        {/* Thumbnail or coming soon placeholder */}
        {!video.comingSoon && !imgError && video.thumb ? (
          <img
            src={video.thumb}
            alt={video.title}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(230,0,0,0.25), rgba(26,26,26,0.9))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {video.comingSoon && (
              <>
                <HiClock size={32} style={{ color: 'var(--color-red)', opacity: 0.8 }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                  Coming Soon
                </span>
              </>
            )}
          </div>
        )}

        {!video.comingSoon && (
        <>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            transition: 'background var(--transition-base)',
          }}
        />

        {/* Play circle */}
        <motion.div
          whileHover={{ scale: 1.12 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 'clamp(48px, 10vw, 64px)',
              height: 'clamp(48px, 10vw, 64px)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              border: '2px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }}
          >
            <HiPlay size={26} color="#fff" style={{ marginLeft: '3px' }} />
          </div>
        </motion.div>

        {/* Duration badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(0,0,0,0.75)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '4px',
            letterSpacing: '0.02em',
          }}
        >
          {video.duration}
        </div>
        </>
        )}
      </button>

      {/* Card body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px' }}>{video.title}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', marginBottom: '14px', lineHeight: 1.6, flex: 1 }}>
          {video.desc}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <HiEye size={14} /> {video.views} views
          </span>
          {!video.comingSoon && video.youtubeId && (
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78rem',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-light)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
          >
            <HiExternalLink size={13} />
            YouTube
          </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// YouTube iframe modal
function VideoModal({ video, onClose }) {
  const handleBackdrop = useCallback((e) => {
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing: ${video.title}`}
      onClick={handleBackdrop}
      className="modal-overlay"
      style={{ zIndex: 2000, background: 'rgba(0,0,0,0.96)' }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close video"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 3,
          transition: 'background var(--transition-fast)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
      >
        <HiX size={20} />
      </button>

      {/* iframe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="video-responsive"
        style={{
          boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </motion.div>

      {/* Title below */}
      <div
        className="break-words"
        style={{
          position: 'absolute',
          bottom: 'max(20px, var(--safe-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.6)',
          fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
          maxWidth: 'min(90%, 600px)',
          padding: '0 clamp(12px, 3vw, 24px)',
        }}
      >
        {video.title}
      </div>
    </motion.div>
  )
}

export default function DemoVideos() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <Section id="demo">
      <div className="container">
        <SectionHeader
          label="Demo Videos"
          title="Watch MaheshStream in motion."
          subtitle="Explore our curated video collection showcasing every aspect of the MaheshStream experience."
        />
        <div className="demo-grid">
          {videos.map((v, i) => (
            <VideoCard key={v.title} video={v} index={i} onPlay={() => !v.comingSoon && v.youtubeId && setActiveVideo(v)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </Section>
  )
}
