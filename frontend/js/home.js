const API_URL = 'http://localhost:8080/funcionarios';

// ---------- Proteção de rota: só entra se estiver logado ----------
function verificarLogin(){
  if (!sessionStorage.getItem('nomeUsuario')) {
    window.location.replace('../index.html');
  }
}
verificarLogin();

// Reforça a checagem quando a página volta pelo cache do navegador (botão "voltar")
window.addEventListener('pageshow', (event) => {
  if (event.persisted) verificarLogin();
});

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

function formatTelefone(valor){
  const digitos = String(valor || '').replace(/\D/g, '').slice(0, 11);
  if (digitos.length <= 10) {
    return digitos.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (m, ddd, p1, p2) => {
      let out = '';
      if (ddd) out += `(${ddd}` + (ddd.length === 2 ? ') ' : '');
      out += p1;
      if (p2) out += `-${p2}`;
      return out;
    });
  }
  return digitos.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, (m, ddd, p1, p2) => {
    let out = '';
    if (ddd) out += `(${ddd}` + (ddd.length === 2 ? ') ' : '');
    out += p1;
    if (p2) out += `-${p2}`;
    return out;
  });
}

function formatCidade(valor){
  const match = String(valor || '').trim().match(/^(.+?)\s*[-/ ,]\s*([A-Za-zÀ-ÖØ-öø-ÿ]{2})$/);
  if (!match) return String(valor || '').trim();
  const cidade = match[1].trim();
  const uf = match[2].toUpperCase();
  return `${cidade}, ${uf}`;
}

document.querySelector('.logout-btn').addEventListener('click', () => {
  sessionStorage.removeItem('nomeUsuario');
  window.location.replace('../index.html');
});

// Nome de quem logou (vindo do login) -> exibe no "Bem vindo de volta"
const welcomeNameEl = document.getElementById('welcome-name');
const nomeUsuario = sessionStorage.getItem('nomeUsuario');
if (nomeUsuario) {
  welcomeNameEl.textContent = nomeUsuario;
}

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

function setDeptOptionActive(selectedOption){
  deptMenu.querySelectorAll('.dept-option').forEach(o => o.classList.remove('active'));
  if (selectedOption) selectedOption.classList.add('active');
}

function bindDeptOptions(){
  deptMenu.querySelectorAll('.dept-option').forEach(option => {
    option.addEventListener('click', () => {
      deptSelected.textContent = option.dataset.value;
      cardValue.textContent = option.dataset.count;
      setDeptOptionActive(option);
      deptDropdown.classList.remove('open');
    });
  });
}

// Liga os botões que já vêm prontos no HTML (funciona mesmo sem a API)
bindDeptOptions();

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

    bindDeptOptions();

    if (departamentos.length > 0) {
      deptSelected.textContent = departamentos[0];
      cardValue.textContent = contagemPorDepto[departamentos[0]];
      setDeptOptionActive(deptMenu.querySelector('.dept-option'));
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
          <td>${formatTelefone(f.telefone)}</td>
          <td>${f.cargo}</td>
          <td>${f.departamento}</td>
          <td>${formatSalario(f.salario)}</td>
          <td>${formatCidade(f.cidade)}</td>
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