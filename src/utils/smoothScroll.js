function getNavHeight() {
  const style = getComputedStyle(document.documentElement)
  const navVal = style.getPropertyValue('--nav-height').trim()
  const warningVal = style.getPropertyValue('--content-warning-height').trim()
  const nav = parseInt(navVal, 10)
  const warning = parseInt(warningVal, 10)
  const navHeight = Number.isFinite(nav) ? nav : 70
  const warningHeight = Number.isFinite(warning) ? warning : 0
  return navHeight + warningHeight
}

export function smoothScroll(href) {
  if (!href || !href.startsWith('#')) return
  const id = href.slice(1)
  const el = document.getElementById(id)
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY - getNavHeight()
  window.scrollTo({ top, behavior: 'smooth' })
}

export function setupSmoothScroll() {
  const handler = (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return
    const href = link.getAttribute('href')
    if (href === '#') return
    e.preventDefault()
    smoothScroll(href)
  }
  document.addEventListener('click', handler)
  return () => document.removeEventListener('click', handler)
}
