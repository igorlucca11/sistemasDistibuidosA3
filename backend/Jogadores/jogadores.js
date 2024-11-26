const pool = require("../db");

const listarJogadores = (req, res) => {
  const query = `SELECT *, t.nome AS time
                  FROM jogadores j
                  LEFT JOIN times t ON j.time_id = t.id`;
  pool.execute(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao listar os jogadores", error: err.message });
    }
    res.status(200).json(results);
  });
};

const criarJogador = (req, res) => {
  const { nome_completo, numero, usuario_id, time_id, idade, posicao } =
    req.body;

  const query = `
    INSERT INTO jogadores (nome_completo, numero, usuario_id, time_id, idade, posicao) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const parametros = [
    nome_completo,
    numero,
    usuario_id || null,
    time_id,
    idade,
    posicao,
  ];

  pool.execute(query, parametros, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao criar o jogador", error: err.message });
    }
    res
      .status(201)
      .json({ message: "Jogador criado com sucesso", result: results });
  });
};

const deletarJogador = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM jogadores WHERE id = ?";
  pool.execute(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao excluir o jogador", error: err.message });
    }
    res.status(200).json(results);
  });
};

const editarJogador = (req, res) => {
  const { id } = req.params;
  const { nome_completo, numero, usuario_id, time_id, idade, posicao } =
    req.body;

  const querySelect = "SELECT * FROM jogadores WHERE id = ?";
  pool.execute(querySelect, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar o jogador", error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Jogador não encontrado" });
    }

    const jogador = results[0];

    const novoNome = nome_completo || jogador.nome_completo;
    const novoNumero = numero || jogador.numero;
    const novoUsuarioId =
      usuario_id !== undefined ? usuario_id : jogador.usuario_id;
    const novoTimeId = time_id || jogador.time_id;
    const novaIdade = idade || jogador.idade;
    const novaPosicao = posicao || jogador.posicao;

    const queryUpdate = `
      UPDATE jogadores SET nome_completo = ?, numero = ?, usuario_id = ?, time_id = ?, idade = ?, posicao = ? 
      WHERE id = ?
    `;
    pool.execute(
      queryUpdate,
      [
        novoNome,
        novoNumero,
        novoUsuarioId,
        novoTimeId,
        novaIdade,
        novaPosicao,
        id,
      ],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({
              message: "Erro ao atualizar o jogador",
              error: err.message,
            });
        }
        res
          .status(200)
          .json({ message: "Jogador atualizado com sucesso", result: results });
      }
    );
  });
};

module.exports = {
  listarJogadores,
  criarJogador,
  deletarJogador,
  editarJogador,
};
