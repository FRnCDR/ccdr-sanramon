import { Link, useLocation } from 'react-router-dom'
import { FaDumbbell, FaBoxOpen, FaCalendarAlt } from 'react-icons/fa'
import styles from './AdminNavbar.module.css'

export default function AdminNavbar() {
  const { pathname } = useLocation()

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <FaDumbbell className={styles.logoIcon} />
          <span>
            <strong className={styles.logoBold}>CCDR</strong>
            <span className={styles.logoSub}> San Ramón</span>
          </span>
        </Link>

        <div className={styles.center}>
          <span className={styles.adminLabel}>Administración</span>
          <Link
            to="/admin/inventario"
            className={`${styles.navLink} ${pathname === '/admin/inventario' ? styles.active : ''}`}
          >
            <FaBoxOpen /> Inventario
          </Link>
          <Link
            to="/admin/solicitudes"
            className={`${styles.navLink} ${pathname === '/admin/solicitudes' ? styles.active : ''}`}
          >
            <FaCalendarAlt /> Solicitudes
          </Link>
        </div>

        <Link to="/" className={styles.backBtn}>
          ← Volver al sitio
        </Link>
      </div>
    </nav>
  )
}
