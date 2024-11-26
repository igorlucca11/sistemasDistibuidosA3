document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.querySelector(".cardsContainer");

    // Função para buscar os artilheiros da API
    async function fetchArtilharia() {
        try {
            const response = await fetch("https://sistemasdistibuidosa3-production.up.railway.app/gols/artilharia");
            const artilheiros = await response.json();
            renderArtilheiros(artilheiros);
        } catch (error) {
            console.error("Erro ao carregar os artilheiros:", error);
        }
    }

    // Função para renderizar os artilheiros
    function renderArtilheiros(artilheiros) {
        cardsContainer.innerHTML = "";  // Limpa o conteúdo atual

        artilheiros.forEach((artilheiro) => {
            const card = document.createElement("div");
            card.className = "teamsCard";
            card.innerHTML = `
                <div class="teamInformation">
                    <h3>${artilheiro.jogador}</h3>
                    <p>Time: ${artilheiro.time}</p>
                    <p>Gols: ${artilheiro.gols}</p>
                </div>
            `;

            cardsContainer.appendChild(card);
        });
    }

    // Carregar os artilheiros na inicialização
    fetchArtilharia();
});
