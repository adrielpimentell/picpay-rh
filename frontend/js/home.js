const API_URL = 'http://localhost:8080/funcionarios';

const statusApiParaUi = {
  EM_ANALISE: 'pending',
  APROVADO: 'approved',
  REPROVADO: 'rejected',
  CONTRATADO: 'hired'
};

const statusLabels = {
  approved: 'Aprovado',
  pending: 'Em análise',
  rejected: 'Reprovado',
  hired: 'Contratado'
};

function formatSalario(valor) {
  return 'R$' + Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

document.querySelector('.logout-btn').addEventListener('click', () => {
  window.location.href = '../index.html';
});

// Dropdown de departamentos
const deptDropdown = document.getElementById('dept-dropdown');
const deptBtn = document.getElementById('dept-dropdown-btn');
const deptMenu = document.getElementById('dept-menu');
const deptSelected = document.getElementById('dept-selected');
const cardValue = deptDropdown.closest('.summary-card').querySelector('.card-value');

deptBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  deptDropdown.classList.toggle('open');
});

document.addEventListener('click', () => {
  deptDropdown.classList.remove('open');
});

// Navegação entre telas
document.getElementById('tab-candidatos').addEventListener('click', () => {
  window.location.href = 'candidatos.html';
});
document.getElementById('tab-visao-geral').addEventListener('click', () => {
  window.location.href = 'home.html';
});
document.getElementById('view-all-btn').addEventListener('click', () => {
  window.location.href = 'candidatos.html';
});

const tbody = document.getElementById('candidates-table-body');
const totalValueEl = document.getElementById('total-candidatos-value');

async function carregarIndicadores() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error('Erro ao buscar funcionários');
    const funcionarios = await resposta.json();

    // Total de candidatos
    totalValueEl.textContent = funcionarios.length;

    // Candidatos por departamento
    const contagemPorDepto = {};
    funcionarios.forEach(f => {
      contagemPorDepto[f.departamento] = (contagemPorDepto[f.departamento] || 0) + 1;
    });

    const departamentos = Object.keys(contagemPorDepto);
    deptMenu.innerHTML = departamentos.map(dep => `
      <button class="dept-option" type="button" data-value="${dep}" data-count="${contagemPorDepto[dep]}">${dep}</button>
    `).join('');

    deptMenu.querySelectorAll('.dept-option').forEach(option => {
      option.addEventListener('click', () => {
        deptSelected.textContent = option.dataset.value;
        cardValue.textContent = option.dataset.count;
        deptDropdown.classList.remove('open');
      });
    });

    if (departamentos.length > 0) {
      deptSelected.textContent = departamentos[0];
      cardValue.textContent = contagemPorDepto[departamentos[0]];
    }

    // Últimos registros (5 mais recentes, pelo maior id)
    const ultimosCinco = [...funcionarios]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);

    tbody.innerHTML = ultimosCinco.map(f => {
      const statusUi = statusApiParaUi[f.status] || 'pending';
      return `
        <tr>
          <td>${f.nome}</td>
          <td>${f.email}</td>
          <td>${f.telefone}</td>
          <td>${f.cargo}</td>
          <td>${f.departamento}</td>
          <td>${formatSalario(f.salario)}</td>
          <td>${f.cidade}</td>
          <td class="col-status"><span class="status-pill ${statusUi}">${statusLabels[statusUi]}</span></td>
        </tr>
      `;
    }).join('') || `<tr><td colspan="8" style="text-align:center; padding:40px;">Nenhum candidato cadastrado.</td></tr>`;

  } catch (erro) {
    console.error(erro);
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:40px;">Não foi possível carregar os dados. Verifique se o backend está rodando.</td></tr>`;
  }
}

carregarIndicadores();