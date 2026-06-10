using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo;

public interface IInventarioFlujo
{
    Task<IEnumerable<InventarioResponse>> Obtener();
    Task<InventarioResponse?> Obtener(int id);
    Task<int> Agregar(InventarioRequest inventario);
    Task<int> Editar(int id, InventarioRequest inventario);
    Task<int> Eliminar(int id);
}
