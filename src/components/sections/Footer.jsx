import { useState } from 'react'
import { FaGithub, FaTwitter, FaTelegram, FaDiscord, FaLinkedinIn } from 'react-icons/fa'
import { HiDownload, HiChevronDown } from 'react-icons/hi'
import { APP_VERSION, APK_DOWNLOAD_URL, APK_FILENAME, SOCIAL_LINKS } from '../../config/site'

const footerNav = [
  {
    title: 'About',
    icon: '✦',
    links: [
      { label: 'Our story', href: '#about' },
      { label: 'Screenshots', href: '#screenshots' },
      { label: 'Technology', href: '#technology' },
    ],
  },
  {
    title: 'Resources',
    icon: '◈',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Screenshots', href: '#screenshots' },
      { label: 'Installation', href: '#installation' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
 
  {
    title: 'Legal',
    icon: '○',
    links: [
      { label: 'Terms and conditions', href: '#legal' },
      { label: 'Privacy Policy', href: '#legal' },
      { label: 'DMCA Policy', href: '#legal' },
      { label: 'Copyright Notice', href: '#legal' },
    ],
  },
]

const socialIcons = [
  { Icon: FaGithub, label: 'GitHub', href: SOCIAL_LINKS.github },
  { Icon: FaTwitter, label: 'Twitter', href: SOCIAL_LINKS.twitter },
  { Icon: FaDiscord, label: 'Discord', href: SOCIAL_LINKS.discord },
  { Icon: FaTelegram, label: 'Telegram', href: SOCIAL_LINKS.telegram },
  { Icon: FaLinkedinIn, label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
]

function FooterAccordion({ col, isOpen, onToggle }) {
  return (
    <div className={`footer-accordion ${isOpen ? 'footer-accordion--open' : ''}`}>
      <button
        className="footer-accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="footer-accordion-icon">{col.icon}</span>
        <span className="footer-accordion-title">{col.title}</span>
        <span className="footer-accordion-count">{col.links.length}</span>
        <HiChevronDown size={18} className="footer-accordion-chevron" />
      </button>
      <div className="footer-accordion-body">
        <ul className="footer-accordion-list">
          {col.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="footer-accordion-link"
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.label}
                {link.external && <span className="footer-external-dot" />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Footer() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <footer className="modern-footer" aria-label="Site footer">
      <div className="footer-gradient-top" />

      <div className="footer-body">
        {/* Brand Section */}
        <div className="footer-brand-col footer-animate-in">
          <a href="#hero" className="footer-logo-wrap" aria-label="MaheshStream home">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stopColor="#e60000" />
                  <stop offset="100%" stopColor="#ff3333" />
                </linearGradient>
              </defs>
              <rect width="40" height="40" rx="12" fill="url(#footerLogoGrad)" />
              <path d="M12 10L30 20L12 30V10Z" fill="#ffffff" fillOpacity="0.95" />
            </svg>
            <span className="footer-logo-name">MaheshStream</span>
          </a>

          <p className="footer-brand-desc">
            Premium Android entertainment for movies, TV shows, web series, and live TV — crafted for speed, simplicity, and a great viewing experience.
          </p>

          {/* Social Icons Row */}
          <div className="footer-socials">
            {socialIcons.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="footer-social-btn"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Download Button */}
          <a href={APK_DOWNLOAD_URL} className="footer-dl-btn" download={APK_FILENAME}>
            <HiDownload size={18} />
            <span>Download App</span>
          </a>
          <div className="footer-dl-note">v{APP_VERSION} • APK</div>
        </div>

        {/* Desktop Grid (hidden on mobile) */}
        <div className="footer-nav-grid footer-animate-in footer-animate-delay">
          {footerNav.map((col) => (
            <div key={col.title} className="footer-nav-col">
              <h4 className="footer-nav-heading">{col.title}</h4>
              <ul className="footer-nav-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer-nav-link"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Accordion (hidden on desktop) */}
        <div className="footer-mobile-accordion footer-animate-in footer-animate-delay">
          {footerNav.map((col, i) => (
            <FooterAccordion
              key={col.title}
              col={col}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container">
          <div className="footer-bottom-inner">
            <div className="footer-bottom-left">
              <p className="footer-copy">Copyright © {new Date().getFullYear()} MaheshStream</p>
            </div>
            <div className="footer-bottom-right">
              <a href="#legal" className="footer-bottom-link">Terms</a>
              <span className="footer-bottom-sep" aria-hidden="true" />
              <a href="#legal" className="footer-bottom-link">Privacy</a>
              <span className="footer-bottom-sep" aria-hidden="true" />
              <a href="#legal" className="footer-bottom-link">DMCA</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
