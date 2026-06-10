using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA;

public interface ISolicitudDA
{
    Task<IEnumerable<SolicitudResponse>> Obtener();
    Task<SolicitudResponse?> Obtener(int id);
    Task<int> Agregar(SolicitudRequest solicitud);
    Task<int> Editar(int id, SolicitudRequest solicitud);
    Task<int> CambiarEstado(int id, string estado);
    Task<int> Eliminar(int id);
}
