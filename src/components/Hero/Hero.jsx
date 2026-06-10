import { motion } from 'framer-motion'
  import { FaArrowDown, FaMapMarkerAlt } from 'react-icons/fa'
  import styles from './Hero.module.css'

  export default function Hero() {
    return (
      <section id="inicio" className={styles.hero}>
        <div className={styles.overlay} />
        <div className={styles.particles}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.particle}
              animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5 }}
              style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
            />
          ))}
        </div>

        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <FaMapMarkerAlt />
              <span>San Ramón, Alajuela, Costa Rica</span>
            </motion.div>

            <h1 className={styles.title}>
              Deporte, Recreación<br />
              y <span className={styles.accent}>Comunidad</span>
            </h1>

            <p className={styles.subtitle}>
              El Comité Cantonal de Deportes y Recreación de San Ramón promueve el
              bienestar integral, la participación ciudadana y el desarrollo deportivo
              para todas las edades y sectores de nuestra comunidad.
            </p>

            <motion.div
              className={styles.buttons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a href="#programas" className={styles.btnPrimary}>Ver Programas</a>
              <a href="#contacto" className={styles.btnSecondary}>Contáctenos</a>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            {[
              { n: '13', label: 'Distritos del cantón' },
              { n: '20+', label: 'Disciplinas deportivas' },
              { n: '100+', label: 'Actividades por año' },
              { n: '∞', label: 'Pasión por el deporte' },
            ].map((s, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statN}>{s.n}</span>
                <span className={styles.statL}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.a
          href="#sobre-nosotros"
          className={styles.scrollBtn}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          aria-label="Desplazarse hacia abajo"
        >
          <FaArrowDown />
        </motion.a>
      </section>
    )
  }