import { useState, useEffect } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  import { FaBars, FaTimes, FaDumbbell } from 'react-icons/fa'
  import styles from './Navbar.module.css'

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#sobre-nosotros' },
    { label: 'Deportes', href: '#deportes' },
    { label: 'Programas', href: '#programas' },
    { label: 'Instalaciones', href: '#instalaciones' },
    { label: 'Noticias', href: '#noticias' },
    { label: 'Contacto', href: '#contacto' },
  ]

  export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 60)
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const close = () => setIsOpen(false)

    return (
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a href="#inicio" className={styles.logo}>
            <FaDumbbell className={styles.logoIcon} />
            <span>
              <strong className={styles.logoBold}>CCDR</strong>
              <span className={styles.logoSub}> San Ramón</span>
            </span>
          </a>

          <ul className={styles.links}>
            {navLinks.map(l => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>{l.label}</a>
              </li>
            ))}
            <li>
              <a href="#contacto" className={styles.cta}>Participar</a>
            </li>
          </ul>

          <button
            className={styles.burger}
            onClick={() => setIsOpen(o => !o)}
            aria-label="Abrir menú"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.mobile}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {navLinks.map(l => (
                <a key={l.href} href={l.href} className={styles.mobileLink} onClick={close}>
                  {l.label}
                </a>
              ))}
              <a href="#contacto" className={styles.mobileCta} onClick={close}>
                Participar
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    )
  }