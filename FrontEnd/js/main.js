document.addEventListener('DOMContentLoaded', function () {
  // Toggler sync with collapse state (so hamburger -> X works reliably)
  var collapseEl = document.getElementById('mainNavCollapse');
  var toggler = document.querySelector('.navbar-toggler');

  if (collapseEl && toggler) {
    // Listen for bootstrap collapse events if available
    collapseEl.addEventListener('show.bs.collapse', function () {
      toggler.classList.remove('collapsed');
      toggler.setAttribute('aria-expanded', 'true');
    });
    collapseEl.addEventListener('hide.bs.collapse', function () {
      toggler.classList.add('collapsed');
      toggler.setAttribute('aria-expanded', 'false');
    });
    // Fallback: ensure initial state is correct
    setTimeout(function () {
      var isShown = collapseEl.classList.contains('show');
      if (isShown) {
        toggler.classList.remove('collapsed');
        toggler.setAttribute('aria-expanded', 'true');
      } else {
        toggler.classList.add('collapsed');
        toggler.setAttribute('aria-expanded', 'false');
      }
    }, 10);
  }

  // Handle nested submenu toggles for mobile
  document.querySelectorAll('.dropdown-submenu > .dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      // Only handle on small screens where submenu is in-flow
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

  // Hide open nested menus when top-level dropdown closes
  document.querySelectorAll('.dropdown').forEach(function (dd) {
    dd.addEventListener('hide.bs.dropdown', function () {
      this.querySelectorAll('.dropdown-menu.show').forEach(function (m) { m.classList.remove('show'); });
      this.querySelectorAll('.dropdown-toggle[aria-expanded]').forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
    });
  });

  // Preserve desktop hover behaviour (optional)
  if (window.matchMedia('(min-width: 992px)').matches && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.navbar .dropdown').forEach(function (dd) {
      var toggle = dd.querySelector('[data-bs-toggle="dropdown"]');
      if (!toggle) return;
      var instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
      dd.addEventListener('mouseenter', function () { instance.show(); });
      dd.addEventListener('mouseleave', function () { instance.hide(); });
    });
    document.querySelectorAll('.navbar .dropdown-submenu').forEach(function (sm) {
      sm.addEventListener('mouseenter', function () {
        var menu = sm.querySelector(':scope > .dropdown-menu');
        if (menu) menu.classList.add('show');
      });
      sm.addEventListener('mouseleave', function () {
        var menu = sm.querySelector(':scope > .dropdown-menu');
        if (menu) menu.classList.remove('show');
      });
    });
  }
});