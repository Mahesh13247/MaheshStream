import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Section({ id, className = '', children, ...props }) {
  return (
    <section id={id} className={`section ${className}`} {...props}>
      {children}
    </section>
  )
}

export function SectionHeader({ label, title, subtitle, center = true, light = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div
      ref={ref}
      className={`section-header${center ? '' : ' section-header--left'}`}
    >
      <motion.span
        className="section-label"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>
      <motion.h2
        className="section-title"
        style={{ color: light ? 'var(--color-text-primary)' : undefined }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="section-subtitle"
          style={{ textAlign: center ? 'center' : 'left' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
