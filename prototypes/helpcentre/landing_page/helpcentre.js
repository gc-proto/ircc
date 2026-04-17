/* Help Centre prototype — category tabs/accordion behaviour
   -----------------------------------------------------------------
   - Single-open behaviour on both desktop and mobile
     (desktop: tab-style, mobile: accordion-style — same logic, CSS differs)
   - Clicking an open category's own header on MOBILE closes it
     (so a user can collapse everything if they want).
     On DESKTOP the active tab stays latched open (standard tab pattern).
*/
(function () {
  var container = document.querySelector('[data-hc-categories]');
  if (!container) return;

  var categories = Array.prototype.slice.call(
    container.querySelectorAll('.hc-category')
  );

  function isDesktop() {
    return window.matchMedia('(min-width: 768px)').matches;
  }

  function setOpen(target, open) {
    var header = target.querySelector('.hc-category-header');
    var body = target.querySelector('.hc-category-body');
    target.setAttribute('data-open', open ? 'true' : 'false');
    header.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      body.removeAttribute('hidden');
    } else {
      body.setAttribute('hidden', '');
    }
  }

  function openOnly(target) {
    categories.forEach(function (cat) {
      setOpen(cat, cat === target);
    });
  }

  // Initialize state from markup (data-open="true" or aria-expanded="true")
  categories.forEach(function (cat) {
    var header = cat.querySelector('.hc-category-header');
    var open = header.getAttribute('aria-expanded') === 'true';
    setOpen(cat, open);
  });

  // Click handlers
  categories.forEach(function (cat) {
    var header = cat.querySelector('.hc-category-header');
    header.addEventListener('click', function () {
      var isOpen = cat.getAttribute('data-open') === 'true';

      if (isDesktop()) {
        // Desktop tabs: clicking active tab does nothing; clicking another
        // tab swaps the active one.
        if (!isOpen) openOnly(cat);
      } else {
        // Mobile accordion: clicking active one closes it;
        // clicking a different one opens it and closes the others.
        if (isOpen) {
          setOpen(cat, false);
        } else {
          openOnly(cat);
        }
      }
    });

    // Keyboard: Enter / Space toggle is handled natively on <button>.
    // Left/Right arrow keys navigate tabs on desktop.
    header.addEventListener('keydown', function (e) {
      if (!isDesktop()) return;
      var idx = categories.indexOf(cat);
      var nextIdx = null;
      if (e.key === 'ArrowRight') nextIdx = (idx + 1) % categories.length;
      if (e.key === 'ArrowLeft')  nextIdx = (idx - 1 + categories.length) % categories.length;
      if (nextIdx === null) return;
      e.preventDefault();
      var nextHeader = categories[nextIdx].querySelector('.hc-category-header');
      nextHeader.focus();
      openOnly(categories[nextIdx]);
    });
  });

  // When viewport crosses the breakpoint, ensure at least one category is open
  // on desktop (tabs must always have an active panel).
  var mql = window.matchMedia('(min-width: 768px)');
  function handleBreakpoint() {
    if (mql.matches) {
      var anyOpen = categories.some(function (c) {
        return c.getAttribute('data-open') === 'true';
      });
      if (!anyOpen) openOnly(categories[0]);
    }
  }
  if (mql.addEventListener) mql.addEventListener('change', handleBreakpoint);
  else if (mql.addListener) mql.addListener(handleBreakpoint);
})();
