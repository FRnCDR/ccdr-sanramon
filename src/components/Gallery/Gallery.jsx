import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaTimes, FaExpand } from 'react-icons/fa'
import styles from './Gallery.module.css'

const images = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/84/ATLETISMO_2.jpg',
    alt: 'Atletismo — Juegos Deportivos Nacionales de Costa Rica',
    span: 'wide',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/88/BALONCESTO_MASCULINO.jpg',
    alt: 'Baloncesto masculino — Juegos Deportivos Nacionales de Costa Rica',
    span: '',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/FUTBOL_FEMENINO.jpg',
    alt: 'Fútbol femenino — Juegos Deportivos Nacionales de Costa Rica',
    span: '',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/29/GIMNASIA_RITMICA.jpg',
    alt: 'Gimnasia rítmica — Juegos Deportivos Nacionales de Costa Rica',
    span: '',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/CICLISMO_RUTA.jpg',
    alt: 'Ciclismo de ruta — Juegos Deportivos Nacionales de Costa Rica',
    span: 'wide',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/TAEK_WON_DO.jpg',
    alt: 'Taekwondo — Juegos Deportivos Nacionales de Costa Rica',
    span: '',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/66/TRIATLON.jpg',
    alt: 'Triatlón — Juegos Deportivos Nacionales de Costa Rica',
    span: '',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/JUDO_CODEA.jpg',
    alt: 'Judo — Juegos Deportivos Nacionales de Costa Rica',
    span: '',
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)

  return (
    <section id="galeria" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Galería</span>
          <h2 className={styles.title}>Juegos Deportivos Nacionales de Costa Rica</h2>
          <p className={styles.sub}>
            Imágenes de los Juegos Deportivos Nacionales, el principal evento multideportivo
            de Costa Rica organizado por el ICODER, donde compiten atletas de todos los cantones del país.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={`${styles.item} ${img.span === 'wide' ? styles.wide : ''}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              onClick={() => setSelected(img)}
            >
              <img src={img.src} alt={img.alt} className={styles.img} />
              <div className={styles.overlay}>
                <FaExpand className={styles.expandIcon} />
                <span>{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className={styles.credit}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Imágenes: CODEA — Comité Deportivo del Cantón de Alajuela · Licencia CC BY-SA 4.0 · Wikimedia Commons
        </motion.p>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className={styles.lightboxInner}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelected(null)}>
                <FaTimes />
              </button>
              <img src={selected.src} alt={selected.alt} className={styles.lightboxImg} />
              <p className={styles.lightboxCaption}>{selected.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
