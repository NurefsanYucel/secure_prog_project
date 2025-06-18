document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signin-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const showPasswordCheckbox = document.getElementById('show-password');
  const formMessage = document.getElementById('form-message');

  // Toggle show/hide password
  showPasswordCheckbox.addEventListener('change', () => {
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
  });

  // Handle sign-in form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMessage.textContent = '';
    formMessage.className = 'form-message';

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      formMessage.textContent = 'Please fill out all fields.';
      formMessage.classList.add('error');
      return;
    }

    try {
      const response = await fetch('http://localhost:5050/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        formMessage.textContent = data.message || 'Sign in failed.';
        formMessage.classList.add('error');
      } else {
        // Save token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // e.g. { id, username, role }

        formMessage.textContent = 'Sign in successful! Redirecting...';
        formMessage.classList.add('success');

        setTimeout(() => {
          if (data.user.role === 'admin') {
            window.location.href = 'admin.html';
          } else {
            window.location.href = 'dashboard.html';
          }
        }, 1500);
      }
    } catch (err) {
      formMessage.textContent = 'Network error. Please try again.';
      formMessage.classList.add('error');
    }
  });
});


