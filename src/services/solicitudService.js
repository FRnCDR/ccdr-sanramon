import { api } from './api.js'

export const solicitudService = {
  listar:       ()              => api.get('/api/solicitud'),
  obtener:      (id)            => api.get(`/api/solicitud/${id}`),
  agregar:      (data)          => api.post('/api/solicitud', data),
  editar:       (id, data)      => api.put(`/api/solicitud/${id}`, data),
  cambiarEstado:(id, estado)    => api.patch(`/api/solicitud/${id}/estado`, { estadoSolicitud: estado }),
  eliminar:     (id)            => api.del(`/api/solicitud/${id}`),
}
