// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Save preference
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.removeItem('darkMode');
  }
});

// Load saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Navbar active link on scroll
const sections = document.querySelectorAll('section, main');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; // navbar height offset
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Fade in sections on scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    const name = contactForm.elements['name'];
    const email = contactForm.elements['email'];
    const message = contactForm.elements['message'];

    // Simple validation
    if (name.value.trim() === '') {
      alert('Please enter your name.');
      valid = false;
      name.focus();
      return;
    }
    if (!validateEmail(email.value.trim())) {
      alert('Please enter a valid email.');
      valid = false;
      email.focus();
      return;
    }
    if (message.value.trim() === '') {
      alert('Please enter a message.');
      valid = false;
      message.focus();
      return;
    }

    if (valid) {
      alert('Thank you for contacting VRATUS™ Watches. We will get back to you shortly.');
      contactForm.reset();
    }
  });
}

// Newsletter validation
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = newsletterForm.elements['email'];
    if (!validateEmail(email.value.trim())) {
      alert('Please enter a valid email for newsletter subscription.');
      email.focus();
      return;
    }
    alert('Thank you for subscribing to the VRATUS™ newsletter!');
    newsletterForm.reset();
  });
}

// Email validation helper
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}
