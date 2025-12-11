let form = document.getElementById("formAdocao")
let nome = document.getElementById("nome")
let telefone = document.getElementById("telefone")
let email = document.getElementById("email")
let endereço = document.getElementById("endereco")
let sobre = document.getElementById("sobre")
let contador = document.getElementById("contador")
let botao = document.getElementById("btnEnviar")
let mensagem = document.getElementById("mensagem")

sobre.addEventListener("input", () => {
    contador.textContent = `${sobre.value.length} / 500`;
})
sobre.maxLength = 500;

telefone.addEventListener("input", () => {
    let valor = telefone.value.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    telefone.value = valor;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
        nome.value === "" ||
        telefone.value === "" ||
        email.value === "" ||
        endereco.value === "" ||
        sobre.value === ""
    ) {
        mensagem.textContent = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return;
    }

    botao.classList.add("carregando");

    setTimeout(() => {
        mensagem.textContent = "Cadastro enviado com sucesso!";
        mensagem.style.color = "green";
        form.reset();
        contador.textContent = "0 / 500";
        botao.classList.remove("carregando");
    }, 1500);
});