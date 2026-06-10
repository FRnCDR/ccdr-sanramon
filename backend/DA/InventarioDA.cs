using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;

namespace DA;

public class InventarioDA : IInventarioDA
{
    private readonly IRepositorioDapper _repositorio;

    public InventarioDA(IRepositorioDapper repositorio)
    {
        _repositorio = repositorio;
    }

    public async Task<IEnumerable<InventarioResponse>> Obtener()
    {
        using var conexion = _repositorio.ObtenerRepositorio();
        return await conexion.QueryAsync<InventarioResponse>("ObtenerInventarios",
            commandType: System.Data.CommandType.StoredProcedure);
    }

    public async Task<InventarioResponse?> Obtener(int id)
    {
        using var conexion = _repositorio.ObtenerRepositorio();
        return await conexion.QueryFirstOrDefaultAsync<InventarioResponse>("ObtenerInventario",
            new { IdInventario = id },
            commandType: System.Data.CommandType.StoredProcedure);
    }

    public async Task<int> Agregar(InventarioRequest inventario)
    {
        using var conexion = _repositorio.ObtenerRepositorio();
        return await conexion.ExecuteScalarAsync<int>("AgregarInventario",
            new
            {
                inventario.NombreArticulo,
                inventario.Descripcion,
                inventario.Categoria,
                inventario.CantidadDisponible,
                inventario.CantidadMinima,
                inventario.Estado
            },
            commandType: System.Data.CommandType.StoredProcedure);
    }

    public async Task<int> Editar(int id, InventarioRequest inventario)
    {
        using var conexion = _repositorio.ObtenerRepositorio();
        return await conexion.ExecuteScalarAsync<int>("EditarInventario",
            new
            {
                IdInventario = id,
                inventario.NombreArticulo,
                inventario.Descripcion,
                inventario.Categoria,
                inventario.CantidadDisponible,
                inventario.CantidadMinima,
                inventario.Estado
            },
            commandType: System.Data.CommandType.StoredProcedure);
    }

    public async Task<int> Eliminar(int id)
    {
        using var conexion = _repositorio.ObtenerRepositorio();
        return await conexion.ExecuteScalarAsync<int>("EliminarInventario",
            new { IdInventario = id },
            commandType: System.Data.CommandType.StoredProcedure);
    }
}
