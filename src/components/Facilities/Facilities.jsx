import { useRef } from 'react'
  import { motion, useInView } from 'framer-motion'
  import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'
  import styles from './Facilities.module.css'

  const facilities = [
    {
      img:
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
      name: 'Gimnasio Municipal',
      desc: 'Instalación cubierta para deportes de sala, entrenamientos y eventos deportivos del cantón.',
      tag: 'Cubierto',
    },
    {
      img:
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80',
      name: 'Cancha de Fútbol',
      desc: 'Campo de fútbol habilitado para ligas distritales, torneos cantonales y escuelas deportivas.',
      tag: 'Exterior',
    },
    {
      img:
  'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=600&q=80',
      name: 'Cancha Multiuso',
      desc: 'Espacio polideportivo adaptado para baloncesto, voleibol y otras actividades recreativas.',
      tag: 'Multiuso',
    },
    {
      img:
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
      name: 'Pista de Atletismo',
      desc: 'Pista habilitada para entrenamientos y competencias de atletismo de distintas categorías.',
      tag: 'Atletismo',
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
              El cantón

● Continuing from the Facilities subtitle:

            </p>

            <p className={styles.sub}>
              Espacios deportivos y recreativos al servicio de todos los
  habitantes
              del cantón de San Ramón. Datos de instalaciones sujetos a
  confirmación oficial.
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
                    Más información <FaArrowRight className={styles.arrow}
  />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className={styles.note}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            * Instalaciones representativas. Para información oficial
  actualizada, contacte al CCDR San Ramón.
          </motion.p>
        </div>
      </section>
    )
  }