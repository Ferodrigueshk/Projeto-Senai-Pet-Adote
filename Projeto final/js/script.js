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

// função de carrossel
const container = document.querySelector(".cards-container");
const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");

let index = 0;
const cardWidth = 320 + 32; 
const maxCards = document.querySelectorAll(".card").length;
const cardsVisible = 2;
const jump = 2; 

arrowLeft.addEventListener("click", () => {
    if (index < maxCards - cardsVisible) {
        index += jump;
        if (index > maxCards - cardsVisible) index = maxCards - cardsVisible;
        container.style.transform = `translateX(-${index * cardWidth}px)`;
    }
});

arrowRight.addEventListener("click", () => {
    if (index > 0) {
        index -= jump;
        if (index < 0) index = 0;
        container.style.transform = `translateX(-${index * cardWidth}px)`;
    }
});
