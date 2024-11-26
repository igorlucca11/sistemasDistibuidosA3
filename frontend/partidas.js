document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.querySelector(".cardsContainer");
    const createMatchButton = document.getElementById("createMatchButton");
    const createMatchModal = document.getElementById("createMatchModal");
    const cancelCreateButton = document.getElementById("cancelCreateButton");

    let allTimes = [];  // Armazenar todos os times para evitar múltiplas requisições

    // Função para buscar os times da API
    async function fetchTimes() {
        try {
            const response = await fetch("https://sistemasdistibuidosa3-production.up.railway.app/times");
            const times = await response.json();
            allTimes = times;  // Armazena os times globalmente
            return times;
        } catch (error) {
            console.error("Erro ao carregar os times:", error);
        }
    }

    // Função para carregar os times no formulário de criação de partida
    async function populateTimes() {
        const times = await fetchTimes();
        if (times && Array.isArray(times)) {
            const time1Select = document.getElementById("time1");
            const time2Select = document.getElementById("time2");

            // Limpa as opções anteriores
            time1Select.innerHTML = '';
            time2Select.innerHTML = '';

            // Cria as opções para os dois campos de seleção
            times.forEach((time) => {
                const option1 = document.createElement("option");
                option1.value = time.id;
                option1.textContent = time.nome;
                time1Select.appendChild(option1);

                const option2 = document.createElement("option");
                option2.value = time.id;
                option2.textContent = time.nome;
                time2Select.appendChild(option2);
            });
        } else {
            console.error("A resposta da API de times não é válida.");
        }
    }

    // Função para buscar as partidas da API
    async function fetchPartidas() {
        try {
            const response = await fetch("https://sistemasdistibuidosa3-production.up.railway.app/partidas");
            const partidas = await response.json();
            renderPartidas(partidas);
        } catch (error) {
            console.error("Erro ao carregar as partidas:", error);
        }
    }

    // Função para renderizar as partidas
    function renderPartidas(partidas) {
        cardsContainer.innerHTML = "";  // Limpa o conteúdo atual

        partidas.forEach((partida) => {
            const time1 = getTimeNameById(partida.time_1);
            const time2 = getTimeNameById(partida.time_2);

            const card = document.createElement("div");
            card.className = "teamsCard";
            card.innerHTML = `
                <div class="teamInformation">
                    <h3>${time1} x ${time2}</h3>
                    <p>Data: ${new Date(partida.data).toLocaleString()}</p>
                </div>
                <div class="teamButtons">
                    <button class="edit">Editar</button>
                    <button class="delete">Excluir</button>
                </div>
            `;

            // Botão Editar
            card.querySelector(".edit").addEventListener("click", () => {
                alert(`Editar partida entre ${time1} e ${time2}`);
                // Lógica de edição vai aqui, se necessário
            });

            // Botão Excluir
            card.querySelector(".delete").addEventListener("click", () => {
                if (confirm(`Tem certeza que deseja excluir a partida entre ${time1} e ${time2}?`)) {
                    deletePartida(partida.id);
                }
            });

            cardsContainer.appendChild(card);
        });
    }

    // Função para obter o nome do time com base no ID
    function getTimeNameById(id) {
        const time = allTimes.find((time) => time.id === parseInt(id));
        return time ? time.nome : "Time não encontrado";
    }

    // Função para excluir uma partida
    async function deletePartida(id) {
        try {
            const response = await fetch(`https://sistemasdistibuidosa3-production.up.railway.app/partidas/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Partida excluída com sucesso!");
                fetchPartidas();  // Atualiza a lista de partidas
            } else {
                alert("Erro ao excluir a partida.");
            }
        } catch (error) {
            console.error("Erro ao excluir a partida:", error);
        }
    }

    // Função para criar uma nova partida
    async function createPartida(newMatch) {
        try {
            const response = await fetch("https://sistemasdistibuidosa3-production.up.railway.app/partidas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMatch),
            });

            if (response.ok) {
                alert("Partida criada com sucesso!");
                fetchPartidas();  // Atualiza a lista de partidas
            } else {
                alert("Erro ao criar a partida.");
            }
        } catch (error) {
            console.error("Erro ao criar a partida:", error);
        }
    }

    // Abrir modal para criar uma nova partida
    createMatchButton.addEventListener("click", () => {
        createMatchModal.style.display = "block";  // Exibe o modal
        populateTimes();  // Preenche os times no modal
    });

    // Cancelar a criação da partida e fechar o modal
    cancelCreateButton.addEventListener("click", () => {
        createMatchModal.style.display = "none";  // Fecha o modal
    });

    // Submeter o formulário para criar uma partida
    document.getElementById("createMatchForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const newMatch = {
            data: document.getElementById("data").value,
            time_1: document.getElementById("time1").value,
            time_2: document.getElementById("time2").value,
            finalizada: 0, // Pode ser ajustado conforme a lógica
        };
        createPartida(newMatch);
        createMatchModal.style.display = "none";  // Fecha o modal após salvar
    });

    // Carregar os times e as partidas na inicialização
    fetchTimes().then(() => fetchPartidas());
});
