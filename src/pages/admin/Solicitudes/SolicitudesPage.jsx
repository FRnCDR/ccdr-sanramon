import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaPlus, FaEdit, FaTrash, FaCalendarAlt,
  FaTimes, FaCheck, FaExclamationTriangle, FaExchangeAlt,
} from 'react-icons/fa'
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar'
import { solicitudService } from '../../../services/solicitudService'
import styles from './SolicitudesPage.module.css'

const ESTADOS = ['Pendiente', 'Aprobada', 'Rechazada', 'Cancelada']

const EMPTY_FORM = {
  nombreSolicitante: '',
  cedula: '',
  telefono: '',
  correoElectronico: '',
  fechaReserva: '',
  horaInicio: '',
  horaFin: '',
  motivoReserva: '',
  estadoSolicitud: 'Pendiente',
}

function validate(form) {
  const errors = {}
  if (!form.nombreSolicitante.trim())
    errors.nombreSolicitante = 'El nombre del solicitante es requerido.'
  if (!form.cedula.trim())
    errors.cedula = 'La cédula es requerida.'
  if (form.cedula.trim().length < 9)
    errors.cedula = 'La cédula debe tener al menos 9 caracteres.'
  if (!form.telefono.trim())
    errors.telefono = 'El teléfono es requerido.'
  if (form.telefono.trim().length < 8)
    errors.telefono = 'El teléfono debe tener al menos 8 dígitos.'
  if (!form.fechaReserva)
    errors.fechaReserva = 'La fecha de reserva es requerida.'
  if (!form.horaInicio)
    errors.horaInicio = 'La hora de inicio es requerida.'
  if (!form.horaFin)
    errors.horaFin = 'La hora de fin es requerida.'
  if (form.horaInicio && form.horaFin && form.horaFin <= form.horaInicio)
    errors.horaFin = 'La hora de fin debe ser mayor a la hora de inicio.'
  if (!form.motivoReserva.trim())
    errors.motivoReserva = 'El motivo de reserva es requerido.'
  if (!form.estadoSolicitud)
    errors.estadoSolicitud = 'El estado es requerido.'
  return errors
}

function toTimeSpan(hhmm) {
  if (!hhmm) return ''
  return hhmm.length === 5 ? `${hhmm}:00` : hhmm
}

function fromTimeSpan(ts) {
  if (!ts) return ''
  return ts.slice(0, 5)
}

function toIsoDate(yyyymmdd) {
  if (!yyyymmdd) return ''
  return `${yyyymmdd}T00:00:00`
}

function fromIsoDate(iso) {
  if (!iso) return ''
  return iso.slice(0, 10)
}

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading]         = useState(true)
  const [toast, setToast]             = useState(null)
  const [showModal, setShowModal]     = useState(false)
  const [editId, setEditId]           = useState(null)
  const [form, setForm]               = useState(EMPTY_FORM)
  const [errors, setErrors]           = useState({})
  const [saving, setSaving]           = useState(false)
  const [confirmId, setConfirmId]     = useState(null)
  const [estadoModal, setEstadoModal] = useState(null)
  const [nuevoEstado, setNuevoEstado] = useState('')

  const showToast = (type, msg) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchSolicitudes = useCallback(async () => {
    try {
      setLoading(true)
      const data = await solicitudService.listar()
      setSolicitudes(data ?? [])
    } catch (e) {
      showToast('error', e.message || 'Error al cargar las solicitudes.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchSolicitudes() }, [fetchSolicitudes])

  const openCreate = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setEditId(null)
    setShowModal(true)
  }

  const openEdit = (sol) => {
    setForm({
      nombreSolicitante: sol.nombreSolicitante,
      cedula:            sol.cedula,
      telefono:          sol.telefono,
      correoElectronico: sol.correoElectronico ?? '',
      fechaReserva:      fromIsoDate(sol.fechaReserva),
      horaInicio:        fromTimeSpan(sol.horaInicio),
      horaFin:           fromTimeSpan(sol.horaFin),
      motivoReserva:     sol.motivoReserva ?? '',
      estadoSolicitud:   sol.estadoSolicitud,
    })
    setErrors({})
    setEditId(sol.idSolicitud)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditId(null)
    setErrors({})
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(er => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    const payload = {
      ...form,
      fechaReserva: toIsoDate(form.fechaReserva),
      horaInicio:   toTimeSpan(form.horaInicio),
      horaFin:      toTimeSpan(form.horaFin),
    }
    try {
      if (editId) {
        await solicitudService.editar(editId, payload)
        showToast('success', 'Solicitud actualizada correctamente.')
      } else {
        await solicitudService.agregar(payload)
        showToast('success', 'Solicitud creada correctamente.')
      }
      closeModal()
      fetchSolicitudes()
    } catch (e) {
      showToast('error', e.message || 'Error al guardar la solicitud.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirmId) return
    try {
      await solicitudService.eliminar(confirmId)
      setConfirmId(null)
      showToast('success', 'Solicitud eliminada correctamente.')
      fetchSolicitudes()
    } catch (e) {
      showToast('error', e.message || 'Error al eliminar la solicitud.')
      setConfirmId(null)
    }
  }

  const openEstado = (sol) => {
    setEstadoModal(sol.idSolicitud)
    setNuevoEstado(sol.estadoSolicitud)
  }

  const handleCambiarEstado = async () => {
    if (!estadoModal || !nuevoEstado) return
    try {
      await solicitudService.cambiarEstado(estadoModal, nuevoEstado)
      setEstadoModal(null)
      showToast('success', `Estado actualizado a "${nuevoEstado}".`)
      fetchSolicitudes()
    } catch (e) {
      showToast('error', e.message || 'Error al cambiar el estado.')
      setEstadoModal(null)
    }
  }

  const fmtFecha = iso => {
    try { return new Date(iso).toLocaleDateString('es-CR') } catch { return iso }
  }

  const fmtHora = ts => {
    if (!ts) return '-'
    return ts.slice(0, 5)
  }

  return (
    <div className={styles.page}>
      <AdminNavbar />

      <div className={styles.container}>
        {/* Encabezado */}
        <div className={styles.pageHeader}>
          <div>
            <span className={styles.tag}>Gestión</span>
            <h1 className={styles.title}>Solicitudes de Reserva</h1>
            <p className={styles.sub}>
              Administre las solicitudes de reserva de la cancha del CCDR San Ramón.
            </p>
          </div>
          <button className={styles.btnPrimary} onClick={openCreate}>
            <FaPlus /> Nueva Solicitud
          </button>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              className={`${styles.toast} ${styles['toast_' + toast.type]}`}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {toast.type === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
              {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenido */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            Cargando solicitudes...
          </div>
        ) : solicitudes.length === 0 ? (
          <motion.div
            className={styles.empty}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaCalendarAlt className={styles.emptyIcon} />
            <p>No hay solicitudes de reserva registradas.</p>
            <button className={styles.btnPrimary} onClick={openCreate}>
              <FaPlus /> Crear primera solicitud
            </button>
          </motion.div>
        ) : (
          <motion.div
            className={styles.tableCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Solicitante</th>
                    <th>Cédula</th>
                    <th>Teléfono</th>
                    <th>Fecha Reserva</th>
                    <th>Horario</th>
                    <th>Estado</th>
                    <th>Solicitado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map(sol => (
                    <tr key={sol.idSolicitud}>
                      <td>
                        <div className={styles.solName}>{sol.nombreSolicitante}</div>
                        {sol.correoElectronico && (
                          <div className={styles.solEmail}>{sol.correoElectronico}</div>
                        )}
                      </td>
                      <td>{sol.cedula}</td>
                      <td>{sol.telefono}</td>
                      <td>{fmtFecha(sol.fechaReserva)}</td>
                      <td>
                        <span className={styles.horario}>
                          {fmtHora(sol.horaInicio)} – {fmtHora(sol.horaFin)}
                        </span>
                      </td>
                      <td>
                        <button
                          className={`${styles.estadoBadge} ${styles['estado_' + sol.estadoSolicitud.toLowerCase()]}`}
                          onClick={() => openEstado(sol)}
                          title="Cambiar estado"
                        >
                          {sol.estadoSolicitud}
                        </button>
                      </td>
                      <td>{fmtFecha(sol.fechaSolicitud)}</td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            className={styles.btnIcon}
                            onClick={() => openEstado(sol)}
                            title="Cambiar estado"
                          >
                            <FaExchangeAlt />
                          </button>
                          <button
                            className={styles.btnIcon}
                            onClick={() => openEdit(sol)}
                            title="Editar"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className={`${styles.btnIcon} ${styles.btnIconDanger}`}
                            onClick={() => setConfirmId(sol.idSolicitud)}
                            title="Eliminar"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.tableFooter}>
              {solicitudes.length} solicitud{solicitudes.length !== 1 ? 'es' : ''} en total
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal formulario */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => { if (e.target === e.currentTarget) closeModal() }}
          >
            <motion.div
              className={styles.modalCard}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  {editId ? 'Editar Solicitud' : 'Nueva Solicitud de Reserva'}
                </h2>
                <button className={styles.closeBtn} onClick={closeModal}>
                  <FaTimes />
                </button>
              </div>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* Datos del solicitante */}
                <p className={styles.formSection}>Datos del solicitante</p>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Nombre completo *</label>
                    <input
                      className={`${styles.input} ${errors.nombreSolicitante ? styles.inputErr : ''}`}
                      type="text"
                      name="nombreSolicitante"
                      value={form.nombreSolicitante}
                      onChange={handleChange}
                      placeholder="Nombre del solicitante"
                      maxLength={100}
                    />
                    {errors.nombreSolicitante && (
                      <span className={styles.errMsg}>{errors.nombreSolicitante}</span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Cédula *</label>
                    <input
                      className={`${styles.input} ${errors.cedula ? styles.inputErr : ''}`}
                      type="text"
                      name="cedula"
                      value={form.cedula}
                      onChange={handleChange}
                      placeholder="Ej: 2-0123-0456"
                      maxLength={20}
                    />
                    {errors.cedula && (
                      <span className={styles.errMsg}>{errors.cedula}</span>
                    )}
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Teléfono *</label>
                    <input
                      className={`${styles.input} ${errors.telefono ? styles.inputErr : ''}`}
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="Ej: 8888-8888"
                      maxLength={20}
                    />
                    {errors.telefono && (
                      <span className={styles.errMsg}>{errors.telefono}</span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Correo electrónico</label>
                    <input
                      className={`${styles.input} ${errors.correoElectronico ? styles.inputErr : ''}`}
                      type="email"
                      name="correoElectronico"
                      value={form.correoElectronico}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      maxLength={100}
                    />
                    {errors.correoElectronico && (
                      <span className={styles.errMsg}>{errors.correoElectronico}</span>
                    )}
                  </div>
                </div>

                {/* Datos de la reserva */}
                <p className={styles.formSection}>Datos de la reserva</p>

                <div className={styles.row3}>
                  <div className={styles.field}>
                    <label className={styles.label}>Fecha de reserva *</label>
                    <input
                      className={`${styles.input} ${errors.fechaReserva ? styles.inputErr : ''}`}
                      type="date"
                      name="fechaReserva"
                      value={form.fechaReserva}
                      onChange={handleChange}
                    />
                    {errors.fechaReserva && (
                      <span className={styles.errMsg}>{errors.fechaReserva}</span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Hora de inicio *</label>
                    <input
                      className={`${styles.input} ${errors.horaInicio ? styles.inputErr : ''}`}
                      type="time"
                      name="horaInicio"
                      value={form.horaInicio}
                      onChange={handleChange}
                    />
                    {errors.horaInicio && (
                      <span className={styles.errMsg}>{errors.horaInicio}</span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Hora de fin *</label>
                    <input
                      className={`${styles.input} ${errors.horaFin ? styles.inputErr : ''}`}
                      type="time"
                      name="horaFin"
                      value={form.horaFin}
                      onChange={handleChange}
                    />
                    {errors.horaFin && (
                      <span className={styles.errMsg}>{errors.horaFin}</span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Motivo de reserva *</label>
                  <textarea
                    className={`${styles.textarea} ${errors.motivoReserva ? styles.inputErr : ''}`}
                    name="motivoReserva"
                    value={form.motivoReserva}
                    onChange={handleChange}
                    placeholder="Describa el motivo o actividad para la que solicita la cancha..."
                    rows={3}
                    maxLength={300}
                  />
                  {errors.motivoReserva && (
                    <span className={styles.errMsg}>{errors.motivoReserva}</span>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Estado *</label>
                  <select
                    className={`${styles.select} ${errors.estadoSolicitud ? styles.inputErr : ''}`}
                    name="estadoSolicitud"
                    value={form.estadoSolicitud}
                    onChange={handleChange}
                  >
                    {ESTADOS.map(e => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                  {errors.estadoSolicitud && (
                    <span className={styles.errMsg}>{errors.estadoSolicitud}</span>
                  )}
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={closeModal}
                    disabled={saving}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className={styles.btnPrimary} disabled={saving}>
                    {saving
                      ? 'Guardando...'
                      : editId
                      ? 'Guardar cambios'
                      : 'Crear solicitud'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal cambio de estado */}
      <AnimatePresence>
        {estadoModal && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => { if (e.target === e.currentTarget) setEstadoModal(null) }}
          >
            <motion.div
              className={`${styles.modalCard} ${styles.estadoCard}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Cambiar Estado</h2>
                <button className={styles.closeBtn} onClick={() => setEstadoModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className={styles.estadoBody}>
                <p className={styles.estadoSub}>Seleccione el nuevo estado de la solicitud:</p>
                <div className={styles.estadoBtns}>
                  {ESTADOS.map(est => (
                    <button
                      key={est}
                      className={`${styles.estadoOpt} ${styles['estadoOpt_' + est.toLowerCase()]} ${nuevoEstado === est ? styles.estadoOptSelected : ''}`}
                      onClick={() => setNuevoEstado(est)}
                    >
                      {nuevoEstado === est && <FaCheck className={styles.checkIcon} />}
                      {est}
                    </button>
                  ))}
                </div>
                <div className={styles.formActions}>
                  <button className={styles.btnSecondary} onClick={() => setEstadoModal(null)}>
                    Cancelar
                  </button>
                  <button className={styles.btnPrimary} onClick={handleCambiarEstado}>
                    Confirmar cambio
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal confirmación eliminación */}
      <AnimatePresence>
        {confirmId && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`${styles.modalCard} ${styles.confirmCard}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
            >
              <div className={styles.confirmIcon}>
                <FaExclamationTriangle />
              </div>
              <h3 className={styles.confirmTitle}>¿Eliminar solicitud?</h3>
              <p className={styles.confirmText}>
                Esta acción no se puede deshacer. La solicitud será eliminada permanentemente.
              </p>
              <div className={styles.confirmActions}>
                <button className={styles.btnSecondary} onClick={() => setConfirmId(null)}>
                  Cancelar
                </button>
                <button className={styles.btnDanger} onClick={handleDelete}>
                  Sí, eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
