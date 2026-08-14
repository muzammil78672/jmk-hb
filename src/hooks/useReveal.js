import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Subtle scroll-in for elements with [data-reveal] */
export function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!nodes.length) return undefined

    nodes.forEach((el) => el.classList.remove('is-visible'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((el) => el.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    nodes.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])
}
