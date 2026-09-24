const desafios =[
    "Resolver problemas de lógica",
    "Apreder novas funções",
    "Criar novas soluções",
    "Aprender Padrões",
    "Criar uma invenção"
];

function iniciarDesafio() {
    
    // Pega o nome digitado no HTML.
    const nome=document.getElementById("name").value;

    // Verifica se o aluno digitou o nome.
     if(nome === ""){
        alert("Digite o seu nome para começar!");
        return;

    }

    const numero = Math.floor(Math.random()*desafios.length)
    const desafio = desafios[numero];

    document.getElementById("resultado").innerHTML =
    `<h2 class="ola">Olá ${nome}! </h2>`;

    setTimeout(() => {
        document.getElementById("resultado").innerHTML +=
        `
        <p>↓ Seu desafio é: ↓</p>
        <h3 class="desafio"> ${desafio} </h3>

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

function avaliarResposta(){
    const nome = document.getElementById("name").value;
    const resposta = document.getElementById("resposta").value;
    const textoDesafio = document.querySelector("#resultado h3");

    if(resposta.trim() === ""){
        alert("Digite o seu projeto para começar!");
        return;

    }

    let pontos = 0;

// Critérios de avaliação - Quantidade de letras.
    if(resposta.length >= 30) {
        pontos += 30;
    }

// Critérios de avaliação - Palavras persentes no texto.
const texto = resposta.toLowerCase();

if(
    texto.includes("desenvolver")||
    texto.includes("criar")||
    texto.includes("praticar")
){
    pontos += 35;
}

if(
    texto.includes("Pesquisar")||
    texto.includes("analizar")||
    texto.includes("resolver")
){
    pontos += 35;
}

let nível;

if(pontos >= 70){
    nível= "Inventor de Idéias";
}

else if (pontos >= 65){
    nível = "Desenvolvedor";
}

else{
    nível = "Explorador";
}

}
    
