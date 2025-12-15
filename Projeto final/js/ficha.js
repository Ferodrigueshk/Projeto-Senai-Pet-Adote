document.addEventListener("DOMContentLoaded", carregarPets);

const API_URL = "https://ominous-space-train-p75jq7j747rh979p-8080.app.github.dev/pets";

async function carregarPets() {
    const container = document.getElementById("cardsContainer");
    container.innerHTML = "<p>Carregando pets...</p>";

    try {
        const response = await fetch(API_URL);
        const pets = await response.json();

        container.innerHTML = "";

        pets.forEach(pet => {
            const card = criarCardPet(pet);
            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Erro ao carregar pets.</p>";
    }
}

const btnPassaporte = article.querySelector(".btn-ver-passaporte");
btnPassaporte.addEventListener("click", () => {
    showPassaporteById(pet.id);
});



function criarCardPet(pet) {
    const article = document.createElement("article");
    article.classList.add("card");

    if (pet.sexo?.toLowerCase() === "macho") {
        article.classList.add("macho");
    }

    const imagem = pet.especie?.id === 1 
        ? "img/cat-01.png"
        : "img/dog-01.png";

    article.innerHTML = `
        <div class="card-img">
            <img src="${imagem}" alt="${pet.name}">
            <i class="heart-icon bi bi-suit-heart-fill"></i>
        </div>

        <div class="card-content">
            <h1>${pet.name}</h1>
            <span class="tag ${pet.sexo === 'Fêmea' ? 'fêmea' : 'macho-tag'}">
                ${pet.sexo}, ${pet.idade} ${pet.idade > 1 ? 'anos' : 'ano'}
            </span>

            <ul class="infos">
                ${pet.vacinado ? `<li>💉 Vacinado (${pet.qtdDoses} doses)</li>` : ""}
            </ul>

            <p class="registry-text">Registro: ${pet.disponibilidade}</p>

            <button class="btn-ver-passaporte">
                Ver Passaporte Completo
            </button>
        </div>
    `;

    article.querySelector(".btn-ver-passaporte")
        .addEventListener("click", () => showPassaporteById(pet.id));

    return article;
}
