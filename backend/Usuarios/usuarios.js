const pool = require('../db');

const listarUsuarios = (req, res) => {
  const query = 'SELECT * FROM usuarios';
  pool.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao listar os usuários', error: err.message });
    }
    res.status(200).json(results);
  });
};

const criarUsuario = (req, res) => {
  const { email, nome, senha, cpf, administrador } = req.body;

  const query = `
    INSERT INTO usuarios (email, nome, senha, cpf, administrador) 
    VALUES (?, ?, ?, ?, ?)
  `;

  pool.execute(query, [email, nome, senha, cpf, administrador || false], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar o usuário', error: err.message });
    }
    res.status(201).json({ message: 'Usuário criado com sucesso', result: results });
  });
};

const editarUsuario = (req, res) => {
  const { id } = req.params;
  const { email, nome, senha, cpf, administrador } = req.body;

  const querySelect = 'SELECT * FROM usuarios WHERE id = ?';
  pool.execute(querySelect, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar o usuário', error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const usuario = results[0];

    const novoEmail = email || usuario.email;
    const novoNome = nome || usuario.nome;
    const novaSenha = senha || usuario.senha;
    const novoCpf = cpf || usuario.cpf;
    const novoAdministrador = administrador !== undefined ? administrador : usuario.administrador;

    const queryUpdate = `
      UPDATE usuarios SET email = ?, nome = ?, senha = ?, cpf = ?, administrador = ? 
      WHERE id = ?
    `;
    pool.execute(queryUpdate, [novoEmail, novoNome, novaSenha, novoCpf, novoAdministrador, id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao atualizar o usuário', error: err.message });
      }
      res.status(200).json({ message: 'Usuário atualizado com sucesso', result: results });
    });
  });
};

const deletarUsuario = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id = ?';
  pool.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao excluir o usuário', error: err.message });
    }
    res.status(200).json(results);
  });
};

const loginUsuario = (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  pool.execute(query, [email, senha], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar o usuário', error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado ou senha incorreta' });
    }

    res.status(200).json({ message: 'Login realizado com sucesso', usuario: results[0] });
  });
};

module.exports = { listarUsuarios, criarUsuario, editarUsuario, deletarUsuario, loginUsuario };
