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
      cor_secundaria VARCHAR(30) NOT NULL
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
      posicao VARCHAR(100)
    );
  `;

  const createPartidasTable = `
    CREATE TABLE IF NOT EXISTS partidas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      data DATETIME NOT NULL,
      time_1 INT NOT NULL,
      time_2 INT NOT NULL,
      finalizada BOOLEAN NOT NULL DEFAULT 0
    );
  `;

  const createGolsTable = `
    CREATE TABLE IF NOT EXISTS gols (
      id INT AUTO_INCREMENT PRIMARY KEY,
      partida_id INT NOT NULL,
      minuto INT NOT NULL,
      jogador_id INT NOT NULL,
      time_id INT NOT NULL
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
};

createTables();
