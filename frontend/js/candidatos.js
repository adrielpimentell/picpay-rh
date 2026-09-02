  // Tradução entre os valores da API (backend) e os valores usados na interface
  const statusApiParaUi = {
    EM_ANALISE: 'pending',
    APROVADO: 'approved',
    REPROVADO: 'rejected',
    CONTRATADO: 'hired'
  };

  const statusUiParaApi = {
    pending: 'EM_ANALISE',
    approved: 'APROVADO',
    rejected: 'REPROVADO',
    hired: 'CONTRATADO'
  };
 
    // ---------- Navegação entre telas ----------
  document.getElementById('tab-visao-geral').addEventListener('click', () => {
    window.location.href = 'home.html';
  });
  document.getElementById('tab-candidatos').addEventListener('click', () => {
    window.location.href = 'candidatos.html';
  });

  document.querySelector('.logout-btn').addEventListener('click', () => {
    window.location.href = '../index.html';
  });

 // ---------- Dropdown: Candidatos por departamento (card) ----------
  const deptDropdown = document.getElementById('dept-dropdown');
  const deptBtn = document.getElementById('dept-dropdown-btn');
  const deptMenu = document.getElementById('dept-menu');
  const deptSelected = document.getElementById('dept-selected');
  const deptCardValue = document.getElementById('dept-card-value');

  function positionFixedMenu(triggerEl, menuEl){
    const rect = triggerEl.getBoundingClientRect();
    menuEl.style.top = (rect.bottom + 8) + 'px';
    menuEl.style.left = rect.left + 'px';
    menuEl.style.minWidth = rect.width + 'px';
  }

  function closeAllDropdowns(except){
    document.querySelectorAll('.dept-dropdown.open, .filter-dropdown.open').forEach(el => {
      if (el !== except) el.classList.remove('open');
    });
  }

  deptBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !deptDropdown.classList.contains('open');
    closeAllDropdowns(deptDropdown);
    if (willOpen) positionFixedMenu(deptBtn, deptMenu);
    deptDropdown.classList.toggle('open', willOpen);
  });

  deptMenu.querySelectorAll('.dept-option').forEach(option => {
    option.addEventListener('click', () => {
      deptSelected.textContent = option.dataset.value;
      deptCardValue.textContent = option.dataset.count;
      deptDropdown.classList.remove('open');
    });
  });

  // ---------- Dropdowns de filtro (Departamento, Status, Salario) ----------
  function setupFilterDropdown(dropdownId, btnId, menuId, selectedId, onSelect){
    const dropdown = document.getElementById(dropdownId);
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    const selectedLabel = document.getElementById(selectedId);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !dropdown.classList.contains('open');
      closeAllDropdowns(dropdown);
      if (willOpen) positionFixedMenu(btn, menu);
      dropdown.classList.toggle('open', willOpen);
    });

    menu.querySelectorAll('.filter-option').forEach(option => {
      option.addEventListener('click', () => {
        menu.querySelectorAll('.filter-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        selectedLabel.textContent = option.textContent;
        dropdown.classList.remove('open');
        if (onSelect) onSelect(option.dataset.value);
      });
    });

    return { dropdown, btn, menu };
  }

  let activeFilters = { departamento: null, status: 'Todos', salario: 'Todos' };

  setupFilterDropdown('filter-dept-dropdown', 'filter-dept-btn', 'filter-dept-menu', 'filter-dept-selected', (val) => {
    activeFilters.departamento = val;
    currentPage = 1;
    renderTable();
  });

  setupFilterDropdown('filter-status-dropdown', 'filter-status-btn', 'filter-status-menu', 'filter-status-selected', (val) => {
    activeFilters.status = val;
    currentPage = 1;
    renderTable();
  });

  setupFilterDropdown('filter-salario-dropdown', 'filter-salario-btn', 'filter-salario-menu', 'filter-salario-selected', (val) => {
    activeFilters.salario = val;
    currentPage = 1;
    renderTable();
  });

  document.addEventListener('click', () => closeAllDropdowns());

  window.addEventListener('scroll', () => {
    document.querySelectorAll('.dept-dropdown.open, .filter-dropdown.open').forEach(el => {
      const btn = el.querySelector('.dept-dropdown-btn, .filter-select-btn');
      const menu = el.querySelector('.dept-menu, .filter-menu');
      if (btn && menu) positionFixedMenu(btn, menu);
    });
  }, true);

  // ---------- Dados dos candidatos ----------
    // ---------- Dados dos candidatos (via API) ----------
  const API_URL = 'http://localhost:8080/funcionarios';
  let candidates = [];

  function converterDaApi(funcionario) {
    return {
      id: funcionario.id,
      nome: funcionario.nome,
      email: funcionario.email,
      telefone: funcionario.telefone,
      cargo: funcionario.cargo,
      departamento: funcionario.departamento,
      salario: funcionario.salario,
      cidade: funcionario.cidade,
      status: statusApiParaUi[funcionario.status] || 'pending'
    };
  }

  const totalValueEl = document.getElementById('total-candidatos-value');
  const aprovadosValueEl = document.getElementById('aprovados-value');
  const pendentesValueEl = document.getElementById('pendentes-value');
  const reprovadosValueEl = document.getElementById('reprovados-value');
  const contratadosValueEl = document.getElementById('contratados-value');

  function atualizarIndicadores(lista) {
    totalValueEl.textContent = lista.length;
    aprovadosValueEl.textContent = lista.filter(c => c.status === 'approved').length;
    pendentesValueEl.textContent = lista.filter(c => c.status === 'pending').length;
    reprovadosValueEl.textContent = lista.filter(c => c.status === 'rejected').length;
    contratadosValueEl.textContent = lista.filter(c => c.status === 'hired').length;

    const contagemPorDepto = {};
    lista.forEach(c => {
      contagemPorDepto[c.departamento] = (contagemPorDepto[c.departamento] || 0) + 1;
    });

    const departamentos = Object.keys(contagemPorDepto);
    deptMenu.innerHTML = departamentos.map(dep => `
      <button class="dept-option" type="button" data-value="${dep}" data-count="${contagemPorDepto[dep]}">${dep}</button>
    `).join('');

    deptMenu.querySelectorAll('.dept-option').forEach(option => {
      option.addEventListener('click', () => {
        deptSelected.textContent = option.dataset.value;
        deptCardValue.textContent = option.dataset.count;
        deptDropdown.classList.remove('open');
      });
    });

    if (departamentos.length > 0) {
      deptSelected.textContent = departamentos[0];
      deptCardValue.textContent = contagemPorDepto[departamentos[0]];
    }
  }

  async function carregarCandidatos() {
    try {
      const resposta = await fetch(API_URL);
      if (!resposta.ok) throw new Error('Erro ao buscar funcionários');
      const dados = await resposta.json();
      candidates = dados.map(converterDaApi);
      atualizarIndicadores(candidates);
      renderTable();
    } catch (erro) {
      console.error(erro);
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:var(--subtitle); padding: 40px;">Não foi possível carregar os candidatos. Verifique se o backend está rodando.</td></tr>`;
    }
  }

  const statusLabels = { approved: 'Aprovado', pending: 'Em análise', rejected: 'Reprovado', hired: 'Contratado' };
  const statusToFilterLabel = { approved: 'Aprovado', pending: 'Em análise', rejected: 'Reprovado', hired: 'Contratado' };

  function formatSalario(valor){
    return 'R$' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  function matchesFilters(c){
    if (activeFilters.departamento && c.departamento !== activeFilters.departamento) return false;
    if (activeFilters.status !== 'Todos' && statusToFilterLabel[c.status] !== activeFilters.status) return false;
    if (activeFilters.salario !== 'Todos') {
      const [min, max] = activeFilters.salario.split('-').map(Number);
      if (c.salario < min || c.salario > max) return false;
    }
    const term = searchInput.value.trim().toLowerCase();
    if (term && !c.nome.toLowerCase().includes(term) && !c.email.toLowerCase().includes(term)) return false;
    return true;
  }

  const tbody = document.getElementById('candidates-table-body');
  const paginationInfo = document.getElementById('pagination-info');
  const paginationControls = document.getElementById('pagination-controls');
  const pageSizeSelect = document.getElementById('page-size-select');

  // ---------- Paginacao ----------
  let currentPage = 1;
  let pageSize = 20;

  function renderPagination(totalItems){
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    paginationInfo.textContent = `Mostrando ${start}-${end} de ${totalItems} candidatos`;

    let buttonsHtml = '';

    buttonsHtml += `<button class="page-btn" type="button" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>
      <iconify-icon icon="solar:alt-arrow-left-bold"></iconify-icon>
    </button>`;

    const pagesToShow = new Set();
    pagesToShow.add(1);
    pagesToShow.add(totalPages);
    for (let p = currentPage - 1; p <= currentPage + 1; p++){
      if (p >= 1 && p <= totalPages) pagesToShow.add(p);
    }

    const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b);
    let lastPage = 0;
    sortedPages.forEach(p => {
      if (lastPage && p - lastPage > 1) {
        buttonsHtml += `<span class="page-ellipsis">…</span>`;
      }
      buttonsHtml += `<button class="page-btn ${p === currentPage ? 'active' : ''}" type="button" data-page="${p}">${p}</button>`;
      lastPage = p;
    });

    buttonsHtml += `<button class="page-btn" type="button" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>
      <iconify-icon icon="solar:alt-arrow-right-bold"></iconify-icon>
    </button>`;

    paginationControls.innerHTML = buttonsHtml;

    paginationControls.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.page;
        if (target === 'prev') currentPage = Math.max(1, currentPage - 1);
        else if (target === 'next') currentPage = Math.min(totalPages, currentPage + 1);
        else currentPage = Number(target);
        renderTable();
      });
    });
  }

    async function alterarStatus(id, novoStatusUi) {
    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusUiParaApi[novoStatusUi] })
      });
      if (!resposta.ok) throw new Error('Erro ao atualizar status');

      const candidato = candidates.find(c => c.id === id);
      if (candidato) candidato.status = novoStatusUi;
      atualizarIndicadores(candidates);
      renderTable();
    } catch (erro) {
      console.error(erro);
      alert('Não foi possível atualizar o status.');
      renderTable();
    }
  }

  function renderTable(){
    const filtered = candidates.filter(matchesFilters);
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * pageSize;
    const pageItems = filtered.slice(startIndex, startIndex + pageSize);

    tbody.innerHTML = pageItems.map(c => `
      <tr>
        <td>${c.nome}</td>
        <td>${c.email}</td>
        <td>${c.telefone}</td>
        <td>${c.cargo}</td>
        <td>${c.departamento}</td>
        <td>${formatSalario(c.salario)}</td>
        <td>${c.cidade}</td>
        <td class="col-status">
          <select class="status-pill status-select ${c.status}" data-id="${c.id}">
            <option value="pending" ${c.status === 'pending' ? 'selected' : ''}>Em análise</option>
            <option value="approved" ${c.status === 'approved' ? 'selected' : ''}>Aprovado</option>
            <option value="rejected" ${c.status === 'rejected' ? 'selected' : ''}>Reprovado</option>
            <option value="hired" ${c.status === 'hired' ? 'selected' : ''}>Contratado</option>
          </select>
        </td>
        <td class="col-actions">
          <div class="action-buttons">
            <button class="action-btn edit" type="button" data-id="${c.id}" title="Editar">
              <iconify-icon icon="solar:pen-2-bold"></iconify-icon>
            </button>
            <button class="action-btn delete" type="button" data-id="${c.id}" title="Excluir">
              <iconify-icon icon="solar:trash-bin-trash-bold"></iconify-icon>
            </button>
          </div>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="9" style="text-align:center; color:var(--subtitle); padding: 40px;">Nenhum candidato encontrado.</td></tr>`;

    tbody.querySelectorAll('.action-btn.delete').forEach(btn => {
      btn.addEventListener('click', () => openDeleteModal(Number(btn.dataset.id)));
    });

    tbody.querySelectorAll('.action-btn.edit').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(Number(btn.dataset.id)));
    });

    tbody.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', () => alterarStatus(Number(select.dataset.id), select.value));
    });

    renderPagination(filtered.length);
  }

  pageSizeSelect.addEventListener('change', () => {
    pageSize = Number(pageSizeSelect.value);
    currentPage = 1;
    renderTable();
  });

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    currentPage = 1;
    renderTable();
  });

  // ---------- Modal: Excluir candidato ----------
  const deleteModalOverlay = document.getElementById('delete-modal-overlay');
  const deleteCandidateName = document.getElementById('delete-candidate-name');
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  let candidateIdToDelete = null;

  function openDeleteModal(id){
    const candidate = candidates.find(c => c.id === id);
    if (!candidate) return;
    candidateIdToDelete = id;
    deleteCandidateName.textContent = candidate.nome;
    deleteModalOverlay.classList.add('open');
  }

  function closeDeleteModal(){
    deleteModalOverlay.classList.remove('open');
    candidateIdToDelete = null;
  }

  cancelDeleteBtn.addEventListener('click', closeDeleteModal);
  deleteModalOverlay.addEventListener('click', (e) => {
    if (e.target === deleteModalOverlay) closeDeleteModal();
  });

  confirmDeleteBtn.addEventListener('click', async () => {
    if (candidateIdToDelete !== null) {
      try {
        const resposta = await fetch(`${API_URL}/${candidateIdToDelete}`, { method: 'DELETE' });
        if (!resposta.ok) throw new Error('Erro ao excluir');
        candidates = candidates.filter(c => c.id !== candidateIdToDelete);
        atualizarIndicadores(candidates);
        renderTable();
      } catch (erro) {
        console.error(erro);
        alert('Não foi possível excluir o candidato.');
      }
    }
    closeDeleteModal();
  });

  // ---------- Modal: Cadastrar / Editar candidato ----------
  const addModalOverlay = document.getElementById('add-modal-overlay');
  const openAddModalBtn = document.getElementById('open-add-modal-btn');
  const closeAddModalBtn = document.getElementById('close-add-modal-btn');
  const cancelAddBtn = document.getElementById('cancel-add-btn');
  const addForm = document.getElementById('add-candidate-form');
  const formTitle = addModalOverlay.querySelector('.form-modal-header h3');
  const formSubtitle = addModalOverlay.querySelector('.form-modal-box > p');
  const submitBtn = addForm.querySelector('.confirm-save');
  let editingId = null;

  function openAddModal(){
    editingId = null;
    addForm.reset();
    formTitle.textContent = 'Cadastrar candidato';
    formSubtitle.textContent = 'Preencha os dados abaixo para adicionar um novo candidato';
    submitBtn.textContent = 'Cadastrar';
    addModalOverlay.classList.add('open');
  }

  function openEditModal(id){
    const c = candidates.find(cand => cand.id === id);
    if (!c) return;
    editingId = id;
    document.getElementById('add-nome').value = c.nome;
    document.getElementById('add-email').value = c.email;
    document.getElementById('add-telefone').value = c.telefone;
    document.getElementById('add-cargo').value = c.cargo;
    document.getElementById('add-departamento').value = c.departamento;
    document.getElementById('add-salario').value = formatSalario(c.salario);
    document.getElementById('add-cidade').value = c.cidade;
    document.getElementById('add-status').value = c.status;
    formTitle.textContent = 'Editar candidato';
    formSubtitle.textContent = 'Atualize os dados do candidato abaixo';
    submitBtn.textContent = 'Salvar alterações';
    addModalOverlay.classList.add('open');
  }

  function closeAddModal(){
    addModalOverlay.classList.remove('open');
    editingId = null;
  }

  openAddModalBtn.addEventListener('click', openAddModal);
  closeAddModalBtn.addEventListener('click', closeAddModal);
  cancelAddBtn.addEventListener('click', closeAddModal);
  addModalOverlay.addEventListener('click', (e) => {
    if (e.target === addModalOverlay) closeAddModal();
  });

    addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const salarioRaw = document.getElementById('add-salario').value
      .replace(/[^\d,]/g, '')
      .replace(',', '.');

    const statusUi = document.getElementById('add-status').value;
    const payload = {
      nome: document.getElementById('add-nome').value.trim(),
      email: document.getElementById('add-email').value.trim(),
      telefone: document.getElementById('add-telefone').value.trim(),
      cargo: document.getElementById('add-cargo').value.trim(),
      departamento: document.getElementById('add-departamento').value,
      salario: parseFloat(salarioRaw) || 0,
      cidade: document.getElementById('add-cidade').value.trim(),
      status: statusUiParaApi[statusUi] || 'EM_ANALISE'
    };

    try {
      let resposta;
      if (editingId !== null) {
        resposta = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        resposta = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (!resposta.ok) throw new Error('Erro ao salvar candidato');

      await carregarCandidatos();
      closeAddModal();
    } catch (erro) {
      console.error(erro);
      alert('Não foi possível salvar o candidato.');
    }
  });

  // ---------- Init ----------
  carregarCandidatos();