const desafios = [
    "Resolver problemas de lógica",
    "Aprender novas funções",
    "Criar novas soluções",
    "Aprender padrões",
    "Criar uma invenção"
];

function iniciarDesafio() {
    
    // Pega o nome digitado no HTML.
    const nome = document.getElementById("name").value;

    // Verifica se o aluno digitou o nome.
    if (nome === "") {
        alert("Digite o seu nome para começar!");
        return;
    }

    const numero = Math.floor(Math.random() * desafios.length);
    const desafio = desafios[numero];

    document.getElementById("resultado").innerHTML =
    `<h2 class="ola">Olá ${nome}!</h2>`;

    setTimeout(() => {
        document.getElementById("resultado").innerHTML +=
        `
        <p>↓ Seu desafio é: ↓</p>
        <h3 class="desafio">${desafio}</h3>

        <div class="respostaBox">
            <label for="resposta">
                Qual é o projeto para este desafio?
            </label>

            <textarea
                id="resposta"
                rows="5"
                cols="40"
                placeholder="Digite aqui o seu projeto?"
            ></textarea>

            <button onclick="avaliarResposta()">💻 Enviar projeto!</button>
        </div>
        `;
    }, 1500);

}

function avaliarResposta() {
    const nome = document.getElementById("name").value;
    const resposta = document.getElementById("resposta").value;
    const textoDesafio = document.querySelector("#resultado h3").innerText;

    if (resposta.trim() === "") {
        alert("Digite o seu projeto para começar!");
        return;
    }

    let pontos = 0;

    // Critérios de avaliação - Quantidade de letras.
    if (resposta.length >= 30) {
        pontos += 30;
    }

    // Critérios de avaliação - Palavras presentes no texto.
    const texto = resposta.toLowerCase();

    if (
        texto.includes("desenvolver") ||
        texto.includes("criar") ||
        texto.includes("praticar")
    ) {
        pontos += 35;
    }

    if (
        texto.includes("pesquisar") ||
        texto.includes("analisar") ||
        texto.includes("resolver")
    ) {
        pontos += 35;
    }

    // Define um tempo aleatório para o retorno.
    const tempo = Math.floor(Math.random() * 10) + 1;

    let nivel;

    if (pontos >= 70) {
        nivel = "Inventor de Ideias";
    }

    else if (pontos >= 65) {
        nivel = "Desenvolvedor";
    }

    else {
        nivel = "Explorador";
    }

    // Relatório final.
    document.getElementById("resultado").innerHTML =
    `<h2>Caminho das Habilidades - Relatório</h2>
    <p><strong>Participante:</strong> ${nome}</p>
    <p><strong>Desafio:</strong> ${textoDesafio}</p>
    <p><strong>Resposta:</strong> ${resposta}</p>
    <p><strong>Pontuação:</strong> ${pontos}</p>
    <p><strong>Nível:</strong> ${nivel}</p>
    <p>O tempo de espera para o retorno da avaliação é ${tempo} dia(s).</p>

    ${pontos >= 70
        ? "Parabéns, você conseguiu uma ótima pontuação, continue assim!"
        : "Continue pesquisando e desenvolvendo novos projetos, você conseguirá na próxima!"
    }

    <br><br>

    <button onclick="location.reload()">
        Novo desafio!
    </button>
    `;
}
    
