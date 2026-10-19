// Собирает статический сайт в dist/: главная и страницы кейсов на русском (/) и английском (/en/).
// Запуск: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL, ui, contacts, projects } from './content.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'dist');
const LANGS = ['ru', 'en'];
const YEAR = new Date().getFullYear();

/* ---------- helpers ---------- */

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const times = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join('');

const ICONS = {
  right: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  ne: '<path d="M7 17 17 7M8 7h9v9"/>',
};
const icon = (name) =>
  `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;

// Размер AVIF из бокса ispe (у плиточных AVIF их несколько — берём самый большой).
function avifSize(file) {
  const buf = readFileSync(file);
  let best = null;
  for (let i = buf.indexOf('ispe'); i !== -1; i = buf.indexOf('ispe', i + 4)) {
    const w = buf.readUInt32BE(i + 8);
    const h = buf.readUInt32BE(i + 12);
    if (!best || w * h > best.w * best.h) best = { w, h };
  }
  if (!best) throw new Error(`Не удалось прочитать размер ${file}`);
  return best;
}

const imageCache = new Map();
function image(project, name) {
  const key = `${project.slug}/${name}`;
  if (!imageCache.has(key)) {
    const size = avifSize(join(ROOT, 'cases', project.folder, `${name}.avif`));
    imageCache.set(key, { path: `img/${key}.avif`, ...size });
  }
  return imageCache.get(key);
}

// Центральный лепесток сверху, крайние — под ним.
const petals = (n = 7) => times(n, (i) => `<i style="--i:${i};z-index:${n - Math.abs(i - (n - 1) / 2)}"></i>`);

// Псевдослучайные высоты столбиков «голосового сообщения» — одинаковые при каждой сборке.
const WAVE = [0.35, 0.6, 0.9, 0.55, 0.75, 1, 0.65, 0.4, 0.8, 0.95, 0.5, 0.7, 0.45, 0.85, 0.6, 0.3, 0.55, 0.75, 0.4, 0.25];

/* ---------- layout ---------- */

function urls(lang, path) {
  const langRoot = lang === 'ru' ? '' : 'en/';
  const depth = (langRoot + path).split('/').filter(Boolean).length;
  const root = depth ? '../'.repeat(depth) : './';
  return {
    root,
    home: root + langRoot,
    hrefFor: (l) => root + (l === 'ru' ? '' : 'en/') + path,
    absFor: (l) => SITE_URL + (l === 'ru' ? '' : 'en/') + path,
  };
}

function header(lang, u, isHome) {
  const t = ui[lang];
  return `<header class="header" data-header>
  <div class="header__inner">
    <a class="logo" href="${u.home}"><span class="logo__mark" aria-hidden="true"></span><span>${t.name}</span></a>
    <nav class="nav">
      <a href="${isHome ? '' : u.home}#work">${t.navWork}</a>
      <a href="#contacts">${t.navContacts}</a>
    </nav>
    <div class="lang" role="group" aria-label="${t.langLabel}">
      ${LANGS.map((l) => `<a href="${u.hrefFor(l)}" hreflang="${l}" lang="${l}"${l === lang ? ' class="is-active" aria-current="page"' : ''}>${l.toUpperCase()}</a>`).join('')}
    </div>
  </div>
</header>`;
}

function footer(lang) {
  const t = ui[lang];
  return `<footer class="footer" id="contacts">
  <div class="wrap">
    <div class="tile grain footer__hero" data-reveal>
      <div class="bloom bloom--cool" aria-hidden="true">${petals()}</div>
      <span class="mono">(${t.navContacts})</span>
      <h2 class="footer__title">${t.footerTitle}</h2>
      <p class="footer__text">${t.footerText}</p>
    </div>
    <div class="contacts">
      ${contacts
        .map(
          (c, i) => `<a class="tile glow glow--${c.glow} contact" href="${c.href}"${c.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''} data-reveal style="--d:${i * 0.08}s">
        <span class="mono">${c.label[lang]}</span>
        <span class="contact__value">${esc(c.value)}</span>
        <span class="contact__arrow">${icon('ne')}</span>
      </a>`,
        )
        .join('\n      ')}
    </div>
    <div class="footer__bottom">
      <span>© ${YEAR} ${t.name}</span>
      <span class="footer__role">${t.footerRole}</span>
      <button class="to-top" type="button" data-to-top>${t.toTop}${icon('up')}</button>
    </div>
  </div>
</footer>`;
}

function shell({ lang, path, title, description, body, accent, isHome }) {
  const u = urls(lang, path);
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#07080c">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${u.absFor(lang)}">
${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${u.absFor(l)}">`).join('\n')}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${u.absFor(lang)}">
<meta property="og:image" content="${SITE_URL}assets/nikita.jpg">
<link rel="icon" href="${u.root}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100..800&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="${u.root}assets/styles.css">
<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.NN)document.documentElement.classList.add('no-motion')},3000)</script>
<script src="${u.root}assets/main.js" defer></script>
</head>
<body${accent ? ` style="--accent:${accent}"` : ''}>
${header(lang, u, isHome)}
<main>
${body(u)}
</main>
${footer(lang)}
</body>
</html>
`;
}

/* ---------- pages ---------- */

function homePage(lang) {
  const t = ui[lang];
  const clients = t.clients.map((c) => `<li>${esc(c)}</li>`).join('');
  const body = (u) => `<section class="hero">
  <div class="wrap hero__grid">
    <div class="tile grain t-main" data-reveal data-bloom-host>
      <div class="bloom" aria-hidden="true">${petals()}</div>
      <div class="t-main__top">
        <span class="mono">${t.heroLabel}</span>
        <span class="status"><i aria-hidden="true"></i>${t.available}</span>
      </div>
      <div class="t-main__bottom">
        <div class="t-main__row">
          <p class="t-main__role">${t.role}<br><span>${t.roleMore}</span></p>
          <a class="round-btn" href="#work" aria-label="${t.heroCta}">${icon('down')}</a>
        </div>
        <h1 class="t-main__name">${t.name}</h1>
      </div>
    </div>
    <figure class="tile t-photo" data-reveal style="--d:.08s">
      <img src="${u.root}assets/nikita.jpg" width="1200" height="1800" alt="${t.photoAlt}" fetchpriority="high">
      <figcaption class="voice">
        <span class="voice__orb" aria-hidden="true"></span>
        <span class="voice__wave" aria-hidden="true">${WAVE.map((h, i) => `<i style="--h:${h};--i:${i}"></i>`).join('')}</span>
        <span class="voice__text">${t.voice}</span>
      </figcaption>
    </figure>
    <div class="tile glow glow--pink t-count" data-reveal style="--d:.16s">
      <span class="mono">${t.countLabel}</span>
      <span class="num">${t.countNum}</span>
      <p>${t.countText}</p>
    </div>
    <div class="tile glow glow--blue t-since" data-reveal style="--d:.24s">
      <span class="mono">${t.sinceLabel}</span>
      <span class="num">${t.sinceNum}</span>
    </div>
    <div class="tile t-clients" data-reveal style="--d:.32s">
      <span class="t-clients__label mono">${t.clientsLabel}</span>
      <div class="marquee">
        <div class="marquee__track">
          <ul>${clients}</ul>
          <ul aria-hidden="true">${clients}</ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="work" id="work">
  <div class="wrap">
    <div class="section-head" data-reveal>
      <h2 class="section-head__title">${t.workTitle}<sup>(${pad(projects.length)})</sup></h2>
      <p class="section-head__note">${t.workNote}</p>
    </div>
    <div class="cards">
      ${projects
        .map((p, i) => {
          const cover = image(p, 'cover');
          return `<a class="card card--${p.layout}" href="${u.home}work/${p.slug}/" style="--accent:${p.accent};--d:${(i % 2) * 0.1}s" data-reveal>
        <div class="card__media"><img src="${u.root}${cover.path}" width="${cover.w}" height="${cover.h}" alt="${esc(p.title)}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async"></div>
        <div class="card__bar">
          <span class="card__num mono">${pad(i + 1)}</span>
          <span class="card__title">${esc(p.title)}</span>
          <span class="card__tags">${p.tags[lang].map(esc).join(' · ')}</span>
          <span class="card__arrow">${icon('ne')}</span>
        </div>
      </a>`;
        })
        .join('\n      ')}
    </div>
  </div>
</section>`;

  return shell({ lang, path: '', title: t.htmlTitle, description: t.description, body, isHome: true });
}

function casePage(lang, p, i) {
  const t = ui[lang];
  const nextIndex = (i + 1) % projects.length;
  const next = projects[nextIndex];
  const cover = image(p, 'cover');
  const nextCover = image(next, 'cover');

  let shot = 0;
  let note = 2; // (01) задача, (02) решение — подписи продолжают нумерацию
  const gallery = (u) =>
    p.rows
      .map((row) => {
        if (row.text) {
          note += 1;
          return `<div class="note" data-reveal><span class="mono">(${pad(note)})</span><p>${esc(row.text[lang])}</p></div>`;
        }
        const items = row.img.map((n) => image(p, p.prefix + n));
        return `<div class="row row--${items.length}">${items
          .map(
            (m, k) =>
              `<figure data-reveal style="--d:${k * 0.08}s;flex:${(m.w / m.h).toFixed(4)} 1 0%"><img src="${u.root}${m.path}" width="${m.w}" height="${m.h}" alt="${esc(p.title)} — ${t.imageAlt} ${++shot}" loading="lazy" decoding="async"></figure>`,
          )
          .join('')}</div>`;
      })
      .join('\n    ');

  const meta = [
    [t.metaClient, p.client],
    [t.metaDiscipline, p.discipline],
    [t.metaScope, p.scope],
  ];

  const body = (u) => `<article class="case">
  <section class="case-hero wrap">
    <div class="case-hero__top" data-reveal>
      <a class="pill" href="${u.home}#work">${icon('left')}${t.back}</a>
      <span class="mono">${pad(i + 1)} / ${pad(projects.length)}</span>
    </div>
    <h1 class="case-hero__title" data-reveal style="--d:.06s">${esc(p.title)}</h1>
    <div class="case-hero__info">
      <div class="case-hero__intro" data-reveal style="--d:.12s">
        <p class="case-hero__tagline">${esc(p.tagline[lang])}</p>
        <p class="case-hero__lead">${esc(p.lead[lang])}</p>
      </div>
      <dl class="meta">
        ${meta.map(([k, v], j) => `<div class="tile meta__item" data-reveal style="--d:${0.16 + j * 0.06}s"><dt class="mono">${k}</dt><dd>${esc(v[lang])}</dd></div>`).join('\n        ')}
      </dl>
    </div>
    <figure class="case-cover" data-reveal style="--d:.2s"><img src="${u.root}${cover.path}" width="${cover.w}" height="${cover.h}" alt="${esc(p.title)}" fetchpriority="high"></figure>
  </section>

  <section class="case-story wrap">
    <div class="tile story" data-reveal><span class="mono">(01) ${t.task}</span><p>${esc(p.task[lang])}</p></div>
    <div class="tile story story--accent" data-reveal style="--d:.08s"><span class="mono">(02) ${t.solution}</span><p>${esc(p.solution[lang])}</p></div>
  </section>

  <section class="case-gallery wrap">
    ${gallery(u)}
  </section>

  <section class="case-next wrap">
    <a class="tile next" href="${u.home}work/${next.slug}/" style="--accent:${next.accent}" data-reveal>
      <div class="next__text">
        <span class="mono">${t.next} — ${pad(nextIndex + 1)}</span>
        <span class="next__title">${esc(next.title)}</span>
        <span class="next__tagline">${esc(next.tagline[lang])}</span>
      </div>
      <div class="next__media"><img src="${u.root}${nextCover.path}" width="${nextCover.w}" height="${nextCover.h}" alt="" loading="lazy" decoding="async"></div>
      <span class="round-btn">${icon('right')}</span>
    </a>
  </section>
</article>`;

  return shell({
    lang,
    path: `work/${p.slug}/`,
    title: `${p.title} — ${t.name}`,
    description: p.lead[lang],
    body,
    accent: p.accent,
  });
}

function notFoundPage() {
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<title>404 — ${ui.ru.name}</title>
<link rel="icon" href="${SITE_URL}assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100..800&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="${SITE_URL}assets/styles.css">
</head>
<body>
<main class="lost wrap">
  <div class="tile grain lost__tile">
    <div class="bloom" aria-hidden="true">${petals()}</div>
    <span class="mono">(404)</span>
    <h1 class="lost__title">404</h1>
    <p>Страница не найдена · Page not found</p>
    <a class="pill" href="${SITE_URL}">${icon('left')}${ui.ru.name}</a>
  </div>
</main>
</body>
</html>
`;
}

/* ---------- write ---------- */

function write(path, html) {
  const file = join(OUT, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, 'src'), join(OUT, 'assets'), { recursive: true });
for (const p of projects) {
  const dest = join(OUT, 'img', p.slug);
  mkdirSync(dest, { recursive: true });
  for (const f of readdirSync(join(ROOT, 'cases', p.folder)).filter((f) => f.endsWith('.avif'))) {
    cpSync(join(ROOT, 'cases', p.folder, f), join(dest, f));
  }
}
writeFileSync(join(OUT, '.nojekyll'), '');

for (const lang of LANGS) {
  const base = lang === 'ru' ? '' : 'en/';
  write(`${base}index.html`, homePage(lang));
  projects.forEach((p, i) => write(`${base}work/${p.slug}/index.html`, casePage(lang, p, i)));
}
write('404.html', notFoundPage());

console.log(`Готово: ${LANGS.length * (projects.length + 1) + 1} страниц → dist/`);
