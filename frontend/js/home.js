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

  deptMenu.querySelectorAll('.dept-option').forEach(option => {
    option.addEventListener('click', () => {
      deptSelected.textContent = option.dataset.value;
      cardValue.textContent = option.dataset.count;
      deptDropdown.classList.remove('open');
    });
  });

  document.addEventListener('click', () => {
    deptDropdown.classList.remove('open');
  });

  // Dados dos candidatos (exemplo)
  const candidates = [
    { nome: 'Roberto Dantas', email: 'roberto.dantas@outlook.com', telefone: '(11) 95678-9877', cargo: 'Faxineiro', departamento: 'Limpeza e Zelo', salario: 'R$2.000,00', cidade: 'Limeira-SP', status: 'approved' },
    { nome: 'Camila Ferreira', email: 'camila.ferreira@gmail.com', telefone: '(11) 98123-4567', cargo: 'Analista de RH', departamento: 'Recursos Humanos', salario: 'R$4.200,00', cidade: 'São Paulo-SP', status: 'pending' },
    { nome: 'Lucas Almeida', email: 'lucas.almeida@hotmail.com', telefone: '(21) 99876-5432', cargo: 'Desenvolvedor Front-end', departamento: 'Transformação Digital', salario: 'R$7.500,00', cidade: 'Rio de Janeiro-RJ', status: 'rejected' },
    { nome: 'Bianca Souza', email: 'bianca.souza@outlook.com', telefone: '(31) 97654-3210', cargo: 'Analista Financeiro', departamento: 'Financeiro', salario: 'R$5.100,00', cidade: 'Belo Horizonte-MG', status: 'approved' },
    { nome: 'Thiago Martins', email: 'thiago.martins@gmail.com', telefone: '(41) 96543-2198', cargo: 'Consultor Comercial', departamento: 'Comercial', salario: 'R$3.800,00', cidade: 'Curitiba-PR', status: 'approved' }
  ];

  const statusLabels = {
    approved: 'Aprovado',
    pending: 'Em análise',
    rejected: 'Reprovado'
  };

  const tbody = document.getElementById('candidates-table-body');
  tbody.innerHTML = candidates.map(c => `
    <tr>
      <td>${c.nome}</td>
      <td>${c.email}</td>
      <td>${c.telefone}</td>
      <td>${c.cargo}</td>
      <td>${c.departamento}</td>
      <td>${c.salario}</td>
      <td>${c.cidade}</td>
      <td class="col-status"><span class="status-pill ${c.status}">${statusLabels[c.status]}</span></td>
    </tr>
  `).join('');

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });