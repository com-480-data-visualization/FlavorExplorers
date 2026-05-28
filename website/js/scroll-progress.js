(function () {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();
