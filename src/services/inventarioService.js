import { api } from './api.js'

export const inventarioService = {
  listar:   ()         => api.get('/api/inventario'),
  obtener:  (id)       => api.get(`/api/inventario/${id}`),
  agregar:  (data)     => api.post('/api/inventario', data),
  editar:   (id, data) => api.put(`/api/inventario/${id}`, data),
  eliminar: (id)       => api.del(`/api/inventario/${id}`),
}
