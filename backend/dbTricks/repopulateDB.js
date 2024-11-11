const mysql = require('mysql2');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const createTables = () => {
  const createUsuariosTable = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      nome VARCHAR(255) NOT NULL,
      senha VARCHAR(255) NOT NULL,
      cpf VARCHAR(255) NOT NULL,
      administrador BOOLEAN NOT NULL DEFAULT 0
    );
  `;

  const createTimesTable = `
    CREATE TABLE IF NOT EXISTS times (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      sigla VARCHAR(50) NOT NULL,
      local VARCHAR(255),
      capitao_id INT,
      cor_principal VARCHAR(30) NOT NULL,
      cor_secundaria VARCHAR(30) NOT NULL,
      FOREIGN KEY (capitao_id) REFERENCES usuarios(id)
    );
  `;

  const createJogadoresTable = `
    CREATE TABLE IF NOT EXISTS jogadores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome_completo VARCHAR(255) NOT NULL,
      numero INT,
      usuario_id INT,
      time_id INT,
      idade INT NOT NULL,
      posicao VARCHAR(100),
      FOREIGN KEY (time_id) REFERENCES times(id)
    );
  `;

  const createPartidasTable = `
    CREATE TABLE IF NOT EXISTS partidas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      data DATETIME NOT NULL,
      time_1 INT NOT NULL,
      time_2 INT NOT NULL,
      finalizada BOOLEAN NOT NULL DEFAULT 0,
      FOREIGN KEY (time_1) REFERENCES times(id),
      FOREIGN KEY (time_2) REFERENCES times(id)
    );
  `;

  const createGolsTable = `
    CREATE TABLE IF NOT EXISTS gols (
      id INT AUTO_INCREMENT PRIMARY KEY,
      partida_id INT NOT NULL,
      minuto INT NOT NULL,
      jogador_id INT NOT NULL,
      time_id INT NOT NULL,
      FOREIGN KEY (partida_id) REFERENCES partidas(id),
      FOREIGN KEY (jogador_id) REFERENCES jogadores(id),
      FOREIGN KEY (time_id) REFERENCES times(id)
    );
  `;

  pool.query(createUsuariosTable, (err, results) => {
    if (err) {
      console.error('Erro ao criar a tabela de usuários:', err);
    } else {
      console.log('Tabela de usuários criada ou já existe.');
    }
  });

  pool.query(createTimesTable, (err, results) => {
    if (err) {
      console.error('Erro ao criar a tabela de times:', err);
    } else {
      console.log('Tabela de times criada ou já existe.');
    }
  });

  pool.query(createJogadoresTable, (err, results) => {
    if (err) {
      console.error('Erro ao criar a tabela de jogadores:', err);
    } else {
      console.log('Tabela de jogadores criada ou já existe.');
    }
  });

  pool.query(createPartidasTable, (err, results) => {
    if (err) {
      console.error('Erro ao criar a tabela de partidas:', err);
    } else {
      console.log('Tabela de partidas criada ou já existe.');
    }
  });

  pool.query(createGolsTable, (err, results) => {
    if (err) {
      console.error('Erro ao criar a tabela de gols:', err);
    } else {
      console.log('Tabela de gols criada ou já existe.');
    }
  });

  const a = `
    INSERT INTO usuarios (email, nome, senha, cpf, administrador) VALUES
    ('adm_time1@example.com', 'Admin Time 1', 'senha123', '12345678900', 1),
    ('adm_time2@example.com', 'Admin Time 2', 'senha123', '12345678901', 1),
    ('adm_time3@example.com', 'Admin Time 3', 'senha123', '12345678902', 1),
    ('adm_time4@example.com', 'Admin Time 4', 'senha123', '12345678903', 1);
  
    INSERT INTO times (nome, sigla, local, capitao_id, cor_principal, cor_secundaria) VALUES
    ('Time 1', 'T1', 'Estádio 1', 1, 'Azul', 'Branco'),
    ('Time 2', 'T2', 'Estádio 2', 2, 'Verde', 'Amarelo'),
    ('Time 3', 'T3', 'Estádio 3', 3, 'Vermelho', 'Preto'),
    ('Time 4', 'T4', 'Estádio 4', 4, 'Laranja', 'Cinza');
  
    INSERT INTO jogadores (nome_completo, numero, time_id, idade, posicao, usuario_id) VALUES
    ('Goleiro Time 1', 1, 1, 30, 'Goleiro', 1),
    ('Zagueiro Time 1', 2, 1, 28, 'Zagueiro', NULL),
    ('Zagueiro Time 1', 3, 1, 26, 'Zagueiro', NULL),
    ('Atacante Time 1', 9, 1, 24, 'Atacante', NULL),
    ('Atacante Time 1', 10, 1, 23, 'Atacante', NULL),
    ('Goleiro Time 2', 1, 2, 32, 'Goleiro', 2),
    ('Zagueiro Time 2', 2, 2, 27, 'Zagueiro', NULL),
    ('Zagueiro Time 2', 3, 2, 25, 'Zagueiro', NULL),
    ('Atacante Time 2', 9, 2, 22, 'Atacante', NULL),
    ('Atacante Time 2', 10, 2, 21, 'Atacante', NULL),
    ('Goleiro Time 3', 1, 3, 29, 'Goleiro', 3),
    ('Zagueiro Time 3', 2, 3, 28, 'Zagueiro', NULL),
    ('Zagueiro Time 3', 3, 3, 27, 'Zagueiro', NULL),
    ('Atacante Time 3', 9, 3, 25, 'Atacante', NULL),
    ('Atacante Time 3', 10, 3, 23, 'Atacante', NULL),
    ('Goleiro Time 4', 1, 4, 31, 'Goleiro', 4),
    ('Zagueiro Time 4', 2, 4, 26, 'Zagueiro', NULL),
    ('Zagueiro Time 4', 3, 4, 24, 'Zagueiro', NULL),
    ('Atacante Time 4', 9, 4, 27, 'Atacante', NULL),
    ('Atacante Time 4', 10, 4, 22, 'Atacante', NULL);
  
    INSERT INTO partidas (data, time_1, time_2, finalizada) VALUES
    ('2024-11-15 16:00:00', 1, 2, 0),
    ('2024-11-16 18:00:00', 3, 4, 0);
  
    INSERT INTO gols (partida_id, minuto, jogador_id, time_id) VALUES
    (1, 15, 1, 1),
    (1, 30, 4, 1),
    (1, 40, 2, 2),
    (1, 60, 6, 2),
    (2, 10, 1, 3),
    (2, 35, 9, 3),
    (2, 50, 8, 4),
    (2, 70, 10, 4);
  `;
  
  pool.query(a, (err, results) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
    } else {
      console.log('Dados inseridos com sucesso.');
    }
  });
};

function repopulateDB(req, res) {
  console.log('Repopulando o banco de dados...');
  createTables();
  console.log('Repopulação concluída.');
  res.json({ message: 'Repopulação concluída.' });
}

module.exports = repopulateDB;
