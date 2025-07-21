const perguntas = [
  {
    pergunta: "Você descobre um bug crítico que pode causar falhas, mas a entrega está em cima da hora. O que você faz?",
    opcoes: [
      { texto: "Ignora e entrega mesmo assim.", pontos: -10 },
      { texto: "Relata o problema, mesmo que atrase a entrega.", pontos: 10 },
      { texto: "Esconde o bug e promete consertar depois.", pontos: -5 }
    ]
  },
  {
    pergunta: "Seu colega copia códigos da internet sem dar créditos. Como você reage?",
    opcoes: [
      { texto: "Finge que não viu.", pontos: -5 },
      { texto: "Conversa com ele sobre plágio e ética.", pontos: 10 },
      { texto: "Informa ao supervisor imediatamente.", pontos: 5 }
    ]
  },
  {
    pergunta: "O cliente pede que você colete dados do usuário sem avisá-los. O que você faz?",
    opcoes: [
      { texto: "Recusa e explica a importância da privacidade.", pontos: 10 },
      { texto: "Aceita, já que é o desejo do cliente.", pontos: -10 },
      { texto: "Faz, mas tenta esconder os dados.", pontos: -5 }
    ]
  },
  {
    pergunta: "Você encontra um código malicioso inserido no sistema. Qual sua atitude?",
    opcoes: [
      { texto: "Remove e investiga imediatamente.", pontos: 10 },
      { texto: "Ignora se não estiver afetando nada.", pontos: -10 },
      { texto: "Avisa ao responsável pelo sistema.", pontos: 5 }
    ]
  },
  {
    pergunta: "Seu gerente te pede para manipular um relatório de desempenho. O que você faz?",
    opcoes: [
      { texto: "Recusa e sugere relatar os dados reais.", pontos: 10 },
      { texto: "Faz por medo de perder o emprego.", pontos: -10 },
      { texto: "Faz, mas registra que foi a pedido do gerente.", pontos: -5 }
    ]
  }
];

const frasesEticas = [
  "⚖️ A ética não é o melhor caminho... é o único.",
  "🌱 Transparência gera confiança.",
  "🧩 Grandes decisões começam com responsabilidade.",
  "👥 Respeitar o outro é respeitar a si mesmo.",
  "🛡️ Integridade é fazer o certo, mesmo quando ninguém está olhando."
];

let indice = 0;
let pontuacao = 0;
let perguntasEmbaralhadas = [];

const telaBoasVindas = document.getElementById("welcome-screen");
const botaoIniciar = document.getElementById("start-button");
const containerJogo = document.getElementById("game-container");

const perguntaEl = document.getElementById("question");
const opcoesEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const progressoEl = document.getElementById("progress");
const botaoProxima = document.getElementById("next-button");
const resultadoEl = document.getElementById("result");
const botaoRestart = document.getElementById("restart-button");
const clickSound = document.getElementById("click-sound");

botaoIniciar.addEventListener("click", () => {
  telaBoasVindas.classList.add("hidden");
  containerJogo.classList.remove("hidden");
  iniciarJogo();
});

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function iniciarJogo() {
  perguntasEmbaralhadas = embaralhar(perguntas);
  indice = 0;
  pontuacao = 0;
  resultadoEl.classList.add("hidden");
  botaoProxima.style.display = "inline-block";
  botaoRestart.classList.add("hidden");
  mostrarPergunta();
}

function mostrarPergunta() {
  const perguntaAtual = perguntasEmbaralhadas[indice];
  perguntaEl.textContent = perguntaAtual.pergunta;
  opcoesEl.innerHTML = "";
  resultadoEl.classList.add("hidden");

  perguntaAtual.opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.textContent = opcao.texto;
    botao.onclick = () => {
      tocarSom();
      selecionarOpcao(opcao.pontos);

      // Destaque visual
      botao.style.backgroundColor = opcao.pontos > 0 ? "#a5d6a7" : "#ef9a9a";
    };
    opcoesEl.appendChild(botao);
  });

  scoreEl.textContent = `Pontuação: ${pontuacao}`;
  progressoEl.textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;
  botaoProxima.disabled = true;
}

function tocarSom() {
  if (clickSound) clickSound.play();
}

function selecionarOpcao(pontos) {
  pontuacao += pontos;
  botaoProxima.disabled = false;
  mostrarComentarioEtico(pontos);

  // Desativa os botões após a seleção
  const botoes = document.querySelectorAll("#options button");
  botoes.forEach((btn) => {
    btn.disabled = true;
  });
}

function mostrarComentarioEtico(pontos) {
  let comentario = "";

  if (pontos === 10) comentario = "✔️ Excelente decisão! Você escolheu o caminho mais ético.";
  else if (pontos === 5) comentario = "ℹ️ Decisão ética moderada. Há espaço para reflexão.";
  else comentario = "⚠️ Atenção! Esta escolha levanta preocupações éticas.";

  const fraseAleatoria = frasesEticas[Math.floor(Math.random() * frasesEticas.length)];
  resultadoEl.textContent = `${comentario}\n${fraseAleatoria}`;
  resultadoEl.classList.remove("hidden");
}

botaoProxima.addEventListener("click", () => {
  if (indice < perguntas.length - 1) {
    indice++;
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});

function mostrarResultado() {
  perguntaEl.textContent = "";
  opcoesEl.innerHTML = "";
  botaoProxima.style.display = "none";

  let mensagem = "";
  let medalha = "";
  let animacaoFinal = "";

  if (pontuacao >= 40) {
    mensagem = "Excelente! Suas decisões demonstram alta consciência ética.";
    medalha = "🏅 Medalha de Ouro";
    animacaoFinal = "🎉🎉🎉";
  } else if (pontuacao >= 25) {
    mensagem = "Bom! Mas ainda há espaço para aprimorar sua ética profissional.";
    medalha = "🥈 Medalha de Prata";
    animacaoFinal = "✨✨";
  } else {
    mensagem = "Atenção! Suas decisões indicam necessidade de reflexão ética.";
    medalha = "🥉 Medalha de Bronze";
    animacaoFinal = "⚠️🔍";
  }

  resultadoEl.classList.remove("hidden");
  resultadoEl.textContent = `${mensagem}\nPontuação final: ${pontuacao} — ${medalha}\n${animacaoFinal}`;

  botaoRestart.classList.remove("hidden");
}

botaoRestart.addEventListener("click", () => {
  botaoRestart.classList.add("hidden");
  iniciarJogo();
});
