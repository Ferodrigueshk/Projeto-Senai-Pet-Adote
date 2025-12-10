// função de salvar o pet
const icon = document.getElementById("favoriteIcon");

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


