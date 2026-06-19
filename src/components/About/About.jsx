import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaCheckCircle, FaHandshake } from 'react-icons/fa'
import styles from './About.module.css'

const highlights = [
  'Programas deportivos, recreativos y de actividad física para toda la población del cantón',
  'Fomentamos estilos de vida saludables, integración social y formación integral',
  'Gestión eficiente, transparente e innovadora de los recursos institucionales',
  'Espacios y actividades inclusivas para todos los sectores del cantón de San Ramón',
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ42H_fNXAi40d7CRPH9_Ha4bVTSFsjpYlavA&s"
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
            El <strong>Comité Cantonal de Deportes y Recreación de San Ramón</strong> promueve,
            desarrolla y facilita programas deportivos, recreativos y de actividad física
            dirigidos a la población del cantón, fomentando estilos de vida saludables,
            la integración social, la formación integral y el mejoramiento de la calidad
            de vida de sus habitantes.
          </p>
          <p className={styles.text}>
            Somos una organización reconocida por su gestión eficiente, transparente e innovadora,
            con capacidad técnica y administrativa para contribuir al desarrollo humano mediante
            hábitos de vida saludables en toda la comunidad ramonense.
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
