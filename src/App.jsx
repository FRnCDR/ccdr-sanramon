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

  export default function App() {
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