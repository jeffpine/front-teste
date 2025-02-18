document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('login-section');
  const registerSection = document.getElementById('register-section');
  const showRegisterButton = document.getElementById('showRegister');
  const showLoginButton = document.getElementById('showLogin');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Alternar entre login e registro
  showRegisterButton.addEventListener('click', () => {
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
  });

  showLoginButton.addEventListener('click', () => {
    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
  });

  // Login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Redireciona para a página home após o login
        window.location.href = 'home.html';
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
    }
  });

  // Registro
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registro successful');
        // Voltar para a tela de login após o registro
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
      } else {
        alert('Registro failed');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar');
    }
  });
});