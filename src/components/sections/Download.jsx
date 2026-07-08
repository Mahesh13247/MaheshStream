import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HiDownload, HiDeviceMobile, HiCube, HiChip, HiClock, HiShieldCheck, HiInformationCircle, HiCheckCircle, HiStar, HiX, HiQrcode, HiClipboardCopy, HiShare, HiExclamationCircle } from 'react-icons/hi'
import { BsAndroid2 } from 'react-icons/bs'
import QRCode from 'react-qr-code'
import Section, { SectionHeader } from '../ui/Section'
import { trackDownloadClick } from '../../utils/analytics'
import { APK_DOWNLOAD_URL, APK_FILENAME, APP_VERSION, APK_SIZE_MB, getApkAbsoluteUrl } from '../../config/site'
import useApkAvailable from '../../hooks/useApkAvailable'

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return
    let current = 0
    const increment = Math.ceil(target / 60)
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const specs = [
  { icon: HiCube, label: 'APK Size', value: `${APK_SIZE_MB} MB` },
  { icon: BsAndroid2, label: 'Min Android', value: 'Android 6.0+' },
  { icon: HiChip, label: 'Architecture', value: 'ARM64, ARM, x86' },
  { icon: HiClock, label: 'Release Date', value: 'July 2025' },
]

const requirements = [
  'Android 6.0 (Marshmallow) or higher',
  'At least 100 MB free storage space',
  'Stable internet connection',
  'Allow installation from unknown sources',
]

const notes = [
  'Enable "Install from unknown sources" in your device settings before installing.',
  'Ensure you have a stable internet connection for the initial setup.',
  'The app will check for updates automatically upon launch.',
  'Your data is encrypted and securely stored on your device.',
]

export default function Download() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [qrUrl, setQrUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const apkAvailable = useApkAvailable()

  useEffect(() => {
    setQrUrl(getApkAbsoluteUrl())
  }, [])

  // Check if user has already dismissed the install prompt
  useEffect(() => {
    const dismissed = localStorage.getItem('maheshstream-install-prompt-dismissed')
    if (!dismissed) {
      const isAndroid = /Android/i.test(navigator.userAgent)
      if (isAndroid) {
        const timer = setTimeout(() => setShowInstallPrompt(true), 1000)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  const handleInstall = () => {
    trackDownloadClick(APP_VERSION, APK_SIZE_MB)
    localStorage.setItem('maheshstream-install-prompt-dismissed', 'true')
    const a = document.createElement('a')
    a.href = APK_DOWNLOAD_URL
    a.download = APK_FILENAME
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getApkAbsoluteUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleShare = async () => {
    const url = getApkAbsoluteUrl()
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MaheshStream',
          text: 'Download the official MaheshStream Android app',
          url,
        })
      } catch { /* user cancelled */ }
    } else {
      handleCopyLink()
    }
  }

  const dismissInstall = () => {
    setShowInstallPrompt(false)
    localStorage.setItem('maheshstream-install-prompt-dismissed', 'true')
  }

  return (
    <Section id="download">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(230,0,0,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      
      {/* PWA Install Prompt (shown to Android users) */}
      {showInstallPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={{
            position: 'sticky',
            top: 'calc(var(--nav-height) + var(--safe-top) + var(--content-warning-height, 0px))',
            zIndex: 9998,
            background: 'rgba(15, 15, 16, 0.98)',
            border: '1px solid rgba(230, 0, 0, 0.3)',
            margin: '16px auto 0',
            maxWidth: 'min(800px, calc(100% - 32px))',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(12px, 3vw, 16px)',
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <BsAndroid2 size={20} color="#fff" />
          </div>
          <div style={{ flex: '1 1 180px', minWidth: 0 }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>
              MaheshStream App Available
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
              Download the latest version for Android
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0, flexWrap: 'wrap' }}>
            <motion.button
              onClick={handleInstall}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-red)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              <HiDownload size={16} />
              Download App
            </motion.button>
            <motion.button
              onClick={dismissInstall}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              style={{
                width: 'var(--touch-target)',
                height: 'var(--touch-target)',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <HiX size={14} />
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="container" ref={ref}>
        <SectionHeader
          label="Download"
          title="Get MaheshStream today."
          subtitle="Download the latest version of MaheshStream for Android. Free, fast, and feature-packed."
        />

        {apkAvailable === false && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '16px 20px',
              marginBottom: '24px',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(255, 171, 0, 0.08)',
              border: '1px solid rgba(255, 171, 0, 0.25)',
              color: 'var(--color-warning)',
            }}
          >
            <HiExclamationCircle size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px', color: 'var(--color-text-primary)' }}>
                APK file not found on server
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', lineHeight: 1.6, margin: 0 }}>
                Place <code style={{ fontFamily: 'var(--font-mono)' }}>{APK_FILENAME}</code> in the <code style={{ fontFamily: 'var(--font-mono)' }}>public/download/</code> folder, then rebuild and redeploy.
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'linear-gradient(135deg, rgba(230,0,0,0.08), rgba(255,26,26,0.08))',
            border: '1px solid rgba(230,0,0,0.15)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(24px, 4vw, 48px)',
            textAlign: 'center',
            marginBottom: '40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 'clamp(120px, 30vw, 300px)',
              height: 'clamp(120px, 30vw, 300px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230,0,0,0.05) 0%, transparent 70%)',
              top: '-50px',
              right: '-40px',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 'clamp(100px, 25vw, 200px)',
              height: 'clamp(100px, 25vw, 200px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,26,26,0.04) 0%, transparent 70%)',
              bottom: '-30px',
              left: '-30px',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-success)',
                marginBottom: '24px',
              }}
            >
              <HiShieldCheck size={16} />
              v{APP_VERSION} — Latest Stable
            </motion.div>

            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 800,
                marginBottom: '8px',
              }}
            >
              Download <span className="gradient-text">MaheshStream</span>
            </h3>

            <p style={{ color: 'var(--color-text-tertiary)', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
              The latest version includes performance improvements, bug fixes, and new features.
              Download the APK and start enjoying endless entertainment.
            </p>

            {/* Main Download Button */}
            <motion.a
              href={APK_DOWNLOAD_URL}
              download={APK_FILENAME}
              onClick={() => trackDownloadClick(APP_VERSION, APK_SIZE_MB)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: 'clamp(14px, 3vw, 18px) clamp(28px, 6vw, 40px)',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-red)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                boxShadow: '0 8px 30px rgba(230, 0, 0, 0.3)',
                marginBottom: '16px',
                textDecoration: 'none',
                minHeight: '52px',
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              aria-label="Download MaheshStream APK 18.5 MB"
            >
              <HiDownload size={22} />
              Download APK ({APK_SIZE_MB} MB)
            </motion.a>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
              <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-bg-glass)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  minHeight: 'var(--touch-target)',
                  cursor: 'pointer',
                }}
              >
                <HiClipboardCopy size={16} />
                {copied ? 'Copied!' : 'Copy Link'}
              </motion.button>
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-bg-glass)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  minHeight: 'var(--touch-target)',
                  cursor: 'pointer',
                }}
              >
                <HiShare size={16} />
                Share
              </motion.button>
            </div>

            {/* QR Code Toggle Button */}
            <div style={{ marginBottom: '24px' }}>
              <motion.button
                onClick={() => setShowQR((prev) => !prev)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                aria-expanded={showQR}
                aria-controls="qr-code-panel"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: 'clamp(8px, 2vw, 10px) clamp(18px, 4vw, 22px)',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(230,0,0,0.1)',
                  border: '1px solid rgba(230,0,0,0.3)',
                  color: 'var(--color-accent-light)',
                  fontWeight: 600,
                  fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                  cursor: 'pointer',
                  minHeight: '44px',
                }}
              >
                <HiQrcode size={18} />
                {showQR ? 'Hide QR Code' : 'Scan QR to Download on Phone'}
              </motion.button>
            </div>

            {/* QR Code Panel */}
            <AnimatePresence>
              {showQR && (
                <motion.div
                  id="qr-code-panel"
                  key="qr-panel"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: '28px' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      background: '#ffffff',
                      borderRadius: 'var(--radius-xl)',
                      padding: 'clamp(16px, 3vw, 20px)',
                      boxShadow: '0 8px 40px rgba(230,0,0,0.2)',
                      border: '2px solid rgba(230,0,0,0.25)',
                    }}
                  >
                    {qrUrl && (
                      <QRCode
                        value={qrUrl}
                        size={180}
                        bgColor="#ffffff"
                        fgColor="#0f0f10"
                        level="M"
                        style={{ display: 'block', width: '100%', height: 'auto', maxWidth: '180px' }}
                        aria-label="QR code to download MaheshStream APK"
                      />
                    )}
                  </div>
                  <p
                    style={{
                      marginTop: '14px',
                      fontSize: '0.82rem',
                      color: 'var(--color-text-tertiary)',
                      lineHeight: 1.5,
                    }}
                  >
                    Point your Android camera at the QR code to download directly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
              {specs.map((spec) => (
                <div key={spec.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
                  <spec.icon size={16} style={{ color: 'var(--color-accent-light)' }} />
                  <span>{spec.label}: <strong style={{ color: 'var(--color-text-secondary)' }}>{spec.value}</strong></span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="download-info-grid" style={{ marginBottom: '40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(20px, 4vw, 32px)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HiDeviceMobile size={20} style={{ color: 'var(--color-accent-light)' }} />
              System Requirements
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {requirements.map((req) => (
                <li key={req} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-tertiary)' }}>
                  <span style={{ color: 'var(--color-success)', marginTop: '3px' }}>✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(20px, 4vw, 32px)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HiInformationCircle size={20} style={{ color: 'var(--color-accent-light)' }} />
              Installation Notes
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {notes.map((note) => (
                <li key={note} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-tertiary)' }}>
                  <span style={{ color: 'var(--color-warning)', marginTop: '3px' }}>•</span>
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="trust-badges-grid"
        >
          <motion.div
            whileHover={{ y: -3 }}
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              textAlign: 'center',
              transition: 'all var(--transition-base)',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent-light)', marginBottom: '8px' }}>
              <AnimatedCounter target={50000} suffix="+" />
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
              Downloads Worldwide
            </div>
          </motion.div>

          <div
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              textAlign: 'center',
              transition: 'all var(--transition-base)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <HiStar key={i} size={18} style={{ color: 'var(--color-warning)' }} />
              ))}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
              User Rating
            </div>
          </div>

          <div
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              textAlign: 'center',
              transition: 'all var(--transition-base)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <HiCheckCircle size={18} style={{ color: 'var(--color-success)' }} />
              <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>
                SHA-256: a3f2b8...
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
              APK checksum verified
            </div>
          </div>

          <div
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              textAlign: 'center',
              transition: 'all var(--transition-base)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <HiShieldCheck size={18} style={{ color: 'var(--color-success)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-success)' }}>
                VirusTotal Safe
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
              0/60 security vendors flag as malicious
            </div>
          </div>
        </motion.div>

        {/* Direct Download Link for Desktop Users */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: '40px',
            background: 'rgba(230, 0, 0, 0.05)',
            border: '1px solid rgba(230, 0, 0, 0.1)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>
            Can't download automatically?
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', marginBottom: '16px' }}>
            Right-click the link below and select "Save Link As..." to download manually.
          </p>
          <a
            href={APK_DOWNLOAD_URL}
            download={APK_FILENAME}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: 'var(--color-bg-glass)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
              fontFamily: 'var(--font-mono)',
              wordBreak: 'break-all',
              maxWidth: '100%',
            }}
          >
            {getApkAbsoluteUrl().replace(/^https?:\/\//, '')}
          </a>
        </motion.div> */}
      </div>
    </Section>
  )
}
