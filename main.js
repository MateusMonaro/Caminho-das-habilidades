const desafios = [
"Resolver um problema lógico",
"Criar diferentes soluções",
"Aprender novas funções",
"Descobrir padrões",
"Pensar em uma nova invenção"
];

function iniciarDesafio() {

// Pega o nome digitado no HTML
const nome = document.getElementById("nome").value;

// Verifica se o aluno digitou o nome
if (nome === "") {
alert("Digite seu nome para começar!");
return;
}
