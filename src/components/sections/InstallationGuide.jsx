import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HiDownload, HiFolderOpen, HiPlay, HiChevronDown, HiDeviceMobile, HiCog, HiShieldExclamation } from 'react-icons/hi'
import Section, { SectionHeader } from '../ui/Section'

const steps = [
  {
    icon: HiDownload,
    title: 'Download the APK',
    desc: 'Click the download button on this website to get the latest MaheshStream APK file. The file is approximately 18.5 MB.',
    details: 'Ensure you download from the official website only. Avoid third-party sources to prevent security risks.',
  },
  {
    icon: HiShieldExclamation,
    title: 'Enable Unknown Sources',
    desc: 'Go to Settings > Security > Enable "Install from Unknown Sources" or "Install Unknown Apps".',
    details: 'On Android 8.0+, you can grant this permission specifically to your file manager or browser app.',
  },
  {
    icon: HiFolderOpen,
    title: 'Locate the APK',
    desc: 'Open your file manager app and navigate to the Downloads folder where the APK file was saved.',
    details: 'Most Android devices have a pre-installed "Files" or "My Files" app for this purpose.',
  },
  {
    icon: HiDeviceMobile,
    title: 'Install the App',
    desc: 'Tap on the MaheshStream APK file and then tap "Install" on the prompt that appears.',
    details: 'The installation process typically takes less than 30 seconds depending on your device.',
  },
  {
    icon: HiCog,
    title: 'Initial Setup',
    desc: 'Launch MaheshStream and grant the necessary permissions when prompted for the best experience.',
    details: 'Required permissions may include storage access for downloading content and notification access for updates.',
  },
  {
    icon: HiPlay,
    title: 'Start Streaming',
    desc: 'Browse the content library, search for your favorite movies or shows, and start enjoying endless entertainment.',
    details: 'The app will check for updates automatically and notify you when a new version is available.',
  },
]

function StepCard({ step, index, isOpen, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: isOpen ? 'var(--color-bg-card-hover)' : 'var(--color-bg-card)',
        border: '1px solid',
        borderColor: isOpen ? 'var(--color-border-hover)' : 'var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'all var(--transition-base)',
        cursor: 'pointer',
      }}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(230,0,0,0.15), rgba(255,26,26,0.15))',
            fontSize: '1rem',
            color: 'var(--color-accent-light)',
            flexShrink: 0,
          }}
        >
          <Icon />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '2px' }}>
            Step {index + 1}
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{step.title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: 'var(--color-text-muted)' }}
        >
          <HiChevronDown size={18} />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 24px 20px clamp(40px, 10vw, 80px)' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: 1.7 }}>
                {step.desc}
              </p>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-tertiary)',
                  background: 'rgba(230,0,0,0.05)',
                  border: '1px solid rgba(230,0,0,0.1)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  lineHeight: 1.6,
                }}
              >
                💡 {step.details}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function InstallationGuide() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <Section id="installation">
      <div className="container">
        <SectionHeader
          label="Installation Guide"
          title="Get started in minutes."
          subtitle="Follow these simple steps to install MaheshStream on your Android device and start streaming."
        />
        <div className="steps-list">
          {steps.map((step, i) => (
            <StepCard
              key={i}
              step={step}
              index={i}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
