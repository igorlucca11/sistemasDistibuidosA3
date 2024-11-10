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
      administrador BOOLEAN NOT NULL DEFAULT 0
    );
  `;

  const createTimesTable = `
    CREATE TABLE  times (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      sigla VARCHAR(50) NOT NULL,
      local VARCHAR(255) NOT NULL,
      cor_principal VARCHAR(30) NOT NULL,
      cor_secundaria VARCHAR() NOT NULL
    );
  `;


  const createJogadoresTable = `
  CREATE TABLE IF NOT EXISTS jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    numero INT NOT NULL,
    time_id INT NOT NULL,
    idade INT NOT NULL,
    posicao VARCHAR(100),
    FOREIGN KEY (time_id) REFERENCES times(id)  -- Chave estrangeira para a tabela times
  );`; 


  pool.query(createUsuariosTable, (err, results) => {
    if (err) {
      console.error('Erro ao criar a tabela de usuários:', err);
    } else {
      console.log('Tabela de usuários criada ou já existe.');
    }
  });

  pool.query(createJogadoresTable, (err, results) => {
    if (err) {
      console.error('Erro ao criar a tabela de times:', err);
    } else {
      console.log('Tabela de times criada ou já existe.');
    }
  });

pool.query(createJogadoresTable, (err, results) => {
  if (err) {
    console.error('Erro ao criar a tabela de Jogadores:', err);
  } else {
    console.log('Tabela de Jogadores criada ou já existe.');
  }
});
};

createTables();
