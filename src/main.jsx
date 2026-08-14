import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { asset } from './utils/asset'

// Vite BASE_URL is `/` locally and `/jmk-hb/` on GitHub Pages.
// React Router expects no trailing slash (except for root).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

const rootStyles = document.documentElement.style
rootStyles.setProperty(
  '--img-cta-band',
  `url("${asset('assets/products/heartwood.jpg')}")`,
)
rootStyles.setProperty(
  '--img-page-hero',
  `url("${asset('assets/products/hero-warm-wood.jpg')}")`,
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename === '/' ? undefined : basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
