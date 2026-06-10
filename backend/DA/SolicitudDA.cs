using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;

namespace DA;

public class SolicitudDA : ISolicitudDA
{
    private readonly IRepositorioDapper _repositorio;

    public SolicitudDA(IRepositorioDapper repositorio)
    {
        _repositorio = repositorio;
    }

    public async Task<IEnumerable<SolicitudResponse>> Obtener()
    {
        using var conexion = _repositorio.ObtenerRepositorio();
        return await conexion.QueryAsync<SolicitudResponse>("ObtenerSolicitudes",
            commandType: System.Data.CommandType.StoredProcedure);
    }

    public async Task<SolicitudResponse?> Obtener(int id)
    {
        using var conexion = _repositorio.ObtenerRepositorio();
        return await conexion.QueryFirstOrDefaultAsync<SolicitudResponse>("ObtenerSolicitud",
            new { IdSolicitud = id },
            commandType: System.Data.CommandType.StoredProcedure);
    }

    public async Task<int> Agregar(SolicitudRequest solicitud)
    {
        using var conexion = _repositorio.ObtenerRepositorio();
        return await conexion.ExecuteScalarAsync<int>("AgregarSolicitud",
            new
            {
                solicitud.NombreSolicitante,
                solicitud.Cedula,
                solicitud.Telefono,
                solicitud.CorreoElectronico,
                solicitud.FechaReserva,
                solicitud.HoraInicio,
                solicitud.HoraFin,
                solicitud.MotivoReserva,
                solicitud.EstadoSolicitud
            },
            commandType: System.Data.CommandType.StoredProcedure);
    }

    public async Task<int> Editar(int id, SolicitudRequest solicitud)
    {
        using var conexion = _repositorio.ObtenerRepositorio();
        return await conexion.ExecuteScalarAsync<int>("EditarSolicitud",
            new
            {
                IdSolicitud = id,
                solicitud.NombreSolicitante,
                solicitud.Cedula,
                solicitud.Telefono,
                solicitud.CorreoElectronico,
                solicitud.FechaReserva,
                solicitud.HoraInicio,
                solicitud.HoraFin,
                solicitud.MotivoReserva,
                solicitud.EstadoSolicitud
            },
            commandType: System.Data.CommandType.StoredProcedure);
    }

    public async Task<int> CambiarEstado(int id, string estado)
    {
        using var conexion = _repositorio.ObtenerRepositorio();
        return await conexion.ExecuteScalarAsync<int>("CambiarEstadoSolicitud",
            new { IdSolicitud = id, EstadoSolicitud = estado },
            commandType: System.Data.CommandType.StoredProcedure);
    }

    public async Task<int> Eliminar(int id)
    {
        using var conexion = _repositorio.ObtenerRepositorio();
        return await conexion.ExecuteScalarAsync<int>("EliminarSolicitud",
            new { IdSolicitud = id },
            commandType: System.Data.CommandType.StoredProcedure);
    }
}
