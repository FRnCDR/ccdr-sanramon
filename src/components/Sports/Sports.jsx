import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GiSoccerBall, GiBasketballBall, GiVolleyballBall, GiBoxingGlove } from 'react-icons/gi'
import { FaSwimmer } from 'react-icons/fa'
import styles from './Sports.module.css'

const sports = [
  { Icon: GiSoccerBall,     name: 'Fútbol',          color: '#27ae60', desc: 'Ligas, torneos y escuelas formativas para niños y jóvenes.' },
  { Icon: GiBasketballBall, name: 'Baloncesto',      color: '#e67e22', desc: 'Entrenamientos y competencias distritales y cantonales.' },
  { Icon: GiVolleyballBall, name: 'Voleibol',        color: '#2980b9', desc: 'Categorías masculinas y femeninas en diferentes edades.' },
  { Icon: FaSwimmer,        name: 'Natación',        color: '#16a085', desc: 'Programas acuáticos recreativos y competitivos.' },
  { Icon: GiBoxingGlove,   name: 'Artes Marciales', color: '#8e44ad', desc: 'Disciplina, concentración y defensa personal.' },
]

export default function Sports() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="deportes" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Disciplinas</span>
          <h2 className={styles.title}>Deportes y Actividades</h2>
          <p className={styles.sub}>
            Promovemos una amplia variedad de disciplinas deportivas y recreativas
            para que cada habitante del cantón encuentre su pasión.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {sports.map((s, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
            >
              <div className={styles.iconWrap} style={{ background: `${s.color}18` }}>
                <s.Icon style={{ color: s.color }} className={styles.icon} />
              </div>
              <h3 className={styles.name}>{s.name}</h3>
              <p className={styles.desc}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
