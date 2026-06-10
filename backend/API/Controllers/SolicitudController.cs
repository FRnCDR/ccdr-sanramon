using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/solicitud")]
public class SolicitudController : ControllerBase
{
    private readonly ISolicitudFlujo _solicitudFlujo;

    public SolicitudController(ISolicitudFlujo solicitudFlujo)
    {
        _solicitudFlujo = solicitudFlujo;
    }

    [HttpGet]
    public async Task<IActionResult> Obtener()
    {
        var solicitudes = await _solicitudFlujo.Obtener();
        if (!solicitudes.Any())
            return NoContent();
        return Ok(solicitudes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Obtener(int id)
    {
        var solicitud = await _solicitudFlujo.Obtener(id);
        if (solicitud is null)
            return NotFound(new { mensaje = $"No se encontró la solicitud con Id {id}." });
        return Ok(solicitud);
    }

    [HttpPost]
    public async Task<IActionResult> Agregar([FromBody] SolicitudRequest solicitud)
    {
        var validacion = ValidarHorarios(solicitud.HoraInicio, solicitud.HoraFin);
        if (validacion is not null)
            return BadRequest(new { mensaje = validacion });

        var idNuevo = await _solicitudFlujo.Agregar(solicitud);
        return CreatedAtAction(nameof(Obtener), new { id = idNuevo }, new { idSolicitud = idNuevo });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Editar(int id, [FromBody] SolicitudRequest solicitud)
    {
        if (!await VerificarSolicitudExiste(id))
            return NotFound(new { mensaje = $"No se encontró la solicitud con Id {id}." });

        var validacion = ValidarHorarios(solicitud.HoraInicio, solicitud.HoraFin);
        if (validacion is not null)
            return BadRequest(new { mensaje = validacion });

        var idActualizado = await _solicitudFlujo.Editar(id, solicitud);
        return Ok(new { idSolicitud = idActualizado });
    }

    [HttpPatch("{id}/estado")]
    public async Task<IActionResult> CambiarEstado(int id, [FromBody] CambioEstadoRequest request)
    {
        if (!await VerificarSolicitudExiste(id))
            return NotFound(new { mensaje = $"No se encontró la solicitud con Id {id}." });

        var idActualizado = await _solicitudFlujo.CambiarEstado(id, request.EstadoSolicitud);
        return Ok(new { idSolicitud = idActualizado, estado = request.EstadoSolicitud });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Eliminar(int id)
    {
        if (!await VerificarSolicitudExiste(id))
            return NotFound(new { mensaje = $"No se encontró la solicitud con Id {id}." });

        await _solicitudFlujo.Eliminar(id);
        return NoContent();
    }

    private async Task<bool> VerificarSolicitudExiste(int id)
        => await _solicitudFlujo.Obtener(id) is not null;

    private static string? ValidarHorarios(TimeSpan horaInicio, TimeSpan horaFin)
    {
        if (horaFin <= horaInicio)
            return "La hora de fin debe ser mayor a la hora de inicio.";
        return null;
    }
}
