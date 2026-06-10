import { useRef, useState } from 'react'
  import { motion, useInView } from 'framer-motion'
  import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram,
  FaPaperPlane } from 'react-icons/fa'
  import styles from './Contact.module.css'

  const info = [
    { Icon: FaMapMarkerAlt, label: 'Dirección',  value: 'San Ramón, Alajuela, Costa Rica' },
    { Icon: FaPhone,        label: 'Teléfono',   value: '+506 2445-0453' },
    { Icon: FaEnvelope,     label: 'Correo',     value:
  'ccdr.sanramon@deporteyrecreacioncr.com' },
  ]

  export default function Contact() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [sent, setSent] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', phone: '',
  message: '' })

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]:
  e.target.value }))

    const handleSubmit = e => {
      e.preventDefault()
      setSent(true)
    }

    return (
      <section id="contacto" className={styles.section} ref={ref}>
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.tag}>Contacto</span>
            <h2 className={styles.title}>Escríbanos o Visítenos</h2>
            <p className={styles.sub}>
              Estamos disponibles para responder sus consultas, brindar
  información
              sobre programas y recibir sus propuestas para el deporte
  ramonense.
            </p>
          </motion.div>

          <div className={styles.grid}>
            <motion.div
              className={styles.infoCol}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h3 className={styles.infoTitle}>Información de Contacto</h3>

              {info.map((item, i) => (
                <div key={i} className={styles.infoItem}>
                  <div className={styles.infoIcon}><item.Icon /></div>
                  <div>
                    <span className={styles.infoLabel}>{item.label}</span>
                    <span className={styles.infoValue}>{item.value}</span>
                  </div>
                </div>
              ))}

              <div className={styles.social}>
                <h4 className={styles.socialTitle}>Redes Sociales</h4>
                <div className={styles.socialLinks}>
                  <a
                    href="https://www.facebook.com/CCDRSanRamon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialBtn} ${styles.fb}`}
                  >
                    <FaFacebook /> Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/ccdrsanramon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialBtn} ${styles.ig}`}
                  >
                    <FaInstagram /> Instagram
                  </a>
                </div>
              </div>

              <div className={styles.mapBox}>
                <iframe
                  title="Ubicación CCDR San Ramón"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1
  d15718.77893284857!2d-84.47499!3d10.09197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768
  !4f13.1!3m3!1m2!1s0x8fa07c7a9e0fb6c3%3A0x7e8e9b7fe2e8d8d!2sSan%20Ram%C3%B3
  n%2C%20Alajuela%2C%20Costa%20Rica!5e0!3m2!1ses!2scr!4v1700000000000"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '10px' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              className={styles.formCol}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {sent ? (
                <motion.div
                  className={styles.successBox}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className={styles.successIcon}>✓</div>
                  <h3>¡Mensaje enviado!</h3>
                  <p>Gracias por contactar al CCDR San Ramón. Le
  responderemos a la brevedad posible.</p>
                  <button className={styles.resetBtn} onClick={() => {
  setSent(false); setForm({ name: '', email: '', phone: '', message: '' })
  }}>
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <h3 className={styles.formTitle}>Envíenos un mensaje</h3>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>Nombre completo
  *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Su nombre"
                        required
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Correo electrónico
  *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com"
                        required
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+506 0000-0000"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Mensaje *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Escriba su consulta, solicitud o
  comentario..."
                      required
                      rows={5}
                      className={styles.textarea}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <FaPaperPlane /> Enviar Mensaje
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    )
  }