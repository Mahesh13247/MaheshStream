import { useState, useEffect, useRef } from 'react'

const SECTIONS = ['hero', 'features', 'screenshots', 'demo', 'download', 'auto-update', 'technology', 'installation', 'changelog', 'faq', 'about', 'legal']

export default function useActiveSection() {
  const [active, setActive] = useState('hero')
  const activeRef = useRef('hero')

  useEffect(() => {
    const handleIntersect = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id
          if (activeRef.current !== id) {
            activeRef.current = id
            setActive(id)
          }
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    })

    for (const id of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return active
}
