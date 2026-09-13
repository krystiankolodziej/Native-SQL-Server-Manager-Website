(function () {
  'use strict';

  // --- Paralaksa tekstury T-SQL w hero ---
  var texture = document.querySelector('.hero .texture');
  if (texture && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var shift = Math.min(scrollY * 0.18, 140);
        texture.style.transform = 'translateY(' + shift + 'px) rotate(-8deg)';
        ticking = false;
      });
    }, { passive: true });
  }

  // --- Powiększanie zrzutów ---
  // Bez skryptu odnośnik zwyczajnie otwiera pełny obraz; poniżej tylko nakładka.
  var links = document.querySelectorAll('a.zoom');
  if (!links.length) return;

  var overlay = null;
  var lastFocused = null;

  function close() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.body.style.overflow = '';
    removeEventListener('keydown', onKeyDown);
    if (lastFocused) lastFocused.focus();
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      close();
    } else if (event.key === 'Tab' && overlay) {
      // Nakładka ma jeden element interaktywny — trzymamy w nim fokus.
      event.preventDefault();
      overlay.querySelector('.zoom-close').focus();
    }
  }

  function open(link) {
    // Drugie otwarcie osierociłoby pierwszą nakładkę — zostałaby na wierzchu, nie do zamknięcia.
    if (overlay) close();

    lastFocused = link;

    overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    var image = link.querySelector('img');
    var caption = image ? image.getAttribute('alt') : '';
    overlay.setAttribute('aria-label', caption || 'Screenshot');

    var full = document.createElement('img');
    full.className = 'zoom-image';
    full.src = link.getAttribute('href');
    full.alt = caption;

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'zoom-close';
    button.setAttribute('aria-label', 'Close');
    button.textContent = '×';

    overlay.appendChild(full);
    overlay.appendChild(button);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    button.focus();
    addEventListener('keydown', onKeyDown);

    overlay.addEventListener('click', function (event) {
      // Klik w sam obraz zostawiamy — zamyka wszystko poza nim.
      if (event.target !== full) close();
    });
  }

  Array.prototype.forEach.call(links, function (link) {
    link.addEventListener('click', function (event) {
      // Otwieranie w nowej karcie zostaje domyślne.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      open(link);
    });
  });
})();
