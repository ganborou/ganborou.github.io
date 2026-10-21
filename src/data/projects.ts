import type { Project } from '../types/portfolio'
import volnaImages from './volna-images.json'
import ministryImages from './ministry-images.json'
import marathonImages from './cultural-marathon-images.json'
import lessonImages from './digital-lesson-images.json'
import posterImages from './poster-experiments-images.json'
import partyImages from './party-posters-images.json'

export const projects: Project[] = [
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
