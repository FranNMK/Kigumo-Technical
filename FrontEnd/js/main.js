document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic HTML5 validation
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        statusEl.textContent = 'Please fix the errors above.';
        return;
      }

      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Simulate submission (no backend wired yet)
      statusEl.textContent = 'Sending...';
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        statusEl.textContent = 'Thanks, your message has been received.';
        form.reset();
        form.classList.remove('was-validated');
        if (submitBtn) submitBtn.disabled = false;
        // For debugging in dev tools
        console.log('Contact form submission', { name, email, message });
      }, 600);
    });
  }
});
