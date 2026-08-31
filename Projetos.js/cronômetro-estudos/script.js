let tempo = 25 * 60;
let intervalo = null;

let modoAtual = "foco";
let sessoes = 0;

const tempoElemento = document.getElementById("tempo");

const iniciarBtn = document.getElementById("iniciar");
const pausarBtn = document.getElementById("pausar");
const reiniciarBtn = document.getElementById("reiniciar");

const focoBtn = document.getElementById("focoBtn");
const pausaBtn = document.getElementById("pausaBtn");

const contadorSessoes = document.getElementById("contadorSessoes");
const mensagem = document.getElementById("mensagem");


function atualizarTela() {

    let minutos = Math.floor(tempo / 60);
    let segundos = tempo % 60;

    minutos = String(minutos).padStart(2, "0");
    segundos = String(segundos).padStart(2, "0");

    tempoElemento.textContent = `${minutos}:${segundos}`;
}


function iniciar() {

    if (intervalo !== null) {
        return;
    }

    intervalo = setInterval(() => {

        if (tempo > 0) {

            tempo--;

            atualizarTela();

        } else {

            clearInterval(intervalo);
            intervalo = null;

            if (modoAtual === "foco") {

                sessoes++;

                contadorSessoes.textContent = sessoes;

                mensagem.textContent = "🎉 Sessão concluída! Hora de descansar.";

                alert("🎉 Parabéns! Você terminou uma sessão de estudos!");

                mudarParaPausa();

            } else {

                mensagem.textContent = "📚 A pausa acabou! Hora de estudar.";

                alert("📚 A pausa terminou! Vamos voltar aos estudos!");

                mudarParaFoco();
            }
        }

    }, 1000);
}


function pausar() {

    clearInterval(intervalo);

    intervalo = null;

    mensagem.textContent = "⏸ Cronômetro pausado.";
}


function reiniciar() {

    clearInterval(intervalo);

    intervalo = null;

    if (modoAtual === "foco") {
        tempo = 25 * 60;
    } else {
        tempo = 5 * 60;
    }

    atualizarTela();

    mensagem.textContent =
        modoAtual === "foco"
            ? "Hora de estudar! 🚀"
            : "Aproveite sua pausa! ☕";
}


function mudarParaPausa() {

    clearInterval(intervalo);
    intervalo = null;

    modoAtual = "pausa";

    tempo = 5 * 60;

    pausaBtn.classList.add("ativo");
    focoBtn.classList.remove("ativo");

    mensagem.textContent = "☕ Hora de descansar!";

    atualizarTela();
}


function mudarParaFoco() {

    clearInterval(intervalo);
    intervalo = null;

    modoAtual = "foco";

    tempo = 25 * 60;

    focoBtn.classList.add("ativo");
    pausaBtn.classList.remove("ativo");

    mensagem.textContent = "📚 Hora de estudar!";

    atualizarTela();
}


iniciarBtn.addEventListener("click", iniciar);

pausarBtn.addEventListener("click", pausar);

reiniciarBtn.addEventListener("click", reiniciar);

focoBtn.addEventListener("click", mudarParaFoco);

pausaBtn.addEventListener("click", mudarParaPausa);


atualizarTela();