// Login

 const toggleBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');
  const emailInput = document.getElementById('email');
  const submitBtn = document.getElementById('submit-btn');
  const emailField = document.getElementById('email-field');
  const passwordField = document.getElementById('password-field');
  let emailTimer = null;
  let passwordTimer = null;

  // e-mail: precisa de algo antes do @, um @, domínio e extensão
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // senha: 1 minúscula, 1 maiúscula, 1 número, 1 caractere especial, mínimo 8 caracteres
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  function isEmailValid(){
    return emailRegex.test(emailInput.value.trim());
  }

  function isPasswordValid(){
    return passwordRegex.test(passwordInput.value);
  }

  function validateEmail(){
    const value = emailInput.value.trim();
    if(value === ''){
      emailField.classList.remove('has-error');
      return;
    }
    emailField.classList.toggle('has-error', !isEmailValid());
  }

  function validatePassword(){
    const value = passwordInput.value;
    if(value === ''){
      passwordField.classList.remove('has-error');
      return;
    }
    passwordField.classList.toggle('has-error', !isPasswordValid());
  }

  function updateSubmitState(){
    const filled = emailInput.value.trim() !== '' && passwordInput.value.trim() !== '';
    const valid = isEmailValid() && isPasswordValid();
    submitBtn.disabled = !(filled && valid);
  }

  emailInput.addEventListener('input', () => {
    emailField.classList.remove('has-error');
    updateSubmitState();
    clearTimeout(emailTimer);
    emailTimer = setTimeout(validateEmail, 600);
  });

  passwordInput.addEventListener('input', () => {
    passwordField.classList.remove('has-error');
    updateSubmitState();
    clearTimeout(passwordTimer);
    passwordTimer = setTimeout(validatePassword, 600);
  });

  emailInput.addEventListener('blur', () => {
    clearTimeout(emailTimer);
    validateEmail();
  });
  passwordInput.addEventListener('blur', () => {
    clearTimeout(passwordTimer);
    validatePassword();
  });

  toggleBtn.addEventListener('click', () => {
    const isVisible = passwordInput.type === 'text';
    passwordInput.type = isVisible ? 'password' : 'text';
    toggleBtn.classList.toggle('is-visible', !isVisible);
    toggleBtn.setAttribute('aria-pressed', String(!isVisible));
    toggleBtn.setAttribute('aria-label', isVisible ? 'Mostrar senha' : 'Ocultar senha');
  });

  const CONTAS_VALIDAS = [
  { email: 'lirio.perfeito@picpay.com', senha: 'LirioPerfeito24+', nome: 'LP' },
  { email: 'enzo.herrera@picpay.com', senha: 'TrS2026@', nome: 'TCP' },
];

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    clearTimeout(emailTimer);
    clearTimeout(passwordTimer);
    validateEmail();
    validatePassword();
    updateSubmitState();
    if (submitBtn.disabled) return;

    const loginError = document.getElementById('login-error');
    const emailDigitado = emailInput.value.trim();
    const senhaDigitada = passwordInput.value;

    const contaEncontrada = CONTAS_VALIDAS.find(
      conta => conta.email === emailDigitado && conta.senha === senhaDigitada
    );

    if (contaEncontrada) {
      loginError.style.display = 'none';
      sessionStorage.setItem('nomeUsuario', contaEncontrada.nome);
      window.location.href = 'static/home.html';
    } else {
      loginError.style.display = 'block';
    }
  });