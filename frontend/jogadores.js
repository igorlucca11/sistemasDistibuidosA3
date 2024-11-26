document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.querySelector(".cardsContainer");
    const editModal = document.getElementById("editModalJogador");
    const editForm = document.getElementById("editFormJogador");
    const cancelButton = document.getElementById("cancelButtonJogador");
    const createButton = document.getElementById("btnCriarJogador");
    const createModal = document.createElement("div");
    createModal.className = "modal";
    let editingJogadorId = null;

    // Função para abrir o modal de criar jogador
    async function openCreateModal() {
        const times = await fetchTimes();

        createModal.innerHTML = `
            <div class="modalContent">
                <h2>Criar Jogador</h2>
                <form id="createFormJogador">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nomeCriar" name="nome" required />
                    
                    <label for="numero">Número:</label>
                    <input type="text" id="numeroCriar" name="numero" required />
                    
                    <label for="posicao">Posição:</label>
                    <input type="text" id="posicaoCriar" name="posicao" required />
                    
                    <label for="time">Time:</label>
                    <select id="timeCriar" name="time" required>
                        ${times.map(time => `<option value="${time.id}">${time.nome}</option>`).join('')}
                    </select>
                    
                    <label for="idade">Idade:</label>
                    <input type="text" id="idadeCriar" name="idade" required />
                    
                    <div class="modalButtons">
                        <button type="submit">Salvar</button>
                        <button type="button" id="cancelCreateButtonJogador">Voltar</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(createModal);

        document.getElementById("cancelCreateButtonJogador").addEventListener("click", closeCreateModal);

        document.getElementById("createFormJogador").addEventListener("submit", (event) => {
            event.preventDefault();
            const newData = {
                nome_completo: document.getElementById("nomeCriar").value,
                numero: document.getElementById("numeroCriar").value,
                posicao: document.getElementById("posicaoCriar").value,
                time_id: document.getElementById("timeCriar").value,
                idade: document.getElementById("idadeCriar").value,
            };
            createJogador(newData);
        });

        createModal.style.display = "flex";
    }

    // Função para buscar os times da API
    async function fetchTimes() {
        try {
            const response = await fetch("https://sistemasdistibuidosa3-production.up.railway.app/times");
            const times = await response.json();
            return times;
        } catch (error) {
            console.error("Erro ao carregar os times:", error);
            return [];
        }
    }

    // Função para fechar o modal de criação
    function closeCreateModal() {
        createModal.style.display = "none";
        createModal.remove();
    }

    // Função para criar um jogador
    async function createJogador(newData) {
        try {
            const response = await fetch("https://sistemasdistibuidosa3-production.up.railway.app/jogadores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            });
            if (response.ok) {
                alert("Jogador criado com sucesso!");
                fetchJogadores();
                closeCreateModal();
            } else {
                alert("Erro ao criar o jogador.");
            }
        } catch (error) {
            console.error("Erro ao criar o jogador:", error);
        }
    }

    // Função para carregar os jogadores
    async function fetchJogadores() {
        try {
            const response = await fetch("https://sistemasdistibuidosa3-production.up.railway.app/jogadores");
            const jogadores = await response.json();
            renderJogadores(jogadores);
        } catch (error) {
            console.error("Erro ao carregar os jogadores:", error);
        }
    }

    // Função para renderizar os jogadores
    function renderJogadores(jogadores) {
        cardsContainer.innerHTML = "";
        jogadores.forEach((jogador) => {
            const card = document.createElement("div");
            card.className = "teamsCard";
            card.innerHTML = `
                <div class="jogadoresInf">
                    <h3>${jogador.nome_completo}</h3>
                    <p>Numero: ${jogador.numero}</p>
                    <p>Posição: ${jogador.posicao}</p>
                    <p>Time: ${jogador.time}</p>
                    <p>Idade: ${jogador.idade}</p>
                </div>
                <div class="teamButtons">
                    <button class="edit">Editar</button>
                    <button class="delete">Excluir</button>
                </div>
            `;

            card.querySelector(".edit").addEventListener("click", () => {
                openModal(jogador);
            });

            card.querySelector(".delete").addEventListener("click", () => {
                if (confirm(`Tem certeza que deseja excluir o jogador ${jogador.nome}?`)) {
                    deleteJogador(jogador.id);
                }
            });

            cardsContainer.appendChild(card);
        });
    }

    // Função para editar um jogador
    async function editJogador(id, updatedData) {
        try {
            const response = await fetch(`https://sistemasdistibuidosa3-production.up.railway.app/jogadores/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                alert("Jogador editado com sucesso!");
                fetchJogadores();
                closeModal();
            } else {
                alert("Erro ao editar o jogador.");
            }
        } catch (error) {
            console.error("Erro ao editar o jogador:", error);
        }
    }

    // Função para excluir um jogador
    async function deleteJogador(id) {
        try {
            const response = await fetch(`https://sistemasdistibuidosa3-production.up.railway.app/jogadores/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Jogador excluído com sucesso!");
                fetchJogadores();
            } else {
                alert("Erro ao excluir o jogador.");
            }
        } catch (error) {
            console.error("Erro ao excluir o jogador:", error);
        }
    }

    // Função para abrir o modal de edição
    async function openModal(jogador) {
        editModal.style.display = "block";

        // Carregar times antes de preencher o modal
        const times = await fetchTimes();
        
        // Preencher as opções do select com os times
        const timeOptions = times.map(time => `<option value="${time.id}" ${time.id === jogador.id_time ? 'selected' : ''}>${time.nome}</option>`).join('');
        document.getElementById("time").innerHTML = timeOptions;

        // Preencher os campos do jogador
        document.getElementById("nome").value = jogador.nome_completo;
        document.getElementById("numero").value = jogador.numero;
        document.getElementById("posicao").value = jogador.posicao;
        document.getElementById("idade").value = jogador.idade;

        editingJogadorId = jogador.id;
    }

    // Função para fechar o modal
    function closeModal() {
        editModal.style.display = "none";
    }

    // Cancela a edição do jogador
    cancelButton.addEventListener("click", closeModal);

    // Submeter o formulário de edição
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const updatedData = {
            nome_completo: document.getElementById("nome").value,
            numero: document.getElementById("numero").value,
            posicao: document.getElementById("posicao").value,
            time_id: document.getElementById("time").value,
            idade: document.getElementById("idade").value,
        };
        editJogador(editingJogadorId, updatedData);
    });

    // Carregar jogadores na inicialização
    fetchJogadores();

    // Criar novo jogador
    createButton.addEventListener("click", openCreateModal);
});
