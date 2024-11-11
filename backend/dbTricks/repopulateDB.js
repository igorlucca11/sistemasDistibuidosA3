const pool = require('../db');

const createTables = () => {
  const queries = [
    "DROP TABLE IF EXISTS usuarios",
    `CREATE TABLE usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      nome VARCHAR(255) NOT NULL,
      senha VARCHAR(255) NOT NULL,
      cpf VARCHAR(255) NOT NULL,
      administrador BOOLEAN NOT NULL DEFAULT 0
    )`,

    "DROP TABLE IF EXISTS times",
    `CREATE TABLE times (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      sigla VARCHAR(50) NOT NULL,
      local VARCHAR(255),
      capitao_id INT,
      cor_principal VARCHAR(30) NOT NULL,
      cor_secundaria VARCHAR(30) NOT NULL,
    )`,

    "DROP TABLE IF EXISTS jogadores",
    `CREATE TABLE jogadores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome_completo VARCHAR(255) NOT NULL,
      numero INT,
      usuario_id INT,
      time_id INT,
      idade INT NOT NULL,
      posicao VARCHAR(100),
    )`,

    "DROP TABLE IF EXISTS partidas",
    `CREATE TABLE partidas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      data DATETIME NOT NULL,
      time_1 INT NOT NULL,
      time_2 INT NOT NULL,
      finalizada BOOLEAN NOT NULL DEFAULT 0,
    )`,

    "DROP TABLE IF EXISTS gols",
    `CREATE TABLE gols (
      id INT AUTO_INCREMENT PRIMARY KEY,
      partida_id INT NOT NULL,
      minuto INT NOT NULL,
      jogador_id INT NOT NULL,
      time_id INT NOT NULL,
    )`,

    `INSERT INTO usuarios (email, nome, senha, cpf, administrador) VALUES
    ('messi@example.com', 'Lionel Messi', 'senha123', '12345678900', 1),
    ('cristiano@example.com', 'Cristiano Ronaldo', 'senha123', '12345678901', 1),
    ('neymar@example.com', 'Neymar Jr', 'senha123', '12345678902', 1),
    ('mbappe@example.com', 'Kylian Mbappe', 'senha123', '12345678903', 1)`,

    `INSERT INTO times (nome, sigla, local, capitao_id, cor_principal, cor_secundaria) VALUES
    ('Paris Saint-Germain', 'PSG', 'Parc des Princes', 3, 'Azul', 'Vermelho'),
    ('Manchester United', 'MUFC', 'Old Trafford', 2, 'Vermelho', 'Branco'),
    ('Barcelona', 'FCB', 'Camp Nou', 1, 'Azul', 'Grená'),
    ('Real Madrid', 'RMA', 'Santiago Bernabéu', 4, 'Branco', 'Dourado')`,

    `INSERT INTO jogadores (nome_completo, numero, time_id, idade, posicao, usuario_id) VALUES
    ('Lionel Messi', 10, 3, 34, 'Atacante', 1),
    ('Gerard Piqué', 3, 3, 35, 'Zagueiro', NULL),
    ('Sergio Busquets', 5, 3, 33, 'Meio-campista', NULL),
    ('Cristiano Ronaldo', 7, 2, 36, 'Atacante', 2),
    ('Bruno Fernandes', 8, 2, 27, 'Meio-campista', NULL),
    ('Kylian Mbappe', 7, 1, 23, 'Atacante', 4),
    ('Neymar Jr', 10, 1, 29, 'Atacante', 3),
    ('Casemiro', 14, 4, 30, 'Meio-campista', NULL),
    ('Karim Benzema', 9, 4, 34, 'Atacante', NULL)`,

    `INSERT INTO partidas (data, time_1, time_2, finalizada) VALUES
    ('2024-11-15 16:00:00', 1, 2, 0),
    ('2024-11-16 18:00:00', 3, 4, 0)`,

    `INSERT INTO gols (partida_id, minuto, jogador_id, time_id) VALUES
    (1, 15, 1, 3),
    (1, 30, 4, 2),
    (1, 40, 8, 4),
    (2, 10, 6, 1),
    (2, 35, 7, 1),
    (2, 50, 9, 4),
    (2, 70, 5, 2)`
  ];

  queries.forEach((query) => {
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao executar query:", err);
      } else {
        console.log("Query executada com sucesso.");
      }
    });
  });
};

function repopulateDB(req, res) {
  console.log("Repopulando o banco de dados...");
  createTables();
  console.log("Repopulação concluída.");
  res.json({ message: "Repopulação concluída." });
}

module.exports = repopulateDB;
