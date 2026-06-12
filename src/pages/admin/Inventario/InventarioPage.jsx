import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaPlus, FaEdit, FaTrash, FaBoxOpen,
  FaTimes, FaCheck, FaExclamationTriangle,
} from 'react-icons/fa'
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar'
import { inventarioService } from '../../../services/inventarioService'
import styles from './InventarioPage.module.css'

const EMPTY_FORM = {
  nombreArticulo: '',
  descripcion: '',
  categoria: '',
  cantidadDisponible: 0,
  cantidadMinima: 0,
  estado: 'Activo',
}

function validate(form) {
  const errors = {}
  if (!form.nombreArticulo.trim())
    errors.nombreArticulo = 'El nombre del artículo es requerido.'
  if (!form.categoria.trim())
    errors.categoria = 'La categoría es requerida.'
  if (Number(form.cantidadDisponible) < 0)
    errors.cantidadDisponible = 'No puede ser negativa.'
  if (Number(form.cantidadMinima) < 0)
    errors.cantidadMinima = 'No puede ser negativa.'
  return errors
}

export default function InventarioPage() {
  const [articulos, setArticulos] = useState([])
  const [loading, setLoading]     = useState(true)
  const [toast, setToast]         = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId]       = useState(null)
  const [form, setForm]           = useState(EMPTY_FORM)
  const [errors, setErrors]       = useState({})
  const [saving, setSaving]       = useState(false)
  const [confirmId, setConfirmId] = useState(null)

  const showToast = (type, msg) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchArticulos = useCallback(async () => {
    try {
      setLoading(true)
      const data = await inventarioService.listar()
      setArticulos(data ?? [])
    } catch (e) {
      showToast('error', e.message || 'Error al cargar el inventario.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchArticulos() }, [fetchArticulos])

  const openCreate = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setEditId(null)
    setShowModal(true)
  }

  const openEdit = (art) => {
    setForm({
      nombreArticulo:     art.nombreArticulo,
      descripcion:        art.descripcion ?? '',
      categoria:          art.categoria,
      cantidadDisponible: art.cantidadDisponible,
      cantidadMinima:     art.cantidadMinima,
      estado:             art.estado,
    })
    setErrors({})
    setEditId(art.idInventario)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditId(null)
    setErrors({})
  }

  const handleChange = e => {
    const { name, value, type } = e.target
    setForm(f => ({ ...f, [name]: type === 'number' ? Number(value) : value }))
    setErrors(er => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    try {
      if (editId) {
        await inventarioService.editar(editId, form)
        showToast('success', 'Artículo actualizado correctamente.')
      } else {
        await inventarioService.agregar(form)
        showToast('success', 'Artículo creado correctamente.')
      }
      closeModal()
      fetchArticulos()
    } catch (e) {
      showToast('error', e.message || 'Error al guardar el artículo.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirmId) return
    try {
      await inventarioService.eliminar(confirmId)
      setConfirmId(null)
      showToast('success', 'Artículo eliminado correctamente.')
      fetchArticulos()
    } catch (e) {
      showToast('error', e.message || 'Error al eliminar el artículo.')
      setConfirmId(null)
    }
  }

  const fmtFecha = iso => {
    try { return new Date(iso).toLocaleDateString('es-CR') } catch { return iso }
  }

  return (
    <div className={styles.page}>
      <AdminNavbar />

      <div className={styles.container}>
        {/* Encabezado */}
        <div className={styles.pageHeader}>
          <div>
            <span className={styles.tag}>Gestión</span>
            <h1 className={styles.title}>Inventario</h1>
            <p className={styles.sub}>
              Administre los artículos y equipos del CCDR San Ramón.
            </p>
          </div>
          <button className={styles.btnPrimary} onClick={openCreate}>
            <FaPlus /> Nuevo Artículo
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
            Cargando inventario...
          </div>
        ) : articulos.length === 0 ? (
          <motion.div
            className={styles.empty}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaBoxOpen className={styles.emptyIcon} />
            <p>No hay artículos en el inventario.</p>
            <button className={styles.btnPrimary} onClick={openCreate}>
              <FaPlus /> Agregar primer artículo
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
                    <th>Artículo</th>
                    <th>Categoría</th>
                    <th>Disponible</th>
                    <th>Mínimo</th>
                    <th>Estado</th>
                    <th>Registrado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {articulos.map(art => (
                    <tr key={art.idInventario}>
                      <td>
                        <div className={styles.artName}>{art.nombreArticulo}</div>
                        {art.descripcion && (
                          <div className={styles.artDesc}>{art.descripcion}</div>
                        )}
                      </td>
                      <td>{art.categoria}</td>
                      <td>
                        <span
                          className={
                            art.cantidadDisponible <= art.cantidadMinima
                              ? styles.qtyLow
                              : styles.qty
                          }
                        >
                          {art.cantidadDisponible}
                        </span>
                      </td>
                      <td>{art.cantidadMinima}</td>
                      <td>
                        <span className={`${styles.badge} ${styles['badge_' + art.estado.toLowerCase()]}`}>
                          {art.estado}
                        </span>
                      </td>
                      <td>{fmtFecha(art.fechaRegistro)}</td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            className={styles.btnIcon}
                            onClick={() => openEdit(art)}
                            title="Editar"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className={`${styles.btnIcon} ${styles.btnIconDanger}`}
                            onClick={() => setConfirmId(art.idInventario)}
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
              {articulos.length} artículo{articulos.length !== 1 ? 's' : ''} en total
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
                  {editId ? 'Editar Artículo' : 'Nuevo Artículo'}
                </h2>
                <button className={styles.closeBtn} onClick={closeModal}>
                  <FaTimes />
                </button>
              </div>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Nombre del artículo *</label>
                    <input
                      className={`${styles.input} ${errors.nombreArticulo ? styles.inputErr : ''}`}
                      type="text"
                      name="nombreArticulo"
                      value={form.nombreArticulo}
                      onChange={handleChange}
                      placeholder="Ej: Balón de fútbol"
                      maxLength={100}
                    />
                    {errors.nombreArticulo && (
                      <span className={styles.errMsg}>{errors.nombreArticulo}</span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Categoría *</label>
                    <input
                      className={`${styles.input} ${errors.categoria ? styles.inputErr : ''}`}
                      type="text"
                      name="categoria"
                      value={form.categoria}
                      onChange={handleChange}
                      placeholder="Ej: Deportes de campo"
                      maxLength={60}
                    />
                    {errors.categoria && (
                      <span className={styles.errMsg}>{errors.categoria}</span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Descripción</label>
                  <textarea
                    className={styles.textarea}
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción opcional del artículo..."
                    rows={3}
                    maxLength={500}
                  />
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Cantidad disponible *</label>
                    <input
                      className={`${styles.input} ${errors.cantidadDisponible ? styles.inputErr : ''}`}
                      type="number"
                      name="cantidadDisponible"
                      value={form.cantidadDisponible}
                      onChange={handleChange}
                      min="0"
                    />
                    {errors.cantidadDisponible && (
                      <span className={styles.errMsg}>{errors.cantidadDisponible}</span>
                    )}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Cantidad mínima *</label>
                    <input
                      className={`${styles.input} ${errors.cantidadMinima ? styles.inputErr : ''}`}
                      type="number"
                      name="cantidadMinima"
                      value={form.cantidadMinima}
                      onChange={handleChange}
                      min="0"
                    />
                    {errors.cantidadMinima && (
                      <span className={styles.errMsg}>{errors.cantidadMinima}</span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Estado *</label>
                  <select
                    className={styles.select}
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
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
                    {saving ? 'Guardando...' : editId ? 'Guardar cambios' : 'Crear artículo'}
                  </button>
                </div>
              </form>
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
              <h3 className={styles.confirmTitle}>¿Eliminar artículo?</h3>
              <p className={styles.confirmText}>
                Esta acción no se puede deshacer. El artículo será eliminado permanentemente.
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
