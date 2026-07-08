import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiStar, HiCode, HiLightningBolt, HiShieldCheck, HiColorSwatch, HiCog, HiRefresh } from 'react-icons/hi'
import Section, { SectionHeader } from '../ui/Section'

const releases = [
  {
    version: '3.2.1',
    date: 'July 2025',
    tag: 'Latest',
    tagColor: '#10b981',
    changes: [
      { type: 'feature', icon: HiStar, text: 'New live TV channels added' },
      { type: 'feature', icon: HiColorSwatch, text: 'Redesigned video player controls' },
      { type: 'improvement', icon: HiLightningBolt, text: '40% faster app launch time' },
      { type: 'improvement', icon: HiCog, text: 'Improved subtitle rendering engine' },
      { type: 'fix', icon: HiCode, text: 'Fixed crash on Android 14 devices' },
      { type: 'fix', icon: HiCode, text: 'Resolved playback stuttering on some streams' },
      { type: 'security', icon: HiShieldCheck, text: 'Security patches and stability improvements' },
    ],
  },
  {
    version: '3.1.0',
    date: 'May 2025',
    tag: '',
    changes: [
      { type: 'feature', icon: HiStar, text: 'Continue watching across devices' },
      { type: 'feature', icon: HiRefresh, text: 'Auto-update system overhaul' },
      { type: 'improvement', icon: HiLightningBolt, text: 'Optimized memory usage' },
      { type: 'improvement', icon: HiColorSwatch, text: 'Enhanced dark mode themes' },
      { type: 'fix', icon: HiCode, text: 'Fixed search filter issues' },
    ],
  },
  {
    version: '3.0.0',
    date: 'March 2025',
    tag: 'Major',
    tagColor: '#e60000',
    changes: [
      { type: 'feature', icon: HiStar, text: 'Complete UI redesign with glassmorphism' },
      { type: 'feature', icon: HiColorSwatch, text: 'New content recommendation engine' },
      { type: 'feature', icon: HiRefresh, text: 'Multi-language subtitle support' },
      { type: 'improvement', icon: HiLightningBolt, text: 'Reduced APK size by 25%' },
      { type: 'improvement', icon: HiCog, text: 'Improved streaming source selection' },
      { type: 'fix', icon: HiCode, text: 'Fixed notification badge issues' },
    ],
  },
]

function Release({ release, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const typeColors = {
    feature: 'var(--color-success)',
    improvement: 'var(--color-accent-blue)',
    fix: 'var(--color-warning)',
    security: 'var(--color-error)',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px',
        transition: 'all var(--transition-base)',
      }}
      whileHover={{
        y: -2,
        borderColor: 'var(--color-border-hover)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
          v{release.version}
        </h3>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{release.date}</span>
        {release.tag && (
          <span
            style={{
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: `${release.tagColor}20`,
              color: release.tagColor,
              border: `1px solid ${release.tagColor}30`,
            }}
          >
            {release.tag}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {release.changes.map((change, ci) => {
          const Icon = change.icon
          return (
            <div
              key={ci}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '0.9rem',
                color: 'var(--color-text-tertiary)',
              }}
            >
              <Icon size={16} style={{ color: typeColors[change.type], marginTop: '2px', flexShrink: 0 }} />
              <span>{change.text}</span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function Changelog() {
  return (
    <Section id="changelog">
      <div className="container">
        <SectionHeader
          label="Changelog"
          title="What's new."
          subtitle="Stay informed about the latest updates, improvements, and fixes in every MaheshStream release."
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {releases.map((release, i) => (
            <Release key={release.version} release={release} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}
