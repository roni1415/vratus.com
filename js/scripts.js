// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Change icon
  if (document.body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '☀️';
  } else {
    darkModeToggle.textContent = '🌙';
  }
});

// Highlight Active Nav Link
const navLinks = document.querySelectorAll('.nav-links a');
const currentPage = location.pathname.split('/').pop();
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// Newsletter Form Validation
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', e => {
  e.preventDefault();
  const emailInput = newsletterForm.querySelector('input[type="email"]');
  const email = emailInput.value.trim();
  if (validateEmail(email)) {
    alert('Thank you for subscribing!');
    newsletterForm.reset();
  } else {
    alert('Please enter a valid email address.');
    emailInput.focus();
  }
});

function validateEmail(email) {
  // Simple email regex
  return /\S+@\S+\.\S+/.test(email);
}
