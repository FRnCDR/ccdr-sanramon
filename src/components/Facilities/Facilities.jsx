import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'
import styles from './Facilities.module.css'

const facilities = [
  {
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    name: 'Gimnasio',
    desc: 'Instalación cubierta equipada para entrenamientos, actividades deportivas y eventos recreativos al servicio de la comunidad ramonense.',
    tag: 'Cubierto',
  },
  {
    img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80',
    name: 'Cancha de Futsal',
    desc: 'Cancha cubierta habilitada para la práctica de fútbol sala, torneos cantonales y programas deportivos para todas las edades.',
    tag: 'Fútbol Sala',
  },
  {
    img: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=600&q=80',
    name: 'Piscina',
    desc: 'Piscina disponible para entrenamientos de natación, clases grupales y programas acuáticos recreativos para la comunidad.',
    tag: 'Acuático',
  },
]

export default function Facilities() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="instalaciones" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Infraestructura</span>
          <h2 className={styles.title}>Nuestras Instalaciones</h2>
          <p className={styles.sub}>
            Espacios deportivos y recreativos al servicio de todos los habitantes
            del cantón de San Ramón.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {facilities.map((f, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55 }}
            >
              <div className={styles.imgWrapper}>
                <img src={f.img} alt={f.name} className={styles.img} />
                <span className={styles.badge}>{f.tag}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.loc}>
                  <FaMapMarkerAlt className={styles.locIcon} />
                  <span>San Ramón, Alajuela</span>
                </div>
                <h3 className={styles.name}>{f.name}</h3>
                <p className={styles.desc}>{f.desc}</p>
                <a href="#contacto" className={styles.btn}>
                  Más información <FaArrowRight className={styles.arrow} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
