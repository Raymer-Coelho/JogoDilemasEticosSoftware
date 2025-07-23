document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const botaoAvaliar = document.getElementById('avaliarProjeto');

if (botaoAvaliar && form) {
  botaoAvaliar.addEventListener('click', (e) => {
    e.preventDefault();
    form.requestSubmit(); 
  });
}

  const resultadoDiv = document.getElementById('resultado');

  // Função para validar campos
  function validarFormulario(nome, criterios) {
    if (!nome.trim()) {
      alert('Por favor, insira o nome do projeto.');
      return false;
    }
    if (criterios.length === 0) {
      alert('Selecione pelo menos um critério sustentável.');
      return false;
    }
    return true;
  }

  // Função para salvar e redirecionar
  function salvarProjeto(dados) {
    const listaProjetos = JSON.parse(localStorage.getItem('listaProjetos')) || [];
    listaProjetos.push(dados);
    localStorage.setItem('listaProjetos', JSON.stringify(listaProjetos));
    localStorage.setItem('avaliacaoProjeto', JSON.stringify(dados));
  }

  // Função para mostrar mensagem de sucesso
  function mostrarMensagem(msg) {
    const mensagem = document.createElement('div');
    mensagem.textContent = msg;
    mensagem.style.backgroundColor = '#d1f0d9';
    mensagem.style.color = '#2e5e4e';
    mensagem.style.padding = '10px';
    mensagem.style.marginTop = '15px';
    mensagem.style.borderRadius = '8px';
    mensagem.style.textAlign = 'center';
    form.appendChild(mensagem);

    setTimeout(() => mensagem.remove(), 3000);
  }

  // Evento de envio do formulário
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nomeProjeto = document.getElementById('nomeProjeto').value;
      const tecnologias = document.getElementById('tecnologias').value;
      const criterios = document.querySelectorAll('input[name="criterios"]:checked');

      if (!validarFormulario(nomeProjeto, criterios)) return;

      let pontuacao = 0;
      criterios.forEach(c => pontuacao += parseInt(c.value));

      const resultado = {
        nomeProjeto,
        tecnologias,
        pontuacao,
        criteriosSelecionados: criterios.length,
        data: new Date().toLocaleString()
      };

      salvarProjeto(resultado);
      mostrarMensagem('Projeto avaliado com sucesso! Redirecionando...');

      setTimeout(() => {
        window.location.href = 'resultados.html';
      }, 2000);
    });
  }

  // Exibir dados do último projeto avaliado
  if (resultadoDiv) {
    const dados = JSON.parse(localStorage.getItem('avaliacaoProjeto'));
    if (dados) {
      resultadoDiv.innerHTML = `
        <h2>${dados.nomeProjeto}</h2>
        <p><strong>Tecnologias:</strong> ${dados.tecnologias}</p>
        <p><strong>Pontuação:</strong> ${dados.pontuacao}</p>
        <p><strong>Critérios Selecionados:</strong> ${dados.criteriosSelecionados}</p>
        <p><strong>Data:</strong> ${dados.data}</p>
      `;
    } else {
      resultadoDiv.innerHTML = `<p>Nenhum projeto avaliado ainda.</p>`;
    }
  }
});
