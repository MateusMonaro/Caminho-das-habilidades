const desafios = [
    "Resolver problemas de lógica",
    "Aprender novas funções",
    "Criar novas soluções",
    "Aprender padrões",
    "Criar uma invenção"
];

function iniciarDotField() {
    const fundo = document.querySelector(".divFundo");
    const canvas = document.createElement("canvas");
    const contexto = canvas.getContext("2d");
    const pontos = [];
    const mouse = { x: -9999, y: -9999, velocidade: 0, anteriorX: -9999, anteriorY: -9999 };
    const configuracao = {
        raio: 1.5,
        espacamento: 14,
        raioCursor: 500,
        raioBrilho: 160,
        intensidade: 67,
        corInicial: "rgba(168, 85, 247, 0.35)",
        corFinal: "rgba(180, 151, 207, 0.25)",
        corBrilho: "#120F17"
    };
    let largura = 0;
    let altura = 0;
    let envolvimento = 0;
    let opacidadeBrilho = 0;
    let quadro;
    const observador = new ResizeObserver(redimensionar);

    canvas.className = "dot-field-canvas";
    canvas.setAttribute("aria-hidden", "true");
    fundo.prepend(canvas);

    function redimensionar() {
        const retangulo = fundo.getBoundingClientRect();
        const escala = Math.min(window.devicePixelRatio || 1, 2);
        largura = retangulo.width;
        altura = retangulo.height;
        canvas.width = largura * escala;
        canvas.height = altura * escala;
        contexto.setTransform(escala, 0, 0, escala, 0, 0);

        const passo = configuracao.raio + configuracao.espacamento;
        const colunas = Math.floor(largura / passo);
        const linhas = Math.floor(altura / passo);
        const margemX = (largura % passo) / 2;
        const margemY = (altura % passo) / 2;
        pontos.length = 0;

        for (let linha = 0; linha < linhas; linha++) {
            for (let coluna = 0; coluna < colunas; coluna++) {
                const x = margemX + coluna * passo + passo / 2;
                const y = margemY + linha * passo + passo / 2;
                pontos.push({ x, y, atualX: x, atualY: y });
            }
        }
    }

    function moverPonteiro(evento) {
        const retangulo = fundo.getBoundingClientRect();
        mouse.x = evento.clientX - retangulo.left;
        mouse.y = evento.clientY - retangulo.top;
    }

    function desenhar() {
        const distanciaX = mouse.x - mouse.anteriorX;
        const distanciaY = mouse.y - mouse.anteriorY;
        const velocidade = Math.hypot(distanciaX, distanciaY);
        mouse.velocidade += (velocidade - mouse.velocidade) * 0.5;
        mouse.anteriorX = mouse.x;
        mouse.anteriorY = mouse.y;

        const alvoEnvolvimento = Math.min(mouse.velocidade / 5, 1);
        envolvimento += (alvoEnvolvimento - envolvimento) * 0.06;
        opacidadeBrilho += (envolvimento - opacidadeBrilho) * 0.08;

        contexto.clearRect(0, 0, largura, altura);
        const gradiente = contexto.createLinearGradient(0, 0, largura, altura);
        gradiente.addColorStop(0, configuracao.corInicial);
        gradiente.addColorStop(1, configuracao.corFinal);
        contexto.fillStyle = gradiente;
        contexto.beginPath();

        for (const ponto of pontos) {
            const dx = mouse.x - ponto.x;
            const dy = mouse.y - ponto.y;
            const distancia = Math.hypot(dx, dy);

            if (distancia < configuracao.raioCursor && envolvimento > 0.01) {
                const intensidade = (1 - distancia / configuracao.raioCursor) ** 2 * configuracao.intensidade * envolvimento;
                const angulo = Math.atan2(dy, dx);
                ponto.atualX += (ponto.x - Math.cos(angulo) * intensidade - ponto.atualX) * 0.15;
                ponto.atualY += (ponto.y - Math.sin(angulo) * intensidade - ponto.atualY) * 0.15;
            } else {
                ponto.atualX += (ponto.x - ponto.atualX) * 0.1;
                ponto.atualY += (ponto.y - ponto.atualY) * 0.1;
            }

            contexto.moveTo(ponto.atualX + configuracao.raio / 2, ponto.atualY);
            contexto.arc(ponto.atualX, ponto.atualY, configuracao.raio / 2, 0, Math.PI * 2);
        }

        contexto.fill();
        if (opacidadeBrilho > 0.001) {
            const brilho = contexto.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, configuracao.raioBrilho);
            brilho.addColorStop(0, configuracao.corBrilho);
            brilho.addColorStop(1, "transparent");
            contexto.globalAlpha = opacidadeBrilho;
            contexto.fillStyle = brilho;
            contexto.fillRect(mouse.x - configuracao.raioBrilho, mouse.y - configuracao.raioBrilho, configuracao.raioBrilho * 2, configuracao.raioBrilho * 2);
            contexto.globalAlpha = 1;
        }

        quadro = requestAnimationFrame(desenhar);
    }

    redimensionar();
    observador.observe(fundo);
    window.addEventListener("resize", redimensionar);
    window.addEventListener("pointermove", moverPonteiro, { passive: true });
    quadro = requestAnimationFrame(desenhar);

    window.addEventListener("pagehide", () => {
        cancelAnimationFrame(quadro);
        observador.disconnect();
        window.removeEventListener("resize", redimensionar);
        window.removeEventListener("pointermove", moverPonteiro);
    }, { once: true });
}

iniciarDotField();

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

    // Critérios de avaliação - Quantidade de texto e profundidade.
    const texto = resposta.toLowerCase();
    const palavras = texto.split(/\s+/).filter(Boolean);

    if (palavras.length >= 25) {
        pontos += 20;
    }

    if (palavras.length >= 45) {
        pontos += 15;
    }

    if (palavras.length >= 70) {
        pontos += 10;
    }

    // Critérios de avaliação - Ações do processo.
    if (
        texto.includes("desenvolver") ||
        texto.includes("criar") ||
        texto.includes("praticar") ||
        texto.includes("construir")
    ) {
        pontos += 20;
    }

    if (
        texto.includes("pesquisar") ||
        texto.includes("analisar") ||
        texto.includes("resolver") ||
        texto.includes("estudar")
    ) {
        pontos += 20;
    }

    // Critérios de avaliação - Organização e clareza.
    if (
        texto.includes("objetivo") ||
        texto.includes("funcionalidade") ||
        texto.includes("tecnologia") ||
        texto.includes("design")
    ) {
        pontos += 15;
    }

    // Critérios de avaliação - Uso de tecnologias e contexto do projeto.
    if (
        texto.includes("html") ||
        texto.includes("css") ||
        texto.includes("javascript") ||
        texto.includes("site") ||
        texto.includes("aplicativo")
    ) {
        pontos += 10;
    }

    // Critérios de avaliação - Criatividade e originalidade.
    if (
        texto.includes("inovador") ||
        texto.includes("criativo") ||
        texto.includes("original") ||
        texto.includes("invenção") ||
        texto.includes("descobrir")
    ) {
        pontos += 10;
    }

    // Define um tempo aleatório para o retorno.
    const tempo = Math.floor(Math.random() * 10) + 1;

    let nivel;

    if (pontos >= 80) {
        nivel = "Inventor de Ideias";
    }

    else if (pontos >= 65) {
        nivel = "Desenvolvedor";
    }

    else {
        nivel = "Explorador";
    }

    const mensagemFinal = pontos >= 80
        ? "Parabéns, você conseguiu uma ótima pontuação, continue assim!"
        : "Continue pesquisando e desenvolvendo novos projetos, você conseguirá na próxima!";

    const classeMensagem = pontos >= 80 ? "mensagem-sucesso" : "mensagem-aviso";

    // Relatório final.
    document.getElementById("resultado").innerHTML =
    `<div class="relatorio">
        <h2>Caminho das Habilidades - Relatório</h2>
        <p class="avaliação"><strong>Participante:</strong> ${nome}</p>
        <p class="avaliação"><strong>Desafio:</strong> ${textoDesafio}</p>
        <p class="avaliação"><strong>Resposta:</strong> ${resposta}</p>
        <p class="avaliação"><strong>Pontuação:</strong> ${pontos}</p>
        <p class="avaliação"><strong>Nível:</strong> ${nivel}</p>
        <p class="avaliação">O tempo de espera para o retorno da avaliação é ${tempo} dia(s).</p>
    </div>
    
    <p class="${classeMensagem}">${mensagemFinal}</p>

    <button class="recomecar" onclick="location.reload()">
        <strong>↑ Novo desafio ↑</strong>
    </button>
    `;
}
