import { useRef } from 'react'
  import { motion, useInView } from 'framer-motion'
  import { FaChild, FaUserAlt, FaUserTie, FaWalking, FaTrophy, FaCalendarAlt } from 'react-icons/fa'
  import styles from './Programs.module.css'

  const programs = [
    { Icon: FaChild,       title: 'Deporte Infantil',       age: 'Niños 5–12 años',    color: '#e74c3c', desc:
  'Iniciación deportiva, juegos recreativos y desarrollo motor en un ambiente seguro y divertido.' },
    { Icon: FaUserAlt,     title: 'Deporte Juvenil',        age: 'Jóvenes 13–18 años', color: '#3498db', desc: 'Ligas juveniles, formación técnica y valores a través del deporte competitivo y recreativo.' },
    { Icon: FaUserTie,     title: 'Deporte Adulto',         age: 'Adultos 19–59 años', color: '#27ae60', desc: 'Torneos, ligas recreativas, clases de fitness y vida activa y saludable.' },
    { Icon: FaWalking,     title: 'Adulto Mayor Activo',    age: '60 años en adelante',color: '#f39c12', desc:
  'Actividad física adaptada, ejercicios de movilidad y recreación con bienestar.' },
    { Icon: FaTrophy,      title: 'Apoyo al Talento',       age: 'Todas las edades',   color: '#9b59b6', desc:
  'Identificación y apoyo a deportistas destacados con proyección a competencias nacionales.' },
    { Icon: FaCalendarAlt, title: 'Actividades Comunitarias', age: 'Toda la familia',  color: '#1abc9c', desc: 'Ferias recreativas, festivales deportivos y caminatas para toda la comunidad.' },
  ]

  const upcoming = [
    { date: '15', month: 'Jul', title: 'Torneo Interdistrital de Fútbol',      place: 'Estadio Municipal, San Ramón',
  type: 'Competencia' },
    { date: '22', month: 'Jul', title: 'Feria Deportiva Familiar',              place: 'Parque Central, San Ramón',
  type: 'Recreación'  },
    { date: '05', month: 'Ago', title: 'Clínica de Atletismo para Jóvenes',    place: 'Instalaciones CCDR',
  type: 'Formación'   },
  ]

  export default function Programs() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
      <section id="programas" className={styles.section} ref={ref}>
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.tag}>Nuestros Programas</span>
            <h2 className={styles.title}>Actividades para Todos</h2>
            <p className={styles.sub}>
              Diseñamos programas que atienden las necesidades deportivas y recreativas
              de cada grupo etario y sector de la comunidad ramonense.
            </p>
          </motion.div>

          <div className={styles.grid}>
            {programs.map((p, i) => (
              <motion.div
                key={i}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                <div className={styles.cardTop} style={{ background: `${p.color}12` }}>
                  <div className={styles.iconBox} style={{ background: p.color }}>
                    <p.Icon className={styles.icon} />
                  </div>
                  <span className={styles.age}>{p.age}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardDesc}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.upcomingBox}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            
          </motion.div>
        </div>
      </section>
    )
  }