import { useRef } from 'react'
  import { motion, useInView } from 'framer-motion'
  import { FaCalendarAlt, FaArrowRight, FaBullhorn } from 'react-icons/fa'
  import styles from './News.module.css'

  const news = [
    {
      date: '2 de junio, 2025',
      category: 'Comunicado',
      title: 'CCDR San Ramón abre inscripciones para programas deportivos del II semestre 2025',
      excerpt: 'El Comité Cantonal de Deportes y Recreación de San Ramón invita a todos los habitantes del cantón a inscribirse en los programas deportivos y recreativos correspondientes al segundo semestre del año. Cupos limitados.',
      img:
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
    },
    {
      date: '18 de mayo, 2025',
      category: 'Evento',
      title: 'Gran éxito en el Torneo Cantonal de Fútbol Infantil 2025',
      excerpt: 'Con la participación de más de 20 equipos representando los distritos del cantón, el Torneo Cantonal de Fútbol Infantil 2025 se desarrolló en un ambiente de sana competencia, fraternidad y valores deportivos.',
      img:
  'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80',
    },
    {
      date: '5 de mayo, 2025',
      category: 'Programa',
      title: 'Nuevo programa de actividad física para adultos mayores en San Ramón',
      excerpt: 'En coordinación con el sistema de salud local, el CCDR San Ramón lanza un programa de actividad física adaptada para adultos mayores, con el objetivo de mejorar su calidad de vida, movilidad y bienestar integral.',
      img:
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    },
  ]

  const categoryColor = {
    Comunicado: '#CC0000',
    Evento:     '#3498db',
    Programa:   '#27ae60',
  }

  export default function News() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
      <section id="noticias" className={styles.section} ref={ref}>
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.tag}>Noticias</span>
            <h2 className={styles.title}>Comunicados e Información</h2>
            <p className={styles.sub}>
              Manténgase informado sobre las actividades, programas y
  novedades
              del Comité Cantonal de Deportes y Recreación de San Ramón.
            </p>
          </motion.div>

          <div className={styles.grid}>
            {news.map((n, i) => (
              <motion.article
                key={i}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.55 }}
              >
                <div className={styles.imgWrap}>
                  <img src={n.img} alt={n.title} className={styles.img} />
                  <span
                    className={styles.catBadge}
                    style={{ background: categoryColor[n.category] }}
                  >
                    {n.category}
                  </span>
                </div>
                <div className={styles.body}>
                  <div className={styles.meta}>
                    <FaCalendarAlt className={styles.calIcon} />
                    <span>{n.date}</span>
                  </div>
                  <h3 className={styles.newsTitle}>{n.title}</h3>
                  <p className={styles.excerpt}>{n.excerpt}</p>
                  <a href="#contacto" className={styles.readMore}>
                    Leer más <FaArrowRight className={styles.arrow} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <FaBullhorn className={styles.bullhorn} />
            <p>Para consultar todos los comunicados oficiales, contáctenos o
  visítenos en nuestras oficinas en San Ramón.</p>
          </motion.div>
        </div>
      </section>
    )
  }