using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using DA;
using Flujo;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "CCDR San Ramón API",
        Version = "v1",
        Description = "API del Comité Cantonal de Deportes y Recreación de San Ramón"
    });
});

// Flujo
builder.Services.AddScoped<IInventarioFlujo, InventarioFlujo>();
builder.Services.AddScoped<ISolicitudFlujo, SolicitudFlujo>();

// DA
builder.Services.AddScoped<IInventarioDA, InventarioDA>();
builder.Services.AddScoped<ISolicitudDA, SolicitudDA>();
builder.Services.AddScoped<IRepositorioDapper, RepositorioDapper>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
