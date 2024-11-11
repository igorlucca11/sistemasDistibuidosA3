const pool = require('../db');

const listarPartidas = (req, res) => {
  const query = 'SELECT * FROM partidas';
  pool.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao listar as partidas', error: err.message });
    }
    res.status(200).json(results);
  });
};

const criarPartida = (req, res) => {
  const { data, time_1, time_2, finalizada } = req.body;

  const query = 'INSERT INTO partidas (data, time_1, time_2, finalizada) VALUES (?, ?, ?, ?)';

  pool.execute(query, [data, time_1, time_2, finalizada], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar a partida', error: err.message });
    }
    res.status(201).json({ message: 'Partida criada com sucesso', result: results });
  });
};

const deletarPartida = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM partidas WHERE id = ?';
  pool.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao excluir a partida', error: err.message });
    }
    res.status(200).json(results);
  });
};

const editarPartida = (req, res) => {
  const { id } = req.params;
  const { data, time_1, time_2, finalizada } = req.body;

  // Primeiro, buscar os dados originais da partida
  const querySelect = 'SELECT * FROM partidas WHERE id = ?';
  pool.execute(querySelect, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar a partida', error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Partida não encontrada' });
    }

    const partida = results[0];

    const novaData = data || partida.data;
    const novoTime1 = time_1 || partida.time_1;
    const novoTime2 = time_2 || partida.time_2;
    const novaFinalizada = finalizada !== undefined ? finalizada : partida.finalizada;

    // Atualizar com os valores finais
    const queryUpdate = 'UPDATE partidas SET data = ?, time_1 = ?, time_2 = ?, finalizada = ? WHERE id = ?';
    pool.execute(queryUpdate, [novaData, novoTime1, novoTime2, novaFinalizada, id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao atualizar a partida', error: err.message });
      }
      res.status(200).json({ message: 'Partida atualizada com sucesso', result: results });
    });
  });
};

module.exports = { listarPartidas, criarPartida, deletarPartida, editarPartida };
