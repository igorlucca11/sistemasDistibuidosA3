const pool = require('../db'); // Importando o pool de conexões do db.js

const criarTime = (req, res) => {
  const { nome, sigla, local, corPrincipal, corSecundaria } = req.body;

  const query = `INSERT INTO times (nome, sigla, local, cor_principal, cor_secundaria) VALUES (?, ?, ?, ?, ?)`;
  pool.execute(query, [nome, sigla, local, corPrincipal, corSecundaria], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar o time', error: err.message });
    }
    res.status(201).json({ message: 'Time criado com sucesso', result: results });
  });
};

const listarTimes = (req, res) => {
  const query = 'SELECT * FROM times';
  pool.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao listar os times', error: err.message });
    }
    res.status(200).json(results); // Enviando os times para a resposta
  });
};

const atualizarTime = (req, res) => {
  const { id } = req.params;
  const { nome, sigla, local, corPrincipal, corSecundaria } = req.body;

  const query = `UPDATE times SET nome = ?, sigla = ?, local = ?, cor_principal = ?, cor_secundaria = ? WHERE id = ?`;
  pool.execute(query, [nome, sigla, local, corPrincipal, corSecundaria, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar o time', error: err.message });
    }
    res.status(200).json({ message: 'Time atualizado com sucesso', result: results });
  });
};

const excluirTime = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM times WHERE id = ?`;
  pool.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao excluir o time', error: err.message });
    }
    res.status(200).json({ message: 'Time excluído com sucesso', result: results });
  });
};

module.exports = { criarTime, listarTimes, atualizarTime, excluirTime };
