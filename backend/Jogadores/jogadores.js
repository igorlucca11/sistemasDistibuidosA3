const pool = require('../db');

const listarJogadores = (req, res) => {
    const query = 'SELECT * FROM jogadores';
    pool.execute(query, (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao listar os jogadores', error: err.message });
        }
        res.status(200).json(results);
      });

}

const criarJogador = (req, res) => {
    const { nome_completo, numero, time_id, idade, posicao } = req.body;
  
    const query = `INSERT INTO jogadores (nome_completo, numero, time_id, idade, posicao) VALUES (?, ?, ?, ?, ?)`;

    pool.execute(query, [nome_completo, numero, time_id, idade, posicao], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criar o time', error: err.message });
      }
      res.status(201).json({ message: 'Jogador criado com sucesso', result: results });
    });
  };

  const deletarJogador = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM jogadores WHERE id = ?';
    pool.execute(query, [id], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao excluir o jogador', error: err.message });
        }
        res.status(200).json(results);
      });

}

const editarJogador = (req, res) => {
  const { id } = req.params;

  const query = 'UPDATE jogadores SET nome_completo = ?, numero = ?, time_id = ?, idade = ?, posicao = ? WHERE id = ?';
  pool.execute(query, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao excluir o jogador', error: err.message });
      }
      res.status(200).json(results);
    });

}


module.exports = { listarJogadores, criarJogador, deletarJogador};
