const express = require('express');
const db = require('./db.js');
const app = express();
const { criarTime, listarTimes, atualizarTime, excluirTime } = require('./Times/times.js');
const { listarJogadores, criarJogador, deletarJogador} = require('./Jogadores/jogadores.js');
const PORT = 5000;

require('./createDb');

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

// Rota para buscar dados dos usuários
app.get('/users', async (req, res) => {
  try {
    const users = await db.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send('Erro ao buscar usuários');
  }
});


// Rotas de Times
app.get('/times', listarTimes)

app.post('/times', criarTime)

app.patch('/times/:id', atualizarTime)

app.delete('/times/:id', excluirTime)


// Rotas de Jpogadores
app.get('/jogadores', listarJogadores);
app.post('/jogadores', criarJogador);
app.patch('/jogadores/:id', editarJogador);
app.delete('/jogadores/:id', deletarJogador);



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
