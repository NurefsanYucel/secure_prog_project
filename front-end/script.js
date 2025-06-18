document.addEventListener('DOMContentLoaded', () => {
  // Search elements
  const searchButton = document.querySelector('.search-bar button');
  const searchInput = document.querySelector('.search-bar input');

  // Sign In / Sign Up buttons
  const signUpBtn = document.querySelector('a.button-link[href="signup.html"]');
  const signInBtn = document.querySelector('a.button-link[href="signin.html"]');

  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      alert(`Searching for "${query}"...`);
    } else {
      alert('Please enter a mythical creature to search.');
    }
  });

  signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'signup.html'; 
  });

  signInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'signin.html';
  });

  // signup button
  const ctaSignUp = document.querySelector('.button2');
  ctaSignUp.addEventListener('click', () => {
    alert('Call to action - Sign Up (feature coming soon)');
  });

  // Mythical creature section clicks
  const mythologyBlocks = document.querySelectorAll('.info');
  mythologyBlocks.forEach(block => {
    block.addEventListener('click', () => {
      const mythName = block.querySelector('p').textContent;
      alert(`You clicked on ${mythName}. Feature coming soon!`);
    });
  });
});

  