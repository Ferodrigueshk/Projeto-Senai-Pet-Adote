let form = document.getElementById("formPet");
let nome = document.getElementById("nome");
let raca = document.getElementById("raca");
let idade = document.getElementById("idade");
let especie = document.getElementById("especie");
let vacinas = document.getElementById("vacinas");
let descricao = document.getElementById("descricao");
let contador = document.getElementById("contador");
let botao = document.getElementById("btnEnviar");
let mensagem = document.getElementById("mensagem");

/* ✅ Contador de caracteres para descrição */
descricao.addEventListener("input", () => {
    contador.textContent = `${descricao.value.length} / 300`;
});

/* ✅ Limite de caracteres */
descricao.maxLength = 300;

/* ✅ Validação + mensagem de sucesso */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
        nome.value === "" ||
        raca.value === "" ||
        idade.value === "" ||
        especie.value === "" ||
        vacinas.value === "" ||
        descricao.value === ""
    ) {
        mensagem.textContent = "⚠️ Preencha todos os campos!";
        mensagem.style.color = "red";
        return;
    }

    botao.classList.add("carregando");

    setTimeout(() => {
        mensagem.textContent = "✅ Cadastro enviado com sucesso!";
        mensagem.style.color = "green";
        form.reset();
        contador.textContent = "0 / 300";
        botao.classList.remove("carregando");
    }, 1500);
});



