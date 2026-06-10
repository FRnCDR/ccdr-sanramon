using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo;

public class SolicitudFlujo : ISolicitudFlujo
{
    private readonly ISolicitudDA _solicitudDA;

    public SolicitudFlujo(ISolicitudDA solicitudDA)
    {
        _solicitudDA = solicitudDA;
    }

    public async Task<IEnumerable<SolicitudResponse>> Obtener()
        => await _solicitudDA.Obtener();

    public async Task<SolicitudResponse?> Obtener(int id)
        => await _solicitudDA.Obtener(id);

    public async Task<int> Agregar(SolicitudRequest solicitud)
        => await _solicitudDA.Agregar(solicitud);

    public async Task<int> Editar(int id, SolicitudRequest solicitud)
        => await _solicitudDA.Editar(id, solicitud);

    public async Task<int> CambiarEstado(int id, string estado)
        => await _solicitudDA.CambiarEstado(id, estado);

    public async Task<int> Eliminar(int id)
        => await _solicitudDA.Eliminar(id);
}
