import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HiX, HiChevronLeft, HiChevronRight, HiEyeOff, HiEye } from 'react-icons/hi'
import Section, { SectionHeader } from '../ui/Section'

const screenshots = [
  { src: '/screenshots/home.png', label: 'Home Screen', desc: 'Browse movies & shows' },
  { src: '/screenshots/movie-details.png', label: 'Profile Details', desc: 'Full info, ratings & cast' },
  { src: '/screenshots/player.png', label: 'Video Player', desc: 'Smooth full-screen playback' },
  { src: '/screenshots/player-controls.png', label: 'Player Controls', desc: 'Gestures & quick settings' },
  { src: '/screenshots/search.png', label: 'Movie Details', desc: 'Complete Movie details' },
  { src: '/screenshots/search-filter.png', label: 'Search Filters', desc: 'Filter by genre, year & more' },
  { src: '/screenshots/categories.png', label: 'Categories', desc: 'Browse by all category' },
  { src: '/screenshots/live-tv.png', label: 'Live TV', desc: 'Real-time Live channel streaming' },
  { src: '/screenshots/downloads.png', label: 'Downloads', desc: 'Offline viewing' },
  { src: '/screenshots/favorites.png', label: 'Favorites', desc: 'Your personal watchlist' },
  { src: '/screenshots/history.png', label: 'Watch History', desc: 'Continue where you left off' },
  { src: '/screenshots/subtitle.png', label: 'Subtitles', desc: 'Multi-language support' },
  { src: '/screenshots/settings.png', label: 'Settings', desc: 'Customize your experience' },
  { src: '/screenshots/profile.png', label: 'Profile', desc: 'Manage your account' },
  { src: '/screenshots/notifications.png', label: 'Notifications', desc: 'Updates & alerts' },
  { src: '/screenshots/adult1.png', label: 'NSFW', desc: 'This Is Adult Content', nsfw: true },
  { src: '/screenshots/adult2.png', label: 'NSFW', desc: 'This Is Adult Content', nsfw: true },
  { src: '/screenshots/adult3.png', label: 'NSFW', desc: 'This Is Adult Content', nsfw: true },
  { src: '/screenshots/adult4.png', label: 'NSFW', desc: 'This Is Adult Content', nsfw: true },
]

function ScreenshotCard({ screenshot, index, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [imgError, setImgError] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(hover: none)').matches || window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleReveal = useCallback(() => setRevealed(true), [])

  const isNsfw = screenshot.nsfw === true
  const showImage = !isNsfw || revealed || isHovered
  const showOverlay = isNsfw && !revealed && !isHovered

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => {
        if (isNsfw && !revealed && !isHovered) return
        onClick()
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View screenshot: ${screenshot.label}${isNsfw ? ' (sensitive content)' : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (isNsfw && !revealed && !isHovered) {
            handleReveal()
          } else {
            onClick()
          }
        }
      }}
      style={{
        cursor: isNsfw && !revealed && !isHovered ? 'default' : 'pointer',
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        aspectRatio: '9/16',
        border: '1px solid var(--color-border)',
        background: isNsfw && !revealed ? 'var(--color-bg-tertiary)' : 'var(--color-bg-card)',
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        borderColor: 'var(--color-border-hover)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Main image */}
      <img
        src={screenshot.src}
        alt={screenshot.label}
        loading="lazy"
        onError={() => setImgError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: imgError ? 'none' : 'block',
          opacity: showImage ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Error fallback */}
      {imgError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '16px',
            background: 'linear-gradient(180deg, var(--color-bg-tertiary), var(--color-bg-secondary))',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--color-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M9 8L23 16L9 24V8Z" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', color: '#fff' }}>{screenshot.label}</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>{screenshot.desc}</span>
        </div>
      )}

      {/* NSFW overlay — fades out on hover (desktop) or stays until reveal (mobile) */}
      {isNsfw && !revealed && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            opacity: showOverlay ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: showOverlay ? 'auto' : 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              padding: '20px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(230, 0, 0, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(230, 0, 0, 0.4)',
              }}
            >
              <HiEyeOff size={26} color="#fff" />
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#fff',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              18+ Sensitive Content
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.6)',
                textAlign: 'center',
                lineHeight: 1.4,
              }}
            >
              {isMobile ? 'Tap below to reveal' : 'Hover to reveal'}
            </div>
            {isMobile && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleReveal()
                }}
                className="nsfw-reveal-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  marginTop: '4px',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                <HiEye size={16} />
                Reveal Image
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bottom label */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px 16px 16px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
          zIndex: 5,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {screenshot.label}
          {isNsfw && (
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '4px',
                background: 'rgba(230, 0, 0, 0.8)',
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              18+
            </span>
          )}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>{screenshot.desc}</div>
      </div>
    </motion.div>
  )
}

function LightboxImage({ screenshot, isRevealed, onReveal }) {
  if (!screenshot.nsfw || isRevealed) {
    return (
      <img
        src={screenshot.src}
        alt={screenshot.label}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          maxHeight: '90vh',
        }}
      />
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}>
      <img
        src={screenshot.src}
        alt={screenshot.label}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          maxHeight: '90vh',
          filter: 'blur(20px) brightness(0.4)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(230, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 24px rgba(230, 0, 0, 0.4)',
          }}
        >
          <HiEyeOff size={30} color="#fff" />
        </div>
        <div
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          18+ Sensitive Content
        </div>
        <button
          onClick={onReveal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(230, 0, 0, 0.85)',
            border: 'none',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            boxShadow: '0 4px 20px rgba(230, 0, 0, 0.4)',
          }}
        >
          <HiEye size={20} />
          Reveal Image
        </button>
        <div
          style={{
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
          }}
        >
          This content may be sensitive
        </div>
      </div>
    </div>
  )
}

export default function Screenshots() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [revealedImages, setRevealedImages] = useState(new Set())

  const handleRevealInLightbox = useCallback(() => {
    if (selectedIndex !== null) {
      setRevealedImages((prev) => new Set([...prev, selectedIndex]))
    }
  }, [selectedIndex])

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1))
  }
  const handleNext = () => {
    setSelectedIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0))
  }

  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1))
      }
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selectedIndex])

  return (
    <Section id="screenshots">
      <div className="container">
        <SectionHeader
          label="Screenshots"
          title="See it in action."
          subtitle="Beautiful screenshots showcasing the premium interface and features of MaheshStream."
        />
        <div className="screenshots-grid">
          {screenshots.map((s, i) => (
            <ScreenshotCard key={i} screenshot={s} index={i} onClick={() => setSelectedIndex(i)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot lightbox"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(20px)',
              padding: 'clamp(12px, 3vw, 24px)',
            }}
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev() }}
              aria-label="Previous screenshot"
              style={{
                position: 'absolute',
                left: 'clamp(12px, 3vw, 24px)',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--color-bg-glass)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                color: '#000000',
                zIndex: 2,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgb(229, 255, 0)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-bg-glass)' }}
            >
              <HiChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext() }}
              aria-label="Next screenshot"
              style={{
                position: 'absolute',
                right: 'clamp(12px, 3vw, 24px)',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--color-bg-glass)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                color: '#000000',
                zIndex: 2,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(229, 255, 0)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-bg-glass)' }}
            >
              <HiChevronRight size={24} />
            </button>
            <button
              onClick={() => setSelectedIndex(null)}
              aria-label="Close lightbox"
              style={{
                position: 'absolute',
                top: 'clamp(12px, 3vw, 24px)',
                right: 'clamp(12px, 3vw, 24px)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--color-bg-glass)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                color: '#000000',
                zIndex: 2,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(229, 255, 0)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-bg-glass)' }}
            >
              <HiX size={20} />
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxHeight: '90vh',
                  maxWidth: 'min(400px, 100%)',
                  width: '100%',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
                  overflow: 'hidden',
                }}
              >
                <LightboxImage
                  screenshot={screenshots[selectedIndex]}
                  isRevealed={revealedImages.has(selectedIndex)}
                  onReveal={handleRevealInLightbox}
                />
              </motion.div>
            </AnimatePresence>
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(12px, 3vw, 24px)',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                maxWidth: '90%',
                padding: '0 clamp(12px, 3vw, 24px)',
              }}
            >
              <span style={{ color: '#fff', fontWeight: 500 }}>{screenshots[selectedIndex].label}</span> &mdash; {screenshots[selectedIndex].desc}
              {screenshots[selectedIndex].nsfw && !revealedImages.has(selectedIndex) && (
                <span style={{ display: 'block', marginTop: '4px', color: 'rgba(230,0,0,0.8)', fontWeight: 600, fontSize: '0.8rem' }}>
                  Sensitive content — tap "Reveal Image" to view
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
