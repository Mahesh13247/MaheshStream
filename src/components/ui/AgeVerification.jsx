import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackAgeVerification } from '../../utils/analytics'
import { HiExclamation, HiCheck, HiX } from 'react-icons/hi'

const STORAGE_KEY = 'maheshstream-age-verified'
const CONTENT_WARNING_KEY = 'maheshstream-content-warning-dismissed'

export default function AgeVerification() {
  const [showModal, setShowModal] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [verified, setVerified] = useState(false)
  const warningBannerRef = useRef(null)

  useEffect(() => {
    const isVerified = localStorage.getItem(STORAGE_KEY) === 'true'
    const hasDismissedWarning = localStorage.getItem(CONTENT_WARNING_KEY)

    if (!isVerified) {
      setShowModal(true)
    } else {
      setVerified(true)
      if (!hasDismissedWarning) {
        setShowWarning(true)
      }
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    if (!showWarning || !warningBannerRef.current) {
      root.style.setProperty('--content-warning-height', '0px')
      return
    }

    const updateHeight = () => {
      const height = warningBannerRef.current?.offsetHeight ?? 0
      root.style.setProperty('--content-warning-height', `${height}px`)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(warningBannerRef.current)

    return () => {
      observer.disconnect()
      root.style.setProperty('--content-warning-height', '0px')
    }
  }, [showWarning])

  const handleVerify = useCallback((age) => {
    if (age >= 18) {
      localStorage.setItem(STORAGE_KEY, 'true')
      setVerified(true)
      setShowModal(false)
      setShowWarning(true)
      trackAgeVerification(true)
    } else {
      // Redirect to safe site or show error
      window.location.href = 'https://www.google.com'
    }
  }, [])

  const handleDismissWarning = useCallback(() => {
    localStorage.setItem(CONTENT_WARNING_KEY, 'true')
    setShowWarning(false)
  }, [])

  if (!showModal && !showWarning) return null

  return (
    <>
      {/* Age Verification Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(20px)',
              padding: 'max(20px, var(--safe-top)) max(20px, var(--safe-right)) max(20px, var(--safe-bottom)) max(20px, var(--safe-left))',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'clamp(24px, 5vw, 40px)',
                maxWidth: 'min(500px, 100%)',
                width: '100%',
                textAlign: 'center',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 24px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(220,38,38,0.15))',
                  border: '2px solid rgba(239,68,68,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HiExclamation size={40} style={{ color: '#ef4444' }} />
              </motion.div>

              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 800,
                  marginBottom: '16px',
                  background: 'var(--color-gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Age Verification
              </h2>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                }}
              >
                MaheshStream contains content that may be inappropriate for viewers under the age of 18. By entering this site, you affirm that you are at least 18 years old or the age of majority in your jurisdiction.
              </p>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button
                  onClick={() => handleVerify(18)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: 'clamp(14px, 3vw, 16px) clamp(24px, 5vw, 32px)',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    boxShadow: '0 8px 30px rgba(239,68,68,0.3)',
                    minHeight: 'var(--touch-target)',
                    flex: '1 1 auto',
                  }}
                >
                  <HiCheck size={20} />
                  I am 18+
                </motion.button>

                <motion.button
                  onClick={() => {
                    // Redirect to safe site
                    window.location.href = 'https://www.google.com'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: 'clamp(14px, 3vw, 16px) clamp(24px, 5vw, 32px)',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    minHeight: 'var(--touch-target)',
                    flex: '1 1 auto',
                  }}
                >
                  <HiX size={20} />
                  Exit Site
                </motion.button>
              </div>

              <p
                style={{
                  marginTop: '24px',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                By entering, you agree to our <a href="#legal" style={{ color: 'var(--color-red)' }}>Terms of Service</a> and <a href="#legal" style={{ color: 'var(--color-red)' }}>Privacy Policy</a>. Content is for personal, non-commercial use only.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Warning Banner */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            ref={warningBannerRef}
            className="content-warning-banner"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="content-warning-inner">
              <div className="content-warning-message">
                <HiExclamation size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
                <p>
                  <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Content Warning:</strong>{' '}
                  This website contains mature content. Viewer discretion is advised.
                </p>
              </div>
              <motion.button
                type="button"
                onClick={handleDismissWarning}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="content-warning-close"
                aria-label="Dismiss content warning"
              >
                <HiX size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
