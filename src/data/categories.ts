import type { Category } from '../types/portfolio'

const media = '/media/projects/'

export const categories: Category[] = [
  {
    id: 'special-projects', title: 'Спецпроекты',
    description: ['Спецпроекты в коллаборации с бигтех-корпорациями. Участвовала в проектах подобного типа в разных ролях: начиная со сборщика адаптивов и аниматиков, до роли арт-директора с созданием визуальной концепции и курирования работы других исполнителей.'],
    projects: [
      { slug: 'cultural-marathon', title: 'Культурный марафон: русские классики сквозь призму современных технологий', image: media + 'special-marathon.png', available: true },
      { slug: 'digital-lesson', title: 'Яндекс Урок цифры: интерактивные уроки по цифровой безопасности и работе с ИИ', image: media + 'special-lesson.png', available: true },
    ],
  },
  {
    id: 'websites', title: 'Сайты',
    description: [
      'Многостраничные сайты, запуск которых я курировала от этапа брифинга до авторского надзора за версткой.',
      'Я полностью собрала полный объём страниц во всех необходимых разрешениях, отрисовала иллюстрации и аниматики, а также сопровождала разработку до выхода сайта в прод.',
    ],
    projects: [
      { slug: 'ministry-of-culture', title: 'Министерство культуры Чеченской республики', image: media + 'category-web-ministry.png', available: true },
      { slug: 'volna', title: 'Водно-развлекательный комплекс Волна', image: media + 'category-web-volna.png', available: true },
    ],
  },
  {
    id: 'product', title: 'Продукт',
    description: ['Работа над проектами включала в себя проведение итерационных AB-тестов, пользовательские интервью и проверку гипотез. Решения продиктованы не эстетическими соображениями, а потребностями продукта и людей, которые им пользуются.'],
    projects: [
      { slug: 'onboarding', title: 'Геймифицированные онбординги для Витрины подарков', image: media + 'product-onboarding.png' },
      { slug: 'redesign', title: 'Редизайн Витрины подарков и внедрение дизайн-системы', image: media + 'product-redesign.png' },
    ],
  },
  {
    id: 'animation', title: 'Анимация',
    description: ['Анимации, собранные как демо для разработки, а также визуальные эксперименты для более глубокого понимания принципов анимации. Все анимации выполнены в After Effects.'],
    projects: [
      { slug: 'animatics', title: 'Демонстрационные аниматики для различных сайтов', image: media + 'animation-sites.png' },
      { slug: 'digital-love', title: 'Визуальное исследование: как мы проживаем любовь в эру диджитал', image: media + 'animation-love.png' },
    ],
  },
  {
    id: 'posters', title: 'Постеры',
    description: ['В раздел включены афиши вечеринок и других мероприятий в Москве и Санкт-Петербурге, а также мои творческие эксперименты в формате постеров. В работе использовала ручные эскизы, векторные и растровые редакторы и нейросети.'],
    projects: [
      { slug: 'poster-experiments', title: 'Эксперименты с типографикой и векторными иллюстрациями', image: media + 'posters-experiments.png', available: true },
      { slug: 'party-posters', title: 'Афиши вечеринок и других локальных мероприятий', image: media + 'posters-parties.png', available: true },
    ],
  },
  {
    id: 'merch', title: 'Мерч',
    description: ['Принты, иллюстрации и анимации, созданные для оформления мерча и сопутствующей сувенирной продукции.'],
    projects: [
      { slug: 'lovemachine', title: 'Иллюстрации и мерч для вечеринки Lovemachine', image: media + 'merch-lovemachine.png' },
      { slug: 'charmer', title: 'Dark side of Charmer: кастомная типографика и анимация', image: media + 'merch-charmer.png' },
    ],
  },
]
