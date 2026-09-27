# Grok Image Prompts

Промпты для реалистичных фотографий лазерной очистки металла на сайте LZR.

## Как использовать

1. Прикладывать к каждому запросу реальную фотографию аппарата, если она есть.
2. Просить Grok сохранить модель аппарата, сопло, кабель и цвета с референса.
3. Для пар «до/после» сначала генерировать кадр «до», затем использовать его как референс для кадра «после».
4. Не выдавать сгенерированные изображения за реальные кейсы и не добавлять к ним выдуманные площади, сроки, цены или названия клиентов.

## Общий стиль

Добавлять этот блок к каждому сюжетному промпту:

```text
Photorealistic documentary commercial photograph for a small mobile laser metal-cleaning crew. Real industrial site or workshop, natural imperfect textures, realistic metal surface, restrained graphite and steel color palette, natural daylight with subtle warm work lights. Operator wears dark flame-resistant coveralls, laser safety visor or goggles, gloves and safety boots. Show realistic scale, controlled work area and authentic portable laser-cleaning equipment. Operator is seen from behind or in profile, face not identifiable. No staged corporate advertising look.

No CGI, no 3D render, no illustration, no science-fiction laser beam, no giant blue or orange ray, no excessive sparks, no fire, no spotless showroom, no mirror-polished fake metal, no text, no captions, no logos, no watermark, no duplicated equipment, no deformed hands, no extra fingers.
```

Если есть реальная фотография аппарата, добавить:

```text
Preserve the exact machine, nozzle, cable and colors from the reference image.
```

## Сюжеты

### `hero-industrial.jpg`

```text
Wide horizontal 3:2 photograph for a website hero section. An operator manually cleans rust from a large steel welded structure or industrial machine part with a continuous-wave laser. The operator and the metal object occupy the right two-thirds of the frame. Leave a calm darker uncluttered area on the left for website text. Portable laser unit, hose and working area are visible. A small natural contact glow appears exactly where the nozzle touches the metal; no beam floating through the air. Documentary full-frame photography, 35mm lens, realistic depth and texture.
```

### `industrial-process.jpg`

```text
Medium-wide 6:5 photograph inside a real production workshop. An operator cleans a large steel pipe assembly or machine component with a continuous laser. Show the operator's hands, nozzle, rust removal zone and part of the portable equipment. Include a second object or workshop element for scale. The surface should show a believable transition from dark rust to matte gray steel, not glossy chrome. Natural side light, practical industrial background, no dramatic smoke.
```

### `industrial-wide.png`

```text
Wide industrial photograph of a mobile laser-cleaning job on a real construction or manufacturing site. A large steel frame, welded structure or heavy equipment component fills the scene. The operator works from a safe position with protective equipment; the machine and cable are visible nearby. Include floor texture, work-zone boundary and realistic surroundings. The image must communicate that the object is cleaned on site and does not need to be transported. Landscape composition with enough open space for cropping.
```

### `hero-restoration.jpg`

```text
Medium close documentary photograph of an operator using a pulsed laser to clean an old decorative wrought-iron gate or cast-iron ornamental detail. Focus on the gloved hands, nozzle, relief, edges and partially cleaned metal. Preserve the original patina and surface character; remove dirt and corrosion without making the object look new or glossy. Warm workshop light, shallow but realistic depth of field, no visible face, no artificial laser beam.
```

### `rust-before-after.jpg`

```text
Create a realistic before-and-after diptych of the same steel welded joint photographed from exactly the same camera position and under identical lighting. One side has heavy red-brown corrosion and rough rust texture. The other side has been cleaned to natural matte gray metal with visible original texture, not polished chrome. The object geometry, scratches and weld shape must match perfectly on both sides. Clean vertical transition, no labels, no text, no graphic arrows, no different object.
```

### `paint-before-after.jpg`

```text
Realistic before-and-after photograph of one steel panel from the same camera angle and lighting. Show a clear irregular boundary between old dark blue-gray industrial paint and the exposed matte steel underneath. Keep the same dents, scratches, bolts and panel geometry on both sides. The cleaned metal must look natural and slightly uneven, not digitally perfect. Documentary industrial photography, no text or graphic split line.
```

### `scale-before-after.jpg`

```text
Realistic before-and-after diptych of the same welded steel seam after heating or welding. The before side has a dense black-blue layer of heat scale and oxidation. The after side shows the same weld seam with the scale removed, natural matte metal and all weld details preserved. Identical camera position, lighting, object geometry and scale. No mirror shine, no invented welds, no text, no decorative effects.
```

### `test-patch.jpg`

```text
Documentary photograph of a real rusted steel construction during a laser-cleaning test. A small clearly visible patch has been cleaned while the surrounding surface remains untouched with its original rust. Include the operator's gloved hand or nozzle near the patch for scale. The test area must be on the same object, with an organic believable boundary rather than a perfect digital rectangle. Natural light, realistic metal texture, no text or artificial beam.
```

### `result-macro.jpg`

```text
High-detail macro photograph of a cleaned steel surface after laser treatment. Show a weld edge, corner, stamped marking or fine relief that remains visible after cleaning. Use soft side lighting to reveal texture and small imperfections. The metal should be clean but matte and believable, not chrome or mirror-polished. Include a small part of a glove or measuring tool at the edge of the frame for scale. No text, no watermark, no CGI.
```

### `equipment-on-site.jpg`

```text
Vertical 4:5 documentary photograph of a portable laser-cleaning machine installed at a real workshop or construction site. The equipment, cable, operator and steel object being cleaned must all be visible in one frame. Show an organized work area with realistic safety distance and protective equipment. The background should look like a functioning site, not a showroom. Keep the machine design simple and believable, with no invented logos or labels.
```

## Приоритет генерации

1. `hero-industrial.jpg`
2. `test-patch.jpg`
3. `rust-before-after.jpg`
4. `hero-restoration.jpg`
5. `industrial-process.jpg`
6. `industrial-wide.png`
7. `paint-before-after.jpg`
8. `scale-before-after.jpg`
9. `result-macro.jpg`
10. `equipment-on-site.jpg`
