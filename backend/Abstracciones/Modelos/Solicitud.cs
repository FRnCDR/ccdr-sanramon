using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos;

public class SolicitudBase
{
    [Required(ErrorMessage = "El nombre del solicitante es requerido.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "El nombre debe tener entre 2 y 100 caracteres.")]
    public string NombreSolicitante { get; set; } = string.Empty;

    [Required(ErrorMessage = "La cédula es requerida.")]
    [StringLength(20, MinimumLength = 9, ErrorMessage = "La cédula debe tener entre 9 y 20 caracteres.")]
    public string Cedula { get; set; } = string.Empty;

    [Required(ErrorMessage = "El teléfono es requerido.")]
    [Phone(ErrorMessage = "El teléfono no tiene un formato válido.")]
    [StringLength(20, MinimumLength = 8, ErrorMessage = "El teléfono debe tener entre 8 y 20 caracteres.")]
    public string Telefono { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "El correo electrónico no tiene un formato válido.")]
    [StringLength(100, ErrorMessage = "El correo no puede superar 100 caracteres.")]
    public string? CorreoElectronico { get; set; }

    [Required(ErrorMessage = "La fecha de reserva es requerida.")]
    public DateTime FechaReserva { get; set; }

    [Required(ErrorMessage = "La hora de inicio es requerida.")]
    public TimeSpan HoraInicio { get; set; }

    [Required(ErrorMessage = "La hora de fin es requerida.")]
    public TimeSpan HoraFin { get; set; }

    [StringLength(300, ErrorMessage = "El motivo no puede superar 300 caracteres.")]
    public string? MotivoReserva { get; set; }

    [Required(ErrorMessage = "El estado de la solicitud es requerido.")]
    [StringLength(20, ErrorMessage = "El estado no puede superar 20 caracteres.")]
    public string EstadoSolicitud { get; set; } = "Pendiente";
}

public class SolicitudRequest : SolicitudBase { }

public class SolicitudResponse : SolicitudBase
{
    public int IdSolicitud { get; set; }
    public DateTime FechaSolicitud { get; set; }
}

public class CambioEstadoRequest
{
    [Required(ErrorMessage = "El estado es requerido.")]
    [RegularExpression(@"^(Pendiente|Aprobada|Rechazada|Cancelada)$",
        ErrorMessage = "El estado debe ser: Pendiente, Aprobada, Rechazada o Cancelada.")]
    public string EstadoSolicitud { get; set; } = string.Empty;
}
