// elementos principais
const overlay = document.getElementById("overlay");
const detalhesPassaporte = document.getElementById("detalhesPassaporte");

let currentPassportId = null;
let animation = null;
let visible = false;

function PassportHTML(passport) {
  return `
    <div class="modal-passaporte">
    <div class="top-detail"> 
        <span class="close" role="button" onclick="closePassaporte()" aria-label="Fechar">&times;</span>
        <span class="favorite" role="button" onclick="salvarPassaporte(${passport.id})" title="Salvar"><i class="heart-icon bi bi-suit-heart-fill" id="favoriteIcon"></i></span>
      </div>

      <span class="top-name">${passport.name}</span>

      <div class="info">
        <div class="passport-photo">
          <img src="${passport.photo || "img/cat-01.png"}" alt="Foto de ${passport.name}">
        </div>

        <div class="passport-info">
          <div class="title">Informações</div>
          <p><strong>Nome:</strong> ${passport.name}</p>
          <p><strong>Tipo:</strong> ${passport.tipo}</p>
          <p><strong>Raça:</strong> ${passport.raça}</p>
          <p><strong>Cor:</strong> ${passport.cor}</p>
          <p><strong>Idade:</strong> ${passport.idade}</p>
          <p><strong>Sexo:</strong> ${passport.sexo}</p>
          <p><strong>Porte:</strong> ${passport.porte}</p>
          <p><strong>Descrição:</strong> ${passport.descrição}</p>
        </div>
      </div>
       <button class="btn-adotar">Adote-me</button>
    </div>
  `;
}

const fade = [{ opacity: 0 }, { opacity: 1 }];
const fadeTiming = { duration: 350, iterations: 1 };

function fadeActivate() {
  if (animation) animation.cancel();
  animation = detalhesPassaporte.animate(fade, fadeTiming);
}

function showPassaporteById(passportId) {
  if (visible) return; // evita abrir duas vezes

  fetchPassaporteById(passportId).then((data) => {
    if (!data) return;
    currentPassportId = passportId;
    const html = PassportHTML(data);
    detalhesPassaporte.innerHTML = html;
    openModal();
  });
}

const icons = document.querySelectorAll(".heart-icon");

icons.forEach(icon => {
  icon.addEventListener("click", function () {
    if (this.classList.contains("favorito")) {
      this.classList.remove("favorito");
      alert("Pet removido dos favoritos!");
    } 
    else {
      this.classList.add("favorito");
      alert("Pet salvo!");
    }
  });
});

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

/* Simulação de fetch  */
function fetchPassaporteById(id) {
  // retorna Promise para imitar fetch ou pokeApi.getPokemonByID
  return new Promise((resolve) => {
    // dados de exemplo
    const fakeDB = {
      123: {
        id: 123,
        photo: "img/cat-01.png",
        name: "kiki",
        tipo: "gato",
        raça: "viralata",
        cor: "Branca",
        idade: "3 anos",
        sexo: "femea",
        porte: "pequeno",
        descrição:
          " Uma gatinha muito carinhosa e brincalhona, procura um lar cheio de amor.",
      },
    };
    setTimeout(() => resolve(fakeDB[id] || null), 150); // imita latência
  });
}

/* Inicialização: adiciona evento para todos os botões .btn-ver-passaporte */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-ver-passaporte").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = btn.dataset.id;
      if (id) showPassaporteById(id);
    });
  });
});
