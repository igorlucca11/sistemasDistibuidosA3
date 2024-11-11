# sistemasDistibuidosA3

# API
Projeto de API construída para apresentação para conclusão de semestre de Analise de Desenvolvimento de Sistema sob supervisão do professor Fábio.

# Integrantes
- Diego Felipe Weber
- Hugo Germano Dopheide
- Igor Lucca
- Marcos Vinicius Pereira Lima
- Maria Eduarda De Paula

## Endpoints
Base URL: `sistemasdistibuidosa3-production.up.railway.app`

Available endpoints:
- `/times`
- `/jogadores`
- `/gols`
- `/gols/artilharia`
- `/partidas`

### Exemplos de Requisições

#### GET /gols/:id
```json
{
  "id": 1,
  "partida_id": 1,
  "minuto": 16,
  "jogador_id": 1,
  "time_id": 3
}
```

#### GET /gols/artilharia
```json
{
  "jogador": "Lionel Messi",
  "time": "Barcelona",
  "gols": 2
}
```

#### POST /gols
```json
{
  "partida_id": 1,
  "minuto": 16,
  "jogador_id": 1,
  "time_id": 3
}
```

#### PATCH /gols/:id
```json
{
  "partida_id": 1,
  "minuto": 16,
  "jogador_id": 1,
  "time_id": 3
}
```

#### GET /times/:id
```json
{
  "id": 1,
  "nome": "Paris Saint-Germain",
  "sigla": "PSG",
  "local": "Parc des Princes",
  "capitao_id": 3,
  "cor_principal": "Azul",
  "cor_secundaria": "Vermelho"
}
```

#### POST /times
```json
{
  "nome": "Paris Saint-Germain",
  "sigla": "PSG",
  "local": "Parc des Princes",
  "capitao_id": 3,
  "cor_principal": "Azul",
  "cor_secundaria": "Vermelho"
}
```

#### PATCH /times/:id
```json
{
  "nome": "Paris Saint-Germain",
  "sigla": "PSG",
  "local": "Parc des Princes",
  "capitao_id": 3,
  "cor_principal": "Azul",
  "cor_secundaria": "Vermelho"
}
```

#### GET /partidas/:id
```json
{
  "id": 1,
  "data": "2024-11-15T16:00:00.000Z",
  "time_1": 1,
  "time_2": 2,
  "finalizada": 0
}
```

#### POST /partidas
```json
{
  "data": "2024-11-15T16:00:00.000Z",
  "time_1": 1,
  "time_2": 2,
  "finalizada": 0
}
```

#### PATCH /partidas/:id
```json
{
  "data": "2024-11-15T16:00:00.000Z",
  "time_1": 1,
  "time_2": 2,
  "finalizada": 0
}
```

#### GET /jogadores/:id
```json
{
  "id": 1,
  "nome_completo": "Lionel Messi",
  "numero": 10,
  "usuario_id": 1,
  "time_id": 3,
  "idade": 34,
  "posicao": "Atacante"
}
```

#### POST /jogadores
```json
{
  "nome_completo": "Lionel Messi",
  "numero": 10,
  "usuario_id": 1,
  "time_id": 3,
  "idade": 34,
  "posicao": "Atacante"
}
```

#### PATCH /jogadores/:id
```json
{
  "nome_completo": "Lionel Messi",
  "numero": 10,
  "usuario_id": 1,
  "time_id": 3,
  "idade": 34,
  "posicao": "Atacante"
}
```
