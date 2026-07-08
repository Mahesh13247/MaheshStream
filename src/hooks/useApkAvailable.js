import { useState, useEffect } from 'react'
import { APK_DOWNLOAD_URL } from '../config/site'

const CACHE_KEY = 'maheshstream-apk-available'
const CACHE_TTL = 5 * 60 * 1000

export default function useApkAvailable() {
  const [available, setAvailable] = useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
      if (cached && Date.now() - cached.time < CACHE_TTL) {
        return cached.value
      }
    } catch {}
    return null
  })

  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
      if (cached && Date.now() - cached.time < CACHE_TTL) return
    } catch {}

    let cancelled = false
    fetch(APK_DOWNLOAD_URL, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) {
          const val = res.ok
          setAvailable(val)
          localStorage.setItem(CACHE_KEY, JSON.stringify({ value: val, time: Date.now() }))
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAvailable(false)
          localStorage.setItem(CACHE_KEY, JSON.stringify({ value: false, time: Date.now() }))
        }
      })

    return () => { cancelled = true }
  }, [])

  return available
}
