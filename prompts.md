# Промпты для изображений MVP

Этот файл предназначен для генерации временных визуалов для MVP сайта LZR. Изображения можно использовать в hero, карточках услуг и визуальных блоках, но нельзя выдавать их за реальные кейсы, фотографии оборудования или подтвержденные результаты работ. Для кейсов «до/после» нужны настоящие фотографии после получения доступа к объектам.

Промпты написаны на английском: большинство генераторов точнее понимают композицию, свет и технические детали на английском. Текст на самих изображениях не генерировать: заголовки и CTA накладываются в HTML.

## Общие настройки

**Общий стиль для всех кадров:**

```text
photorealistic industrial documentary photography, real metal surface, authentic laser cleaning workstation, dark graphite and warm amber color palette, controlled studio-industrial lighting, realistic material texture, sharp details, restrained contrast, premium B2B website art direction, no advertising gloss
```

**Общий negative prompt:**

```text
cartoon, illustration, 3d render, CGI look, futuristic sci-fi laser, neon blue beam, plasma weapon, explosion, fire, excessive sparks, smoke covering the surface, unsafe work without protective equipment, fake machinery, impossible geometry, plastic-looking metal, distorted hands, extra fingers, duplicated tools, fake brand logos, readable text, watermark, UI elements, random numbers, overprocessed HDR, orange color cast, blurry surface, different objects in before-and-after
```

**Настройки для MVP:**

- Hero: горизонтальный формат 16:9, ориентир 1600x900.
- Карточки услуг: 4:3, ориентир 1200x900.
- Макро и тестовый участок: 1:1 или 4:3.
- Open Graph: 1.91:1, 1200x630.
- Без текста, логотипов, названий компаний и цифр внутри изображения.
- Оставлять 25-35% спокойного пространства с одной стороны кадра под HTML-текст.
- Сохранять один seed или style reference для всех изображений одной страницы.

## Обязательный комплект P0

### 1. Главный hero для промышленной очистки

**Файл:** `hero-industrial.webp`

**Назначение:** первый экран главной и страницы промышленной очистки.

```text
Wide horizontal documentary photograph of an operator in proper industrial laser safety equipment cleaning a large rusted steel component with a continuous-wave laser cleaning system inside a real production workshop. The metal surface shows a narrow authentic cleaned path, the machine and work area are visible but not dominant, realistic safety zone, grounded industrial environment, empty darker negative space on the left for website headline, camera at eye level, natural perspective, photorealistic industrial documentary photography, real metal texture, dark graphite and warm amber palette, no text, no logos
```

### 2. Hero для реставрационных работ

**Файл:** `hero-restoration.webp`

**Назначение:** карточка реставрации на главной и первый экран `/restoration/`.

```text
Medium close-up documentary photograph of a conservator using a compact pulsed laser cleaning tool on an aged ornate metal decorative element in a quiet restoration workshop. Show the operator's gloved hands, nozzle, a small controlled cleaned area, visible relief and patina on the surrounding surface, careful measured work, soft neutral workshop background, empty darker negative space on the right for website text, realistic scale, photorealistic, authentic material texture, no text, no logos, no futuristic effects
```

### 3. Ржавчина до и после

**Файл:** `rust-before-after.webp`

**Назначение:** карточка услуги, SEO-страница и временный visual proof.

```text
Controlled editorial diptych of the same steel plate photographed from exactly the same angle and distance. Left half: realistic thick red-brown surface rust with uneven texture. Right half: the same plate after laser cleaning, clean matte steel with natural subtle texture, not mirror-polished. Straight vertical transition line, identical lighting, neutral gray background, high-detail industrial product photography, no labels, no text, no logos
```

> Для MVP можно использовать как иллюстрацию. Не подписывать как реальный результат конкретного объекта.

### 4. Краска до и после

**Файл:** `paint-before-after.webp`

**Назначение:** карточка удаления краски и блок услуг.

```text
Photorealistic split view of the same industrial steel panel before and after laser coating removal. Left side has an old worn dark blue-gray paint layer with chips and scratches. Right side shows the same panel with the coating removed and the metal surface visible, controlled clean boundary, realistic slight discoloration, identical camera angle and light, industrial workshop background, no text, no logos, no exaggerated shine
```

### 5. Окалина до и после

**Файл:** `scale-before-after.webp`

**Назначение:** карточка снятия окалины и страница промышленной очистки.

```text
High-detail industrial macro diptych of the same welded steel joint. Left side: dark heat scale and oxide crust around the weld after heating. Right side: the same weld zone after controlled laser cleaning, clean visible metal and weld profile, natural matte finish, identical angle and lighting, realistic manufacturing context, no sparks, no fire, no text, no logos
```

### 6. Тестовый участок

**Файл:** `test-patch.webp`

**Назначение:** блок процесса, FAQ и CTA перед заявкой.

```text
Close-up realistic photograph of a corroded steel surface with a small rectangular test patch cleaned by laser. Most of the surface remains visibly rusty while one clearly defined area reveals clean matte metal. Include a gloved operator hand and a compact laser nozzle at the edge of the frame for scale, controlled workshop lighting, no text, no ruler markings, no logos, no dramatic sparks
```

## Страница промышленной очистки

### 7. Промышленный объект на месте

**Файл:** `industrial-equipment-on-site.webp`

**Назначение:** `/industrial/`, блок про выезд и работу без лишнего демонтажа.

```text
Wide realistic production-floor photograph of a mobile continuous-wave laser cleaning unit positioned beside a large steel machine frame and metal pipes. An operator in protective equipment is preparing the work zone, safety barrier and extraction equipment are visible, the scene feels like an operating industrial facility, no readable branding, no text, balanced composition with clear metal objects, photorealistic documentary style
```

### 8. Промышленная деталь крупным планом

**Файл:** `industrial-rust-detail.webp`

**Назначение:** блок задач производства и визуальное объяснение масштаба загрязнения.

```text
Detailed macro photograph of a heavy steel flange and welded joint with layered rust, oxide and old coating, realistic pits and edges, a narrow freshly cleaned strip from a continuous laser pass visible across the surface, neutral industrial background, directional light that reveals texture, no text, no logos, no futuristic beam, no excessive orange color
```

### 9. Производственная поверхность после очистки

**Файл:** `industrial-result.webp`

**Назначение:** блок результата и CTA промышленной страницы.

```text
Photorealistic close-up of a large cleaned steel component in a production environment, visible natural matte metal texture, preserved edges and weld geometry, a gloved hand or measuring tool provides scale, subtle industrial background, realistic neutral lighting, no mirror polish, no text, no logos, no artificial shine
```

## Страница реставрационных работ

### 10. Декоративная металлическая деталь

**Файл:** `restoration-metal-detail.webp`

**Назначение:** блок объектов и hero реставрационной страницы.

```text
Photorealistic restoration workshop photograph of an aged ornate metal fitting with layered grime, light corrosion and preserved decorative relief. A conservator uses a compact pulsed laser cleaning handpiece on a small section, careful controlled work, shallow depth of field, visible texture and edges, calm neutral background, empty space for page copy, no text, no logos, no fantasy effects
```

### 11. Реставрационный тест

**Файл:** `restoration-test-patch.webp`

**Назначение:** доказательство предварительного теста на странице `/restoration/`.

```text
Macro documentary photograph of an old decorative metal surface with one small clean test area next to untouched patina and aged coating. The transition is subtle and believable, the relief and fine edges remain visible, a pulsed laser nozzle is slightly out of focus in the background, careful conservation workshop, realistic colors, no text, no logos, no dramatic sparks
```

### 12. Рельеф и кромка после очистки

**Файл:** `restoration-result-macro.webp`

**Назначение:** блок контроля результата и FAQ.

```text
Extreme close-up of a cleaned ornate metal edge with visible relief, engraving and natural surface texture, small areas of aged patina remain outside the cleaned zone, soft controlled light reveals details without over-sharpening, restoration photography, no text, no logos, no artificial mirror reflection, no plastic surface
```

> Если реставрация дерева, камня или другого материала действительно входит в услугу, для каждого материала генерировать отдельный кадр только после подтверждения технологии. Не смешивать металл и дерево в одной фотографии.

## Общие материалы для страниц

### 13. Процесс работы

**Файл:** `process-workshop.webp`

**Назначение:** секция «Как работаем» и карточка процесса.

```text
Realistic editorial photograph showing a laser cleaning job in progress: one operator checks a metal surface after a small test, the mobile equipment and organized work area are visible in the background, clear sense of sequence and control, no posing for advertisement, protective equipment, dark graphite and warm amber palette, no text, no logos
```

### 14. Open Graph preview

**Файл:** `og-image.jpg`

**Назначение:** превью ссылки в Telegram, VK и социальных сетях.

```text
Wide cinematic but realistic industrial photograph of a focused laser cleaning pass on a rusted steel surface, clean dark graphite background, warm amber light concentrated near the work point, large empty dark area on the left for HTML overlay, no people close-up, no readable text, no logo, no watermark, premium B2B industrial website composition, photorealistic
```

Не добавлять текст в генератор. Заголовок «Лазерная очистка металла в Москве» будет поверх изображения в самом превью только если это поддерживает выбранная платформа.

### 15. Favicon и служебная графика

Favicon, логотип и простые иконки лучше не генерировать нейросетью. Их нужно собрать как векторную графику:

- `logo.svg` - знак LZR и текстовая версия;
- `logo-inverse.svg` - светлая версия для темного фона;
- `favicon.svg` - только знак без мелкой подписи;
- `icon-test.svg` - тестовый участок;
- `icon-clean.svg` - проход лазера;
- `icon-result.svg` - очищенная поверхность;
- `icon-location.svg` - выезд на объект.

## Как получить согласованный набор

1. Сначала сгенерировать `hero-industrial`, `hero-restoration` и `og-image`.
2. Выбрать один визуальный стиль, цвет света и уровень контраста.
3. Использовать выбранный hero как style reference для остальных сцен.
4. Для «до/после» использовать один seed и один объект; если генератор поддерживает image-to-image, сначала создать исходную поверхность, затем редактировать только загрязненный слой.
5. Сгенерировать карточки ржавчины, краски и окалины в одном формате 4:3.
6. Проверить кадры на мобильном crop до передачи в сайт.
7. Экспортировать web-версии в AVIF и WebP, сохранить исходные изображения отдельно.

## Что нельзя использовать как доказательство

- Сгенерированные «кейсы» с конкретными площадями, сроками и процентами экономии.
- Вымышленные логотипы клиентов и несуществующие производственные объекты.
- Кадры, где оборудование выглядит иначе, чем реальная установка компании.
- Изображения с нарушенной техникой безопасности.
- «До/после», где левая и правая половины очевидно относятся к разным деталям.

До появления собственных фотографий в подписях сайта использовать формулировки «иллюстрация процесса» или не называть изображение кейсом.
