import { useRef } from 'react'
  import { motion, useInView } from 'framer-motion'
  import {
    FaBullseye, FaEye, FaUsers, FaRunning,
    FaHeart, FaHandshake, FaBalanceScale, FaLeaf
  } from 'react-icons/fa'
  import styles from './MissionVision.module.css'

  const values = [
    { Icon: FaUsers,        title: 'Inclusión',         desc: 'Deporte y recreación accesible para toda persona del cantón.' },
    { Icon: FaRunning,      title: 'Disciplina',         desc: 'Compromiso, esfuerzo y constancia como pilares del éxito.' },
    { Icon: FaHeart,        title: 'Bienestar',          desc: 'Salud física, mental y emocional a través del deporte.'},
    { Icon: FaHandshake,    title: 'Comunidad',          desc: 'Fortalecemos el tejido social a través del deporte colectivo.' },
    { Icon: FaBalanceScale, title: 'Transparencia',      desc: 'Gestión honesta y responsable de los recursos públicos.'},
    { Icon: FaLeaf,         title: 'Participación',      desc: 'Ciudadanos activos en los procesos deportivos y recreativos.' },
  ]

  const cards = [
    {
      Icon: FaBullseye,
      title: 'Misión',
      text: 'Promover el deporte, la recreación y la actividad física como herramientas para el desarrollo humano integral, la salud, la inclusión social y el bienestar de todos los habitantes del cantón de San Ramón, Alajuela, Costa Rica.',
    },
    {
      Icon: FaEye,
      title: 'Visión',
      text: 'Ser el referente cantonal en la promoción del deporte y la recreación, reconocido por excelencia, inclusión y compromiso con el desarrollo sostenible de la comunidad de San Ramón, para el año 2030.',
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
            <h2 className={styles.title}>Misión, Visión y Valores</h2>
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
            <h3 className={styles.valTitle}>Nuestros Valores</h3>
            <div className={styles.valGrid}>
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  className={styles.valCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.45 }}
                  whileHover={{ y: -7, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
                >
                  <div className={styles.valIcon}><v.Icon /></div>
                  <h4 className={styles.valName}>{v.title}</h4>
                  <p className={styles.valDesc}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    )
  }