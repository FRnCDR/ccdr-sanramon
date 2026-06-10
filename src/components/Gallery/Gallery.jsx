import { useRef, useState } from 'react'
  import { motion, useInView, AnimatePresence } from 'framer-motion'
  import { FaTimes, FaExpand } from 'react-icons/fa'
  import styles from './Gallery.module.css'

  const images = [
    { src:
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700&q=80',
  alt: 'Atletismo en San Ramón',   span: 'wide' },
    { src:
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&q=80',
  alt: 'Baloncesto comunitario',     span: '' },
    { src:
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80',
  alt: 'Voleibol recreativo',     span: '' },
    { src:
  'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500&q=80',
  alt: 'Fútbol infantil',         span: '' },
    { src:
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&q=80',
  alt: 'Atletismo formativo',     span: 'wide' },
    { src:
  'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&q=80',
  alt: 'Natación deportiva',      span: '' },
    { src:
  'https://images.unsplash.com/photo-1519766304817-4f37bda74a26?w=500&q=80',
  alt: 'Deporte para niños',      span: '' },
    { src:
  'https://images.unsplash.com/photo-1591117207239-788bf8de6748?w=500&q=80',
  alt: 'Actividades recreativas', span: '' },
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
            <h2 className={styles.title}>Momentos del Deporte Ramonense</h2>
            <p className={styles.sub}>
              Imágenes que reflejan la energía, la pasión y el espíritu
  comunitario
              que caracteriza al deporte y la recreación en San Ramón.
            </p>
          </motion.div>

          <div className={styles.grid}>
            {images.map((img, i) => (
              <motion.div
                key={i}
                className={`${styles.item} ${img.span === 'wide' ?
  styles.wide : ''}`}
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
                <button className={styles.closeBtn} onClick={() =>
  setSelected(null)}>
                  <FaTimes />
                </button>
                <img src={selected.src} alt={selected.alt}
  className={styles.lightboxImg} />
                <p className={styles.lightboxCaption}>{selected.alt}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    )
  }