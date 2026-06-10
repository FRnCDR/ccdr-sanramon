using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/inventario")]
public class InventarioController : ControllerBase
{
    private readonly IInventarioFlujo _inventarioFlujo;

    public InventarioController(IInventarioFlujo inventarioFlujo)
    {
        _inventarioFlujo = inventarioFlujo;
    }

    [HttpGet]
    public async Task<IActionResult> Obtener()
    {
        var articulos = await _inventarioFlujo.Obtener();
        if (!articulos.Any())
            return NoContent();
        return Ok(articulos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Obtener(int id)
    {
        var articulo = await _inventarioFlujo.Obtener(id);
        if (articulo is null)
            return NotFound(new { mensaje = $"No se encontró el artículo con Id {id}." });
        return Ok(articulo);
    }

    [HttpPost]
    public async Task<IActionResult> Agregar([FromBody] InventarioRequest inventario)
    {
        var idNuevo = await _inventarioFlujo.Agregar(inventario);
        return CreatedAtAction(nameof(Obtener), new { id = idNuevo }, new { idInventario = idNuevo });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Editar(int id, [FromBody] InventarioRequest inventario)
    {
        if (!await VerificarArticuloExiste(id))
            return NotFound(new { mensaje = $"No se encontró el artículo con Id {id}." });

        var idActualizado = await _inventarioFlujo.Editar(id, inventario);
        return Ok(new { idInventario = idActualizado });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Eliminar(int id)
    {
        if (!await VerificarArticuloExiste(id))
            return NotFound(new { mensaje = $"No se encontró el artículo con Id {id}." });

        await _inventarioFlujo.Eliminar(id);
        return NoContent();
    }

    private async Task<bool> VerificarArticuloExiste(int id)
        => await _inventarioFlujo.Obtener(id) is not null;
}
