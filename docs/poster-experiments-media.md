# Коллекция постеров

Источник: [Figma, 194:13096](https://www.figma.com/design/sEcSxhRnLbVaHHme9GwcoR/Portfolio?node-id=194-13096).

Карточка «Эксперименты с типографикой и векторными иллюстрациями» в разделе «Постеры» открывает `/projects/poster-experiments`. Заголовок, описание и годы перенесены из макета текстом. Оба перехода назад ведут в `/work/posters`.

Девять исходных изображений сохранены в `design-assets/media/projects/poster-experiments/`, порядок и размеры слотов — в `src/data/poster-experiments-images.json`, соответствие слоям Figma — в `docs/asset-manifest.json`. WebP подготовлены без потерь.

При ширине 1440 px галерея начинается на y=692, первый постер — на y=762. Размер каждого слота — 462 × 655 px, интервал — 97 px, нижний отступ — 133 px, фон — `#bcbdc6`. На узких экранах постеры уменьшаются с сохранением пропорций и боковыми полями 16 px.

Повторная генерация: `npm run media -- /media/projects/poster-experiments/`.
