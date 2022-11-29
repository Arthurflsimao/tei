CREATE DATABASE Fronttier2;
USE Fronttier2;

CREATE TABLE Permissao (
idPermissao INT PRIMARY KEY, 
descricao VARCHAR (40)
);

INSERT INTO Permissao VALUES (1, "Administrador"),
							 (2, "Usuário"),
                             (3, "Desenvolvedor");

CREATE TABLE Plano (
idPlano INT PRIMARY KEY,
descricao VARCHAR(45)
);

INSERT INTO Plano VALUES (1, "Gold"),
						 (2, "Platinum"),
                         (3, "Diamond");

CREATE TABLE Empresa (
codEmpresa INT PRIMARY KEY,
nomeEmpresa VARCHAR(45),
cnpj CHAR(18),
fkPlano INT,
FOREIGN KEY (fkPlano) REFERENCES Plano (idPlano)
);

INSERT INTO Empresa VALUES( 1234, "Teste", "123456789012345678", 1);

CREATE TABLE Usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
sobreNome VARCHAR(45),
telefone CHAR(15),
email VARCHAR(45),
senha VARCHAR (45),
fkCodEmpresa INT,
FOREIGN KEY (fkCodEmpresa) REFERENCES Empresa(codEmpresa),
fkPermissao INT,
FOREIGN KEY (fkPermissao) REFERENCES Permissao (idPermissao)
);

CREATE TABLE MaquinaServidor (
idServidor INT PRIMARY KEY AUTO_INCREMENT,
fkCodEmpresa INT,
FOREIGN KEY (fkCodEmpresa) REFERENCES Empresa (codEmpresa),
numeroSerial INT UNIQUE,
posicaoLinha INT,
posicaoColuna INT
);


CREATE TABLE Disco(
idDisco INT PRIMARY KEY AUTO_INCREMENT,
fkServidor INT,
FOREIGN KEY (fkServidor) REFERENCES MaquinaServidor (idServidor),
dataHora DATETIME,
discoTotal DECIMAL(6,2),
discoUso DECIMAL (6,2),
discoLivre DECIMAL (6,2),
porcentagem DECIMAL(4,1),
discoLido DECIMAL(6,2),
discoEscrito DECIMAL(6,2)
);

SELECT * FROM Disco;

DROP DATABASE fronttier2;



