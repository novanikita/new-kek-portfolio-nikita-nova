// Весь текст сайта живёт здесь. Поменяй строку → `npm run build` → готово.
// Картинки кейсов берутся из папки cases/<folder>/.

export const SITE_URL = 'https://novanikita.github.io/new-kek-portfolio-nikita-nova/';

export const ui = {
  ru: {
    htmlTitle: 'Никита Нова — мультидисциплинарный дизайнер',
    description: 'Портфолио Никиты Новы: упаковка, айдентика и книжный дизайн. Работы для Яндекса, Додо Пиццы и других.',
    name: 'Никита Нова',
    navWork: 'Работы',
    navContacts: 'Контакты',
    langLabel: 'Язык',
    heroLabel: '(Портфолио) 2019 — 2026',
    available: 'Открыта к проектам',
    role: 'Мультидисциплинарный дизайнер.',
    roleMore: 'Упаковка, айдентика, книги — и всё, что между ними.',
    heroCta: 'Смотреть работы',
    voice: 'Привет! Я Никита',
    photoAlt: 'Никита Нова, портрет',
    countLabel: 'Проекты',
    countNum: '91',
    countText: 'проект за 8 лет работы',
    sinceLabel: 'В дизайне с',
    sinceNum: '2019',
    clientsLabel: 'Сотрудничала с',
    clients: ['ВК', 'Додо Пицца', 'ВкусВилл', 'Яндекс', 'МТС', 'Дизайн-выходные'],
    workTitle: 'Работы',
    workNote: 'На этом сайте — лучшие из них.',
    footerTitle: 'Напишите мне',
    footerText: 'Открыта к новым проектам, коллаборациям и интересным задачам.',
    toTop: 'Наверх',
    footerRole: 'Мультидисциплинарный дизайнер',
    back: 'Все работы',
    metaClient: 'Клиент',
    metaDiscipline: 'Направление',
    metaScope: 'Что сделано',
    task: 'Задача',
    solution: 'Решение',
    next: 'Следующий проект',
    imageAlt: 'изображение',
  },
  en: {
    htmlTitle: 'Nikita Nova — multidisciplinary designer',
    description: 'Portfolio of Nikita Nova: packaging, identity and book design. Work for Yandex, Dodo Pizza and more.',
    name: 'Nikita Nova',
    navWork: 'Work',
    navContacts: 'Contact',
    langLabel: 'Language',
    heroLabel: '(Portfolio) 2019 — 2026',
    available: 'Open to projects',
    role: 'Multidisciplinary designer.',
    roleMore: 'Packaging, identity, books — and everything in between.',
    heroCta: 'See the work',
    voice: 'Hi! I’m Nikita',
    photoAlt: 'Portrait of Nikita Nova',
    countLabel: 'Projects',
    countNum: '91',
    countText: 'projects in 8 years',
    sinceLabel: 'Designing since',
    sinceNum: '2019',
    clientsLabel: 'Worked with',
    clients: ['VK', 'Dodo Pizza', 'VkusVill', 'Yandex', 'MTS', 'Design Weekend'],
    workTitle: 'Work',
    workNote: 'The best of them are here.',
    footerTitle: 'Say hello',
    footerText: 'Open to new projects, collaborations and interesting challenges.',
    toTop: 'Back to top',
    footerRole: 'Multidisciplinary designer',
    back: 'All work',
    metaClient: 'Client',
    metaDiscipline: 'Discipline',
    metaScope: 'Scope',
    task: 'Challenge',
    solution: 'Solution',
    next: 'Next project',
    imageAlt: 'image',
  },
};

export const contacts = [
  {
    label: { ru: 'Telegram', en: 'Telegram' },
    value: '@nikitanova',
    href: 'https://t.me/nikitanova',
    glow: 'blue',
  },
  {
    label: { ru: 'Почта', en: 'Email' },
    value: 'pwwnvy@gmail.com',
    href: 'mailto:pwwnvy@gmail.com',
    glow: 'pink',
  },
  {
    label: { ru: 'Телефон', en: 'Phone' },
    value: '+7 999 999-99-99',
    href: 'tel:+79999999999',
    glow: 'orange',
  },
];

// rows: { img: [номера файлов] } — картинки в один ряд; { text } — подпись между рядами.
export const projects = [
  {
    slug: 'commo',
    folder: 'commo',
    prefix: 'commo-',
    title: 'Commo',
    accent: '#b9d0c8',
    layout: 'wide',
    tagline: {
      ru: 'Упаковка для часов и клавиатур Яндекса',
      en: 'Packaging for Yandex watches and keyboards',
    },
    tags: { ru: ['Яндекс', 'Упаковка'], en: ['Yandex', 'Packaging'] },
    client: { ru: 'Яндекс', en: 'Yandex' },
    discipline: { ru: 'Упаковка, иллюстрация', en: 'Packaging, illustration' },
    scope: { ru: 'Часы Commo Run, клавиатуры Commo', en: 'Commo Run watch, Commo keyboards' },
    lead: {
      ru: 'Commo — линейка гаджетов Яндекса: смарт-часы Commo Run и клавиатуры. Я придумала для неё систему упаковки: белый картон, устройство, нарисованное одной тонкой линией, мягкие зернистые градиенты и сердце как сквозной знак.',
      en: 'Commo is a line of Yandex gadgets: the Commo Run smartwatch and keyboards. I designed a packaging system for it: white cardboard, the device drawn in a single thin line, soft grainy gradients and a heart as the recurring sign.',
    },
    task: {
      ru: 'Сделать упаковку, которая с первого касания передаёт характер устройства — лёгкость часов и тактильность клавиатуры — и при этом собирает разные продукты в одну семью.',
      en: 'Create packaging that conveys the character of the device from the first touch — the lightness of the watch, the tactility of the keyboard — while bringing different products into one family.',
    },
    solution: {
      ru: 'Снаружи — почти пустая белая коробка с контуром устройства. Внутри — цвет: зернистые градиенты, похожие на складки мягкой ткани. Упаковка часов максимально тонкая и с первого момента передаёт ощущение от носки: невесомо и легко. А ремешок в иллюстрации сворачивается в сердце — и этот знак переходит на обложку инструкции.',
      en: 'Outside, an almost empty white box with an outline of the device. Inside, colour: grainy gradients that look like folds of soft fabric. The watch box is as thin as possible, so from the very first moment it feels like wearing the watch — weightless and light. In the illustration the strap curls into a heart, and that sign carries over to the cover of the manual.',
    },
    rows: [
      { img: [1] },
      {
        text: {
          ru: 'Ремешок, который превращается в сердце. Из этой линии вырос главный знак упаковки.',
          en: 'A strap that turns into a heart. This single line became the key sign of the packaging.',
        },
      },
      { img: [2, 3, 4] },
      { img: [5] },
      { img: [6, 7] },
      { img: [8, 9] },
      {
        text: {
          ru: 'Развёртки: картонная обечайка, коробка и обложка для инструкции. Модуль — 160 × 160 мм.',
          en: 'Dielines: cardboard sleeve, box and manual cover, built on a 160 × 160 mm module.',
        },
      },
      { img: [10] },
      { img: [11, 12, 13] },
      {
        text: {
          ru: 'Градиенты с зерном — как складки мягкой ткани. Они дают упаковке цвет и глубину, не нарушая её тишины.',
          en: 'Grainy gradients that read like folds of soft fabric. They give the packaging colour and depth without breaking its quietness.',
        },
      },
      { img: [15, 16] },
      { img: [17, 18] },
      {
        text: {
          ru: 'Для клавиатур — та же система: белый картон, контурный рисунок и рельеф, который хочется потрогать.',
          en: 'The keyboards follow the same system: white cardboard, a line drawing and relief you want to touch.',
        },
      },
      { img: [20, 21] },
      { img: [22] },
      { img: [23] },
      { img: [24, 25] },
      { img: [26, 27] },
    ],
  },
  {
    slug: 'dodo-dubai-package',
    folder: 'Dodo-dubai-package',
    prefix: 'package-dubai-',
    title: 'Dodo Dubai Package',
    accent: '#ff7a1a',
    layout: 'narrow',
    tagline: {
      ru: 'Упаковка Додо Пиццы для Дубая',
      en: 'Dodo Pizza packaging for Dubai',
    },
    tags: { ru: ['Додо Пицца', 'Упаковка'], en: ['Dodo Pizza', 'Packaging'] },
    client: { ru: 'Додо Пицца', en: 'Dodo Pizza' },
    discipline: { ru: 'Упаковка', en: 'Packaging' },
    scope: { ru: 'Коробки для пиццы и закусок, стаканы', en: 'Pizza and snack boxes, cups' },
    lead: {
      ru: 'Упаковка для пиццерий Додо в Дубае: коробки для пиццы разных размеров, коробки для закусок и стаканы для напитков. Фирменный оранжевый, растровый градиент и натуральный крафт.',
      en: 'Packaging for Dodo pizzerias in Dubai: pizza boxes in several sizes, snack boxes and drink cups. The signature orange, a halftone gradient and natural kraft.',
    },
    task: {
      ru: 'Нужна была упаковка, которая заметна в доставке и в руках курьера, легко масштабируется на разные форматы и остаётся узнаваемым Додо на новом рынке.',
      en: 'The packaging had to stand out in delivery and in a courier’s hands, scale easily across formats and stay recognisably Dodo in a new market.',
    },
    solution: {
      ru: 'В основе — крафтовый картон. На крышке — большое оранжевое пятно, которое растворяется в растре: оно читается издалека и напоминает о горячей пицце внутри. Боковины уходят в чёрный градиент, логотип Dodo Pizza повторяется по периметру — бренд видно с любой стороны стопки. Коробку закрывает стикер-пломба «All good! We’ve checked!» с QR-кодом и составом заказа.',
      en: 'Kraft cardboard is the base. On the lid, a large orange spot dissolves into halftone: it reads from afar and hints at the hot pizza inside. The sides fade into a black gradient, and the Dodo Pizza logo runs around the perimeter, so the brand is visible from any side of a stack. Each box is sealed with an “All good! We’ve checked!” sticker with a QR code and the order details.',
    },
    rows: [
      { img: [1] },
      { img: [2, 3] },
      { img: [4] },
      {
        text: {
          ru: 'Стикер-пломба подтверждает, что заказ проверен, и несёт всю информацию: состав, дату и QR-код.',
          en: 'The seal sticker confirms the order has been checked and carries all the details: contents, date and a QR code.',
        },
      },
      { img: [5] },
      {
        text: {
          ru: 'В стопке коробки складываются в одну большую надпись — логотип есть на каждой боковине.',
          en: 'Stacked, the boxes turn into one big sign: the logo sits on every side.',
        },
      },
      { img: [6, 7] },
      {
        text: {
          ru: 'Та же графика на стаканах для напитков: оранжевый, растр и чёрный градиент.',
          en: 'The same graphics on the drink cups: orange, halftone and a black gradient.',
        },
      },
      { img: [8] },
      { img: [9] },
    ],
  },
  {
    slug: 'crypto-logo',
    folder: 'crypto-logo',
    prefix: 'crypto-logo-',
    title: 'Crypto Logo',
    accent: '#ff4d3a',
    layout: 'narrow',
    tagline: {
      ru: 'Логотип для Crypto Futures Trading Blueprint',
      en: 'Logo for Crypto Futures Trading Blueprint',
    },
    tags: { ru: ['Логотип', 'Айдентика'], en: ['Logo', 'Identity'] },
    client: { ru: 'Crypto Futures Trading Blueprint', en: 'Crypto Futures Trading Blueprint' },
    discipline: { ru: 'Логотип, айдентика', en: 'Logo, identity' },
    scope: { ru: 'Знак, шрифтовой логотип, система вариантов', en: 'Symbol, wordmark, a system of variants' },
    lead: {
      ru: 'Логотип для проекта о торговле криптовалютными фьючерсами. Вместо привычной крипто-эстетики с неоном и ракетами — спокойный, уверенный знак и строгая типографика.',
      en: 'A logo for a project about crypto futures trading. Instead of the usual crypto aesthetic of neon and rockets — a calm, confident symbol and strict typography.',
    },
    task: {
      ru: 'Сделать логотип, которому хочется доверять. В теме, где много шума и громких обещаний, он должен выглядеть как продуманный план, а не как лотерея.',
      en: 'Make a logo you want to trust. In a field full of noise and loud promises, it should look like a well-thought-out plan, not a lottery.',
    },
    solution: {
      ru: 'Знак — монета на подиуме с лучистой звездой внутри: актив, точка опоры и момент озарения одновременно. Шрифтовая часть построена на контрасте жирного и тонкого гротеска, а овалы и стрелки отсылают к движению цены и цикличности рынка. Основная версия живёт на чёрном, акцентная — на красном градиенте с зерном.',
      en: 'The symbol is a coin on a pedestal with a radiant star inside — an asset, a foothold and a moment of insight at once. The wordmark plays bold against thin grotesque, while ovals and arrows refer to price movement and market cycles. The main version lives on black, the accent one on a grainy red gradient.',
    },
    rows: [
      { img: [1] },
      {
        text: {
          ru: 'Варианты композиции — от полной версии со знаком до компактного шрифтового логотипа.',
          en: 'Composition variants — from the full lockup with the symbol to a compact wordmark.',
        },
      },
      { img: [2, 3] },
      { img: [4, 5] },
    ],
  },
  {
    slug: 'essay',
    folder: 'essay',
    prefix: 'essay-',
    title: 'Essay',
    accent: '#ff2a1f',
    layout: 'wide',
    tagline: {
      ru: 'Книжная серия «Сочинения, определяющие эпоху»',
      en: 'Book series “Works That Defined an Era”',
    },
    tags: { ru: ['Art and Design School', 'Книги'], en: ['Art and Design School', 'Books'] },
    client: { ru: 'Art and Design School', en: 'Art and Design School' },
    discipline: { ru: 'Книжный дизайн, вёрстка', en: 'Book design, layout' },
    scope: { ru: 'Серия из трёх томов', en: 'A series of three volumes' },
    lead: {
      ru: 'Серия книг для Art and Design School: тексты художников и архитекторов, которые изменили искусство XX века. Первые тома — Казимир Малевич, Василий Кандинский и Вальтер Гропиус.',
      en: 'A book series for Art and Design School: texts by the artists and architects who changed 20th-century art. The first volumes are Kazimir Malevich, Wassily Kandinsky and Walter Gropius.',
    },
    task: {
      ru: 'Издать манифесты столетней давности так, чтобы их хотелось читать сегодня — в метро, по дороге, на коленке. Без музейной пыли, но с уважением к первоисточнику.',
      en: 'Publish century-old manifestos so that people want to read them today — on the metro, on the go, on their lap. No museum dust, but with respect for the source.',
    },
    solution: {
      ru: 'Ярко-красные обложки с вертикальным набором: название серии, имя автора и номер тома, а текст манифеста начинается прямо на обложке. Внутри — строгая модульная сетка, крупные номера страниц и архивные вставки: газета «Анархія», в которой печатался Малевич, обложки первых изданий, афиши. Красный обрез собирает тома в серию даже на полке.',
      en: 'Bright red covers with vertical typesetting: the series title, the author’s name and the volume number — and the manifesto itself starts right on the cover. Inside: a strict modular grid, large page numbers and archival inserts — the “Anarchy” newspaper Malevich wrote for, covers of first editions, posters. The red edges tie the volumes into a series even on a shelf.',
    },
    rows: [
      { img: [1, 5] },
      {
        text: {
          ru: 'Обложки первых трёх томов: Малевич, Кандинский, Гропиус.',
          en: 'Covers of the first three volumes: Malevich, Kandinsky, Gropius.',
        },
      },
      { img: [2] },
      { img: [3, 4] },
      { img: [6] },
      {
        text: {
          ru: 'Развороты: модульная сетка, крупная нумерация и сноски на полях.',
          en: 'Spreads: a modular grid, large numbering and marginal notes.',
        },
      },
      { img: [7] },
      { img: [8, 9] },
      {
        text: {
          ru: 'Архивные материалы работают как полноценная иллюстрация: газета «Анархія» превращается в шрифтовой плакат на развороте.',
          en: 'Archival material works as full-fledged illustration: the “Anarchy” newspaper becomes a typographic poster across the spread.',
        },
      },
      { img: [10] },
      { img: [11, 12] },
      { img: [13] },
      { img: [15, 16, 17] },
      { img: [18] },
      { img: [19, 20] },
    ],
  },
];
