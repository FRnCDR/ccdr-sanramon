import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FaBullseye, FaEye, FaUsers, FaRunning,
  FaHeart, FaHandshake, FaBroadcastTower, FaChartLine, FaLeaf
} from 'react-icons/fa'
import styles from './MissionVision.module.css'

const politicas = [
  {
    Icon: FaUsers,
    title: 'Acceso equitativo',
    desc: 'Promover el acceso equitativo de la población del cantón de San Ramón a programas de educación física, deporte y recreación.',
  },
  {
    Icon: FaRunning,
    title: 'Desarrollo integral',
    desc: 'Fomentar el deporte y la recreación como herramientas para el desarrollo integral de las personas en sus dimensiones física, social y emocional.',
  },
  {
    Icon: FaHandshake,
    title: 'Trabajo articulado',
    desc: 'Fortalecer el trabajo articulado con organizaciones deportivas, comunales y demás actores vinculados al desarrollo deportivo y recreativo del cantón.',
  },
  {
    Icon: FaLeaf,
    title: 'Infraestructura',
    desc: 'Garantizar la adecuada administración, mantenimiento, conservación y aprovechamiento de la infraestructura deportiva y recreativa bajo responsabilidad institucional.',
  },
  {
    Icon: FaBroadcastTower,
    title: 'Comunicación',
    desc: 'Implementar mecanismos de comunicación institucional que permitan brindar información transparente, clara y oportuna a la ciudadanía.',
  },
  {
    Icon: FaChartLine,
    title: 'Mejora continua',
    desc: 'Promover la mejora continua de la gestión institucional mediante la evaluación de procesos, resultados y satisfacción de las personas usuarias.',
  },
  {
    Icon: FaHeart,
    title: 'Salud integral',
    desc: 'Incorporar principios de salud integral, inclusión y bienestar social en los programas y proyectos desarrollados por el Comité.',
  },
]

const cards = [
  {
    Icon: FaBullseye,
    title: 'Misión',
    text: 'El Comité Cantonal de Deportes y Recreación de San Ramón promueve, desarrolla y facilita programas deportivos, recreativos y de actividad física dirigidos a la población del cantón, fomentando estilos de vida saludables, la integración social, la formación integral y el mejoramiento de la calidad de vida de sus habitantes.',
  },
  {
    Icon: FaEye,
    title: 'Visión',
    text: 'Ser una organización referente en la promoción del deporte y la recreación, reconocida por su gestión eficiente, transparente e innovadora, con capacidad técnica y administrativa para atender las necesidades de la población del cantón de San Ramón, contribuyendo al desarrollo humano mediante hábitos de vida saludables.',
  },
]

export default function MissionVision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Identidad Institucional</span>
          <h2 className={styles.title}>Misión, Visión y Políticas</h2>
        </motion.div>

        <div className={styles.mvGrid}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className={styles.mvCard}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            >
              <div className={styles.mvIcon}><card.Icon /></div>
              <h3 className={styles.mvTitle}>{card.title}</h3>
              <p className={styles.mvText}>{card.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          <h3 className={styles.valTitle}>Políticas Institucionales</h3>
          <div className={styles.valGrid}>
            {politicas.map((p, i) => (
              <motion.div
                key={i}
                className={styles.valCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.45 }}
                whileHover={{ y: -7, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
              >
                <div className={styles.valIcon}><p.Icon /></div>
                <h4 className={styles.valName}>{p.title}</h4>
                <p className={styles.valDesc}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
