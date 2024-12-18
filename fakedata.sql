INSERT INTO usuarios (email, nome, senha, cpf, administrador) VALUES
('adm_time1@example.com', 'Admin Time 1', 'senha123', '12345678900', TRUE),
('adm_time2@example.com', 'Admin Time 2', 'senha123', '12345678901', TRUE),
('adm_time3@example.com', 'Admin Time 3', 'senha123', '12345678902', TRUE),
('adm_time4@example.com', 'Admin Time 4', 'senha123', '12345678903', TRUE);

INSERT INTO times (nome, sigla, local, capitao_id, cor_principal, cor_secundaria) VALUES
('Time 1', 'T1', 'Estádio 1', 1, 'Azul', 'Branco'),
('Time 2', 'T2', 'Estádio 2', 2, 'Verde', 'Amarelo'),
('Time 3', 'T3', 'Estádio 3', 3, 'Vermelho', 'Preto'),
('Time 4', 'T4', 'Estádio 4', 4, 'Laranja', 'Cinza');

-- Time 1
INSERT INTO jogadores (nome_completo, numero, time_id, idade, posicao, usuario_id) VALUES
('Goleiro Time 1', 1, 1, 30, 'Goleiro', 1),
('Zagueiro Time 1', 2, 1, 28, 'Zagueiro', NULL),
('Zagueiro Time 1', 3, 1, 26, 'Zagueiro', NULL),
('Atacante Time 1', 9, 1, 24, 'Atacante', NULL),
('Atacante Time 1', 10, 1, 23, 'Atacante', NULL);

-- Time 2
INSERT INTO jogadores (nome_completo, numero, time_id, idade, posicao, usuario_id) VALUES
('Goleiro Time 2', 1, 2, 32, 'Goleiro', 2),
('Zagueiro Time 2', 2, 2, 27, 'Zagueiro', NULL),
('Zagueiro Time 2', 3, 2, 25, 'Zagueiro', NULL),
('Atacante Time 2', 9, 2, 22, 'Atacante', NULL),
('Atacante Time 2', 10, 2, 21, 'Atacante', NULL);

-- Time 3
INSERT INTO jogadores (nome_completo, numero, time_id, idade, posicao, usuario_id) VALUES
('Goleiro Time 3', 1, 3, 29, 'Goleiro', 3),
('Zagueiro Time 3', 2, 3, 28, 'Zagueiro', NULL),
('Zagueiro Time 3', 3, 3, 27, 'Zagueiro', NULL),
('Atacante Time 3', 9, 3, 25, 'Atacante', NULL),
('Atacante Time 3', 10, 3, 23, 'Atacante', NULL);

-- Time 4
INSERT INTO jogadores (nome_completo, numero, time_id, idade, posicao, usuario_id) VALUES
('Goleiro Time 4', 1, 4, 31, 'Goleiro', 4),
('Zagueiro Time 4', 2, 4, 26, 'Zagueiro', NULL),
('Zagueiro Time 4', 3, 4, 24, 'Zagueiro', NULL),
('Atacante Time 4', 9, 4, 27, 'Atacante', NULL),
('Atacante Time 4', 10, 4, 22, 'Atacante', NULL);


INSERT INTO partidas (data, time_1, time_2, finalizada) VALUES
('2024-11-15 16:00:00', 1, 2, FALSE),
('2024-11-16 18:00:00', 3, 4, FALSE);


INSERT INTO gols (partida_id, minuto, jogador_id, time_id) VALUES
-- Partida 1 (Time 1 vs Time 2)
(1, 15, 1, 1),  -- Goleiro Time 1 marca gol (exemplo)
(1, 30, 4, 1),  -- Atacante Time 1 marca gol
(1, 40, 2, 2),  -- Zagueiro Time 2 marca gol
(1, 60, 6, 2),  -- Atacante Time 2 marca gol

-- Partida 2 (Time 3 vs Time 4)
(2, 10, 1, 3),  -- Goleiro Time 3 marca gol
(2, 35, 9, 3),  -- Atacante Time 3 marca gol
(2, 50, 8, 4),  -- Atacante Time 4 marca gol
(2, 70, 10, 4); -- Atacante Time 4 marca gol
