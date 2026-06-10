using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA;

public interface IInventarioDA
{
    Task<IEnumerable<InventarioResponse>> Obtener();
    Task<InventarioResponse?> Obtener(int id);
    Task<int> Agregar(InventarioRequest inventario);
    Task<int> Editar(int id, InventarioRequest inventario);
    Task<int> Eliminar(int id);
}
