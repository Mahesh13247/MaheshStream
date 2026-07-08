import { FaGithub, FaTwitter, FaTelegram, FaDiscord, FaLinkedinIn } from 'react-icons/fa'
import { HiDownload } from 'react-icons/hi'
import { APP_VERSION, APK_DOWNLOAD_URL, APK_FILENAME, SOCIAL_LINKS } from '../../config/site'

const footerNav = [
  {
    title: 'About',
    links: [
      { label: 'Our story', href: '#about' },
      { label: 'The Team', href: '#about' },
      { label: 'Technology', href: '#technology' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Screenshots', href: '#screenshots' },
      { label: 'Installation', href: '#installation' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: SOCIAL_LINKS.github, external: true },
      { label: 'Twitter', href: SOCIAL_LINKS.twitter, external: true },
      { label: 'Telegram', href: SOCIAL_LINKS.telegram, external: true },
      { label: 'Discord', href: SOCIAL_LINKS.discord, external: true },
      { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms and conditions', href: '#legal' },
      { label: 'Privacy Policy', href: '#legal' },
      { label: 'DMCA Policy', href: '#legal' },
      { label: 'Copyright Notice', href: '#legal' },
    ],
  },
]

const socialMenuItems = [
  { Icon: FaGithub, label: 'GitHub', href: SOCIAL_LINKS.github },
  { Icon: FaTwitter, label: 'Twitter', href: SOCIAL_LINKS.twitter },
  { Icon: FaDiscord, label: 'Discord', href: SOCIAL_LINKS.discord },
  { Icon: FaTelegram, label: 'Telegram', href: SOCIAL_LINKS.telegram },
  { Icon: FaLinkedinIn, label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
]

export default function Footer() {
  return (
    <footer className="modern-footer" aria-label="Site footer">
      <div className="footer-body">
        <div className="footer-brand-col footer-animate-in">
          <a href="#hero" className="footer-logo-wrap" aria-label="MaheshStream home">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="10" fill="#e60000" />
              <path d="M12 10L30 20L12 30V10Z" fill="#ffffff" fillOpacity="0.95" />
            </svg>
            <span className="footer-logo-name">MaheshStream</span>
          </a>

          <p className="footer-brand-desc">
            Premium Android entertainment for movies, TV shows, web series, and live TV — crafted for speed, simplicity, and a great viewing experience.
          </p>

          <div className="footer-socials">
            {socialMenuItems.map(({ Icon, label, href }) => (
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

          <a href={APK_DOWNLOAD_URL} className="footer-dl-btn" download={APK_FILENAME}>
            <HiDownload size={18} />
            <span>Download App</span>
          </a>
          <div className="footer-dl-note">v{APP_VERSION} • APK</div>
        </div>

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
      </div>

      <div className="footer-bottom-bar">
        <div className="container">
          <div className="footer-bottom-inner">
            <div className="footer-bottom-left">
              <p className="footer-copy">Copyright © {new Date().getFullYear()} MaheshStream</p>
            </div>
            <div className="footer-bottom-right">
              <a href="#legal" className="footer-bottom-link">Terms and conditions</a>
              <span className="footer-bottom-sep" aria-hidden="true" />
              <a href="#legal" className="footer-bottom-link">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
