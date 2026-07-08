import { useState, useEffect, useCallback } from 'react'
import { HiDownload, HiMenu, HiX } from 'react-icons/hi'
import ThemeToggle from '../ui/ThemeToggle'
import useActiveSection from '../../hooks/useActiveSection'
import { smoothScroll } from '../../utils/smoothScroll'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Screenshots', href: '#screenshots' },
  { label: 'Demo', href: '#demo' },
  { label: 'Download', href: '#download' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [mobileOpen])

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    requestAnimationFrame(() => {
      smoothScroll(href)
    })
  }, [])

  return (
    <>
      <header
        className="navbar-header"
        style={{
          position: 'fixed',
          top: 'var(--content-warning-height, 0px)',
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'calc(var(--nav-height) + var(--safe-top))',
          paddingTop: 'var(--safe-top)',
          transition: 'background var(--transition-base), backdrop-filter var(--transition-base), border-bottom var(--transition-base)',
          background: scrolled ? 'var(--color-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <div className="nav-inner">
          <a
            href="#hero"
            className="nav-logo"
            onClick={(e) => handleNavClick(e, '#hero')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 800,
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              letterSpacing: '-0.03em',
              flexShrink: 0,
            }}
          >
            <img
              src="/logo.png"
              alt="MaheshStream Logo"
              style={{
                width: '30px',
                flexShrink: 0,
                borderRadius: '8px',
              }}
            />
            Mahesh Stream
          </a>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 24px)' }}>
            <div className="desktop-only" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {navLinks.map((link) => {
                const sectionId = link.href.slice(1)
                const isActive = activeSection === sectionId
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="nav-link"
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-label={`Navigate to ${link.label}`}
                    aria-current={isActive ? 'true' : undefined}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                      background: isActive ? 'rgba(230,0,0,0.15)' : 'transparent',
                      transition: 'all var(--transition-fast)',
                      position: 'relative',
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <div
                        className="nav-active-indicator"
                        style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '16px',
                          height: '2px',
                          borderRadius: '1px',
                          background: 'var(--color-red)',
                        }}
                      />
                    )}
                  </a>
                )
              })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ThemeToggle />
              <a
                href="#download"
                className="desktop-only"
                onClick={(e) => handleNavClick(e, '#download')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-red)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 20px rgba(230, 0, 0, 0.3)',
                  transition: 'all var(--transition-fast)',
                }}
                aria-label="Download MaheshStream APK"
              >
                <HiDownload size={16} />
                Download
              </a>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-glass)',
                border: '1px solid var(--color-border)',
                transition: 'all var(--transition-fast)',
                minWidth: '44px',
                minHeight: '44px',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-primary)',
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileOpen(false)
          }}
        >
          <div className="mobile-nav-content">
            {navLinks.map((link, i) => {
              const sectionId = link.href.slice(1)
              const isActive = activeSection === sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-label={`Navigate to ${link.label}`}
                  style={{
                    animationDelay: `${i * 0.05}s`,
                    color: isActive ? 'var(--color-accent-light)' : 'var(--color-text-primary)',
                  }}
                >
                  {isActive && (
                    <span className="mobile-nav-active-dot" />
                  )}
                  {link.label}
                </a>
              )
            })}
            <a
              href="#download"
              className="mobile-nav-download-btn"
              onClick={(e) => handleNavClick(e, '#download')}
              aria-label="Download MaheshStream APK"
            >
              <HiDownload size={20} />
              Download APK
            </a>
          </div>
        </div>
      )}
    </>
  )
}
