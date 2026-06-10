import { FaDumbbell, FaFacebook, FaInstagram, FaPhone, FaEnvelope,
  FaMapMarkerAlt, FaHeart } from 'react-icons/fa'
  import styles from './Footer.module.css'

  const links = [
    { label: 'Inicio',          href: '#inicio' },
    { label: 'Sobre Nosotros',  href: '#sobre-nosotros' },
    { label: 'Deportes',        href: '#deportes' },
    { label: 'Programas',       href: '#programas' },
    { label: 'Instalaciones',   href: '#instalaciones' },
    { label: 'Noticias',        href: '#noticias' },
    { label: 'Contacto',        href: '#contacto' },
  ]

  export default function Footer() {
    const year = new Date().getFullYear()

    return (
      <footer className={styles.footer}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <FaDumbbell className={styles.logoIcon} />
              <span>
                <strong>CCDR</strong> San Ramón
              </span>
            </div>
            <p className={styles.tagline}>
              Impulsando el deporte, la recreación y el bienestar integral
              de toda la comunidad ramonense. Juntos construimos un cantón
              más activo, saludable e inclusivo.
            </p>
            <div className={styles.social}>
              <a href="https://www.facebook.com/CCDRSanRamon"
  target="_blank" rel="noopener noreferrer" className={styles.socialLink}
  aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/ccdrsanramon"
  target="_blank" rel="noopener noreferrer" className={styles.socialLink}
  aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Navegación</h4>
            <ul className={styles.linkList}>
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} className={styles.footLink}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Contacto</h4>
            <ul className={styles.contactList}>
              <li>
                <FaMapMarkerAlt className={styles.cIcon} />
                <span>San Ramón, Alajuela, Costa Rica</span>
              </li>
              <li>
                <FaPhone className={styles.cIcon} />
                <a href="tel:+50624450453">+506 2445-0453</a>
              </li>
              <li>
                <FaEnvelope className={styles.cIcon} />
                <a href="mailto:ccdr.sanramon@deporteyrecreacioncr.com">
                  ccdr.sanramon@<br />deporteyrecreacioncr.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} Comité Cantonal de Deportes y Recreación de San Ramón.
            Todos los derechos reservados.
          </p>
          <p className={styles.made}>
            Hecho con <FaHeart className={styles.heart} /> para la comunidad
  ramonense
          </p>
        </div>
      </footer>
    )
  }