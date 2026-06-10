-- ============================================================
-- CCDR San Ramón - Script de base de datos
-- Base de datos: CCDR_SanRamon_DB
-- Motor: SQL Server
-- ============================================================

USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'CCDR_SanRamon_DB')
BEGIN
    CREATE DATABASE CCDR_SanRamon_DB;
END
GO

USE CCDR_SanRamon_DB;
GO

-- ============================================================
-- TABLA: Inventario
-- ============================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Inventario')
BEGIN
    CREATE TABLE [dbo].[Inventario] (
        [IdInventario]       INT           NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [NombreArticulo]     VARCHAR(100)  NOT NULL,
        [Descripcion]        VARCHAR(500)  NULL,
        [Categoria]          VARCHAR(60)   NOT NULL,
        [CantidadDisponible] INT           NOT NULL DEFAULT 0,
        [CantidadMinima]     INT           NOT NULL DEFAULT 0,
        [Estado]             VARCHAR(30)   NOT NULL DEFAULT 'Activo',
        [FechaRegistro]      DATETIME      NOT NULL DEFAULT GETDATE(),
        [FechaActualizacion] DATETIME      NOT NULL DEFAULT GETDATE()
    );
END
GO

-- ============================================================
-- TABLA: Solicitudes
-- ============================================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Solicitudes')
BEGIN
    CREATE TABLE [dbo].[Solicitudes] (
        [IdSolicitud]       INT           NOT NULL IDENTITY(1,1) PRIMARY KEY,
        [NombreSolicitante] VARCHAR(100)  NOT NULL,
        [Cedula]            VARCHAR(20)   NOT NULL,
        [Telefono]          VARCHAR(20)   NOT NULL,
        [CorreoElectronico] VARCHAR(100)  NULL,
        [FechaReserva]      DATETIME      NOT NULL,
        [HoraInicio]        TIME          NOT NULL,
        [HoraFin]           TIME          NOT NULL,
        [MotivoReserva]     VARCHAR(300)  NULL,
        [EstadoSolicitud]   VARCHAR(20)   NOT NULL DEFAULT 'Pendiente',
        [FechaSolicitud]    DATETIME      NOT NULL DEFAULT GETDATE()
    );
END
GO

-- ============================================================
-- STORED PROCEDURES: Inventario
-- ============================================================

-- Obtener todos los artículos
IF OBJECT_ID('ObtenerInventarios', 'P') IS NOT NULL DROP PROCEDURE ObtenerInventarios;
GO
CREATE PROCEDURE ObtenerInventarios
AS
BEGIN
    SELECT IdInventario, NombreArticulo, Descripcion, Categoria,
           CantidadDisponible, CantidadMinima, Estado,
           FechaRegistro, FechaActualizacion
    FROM Inventario
    ORDER BY NombreArticulo;
END
GO

-- Obtener un artículo por Id
IF OBJECT_ID('ObtenerInventario', 'P') IS NOT NULL DROP PROCEDURE ObtenerInventario;
GO
CREATE PROCEDURE ObtenerInventario
    @IdInventario INT
AS
BEGIN
    SELECT IdInventario, NombreArticulo, Descripcion, Categoria,
           CantidadDisponible, CantidadMinima, Estado,
           FechaRegistro, FechaActualizacion
    FROM Inventario
    WHERE IdInventario = @IdInventario;
END
GO

-- Agregar artículo
IF OBJECT_ID('AgregarInventario', 'P') IS NOT NULL DROP PROCEDURE AgregarInventario;
GO
CREATE PROCEDURE AgregarInventario
    @NombreArticulo     VARCHAR(100),
    @Descripcion        VARCHAR(500),
    @Categoria          VARCHAR(60),
    @CantidadDisponible INT,
    @CantidadMinima     INT,
    @Estado             VARCHAR(30)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Inventario
            (NombreArticulo, Descripcion, Categoria, CantidadDisponible, CantidadMinima, Estado)
        VALUES
            (@NombreArticulo, @Descripcion, @Categoria, @CantidadDisponible, @CantidadMinima, @Estado);

        DECLARE @NuevoId INT = SCOPE_IDENTITY();
        COMMIT TRANSACTION;
        SELECT @NuevoId;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- Editar artículo
IF OBJECT_ID('EditarInventario', 'P') IS NOT NULL DROP PROCEDURE EditarInventario;
GO
CREATE PROCEDURE EditarInventario
    @IdInventario       INT,
    @NombreArticulo     VARCHAR(100),
    @Descripcion        VARCHAR(500),
    @Categoria          VARCHAR(60),
    @CantidadDisponible INT,
    @CantidadMinima     INT,
    @Estado             VARCHAR(30)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Inventario
        SET NombreArticulo     = @NombreArticulo,
            Descripcion        = @Descripcion,
            Categoria          = @Categoria,
            CantidadDisponible = @CantidadDisponible,
            CantidadMinima     = @CantidadMinima,
            Estado             = @Estado,
            FechaActualizacion = GETDATE()
        WHERE IdInventario = @IdInventario;

        COMMIT TRANSACTION;
        SELECT @IdInventario;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- Eliminar artículo
IF OBJECT_ID('EliminarInventario', 'P') IS NOT NULL DROP PROCEDURE EliminarInventario;
GO
CREATE PROCEDURE EliminarInventario
    @IdInventario INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM Inventario WHERE IdInventario = @IdInventario;
        COMMIT TRANSACTION;
        SELECT @IdInventario;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- ============================================================
-- STORED PROCEDURES: Solicitudes
-- ============================================================

-- Obtener todas las solicitudes
IF OBJECT_ID('ObtenerSolicitudes', 'P') IS NOT NULL DROP PROCEDURE ObtenerSolicitudes;
GO
CREATE PROCEDURE ObtenerSolicitudes
AS
BEGIN
    SELECT IdSolicitud, NombreSolicitante, Cedula, Telefono, CorreoElectronico,
           FechaReserva, HoraInicio, HoraFin, MotivoReserva,
           EstadoSolicitud, FechaSolicitud
    FROM Solicitudes
    ORDER BY FechaReserva DESC;
END
GO

-- Obtener una solicitud por Id
IF OBJECT_ID('ObtenerSolicitud', 'P') IS NOT NULL DROP PROCEDURE ObtenerSolicitud;
GO
CREATE PROCEDURE ObtenerSolicitud
    @IdSolicitud INT
AS
BEGIN
    SELECT IdSolicitud, NombreSolicitante, Cedula, Telefono, CorreoElectronico,
           FechaReserva, HoraInicio, HoraFin, MotivoReserva,
           EstadoSolicitud, FechaSolicitud
    FROM Solicitudes
    WHERE IdSolicitud = @IdSolicitud;
END
GO

-- Agregar solicitud
IF OBJECT_ID('AgregarSolicitud', 'P') IS NOT NULL DROP PROCEDURE AgregarSolicitud;
GO
CREATE PROCEDURE AgregarSolicitud
    @NombreSolicitante VARCHAR(100),
    @Cedula            VARCHAR(20),
    @Telefono          VARCHAR(20),
    @CorreoElectronico VARCHAR(100),
    @FechaReserva      DATETIME,
    @HoraInicio        TIME,
    @HoraFin           TIME,
    @MotivoReserva     VARCHAR(300),
    @EstadoSolicitud   VARCHAR(20)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Solicitudes
            (NombreSolicitante, Cedula, Telefono, CorreoElectronico,
             FechaReserva, HoraInicio, HoraFin, MotivoReserva, EstadoSolicitud)
        VALUES
            (@NombreSolicitante, @Cedula, @Telefono, @CorreoElectronico,
             @FechaReserva, @HoraInicio, @HoraFin, @MotivoReserva, @EstadoSolicitud);

        DECLARE @NuevoId INT = SCOPE_IDENTITY();
        COMMIT TRANSACTION;
        SELECT @NuevoId;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- Editar solicitud
IF OBJECT_ID('EditarSolicitud', 'P') IS NOT NULL DROP PROCEDURE EditarSolicitud;
GO
CREATE PROCEDURE EditarSolicitud
    @IdSolicitud       INT,
    @NombreSolicitante VARCHAR(100),
    @Cedula            VARCHAR(20),
    @Telefono          VARCHAR(20),
    @CorreoElectronico VARCHAR(100),
    @FechaReserva      DATETIME,
    @HoraInicio        TIME,
    @HoraFin           TIME,
    @MotivoReserva     VARCHAR(300),
    @EstadoSolicitud   VARCHAR(20)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Solicitudes
        SET NombreSolicitante = @NombreSolicitante,
            Cedula            = @Cedula,
            Telefono          = @Telefono,
            CorreoElectronico = @CorreoElectronico,
            FechaReserva      = @FechaReserva,
            HoraInicio        = @HoraInicio,
            HoraFin           = @HoraFin,
            MotivoReserva     = @MotivoReserva,
            EstadoSolicitud   = @EstadoSolicitud
        WHERE IdSolicitud = @IdSolicitud;

        COMMIT TRANSACTION;
        SELECT @IdSolicitud;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- Cambiar estado de solicitud
IF OBJECT_ID('CambiarEstadoSolicitud', 'P') IS NOT NULL DROP PROCEDURE CambiarEstadoSolicitud;
GO
CREATE PROCEDURE CambiarEstadoSolicitud
    @IdSolicitud     INT,
    @EstadoSolicitud VARCHAR(20)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Solicitudes
        SET EstadoSolicitud = @EstadoSolicitud
        WHERE IdSolicitud = @IdSolicitud;

        COMMIT TRANSACTION;
        SELECT @IdSolicitud;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- Eliminar solicitud
IF OBJECT_ID('EliminarSolicitud', 'P') IS NOT NULL DROP PROCEDURE EliminarSolicitud;
GO
CREATE PROCEDURE EliminarSolicitud
    @IdSolicitud INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        DELETE FROM Solicitudes WHERE IdSolicitud = @IdSolicitud;
        COMMIT TRANSACTION;
        SELECT @IdSolicitud;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO
