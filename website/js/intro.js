(function () {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  document.body.style.overflow = 'hidden';

  function dismiss() {
    overlay.classList.add('intro-out');
    document.body.style.overflow = '';
    setTimeout(() => overlay.remove(), 750);
  }

  setTimeout(dismiss, 2800);
  overlay.addEventListener('click', dismiss);
})();
