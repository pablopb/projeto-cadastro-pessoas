USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'SistemaCadastroPessoas')
BEGIN
    CREATE DATABASE SistemaCadastroPessoas;
END
GO

USE SistemaCadastroPessoas;
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Pessoas]') AND type in (N'U'))
BEGIN
    CREATE TABLE Pessoas (
        Id INT PRIMARY KEY IDENTITY,
        Nome NVARCHAR(100) NOT NULL,
        DataNascimento DATE NOT NULL,
        Renda DECIMAL(10, 2) NOT NULL,
        CPF VARCHAR(11) UNIQUE NOT NULL
    );
END
GO