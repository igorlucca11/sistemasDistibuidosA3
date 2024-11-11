const pool = require('../db');

const listarGols = (req, res) => {
  const query = 'SELECT * FROM gols';
  pool.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao listar os gols', error: err.message });
    }
    res.status(200).json(results);
  });
};

const criarGol = (req, res) => {
  const { partida_id, minuto, jogador_id, time_id } = req.body;

  const query = 'INSERT INTO gols (partida_id, minuto, jogador_id, time_id) VALUES (?, ?, ?, ?)';

  pool.execute(query, [partida_id, minuto, jogador_id, time_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar o gol', error: err.message });
    }
    res.status(201).json({ message: 'Gol criado com sucesso', result: results });
  });
};

const deletarGol = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM gols WHERE id = ?';
  pool.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao excluir o gol', error: err.message });
    }
    res.status(200).json(results);
  });
};

const editarGol = (req, res) => {
  const { id } = req.params;
  const { partida_id, minuto, jogador_id, time_id } = req.body;

  // Primeiro, buscar os dados originais do gol
  const querySelect = 'SELECT * FROM gols WHERE id = ?';
  pool.execute(querySelect, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar o gol', error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Gol não encontrado' });
    }

    const gol = results[0];

    const novoPartidaId = partida_id || gol.partida_id;
    const novoMinuto = minuto || gol.minuto;
    const novoJogadorId = jogador_id || gol.jogador_id;
    const novoTimeId = time_id || gol.time_id;

    // Atualizar com os valores finais
    const queryUpdate = 'UPDATE gols SET partida_id = ?, minuto = ?, jogador_id = ?, time_id = ? WHERE id = ?';
    pool.execute(queryUpdate, [novoPartidaId, novoMinuto, novoJogadorId, novoTimeId, id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao atualizar o gol', error: err.message });
      }
      res.status(200).json({ message: 'Gol atualizado com sucesso', result: results });
    });
  });
};

module.exports = { listarGols, criarGol, deletarGol, editarGol };
