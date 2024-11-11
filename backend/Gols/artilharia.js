const pool = require('../db');

const getArtilharia = (req, res) => {
  const query = `
    SELECT DISTINCT jogadores.nome_completo AS jogador, times.nome AS time, COUNT(gols.id) AS gols
    FROM gols
    JOIN jogadores ON gols.jogador_id = jogadores.id
    JOIN times ON jogadores.time_id = times.id
    GROUP BY jogadores.id
    ORDER BY gols DESC
  `;

  pool.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao obter a artilharia', error: err.message });
    }
    res.status(200).json(results);
  });
};

module.exports = getArtilharia;
