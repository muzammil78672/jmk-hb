import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { site } from '../data/site'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  {
    label: 'About',
    children: [
      { to: '/about', label: 'About Us' },
      { to: '/heritage', label: 'Heritage' },
      { to: '/quality', label: 'Quality' },
    ],
  },
  { to: '/applications', label: 'Applications' },
  { to: '/global-reach', label: 'Markets' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const aboutRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    setOpen(false)
    setAboutOpen(false)
  }, [pathname])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false)
        setAboutOpen(false)
      }
    }
    function onClick(e) {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('click', onClick)
    }
  }, [])

  const aboutActive = ['/about', '/heritage', '/quality'].includes(pathname)

  return (
    <header>
      <div className="container nav">
        <Link className="brand" to="/" onClick={() => setOpen(false)} aria-label={site.name}>
          <img
            className="brand-mark-img"
            src="/assets/brand/logo-mark.svg"
            alt=""
            width={44}
            height={44}
          />
          <span className="brand-text">
            <strong>{site.name}</strong>
            <small>{site.division} · Since {site.established} · India</small>
          </span>
        </Link>
        <nav
          className={`navlinks${open ? ' open' : ''}`}
          aria-label="Primary"
          id="primary-nav"
        >
          {links.map((item) =>
            item.children ? (
              <div
                className={`nav-dropdown${aboutOpen ? ' open' : ''}`}
                key={item.label}
                ref={aboutRef}
              >
                <button
                  type="button"
                  className={`nav-drop-btn${aboutActive ? ' active' : ''}`}
                  aria-expanded={aboutOpen}
                  aria-haspopup="true"
                  onClick={() => setAboutOpen((v) => !v)}
                >
                  {item.label}
                  <span aria-hidden="true">▾</span>
                </button>
                <div className="nav-drop-menu">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) => (isActive ? 'active' : undefined)}
                      onClick={() => {
                        setOpen(false)
                        setAboutOpen(false)
                      }}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ),
          )}
          <Link
            className="btn primary menu-panel-cta"
            to="/contact"
            onClick={() => setOpen(false)}
          >
            Request a Quote
          </Link>
        </nav>
        <Link className="btn primary nav-cta" to="/contact">
          Request a Quote
        </Link>
        <button
          className="menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-nav"
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
