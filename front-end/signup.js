document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const repeatPasswordInput = document.getElementById('repeat-password');
  const showPasswordCheckbox = document.getElementById('show-password');
  const formMessage = document.getElementById('form-message');

  // Password requirements elements
  const requirements = {
    length: document.getElementById('length'),
    lowercase: document.getElementById('lowercase'),
    uppercase: document.getElementById('uppercase'),
    number: document.getElementById('number'),
    special: document.getElementById('special'),
  };

  // Show/hide passwords toggle
  showPasswordCheckbox.addEventListener('change', () => {
    const type = showPasswordCheckbox.checked ? 'text' : 'password';
    passwordInput.type = type;
    repeatPasswordInput.type = type;
  });

  // Validate password live
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    updateRequirement('length', val.length >= 8);
    updateRequirement('lowercase', /[a-z]/.test(val));
    updateRequirement('uppercase', /[A-Z]/.test(val));
    updateRequirement('number', /\d/.test(val));
    updateRequirement('special', /[!@#$%^&*]/.test(val));
  });

  function updateRequirement(id, isValid) {
    if (isValid) {
      requirements[id].classList.remove('invalid');
      requirements[id].classList.add('valid');
    } else {
      requirements[id].classList.remove('valid');
      requirements[id].classList.add('invalid');
    }
  }

  // Validate email syntax
  function isValidEmail(email) {
    // Basic regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Check if all password requirements are met
  function isPasswordValid(pwd) {
    return (
      pwd.length >= 8 &&
      /[a-z]/.test(pwd) &&
      /[A-Z]/.test(pwd) &&
      /\d/.test(pwd) &&
      /[!@#$%^&*]/.test(pwd)
    );
  }

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMessage.textContent = '';
    formMessage.className = 'form-message';

    const username = document.getElementById('username').value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    if (!isValidEmail(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.classList.add('error');
      return;
    }

    if (!isPasswordValid(password)) {
      formMessage.textContent = 'Password does not meet the requirements.';
      formMessage.classList.add('error');
      return;
    }

    if (password !== repeatPassword) {
      formMessage.textContent = 'Passwords do not match.';
      formMessage.classList.add('error');
      return;
    }

    // Send signup request to backend
    try {
      const response = await fetch('http://localhost:5050/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        formMessage.textContent = data.message || 'Signup failed.';
        formMessage.classList.add('error');
      } else {
        formMessage.textContent = 'Signup successful! Redirecting to login...';
        formMessage.classList.add('success');
        setTimeout(() => {
          window.location.href = 'signin.html'; 
        }, 2000);
      }
    } catch (error) {
      formMessage.textContent = 'Network error. Please try again later.';
      formMessage.classList.add('error');
    }

  });
});
