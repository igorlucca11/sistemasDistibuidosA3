const pool = require('../db');

const gerarPartidas = (req, res) => {
  const { partidasPorDia, diasJogaveis } = req.body;

  pool.execute('SELECT * FROM times', (err, times) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao listar os times', error: err.message });
    }

    try {
      const partidas = times.flatMap((time1, i) =>
        times.slice(i + 1).map((time2) => ({
          time_1: time1.id,
          time_2: time2.id
        }))
      );

      const datasJogaveis = [];
      let diaAtual = 0;
      partidas.forEach((_, i) => {
        if (i % partidasPorDia === 0) {
          diaAtual++;
          const diaSemana = diasJogaveis[(diaAtual - 1) % diasJogaveis.length];
          const proxData = new Date();
          proxData.setDate(proxData.getDate() + ((diaAtual - 1) * 7 + (diaSemana - proxData.getDay())) % 7);
          datasJogaveis.push(proxData);
        }
      });

      const partidasComDatas = partidas.map((partida, i) => ({
        ...partida,
        data: datasJogaveis[Math.floor(i / partidasPorDia)]
      }));

      const queryInsert = `INSERT INTO partidas (time_1, time_2, data) VALUES ?`;
      const valores = partidasComDatas.map(p => [p.time_1, p.time_2, p.data]);

      pool.execute(queryInsert, [valores], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao salvar as partidas', error: err.message });
        }
        res.status(201).json({ message: 'Partidas geradas e salvas com sucesso', result: results });
      });
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao gerar partidas de pontos corridos', error: err.message });
    }
  });
};

module.exports = gerarPartidas;
