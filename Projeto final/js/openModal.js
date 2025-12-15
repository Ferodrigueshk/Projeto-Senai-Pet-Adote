const overlay = document.getElementById("overlay");
const detalhesPassaporte = document.getElementById("detalhesPassaporte");

let animation = null;
let visible = false;

function PassportHTML(pet) {
  return `
    <div class="modal-passaporte">
      <div class="top-detail">
        <span class="close" role="button" onclick="closePassaporte()">&times;</span>
        <span class="favorite" role="button" id="favoriteBtn">
          <i class="heart-icon bi bi-suit-heart-fill"></i>
        </span>
      </div>

      <span class="top-name">${pet.name}</span>

      <div class="info">
        <div class="passport-photo">
          <img src="${pet.photo || "img/cat-01.png"}" alt="Foto de ${pet.name}">
        </div>

        <div class="passport-info">
          <div class="title">Informações</div>
          <p><strong>Tipo:</strong> ${pet.tipo}</p>
          <p><strong>Raça:</strong> ${pet.raca}</p>
          <p><strong>Cor:</strong> ${pet.cor}</p>
          <p><strong>Idade:</strong> ${pet.idade}</p>
          <p><strong>Sexo:</strong> ${pet.sexo}</p>
          <p><strong>Porte:</strong> ${pet.porte}</p>
          <p><strong>Descrição:</strong> ${pet.descricao}</p>
        </div>
      </div>

      <button class="btn-adotar">Adote-me</button>
    </div>
  `;
}


const API_URL = "https://ominous-space-train-p75jq7j747rh979p-8080.app.github.dev/pets";

async function fetchPetById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Pet não encontrado");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}


async function showPassaporteById(id) {
  if (visible) return;

  const pet = await fetchPetById(id);
  if (!pet) return;

  detalhesPassaporte.innerHTML = PassportHTML(pet);
  openModal();
  ativarFavorito();
}


function ativarFavorito() {
  const icon = document.querySelector(".heart-icon");
  if (!icon) return;

  icon.addEventListener("click", () => {
    icon.classList.toggle("favorito");
    alert(
      icon.classList.contains("favorito")
        ? "Pet salvo nos favoritos!"
        : "Pet removido dos favoritos!"
    );
  });
}



const fade = [{ opacity: 0 }, { opacity: 1 }];
const fadeTiming = { duration: 350, iterations: 1 };

function fadeActivate() {
  if (animation) animation.cancel();
  animation = detalhesPassaporte.animate(fade, fadeTiming);
}

function openModal() {
  overlay.style.display = "block";
  detalhesPassaporte.style.display = "block";
  detalhesPassaporte.setAttribute("aria-hidden", "false");
  fadeActivate();
  visible = true;

  overlay.addEventListener("click", overlayClickHandler);
  window.addEventListener("keydown", escKeyHandler);
}

function overlayClickHandler() {
  closePassaporte();
}

function closePassaporte() {
  if (!visible) return;
  if (animation) {
    animation.reverse();
    animation.addEventListener(
      "finish",
      () => {
        overlay.style.display = "none";
        detalhesPassaporte.style.display = "none";
        detalhesPassaporte.innerHTML = "";
        detalhesPassaporte.setAttribute("aria-hidden", "true");
        animation = null;
      },
      { once: true }
    );
  } else {
    overlay.style.display = "none";
    detalhesPassaporte.style.display = "none";
    detalhesPassaporte.innerHTML = "";
  }

  visible = false;
  overlay.removeEventListener("click", overlayClickHandler);
  window.removeEventListener("keydown", escKeyHandler);
}

function escKeyHandler(e) {
  if (e.key === "Escape") closePassaporte();
}

