import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Applications from './pages/Applications'
import Quality from './pages/Quality'
import Heritage from './pages/Heritage'
import GlobalReach from './pages/GlobalReach'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/heritage" element={<Heritage />} />
        <Route path="/global-reach" element={<GlobalReach />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
