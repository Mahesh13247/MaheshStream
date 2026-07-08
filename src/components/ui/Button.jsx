import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', size = 'md', href, icon, onClick, external = false, download }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontFamily: 'inherit',
    fontWeight: 600,
    borderRadius: 'var(--radius-full)',
    transition: 'all var(--transition-fast)',
    cursor: 'pointer',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 'var(--touch-target)',
  }

  const sizes = {
    sm: { padding: '8px 20px', fontSize: 'clamp(0.8rem, 2vw, 0.85rem)' },
    md: { padding: '12px 28px', fontSize: 'clamp(0.9rem, 2vw, 0.95rem)' },
    lg: { padding: 'clamp(14px, 3vw, 16px) clamp(24px, 5vw, 36px)', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' },
  }

  const variants = {
    primary: {
      background: 'var(--color-red)',
      color: '#fff',
      border: 'none',
      boxShadow: 'var(--shadow-glow)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border)',
      backdropFilter: 'blur(20px)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      border: '1px solid transparent',
    },
  }

  const style = { ...base, ...sizes[size], ...variants[variant] }

  const content = (
    <>
      {icon && <span style={{ display: 'flex', fontSize: '1.1em' }}>{icon}</span>}
      {children}
    </>
  )

  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <motion.a
        href={href}
        style={style}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        download={download}
        {...linkProps}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      style={style}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
    >
      {content}
    </motion.button>
  )
}
