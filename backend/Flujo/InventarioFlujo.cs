using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo;

public class InventarioFlujo : IInventarioFlujo
{
    private readonly IInventarioDA _inventarioDA;

    public InventarioFlujo(IInventarioDA inventarioDA)
    {
        _inventarioDA = inventarioDA;
    }

    public async Task<IEnumerable<InventarioResponse>> Obtener()
        => await _inventarioDA.Obtener();

    public async Task<InventarioResponse?> Obtener(int id)
        => await _inventarioDA.Obtener(id);

    public async Task<int> Agregar(InventarioRequest inventario)
        => await _inventarioDA.Agregar(inventario);

    public async Task<int> Editar(int id, InventarioRequest inventario)
        => await _inventarioDA.Editar(id, inventario);

    public async Task<int> Eliminar(int id)
        => await _inventarioDA.Eliminar(id);
}
