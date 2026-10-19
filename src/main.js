// Появление при скролле, плавные переходы между страницами и мелкие интерактивные детали.
(() => {
  window.NN = true;
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LEAVE_MS = 450;

  /* Вход на страницу: body проявляется из темноты */
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-ready')));
  addEventListener('pageshow', (e) => {
    if (e.persisted) {
      root.classList.remove('is-leaving');
      root.classList.add('is-ready');
    }
  });

  /* Уход со страницы: сначала затухание, потом переход */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.protocol !== location.protocol || url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
    e.preventDefault();
    if (reduce) {
      location.href = url.href;
      return;
    }
    root.classList.remove('is-ready');
    root.classList.add('is-leaving');
    setTimeout(() => {
      location.href = url.href;
    }, LEAVE_MS);
  });

  /* Fade при скролле */
  const items = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    items.forEach((el) => io.observe(el));
  }

  /* Шапка прячется при скролле вниз и возвращается при скролле вверх */
  const header = document.querySelector('[data-header]');
  let lastY = scrollY;
  let ticking = false;
  addEventListener(
    'scroll',
    () => {
      if (ticking || !header) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = scrollY;
        header.classList.toggle('is-hidden', y > lastY && y > 160 && !header.contains(document.activeElement));
        lastY = y;
        ticking = false;
      });
    },
    { passive: true },
  );

  /* Наверх */
  document.querySelectorAll('[data-to-top]').forEach((btn) =>
    btn.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })),
  );

  if (reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  /* Свет под курсором на плитках */
  document.querySelectorAll('.tile').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* «Цветок» чуть тянется за курсором */
  document.querySelectorAll('.bloom').forEach((bloom) => {
    const host = bloom.parentElement;
    host.addEventListener('pointermove', (e) => {
      const r = host.getBoundingClientRect();
      bloom.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * 60}px`);
      bloom.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * 30}px`);
    });
    host.addEventListener('pointerleave', () => {
      bloom.style.setProperty('--px', '0px');
      bloom.style.setProperty('--py', '0px');
    });
  });
})();
