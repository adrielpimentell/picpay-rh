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
  let candidates = [
    { id: 1, nome: 'Roberto Dantas', email: 'roberto.dantas@outlook.com', telefone: '(11) 95678-9877', cargo: 'Faxineiro', departamento: 'Limpeza e Zelo', salario: 2000, cidade: 'Limeira-SP', status: 'approved' },
    { id: 2, nome: 'Camila Ferreira', email: 'camila.ferreira@gmail.com', telefone: '(11) 98123-4567', cargo: 'Analista de RH', departamento: 'Recursos Humanos', salario: 4200, cidade: 'São Paulo-SP', status: 'pending' },
    { id: 3, nome: 'Lucas Almeida', email: 'lucas.almeida@hotmail.com', telefone: '(21) 99876-5432', cargo: 'Desenvolvedor Front-end', departamento: 'Transformação Digital', salario: 7500, cidade: 'Rio de Janeiro-RJ', status: 'rejected' },
    { id: 4, nome: 'Bianca Souza', email: 'bianca.souza@outlook.com', telefone: '(31) 97654-3210', cargo: 'Analista Financeiro', departamento: 'Financeiro', salario: 5100, cidade: 'Belo Horizonte-MG', status: 'approved' },
    { id: 5, nome: 'Thiago Martins', email: 'thiago.martins@gmail.com', telefone: '(41) 96543-2198', cargo: 'Consultor Comercial', departamento: 'Comercial', salario: 3800, cidade: 'Curitiba-PR', status: 'approved' }
  ];
  let nextId = 6;

  // Candidatos extras de exemplo, so pra demonstrar a paginacao funcionando com uma base maior
  (function gerarCandidatosDemo(){
    const nomes = ['Ana', 'Bruno', 'Carla', 'Diego', 'Elaine', 'Fabio', 'Gisele', 'Hugo', 'Isabela', 'Joao', 'Karina', 'Leonardo', 'Marina', 'Nicolas', 'Otavio', 'Patricia', 'Rafael', 'Sabrina', 'Tomas', 'Vanessa'];
    const sobrenomes = ['Silva', 'Souza', 'Oliveira', 'Costa', 'Pereira', 'Rodrigues', 'Almeida', 'Nascimento', 'Lima', 'Araujo'];
    const cargos = ['Analista de RH', 'Desenvolvedor Front-end', 'Consultor Comercial', 'Analista Financeiro', 'Faxineiro', 'Assistente Administrativo', 'Designer UX/UI'];
    const departamentos = ['Limpeza e Zelo', 'Recursos Humanos', 'Transformação Digital', 'Financeiro', 'Comercial'];
    const cidades = ['São Paulo-SP', 'Rio de Janeiro-RJ', 'Belo Horizonte-MG', 'Curitiba-PR', 'Limeira-SP', 'Campinas-SP', 'Porto Alegre-RS'];
    const statusList = ['approved', 'pending', 'rejected'];

    for (let i = 0; i < 65; i++){
      const nome = nomes[i % nomes.length] + ' ' + sobrenomes[(i * 3) % sobrenomes.length];
      candidates.push({
        id: nextId++,
        nome,
        email: nome.toLowerCase().replace(/\s+/g, '.') + '@email.com',
        telefone: '(11) 9' + (1000 + i) + '-' + (2000 + i),
        cargo: cargos[i % cargos.length],
        departamento: departamentos[i % departamentos.length],
        salario: 1500 + (i % 10) * 700,
        cidade: cidades[i % cidades.length],
        status: statusList[i % statusList.length]
      });
    }
  })();

  const statusLabels = { approved: 'Aprovado', pending: 'Em análise', rejected: 'Reprovado' };
  const statusToFilterLabel = { approved: 'Aprovado', pending: 'Em análise', rejected: 'Reprovado' };

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
        <td class="col-status"><span class="status-pill ${c.status}">${statusLabels[c.status]}</span></td>
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

  confirmDeleteBtn.addEventListener('click', () => {
    if (candidateIdToDelete !== null) {
      candidates = candidates.filter(c => c.id !== candidateIdToDelete);
      renderTable();
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

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const salarioRaw = document.getElementById('add-salario').value
      .replace(/[^\d,]/g, '')
      .replace(',', '.');
    const novoCandidato = {
      nome: document.getElementById('add-nome').value.trim(),
      email: document.getElementById('add-email').value.trim(),
      telefone: document.getElementById('add-telefone').value.trim(),
      cargo: document.getElementById('add-cargo').value.trim(),
      departamento: document.getElementById('add-departamento').value,
      salario: parseFloat(salarioRaw) || 0,
      cidade: document.getElementById('add-cidade').value.trim(),
      status: document.getElementById('add-status').value
    };

    if (editingId !== null) {
      const idx = candidates.findIndex(c => c.id === editingId);
      if (idx !== -1) candidates[idx] = { ...candidates[idx], ...novoCandidato };
    } else {
      candidates.push({ id: nextId++, ...novoCandidato });
      currentPage = Math.ceil(candidates.filter(matchesFilters).length / pageSize);
    }

    renderTable();
    closeAddModal();
  });

  // ---------- Init ----------
  renderTable();