using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos;

public class InventarioBase
{
    [Required(ErrorMessage = "El nombre del artículo es requerido.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "El nombre debe tener entre 2 y 100 caracteres.")]
    public string NombreArticulo { get; set; } = string.Empty;

    [StringLength(500, ErrorMessage = "La descripción no puede superar 500 caracteres.")]
    public string? Descripcion { get; set; }

    [Required(ErrorMessage = "La categoría es requerida.")]
    [StringLength(60, MinimumLength = 2, ErrorMessage = "La categoría debe tener entre 2 y 60 caracteres.")]
    public string Categoria { get; set; } = string.Empty;

    [Range(0, int.MaxValue, ErrorMessage = "La cantidad disponible no puede ser negativa.")]
    public int CantidadDisponible { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "La cantidad mínima no puede ser negativa.")]
    public int CantidadMinima { get; set; }

    [Required(ErrorMessage = "El estado es requerido.")]
    [StringLength(30, ErrorMessage = "El estado no puede superar 30 caracteres.")]
    public string Estado { get; set; } = "Activo";
}

public class InventarioRequest : InventarioBase { }

public class InventarioResponse : InventarioBase
{
    public int IdInventario { get; set; }
    public DateTime FechaRegistro { get; set; }
    public DateTime FechaActualizacion { get; set; }
}
