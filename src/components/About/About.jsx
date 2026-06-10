import { useRef } from 'react'
  import { motion, useInView } from 'framer-motion'
  import { FaCheckCircle, FaHandshake } from 'react-icons/fa'
  import styles from './About.module.css'

  const highlights = [
    'Atendemos los 13 distritos del cantón de San Ramón',
    'Programas inclusivos para niños, jóvenes, adultos y adultos mayores',
    'Apoyo al talento deportivo local y competencias nacionales',
    'Gestión transparente de recursos públicos para el deporte comunal',
  ]

  export default function About() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    return (
      <section id="sobre-nosotros" className={styles.section} ref={ref}>
        <div className={styles.container}>
          <motion.div
            className={styles.imageCol}
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img
              src="https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&q=80"
              alt="Deporte comunitario en San Ramón"
              className={styles.img}
            />
            <div className={styles.badge}>
              <FaHandshake className={styles.badgeIcon} />
              <div>
                <strong>CCDR San Ramón</strong>
                <span>Cantón de San Ramón, Alajuela</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.textCol}
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          >
            <span className={styles.tag}>Sobre Nosotros</span>
            <h2 className={styles.title}>
              Comprometidos con el deporte y el
              <span className={styles.accent}> bienestar comunal</span>
            </h2>
            <p className={styles.text}>
              El <strong>Comité Cantonal de Deportes y Recreación de San Ramón</strong> es
              una institución pública que trabaja en el cantón de San Ramón, provincia de
              Alajuela, Costa Rica. Somos el ente rector del deporte y la recreación cantonal,
              fundamentados en la Ley 7800 de ICODER.
            </p>
            <p className={styles.text}>
              Nuestro trabajo impulsa la participación activa de toda la comunidad en
              actividades deportivas y recreativas, fomentando la salud, la inclusión
              social, el desarrollo humano integral y el orgullo de pertenecer a San Ramón.
            </p>

            <ul className={styles.list}>
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  className={styles.item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
                >
                  <FaCheckCircle className={styles.check} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <a href="#programas" className={styles.cta}>Conocer nuestros programas</a>
          </motion.div>
        </div>
      </section>
    )
  }