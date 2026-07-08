import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HiFilm, HiDesktopComputer, HiCollection, HiSearch,
  HiPlay, HiHeart, HiClock, HiStar,
  HiDuplicate, HiTranslate, HiAdjustments, HiDeviceMobile,
  HiMoon, HiLightningBolt, HiShieldCheck,
  HiRefresh, HiEye, HiMenu, HiAnnotation,
  HiBell, HiColorSwatch,
} from 'react-icons/hi'
import Section, { SectionHeader } from '../ui/Section'

const features = [
  { icon: HiFilm, title: 'Movies', desc: 'Browse an extensive collection of movies across all genres. From Hollywood blockbusters to indie gems.' },
  { icon: HiDesktopComputer, title: 'TV Shows', desc: 'Catch up on the latest TV shows. Stream full seasons with high-quality playback.' },
  { icon: HiCollection, title: 'Web Series', desc: 'Discover trending web series from around the world. New episodes added regularly.' },
  { icon: HiPlay, title: 'Live TV', desc: 'Watch live television channels in real-time. News, sports, entertainment, and more.' },
  { icon: HiSearch, title: 'Powerful Search', desc: 'Find any content instantly with our advanced search. Filter by genre, year, rating, and more.' },
  { icon: HiClock, title: 'Continue Watching', desc: 'Pick up where you left off. Your progress is saved automatically across all content.' },
  { icon: HiHeart, title: 'Favorites', desc: 'Save your favorite movies and shows to a personal watchlist for quick access.' },
  { icon: HiStar, title: 'Watch History', desc: 'Never lose track of what you have watched. Full history with timestamps and progress.' },
  { icon: HiDuplicate, title: 'Multiple Sources', desc: 'Smart source selection automatically picks the best available stream for your content.' },
  { icon: HiTranslate, title: 'Subtitle Support', desc: 'Full subtitle support with multiple languages. Customize font size, color, and position.' },
  { icon: HiAdjustments, title: 'High Quality', desc: 'Stream in HD and Full HD quality. Adaptive bitrate ensures smooth playback.' },
  { icon: HiColorSwatch, title: 'Modern Player', desc: 'Feature-rich video player with gesture controls, speed adjustment, and casting support.' },
  { icon: HiDeviceMobile, title: 'Responsive UI', desc: 'Beautiful interface that adapts perfectly to any screen size. Phone, tablet, or desktop.' },
  { icon: HiMoon, title: 'Dark Mode', desc: 'Easy on the eyes with a premium dark theme. Designed for extended viewing sessions.' },
  { icon: HiLightningBolt, title: 'Fast Performance', desc: 'Optimized for speed. Fast load times, smooth scrolling, and instant content playback.' },
  { icon: HiShieldCheck, title: 'Password Protected', desc: 'Keep your account secure with password protection and optional PIN lock for specific areas.' },
  { icon: HiRefresh, title: 'Auto Update', desc: 'Stay up to date with automatic in-app updates. New features delivered seamlessly.' },
  { icon: HiEye, title: 'Beautiful UI', desc: 'Premium user interface with smooth animations, glass effects, and an elegant design system.' },
  { icon: HiMenu, title: 'Smooth Navigation', desc: 'Intuitive navigation with a well-organized menu. Everything is just a tap away.' },
  { icon: HiAnnotation, title: 'Optimized', desc: 'Lightweight and efficient. Minimal battery usage with maximum performance.' },
  { icon: HiBell, title: 'Notifications', desc: 'Stay informed with in-app notifications for updates, new content, and important alerts.' },
  { icon: HiDeviceMobile, title: 'Android Optimized', desc: 'Built specifically for Android with Material Design guidelines and native performance.' },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(16px, 3vw, 24px)',
        transition: 'all var(--transition-base)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-hover)'
        e.currentTarget.style.background = 'var(--color-bg-card-hover)'
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.background = 'var(--color-bg-card)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, rgba(230,0,0,0.15), rgba(255,26,26,0.15))',
          marginBottom: '16px',
          fontSize: '1.25rem',
          color: 'var(--color-accent-light)',
        }}
      >
        <Icon />
      </div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '8px' }}>{feature.title}</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', lineHeight: 1.7, flex: 1 }}>{feature.desc}</p>
    </motion.div>
  )
}

export default function Features() {
  return (
    <Section id="features" style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(230,0,0,0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div className="container">
        <SectionHeader
          label="Features"
          title="Everything you need,<br />nothing you don't."
          subtitle="MaheshStream is packed with premium features designed for the ultimate entertainment experience."
        />
        <div className="features-grid">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}
