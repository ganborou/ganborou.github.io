import type { Project } from '../types/portfolio'
import volnaImages from './volna-images.json'
import ministryImages from './ministry-images.json'
import marathonImages from './cultural-marathon-images.json'
import lessonImages from './digital-lesson-images.json'
import posterImages from './poster-experiments-images.json'
import partyImages from './party-posters-images.json'
import lovemachineImages from './lovemachine-images.json'
import digitalLoveImages from './digital-love-images.json'

export const projects: Project[] = [
  {
    slug: 'onboarding', category: 'product',
    title: 'Разработка игровых онбордингов',
    displayTitle: 'Разработка\nигровых\nонбордингов',
    year: '2025',
    summary: 'Исследование геймификаций в веб, аналитика их влияния на бизнес показатели и разработка, тестирование и внедрение встречающих механик для продукта Витрина подарков.',
    images: [],
  },
  {
    slug: 'animatics', category: 'animation',
    title: 'Коллекция аниматиков для разработки и кейсов',
    displayTitle: 'Коллекция\nаниматиков\nдля разработки\nи кейсов',
    year: '2024',
    summary: 'Все\u00a0анимации выполнены в\u00a0After Effects.\nВ\u00a0кейс входят как\u00a0анимации, созданные для\u00a0демонстрации команде разработки, так\u00a0и\u00a0для\u00a0студийных кейсов, а\u00a0также личных проектов и\u00a0тестовых заданий.',
    images: ['1009120433', '1009121789', '1009121262', '1009117995', '1009119172', '1009118455'].map((id, index) => ({
      src: `vimeo-animatics-${id}`,
      alt: `Демонстрационные аниматики — видео ${index + 1}`,
      width: 1440,
      height: 870,
      videoUrl: `https://player.vimeo.com/video/${id}?badge=0&autopause=0&autoplay=1&loop=1`,
      videoSandbox: 'allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox',
    })),
  },
  {
    slug: 'digital-love', category: 'animation',
    title: 'Визуальное исследование: любовь в эру диджитал',
    year: '2023',
    summary: 'Исследование того, какие формы принимает любовь в\u00a0ответ на\u00a0реалии онлайн-атомизации общества и\u00a0разрушения близких связей.\nПредметы изучения парами противопоставляются друг другу как\u00a0паттерны и\u00a0явления, присущие проживанию любовного опыта.',
    images: digitalLoveImages,
  },
  {
    slug: 'charmer', category: 'merch',
    title: 'Иллюстрация и анимация для студии Charmer',
    displayTitle: 'Иллюстрация\nи анимация для студии Charmer',
    year: '2023',
    summary: 'Векторная типографика и анимация, разработанные для презентации стенда студии Charmer на конференции Letsdefine в Барселоне.',
    images: [],
  },
  {
    slug: 'lovemachine', category: 'merch',
    title: 'Иллюстрации для вечеринки Lovemachine',
    displayTitle: 'Иллюстрации\nдля вечеринки Lovemachine',
    year: '2022',
    summary: 'Иллюстрации и концепты мерча разработанные для серии вечеринок Lovemachine, проходящих в Санкт-Петербурге и Москве. Сотрудничество продолжается до сих пор — в формате разработки афиш и мерча.',
    images: lovemachineImages,
  },
  {
    slug: 'party-posters', category: 'posters',
    title: 'Афиши к вечеринкам и рейвам',
    displayTitle: 'Афиши\nк вечеринкам\nи рейвам',
    year: '‘23-24',
    summary: 'Афиши для анонсов вечеринок и рейвов, сделанные в коллаборации с клубными промоутерами и Москвы и Санкт-Петербурга. Вся графическая часть реализована мной.',
    images: partyImages,
  },
  {
    slug: 'poster-experiments', category: 'posters',
    title: 'Коллекция постеров',
    year: '‘24-25',
    summary: 'Подборка постеров, созданных для участия в конкурсах и выставках, а также в рамках творческих экспериментов в области векторной иллюстрации, типографики и генеративного искусства.',
    images: posterImages,
  },
  {
    slug: 'digital-lesson', category: 'special-projects',
    title: 'Яндекс Урок цифры 2025: дело в чате',
    year: '2025',
    summary: 'Опираясь на материалы от методистов пересобрала образовательную логику в интерактивные механики, разработала визуальную концепцию тренажёра, собрала дизайн-макеты всех страниц+адаптивные версии,\nсобрала полный UI-кит, а также произвела арт-дирекшен и валидацию работы других специалистов.',
    externalUrl: 'https://xn--h1adlhdnlo2c.xn--p1ai/lessons/ai-evolution',
    externalLabel: 'Смотреть спецпроект →',
    images: lessonImages,
  },
  {
    slug: 'cultural-marathon', category: 'special-projects',
    title: 'Яндекс культурный марафон',
    year: '2024',
    summary: 'Создала визуальную концепцию и аниматик главного экрана. Вместе с другим дизайнером подготовила к вёрстке макеты и материалы для промо.',
    externalUrl: 'https://education.yandex.ru/culture',
    externalLabel: 'Смотреть спецпроект →',
    images: marathonImages,
  },
  {
    slug: 'ministry-of-culture', category: 'websites',
    title: 'Министерство культуры Чеченской республики',
    year: '2023',
    summary: 'Произвела полный рефакторинг исходного сайта, оптимизировала структуру и навигацию, создала дизайн-концепции и защитила решение перед гос.структурой. Также за мной были сборка полного объема макетов и авторский надзор за версткой.',
    externalUrl: 'https://mk-chr.ru/',
    images: ministryImages,
  },
  {
    slug: 'volna', category: 'websites',
    title: 'Водно-развлекательный комплекс Волна',
    year: '2024',
    summary: 'Провела брифинг с заказчиками, создала дизайн-концепции, собрала полный набор макетов, UI-кит, отрисовала иллюстрации, произвела арт-дирекшен над Motion и 3D-художниками, а также авторский надзор за версткой до выхода сайта в прод.',
    externalUrl: 'https://volnabrosko.com/',
    images: volnaImages,
  },
]
