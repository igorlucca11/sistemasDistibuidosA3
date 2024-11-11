const express = require('express');
const app = express();
const { listarTimes, criarTime, editarTime, excluirTime } = require('./Times/times');
const { listarJogadores, criarJogador, editarJogador, deletarJogador } = require('./Jogadores/jogadores');
const { listarUsuarios, criarUsuario, editarUsuario, deletarUsuario, loginUsuario } = require('./Usuarios/usuarios');
const { listarPartidas, criarPartida, editarPartida, deletarPartida } = require('./Partidas/partidas');
const { listarGols, criarGol, editarGol, deletarGol } = require('./Gols/gols');
const gerarPartidas = require('./Partidas/gerarPartidas.js');
const getArtilharia = require('./Gols/artilharia');

app.use(express.json());

// Rotas de Times
app.get('/times', listarTimes); // Listar todos os times
app.post('/times', criarTime); // Criar novo time
app.patch('/times/:id', editarTime); // Atualizar time
app.delete('/times/:id', excluirTime); // Excluir time

// Rotas de Jogadores
app.get('/jogadores', listarJogadores); // Listar todos os jogadores
app.post('/jogadores', criarJogador); // Criar novo jogador
app.patch('/jogadores/:id', editarJogador); // Atualizar jogador
app.delete('/jogadores/:id', deletarJogador); // Excluir jogador

// Rotas de Usuarios
app.get('/usuarios', listarUsuarios); // Listar todos os usuarios
app.post('/usuarios', criarUsuario); // Criar novo usuario
app.patch('/usuarios/:id', editarUsuario); // Atualizar usuario
app.delete('/usuarios/:id', deletarUsuario); // Excluir usuario
app.post('/usuarios/login', loginUsuario); // Login

// Rotas de Partidas
app.get('/partidas', listarPartidas); // Listar todas as partidas
app.post('/partidas', criarPartida); // Criar nova partida
app.patch('/partidas/:id', editarPartida); // Atualizar partida
app.delete('/partidas/:id', deletarPartida); // Excluir partida
app.post('/partidas/gerar', gerarPartidas); // Gerar partidas

// Rotas de Gols
app.get('/gols', listarGols); // Listar todos os gols
app.post('/gols', criarGol); // Criar novo gol
app.patch('/gols/:id', editarGol); // Editar gol
app.delete('/gols/:id', deletarGol); // Excluir gol
app.get('/gols/artilharia', getArtilharia); // Artilharia

module.exports = app;


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
