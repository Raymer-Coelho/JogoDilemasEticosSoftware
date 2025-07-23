window.addEventListener('load', () => {
  const ctx = document.getElementById('grafico').getContext('2d');
  const tabela = document.querySelector('#tabelaResultados tbody');
  let projetos = JSON.parse(localStorage.getItem('listaProjetos')) || [];

  // Função para renderizar tabela com botão de excluir
  function renderTabela() {
    tabela.innerHTML = '';
    projetos.forEach((p, index) => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${p.nomeProjeto}</td>
        <td>${p.tecnologias}</td>
        <td>${p.pontuacao}</td>
        <td>${p.criteriosSelecionados}</td>
        <td>${p.data}</td>
        <td><button class="btn-excluir" data-index="${index}">Excluir</button></td>
      `;
      tabela.appendChild(linha);
    });
  }

  // Função para renderizar gráfico original
  function renderGrafico() {
    const labels = projetos.map(p => p.nomeProjeto);
    const dadosPontuacao = projetos.map(p => p.pontuacao);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Pontuação Sustentável',
          data: dadosPontuacao,
          backgroundColor: '#4CAF50'
        }, {
          label: 'Pontuação Máxima',
          data: new Array(projetos.length).fill(10),
          backgroundColor: '#ccc'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 12
          }
        }
      }
    });
  }

  // Função para excluir projeto
  function excluirProjeto(index) {
    projetos.splice(index, 1);
    localStorage.setItem('listaProjetos', JSON.stringify(projetos));
    renderTabela();
    renderGrafico();
  }

  // Evento de clique para exclusão
  tabela.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-excluir')) {
      const index = e.target.getAttribute('data-index');
      excluirProjeto(index);
    }
  });

  renderTabela();
  renderGrafico();
});
