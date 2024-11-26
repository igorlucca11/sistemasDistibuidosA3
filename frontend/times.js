document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.querySelector(".cardsContainer");
    const editModal = document.getElementById("editModal");
    const editForm = document.getElementById("editForm");
    const cancelButton = document.getElementById("cancelButton");
    const createButton = document.getElementById("btnCriar"); // Botão de criar time
    const createModal = document.createElement("div"); // Modal para criar time
    createModal.className = "modal";
  
    let editingTeamId = null;

    function openCreateModal() {
        let f = document.getElementById("createForm")
        f ? f.reset() : "";
      createModal.innerHTML = `
        <div class="modalContent">
          <h2>Criar Time</h2>
          <form id="createForm">
            <label for="nome">Nome:</label>
            <input type="text" id="nomeNovo" name="nome" required />
            <label for="sigla">Sigla:</label>
            <input type="text" id="siglaNovo" name="sigla" required />
            <label for="local">Localização:</label>
            <input type="text" id="localNovo" name="local" required />
            <label for="cor_principal">Cor Principal:</label>
            <input type="text" id="cor_principalNovo" name="cor_principal" required />
            <label for="cor_secundaria">Cor Secundária:</label>
            <input type="text" id="cor_secundariaNovo" name="cor_secundaria" required />
            <div class="modalButtons">
              <button type="submit">Salvar</button>
              <button type="button" id="cancelCreateButton">Voltar</button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(createModal);

      // Cancelar criação
      document.getElementById("cancelCreateButton").addEventListener("click", closeCreateModal);

      // Submeter formulário de criação
      document.getElementById("createForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const newData = {
          nome: document.getElementById("nomeNovo").value,
          sigla: document.getElementById("siglaNovo").value,
          local: document.getElementById("localNovo").value,
          corPrincipal: document.getElementById("cor_principalNovo").value,
          corSecundaria: document.getElementById("cor_secundariaNovo").value,
          capitao_id: null
        };
        createTeam(newData);
      });

      createModal.style.display = "flex";
    }

    // Função para fechar o modal de criação
    function closeCreateModal() {
      createModal.style.display = "none";
      createModal.remove();
    }

    // Função para criar um time
    async function createTeam(newData) {
      try {
        const response = await fetch("https://sistemasdistibuidosa3-production.up.railway.app/times", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });
        if (response.ok) {
          alert("Time criado com sucesso!");
          fetchTeams(); // Atualiza a lista de times
          closeCreateModal();
        } else {
          alert("Erro ao criar o time.");
        }
      } catch (error) {
        console.error("Erro ao criar o time:", error);
      }
    }
  
    // Função para carregar os times
    async function fetchTeams() {
      try {
        const response = await fetch("https://sistemasdistibuidosa3-production.up.railway.app/times");
        const teams = await response.json();
        renderTeams(teams);
      } catch (error) {
        console.error("Erro ao carregar os times:", error);
      }
    }

    // Função para renderizar os times
    function renderTeams(teams) {
      cardsContainer.innerHTML = "";
      teams.forEach((team) => {
        const card = document.createElement("div");
        card.className = "teamsCard";
        card.innerHTML = `
          <div class="teamInformation">
              <h3>${team.nome}</h3>
              <p>Sigla: ${team.sigla}</p>
              <p>Cores: ${team.cor_principal} e ${team.cor_secundaria}</p>
              <p>Localização: ${team.local}</p>
          </div>
          <div class="teamButtons">
              <button class="edit">Editar</button>
              <button class="delete">Excluir</button>
          </div>
        `;
  
        // Botão Editar
        card.querySelector(".edit").addEventListener("click", () => {
          openModal(team);
        });
  
        // Botão Excluir
        card.querySelector(".delete").addEventListener("click", () => {
          if (confirm(`Tem certeza que deseja excluir o time ${team.nome}?`)) {
            deleteTeam(team.id);
          }
        });
  
        cardsContainer.appendChild(card);
      });
    }

    // Função para editar um time
    async function editTeam(id, updatedData) {
      try {
        const response = await fetch(`https://sistemasdistibuidosa3-production.up.railway.app/times/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        if (response.ok) {
          alert("Time atualizado com sucesso!");
          fetchTeams();
          closeModal();
        } else {
          alert("Erro ao atualizar o time.");
        }
      } catch (error) {
        console.error("Erro ao editar o time:", error);
      }
    }

    // Função para excluir um time
    async function deleteTeam(id) {
      try {
        const response = await fetch(`https://sistemasdistibuidosa3-production.up.railway.app/times/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Time excluído com sucesso!");
          fetchTeams();
        } else {
          alert("Erro ao excluir o time.");
        }
      } catch (error) {
        console.error("Erro ao excluir o time:", error);
      }
    }

    // Abrir modal de edição
    function openModal(team) {
      editingTeamId = team.id;
      editForm.nome.value = team.nome;
      editForm.sigla.value = team.sigla;
      editForm.local.value = team.local;
      editForm.cor_principal.value = team.cor_principal;
      editForm.cor_secundaria.value = team.cor_secundaria;
      editModal.style.display = "flex";
    }

    // Fechar modal de edição
    function closeModal() {
      editModal.style.display = "none";
      editingTeamId = null;
    }

    // Submeter formulário para salvar alterações
    editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const updatedData = {
        nome: editForm.nome.value,
        sigla: editForm.sigla.value,
        local: editForm.local.value,
        corPrincipal: editForm.cor_principal.value,
        corSecundaria: editForm.cor_secundaria.value,
        capitao_id: null
      };
      editTeam(editingTeamId, updatedData);
    });

    // Botão Voltar no modal de edição
    cancelButton.addEventListener("click", closeModal);

    // Botão Criar Time
    createButton.addEventListener("click", openCreateModal);

    // Carregar times ao carregar a página
    fetchTeams();
});
