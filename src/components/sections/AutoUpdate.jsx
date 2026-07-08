import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiRefresh, HiCloudDownload, HiBell, HiShieldCheck, HiCog, HiCheckCircle } from 'react-icons/hi'
import Section, { SectionHeader } from '../ui/Section'

const steps = [
  {
    icon: HiCloudDownload,
    title: 'Background Check',
    desc: 'Upon launching MaheshStream, the app automatically checks for available updates by contacting the update server.',
  },
  {
    icon: HiBell,
    title: 'Update Notification',
    desc: 'When a new version is detected, you will receive a subtle in-app notification with details about the update.',
  },
  {
    icon: HiRefresh,
    title: 'One-Tap Update',
    desc: 'Tap "Update Now" and the app downloads the latest version in the background while you continue browsing.',
  },
  {
    icon: HiShieldCheck,
    title: 'Verification',
    desc: 'The downloaded APK is verified using checksum validation to ensure integrity and security.',
  },
  {
    icon: HiCog,
    title: 'Seamless Install',
    desc: 'Once verified, the app automatically replaces the old version. No manual intervention required.',
  },
  {
    icon: HiCheckCircle,
    title: 'Up to Date',
    desc: 'You are now running the latest version with all new features, improvements, and bug fixes applied.',
  },
]

function Step({ step, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        gap: '20px',
        position: 'relative',
        paddingBottom: index < steps.length - 1 ? '40px' : '0',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(230,0,0,0.15), rgba(255,26,26,0.15))',
            border: '1px solid rgba(230,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: 'var(--color-accent-light)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Icon />
        </div>
        {index < steps.length - 1 && (
          <div
            style={{
              width: '1px',
              flex: 1,
              background: 'linear-gradient(to bottom, rgba(230,0,0,0.3), transparent)',
              marginTop: '4px',
            }}
          />
        )}
      </div>
      <div style={{ paddingTop: '10px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px' }}>{step.title}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', lineHeight: 1.7 }}>
          {step.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function AutoUpdate() {
  return (
    <Section id="auto-update">
      <div className="container">
        <SectionHeader
          label="Auto Update"
          title="Always stay up to date."
          subtitle="MaheshStream features a seamless auto-update system that keeps you on the latest version without any effort."
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '640px', margin: '0 auto' }}>
          {steps.map((step, i) => (
            <Step key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}
