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

    // Nested submenu toggles: works on mobile (collapsed) and preserves desktop hover.
    document.addEventListener('DOMContentLoaded', function () {
      // Open/close nested submenus when their toggle is clicked (mobile-friendly)
      document.querySelectorAll('.dropdown-submenu > .dropdown-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
          // Only intervene for touch/small screens where dropdown-menu is in the flow
          if (window.matchMedia('(max-width: 991.98px)').matches) {
            e.preventDefault();
            e.stopPropagation();
            var submenu = toggle.nextElementSibling;
            if (!submenu) return;
            var isOpen = submenu.classList.contains('show');
            // close siblings
            var parentMenu = toggle.closest('.dropdown-menu');
            if (parentMenu) {
              parentMenu.querySelectorAll(':scope > .dropdown-submenu > .dropdown-menu.show').forEach(function (open) {
                if (open !== submenu) open.classList.remove('show');
              });
            }
            if (isOpen) {
              submenu.classList.remove('show');
              toggle.setAttribute('aria-expanded', 'false');
            } else {
              submenu.classList.add('show');
              toggle.setAttribute('aria-expanded', 'true');
            }
          }
        });
      });

      // When any top-level dropdown (Bootstrap) is hidden, remove .show from nested menus
      document.querySelectorAll('.dropdown').forEach(function (dd) {
        dd.addEventListener('hide.bs.dropdown', function () {
          this.querySelectorAll('.dropdown-menu.show').forEach(function (m) { m.classList.remove('show'); });
          this.querySelectorAll('.dropdown-toggle[aria-expanded]').forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
        });
      });

      // Preserve desktop hover behaviour for dropdowns
      if (window.matchMedia('(min-width: 992px)').matches && window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.navbar .dropdown').forEach(function (dd) {
          const toggle = dd.querySelector('[data-bs-toggle="dropdown"]');
          if (!toggle) return;
          const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
          dd.addEventListener('mouseenter', function () { instance.show(); });
          dd.addEventListener('mouseleave', function () { instance.hide(); });
        });
        document.querySelectorAll('.navbar .dropdown-submenu').forEach(function (sm) {
          sm.addEventListener('mouseenter', function () {
            const menu = sm.querySelector(':scope > .dropdown-menu');
            if (menu) menu.classList.add('show');
          });
          sm.addEventListener('mouseleave', function () {
            const menu = sm.querySelector(':scope > .dropdown-menu');
            if (menu) menu.classList.remove('show');
          });
        });
      }
    });
  
