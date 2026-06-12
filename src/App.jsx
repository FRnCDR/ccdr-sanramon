import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import MissionVision from './components/MissionVision/MissionVision'
import Sports from './components/Sports/Sports'
import Programs from './components/Programs/Programs'
import Facilities from './components/Facilities/Facilities'
import News from './components/News/News'
import Gallery from './components/Gallery/Gallery'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import InventarioPage from './pages/admin/Inventario/InventarioPage'
import SolicitudesPage from './pages/admin/Solicitudes/SolicitudesPage'

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MissionVision />
        <Sports />
        <Programs />
        <Facilities />
        <News />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/inventario" element={<InventarioPage />} />
        <Route path="/admin/solicitudes" element={<SolicitudesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
