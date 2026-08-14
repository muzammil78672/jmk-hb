/** Prefix public asset paths with Vite base (works locally and on GitHub Pages). */
export function asset(path) {
  const clean = String(path).replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${clean}`
}
