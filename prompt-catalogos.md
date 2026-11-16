# Prompt para Cursor: páginas de catálogo digital dentro del proyecto Shipply

## Rol y objetivo

Actúa como diseñador de producto senior y desarrollador frontend senior. En este mismo proyecto (Next.js, Tailwind v4, Framer Motion) vamos a crear **páginas de catálogo digital**: una página por producto específico o categoría (el primero: árboles de Navidad). Cada página se ve como el listado de productos de un ecommerce, pero funciona solo como catálogo para mostrar modelos, precios e imágenes. No hay carrito, ni checkout, ni cuentas.

Antes de escribir código lee `AGENTS.md` y la documentación en `node_modules/next/dist/docs/` (esta versión de Next tiene cambios importantes). Si existe un `CLAUDE.md`, síguelo.

## Reglas clave

1. **Son enlaces privados para compartir.** Nunca se enlazan desde la landing ni desde su navbar o footer. No aparecen en `sitemap.ts` ni en `robots.txt` (listarlos ahí revelaría las URLs). Llevan noindex en la metadata y en el header `X-Robots-Tag` (`next.config.ts`). No existe una página `/catalogo` que liste los catálogos.
2. **Se ven iguales que el resto del sitio:** mismos tokens de `globals.css` (ink, forest, moss, lime, cream, paper), mismas fuentes (Geist, Instrument Serif itálica para acentos, Geist Mono para etiquetas), mismos componentes (`PillButton`, `RichTitle`, `Eyebrow`, `Wordmark`, utilidades `container-site`, `section-y`, `grain`, `bg-hero`).
3. **Todo el contenido vive en archivos de datos**, no en los componentes: un archivo por catálogo en `content/catalogs/<slug>.ts`, con tipos en `content/catalogs/types.ts` y un registro en `lib/catalogs.ts`. Agregar un catálogo nuevo debe ser: copiar un archivo, cambiar datos, sumarlo al registro.
4. **Copy en español de México, sin guiones largos ni guiones como puntuación** en ningún texto visible.

## Ruta y estructura

- Ruta: `app/catalogo/[slug]/page.tsx`, con `generateStaticParams` desde el registro y `notFound()` si el slug no existe. Tipa `params` como `Promise<{ slug: string }>`.
- `generateMetadata`: título, descripción, `robots: { index: false, follow: false }` y Open Graph con una imagen `cover` (1200x630), porque esa es la vista previa que se ve al pegar el enlace en WhatsApp.
- Componentes en `components/catalog/`: `catalog-header`, `catalog-browser` (cliente: filtros, orden y estado del lightbox), `product-card`, `product-lightbox`, `product-gallery`, `catalog-footer`.
- La página no usa el `Navbar`, el `Footer` ni el `Floating` de la landing. El wordmark del encabezado no es un enlace.

## Modelo de datos

Catálogo: `slug`, `sample` (true mientras los datos sean de muestra), `eyebrow`, `title` (el texto entre *asteriscos* se renderiza como acento serif), `topic` (para mensajes de WhatsApp), `metaTitle`, `description`, `intro`, `cover`, `priceNote`, `products[]`.

Producto: `id` (slug, también se usa como #hash), `name`, `type` (grupo para filtros), `summary`, `price` (MXN por pieza), `minOrder`, `tiers?` (precio por volumen: `{ min, price }[]`), `badge?`, `images[]` (la primera es el thumbnail; cada una con `src` y `alt`), `description`, `specs[]` (`{ label, value }`).

## Diseño de la página

**Encabezado:** fondo `bg-hero` con `grain`. Barra superior con wordmark y botón "Cotizar" a WhatsApp. Debajo: eyebrow, título grande con acento serif en lime, introducción y una fila de datos (número de modelos, precio desde, pedido mínimo) calculados desde los datos. Si `sample` es true, una franja lima arriba que diga "Catálogo de muestra: los modelos y precios son ejemplos".

**Barra de herramientas** pegajosa (sticky) con fondo cream translúcido y blur: chips para filtrar por `type` (con conteo, `aria-pressed`), contador de modelos y un select para ordenar (destacados, precio menor a mayor, precio mayor a menor).

**Cuadrícula:** 2 columnas en móvil, 3 en tablet, 4 en escritorio. Al cambiar filtro u orden las cards entran con una animación suave de aparición escalonada (respetando `prefers-reduced-motion`).

**Card de producto** (un `<button>` completo, no un enlace):
- Thumbnail en proporción 4:5 con esquinas redondeadas y sombra suave. En hover: zoom ligero y fundido a la segunda foto (esa segunda imagen se descarga solo al primer hover o foco, para no duplicar el peso).
- Badge opcional arriba a la izquierda en lime, contador de fotos abajo a la izquierda y un botón "+" que aparece en hover.
- Debajo: tipo en mono pequeño, nombre, resumen (oculto en móvil muy angosto), precio grande con "MXN" y pedido mínimo.
- Las primeras 4 cards con `priority`; `next/image` con `sizes` correctos y `quality` de los permitidos en `next.config.ts`.

**Lightbox al hacer clic en una card:** usa el elemento `<dialog>` nativo con `showModal()` (foco atrapado, Escape y fondo inerte gratis).
- Escritorio: dos columnas. Izquierda, galería (54%). Derecha, detalles con scroll propio y un pie fijo con los botones.
- Móvil: hoja de pantalla completa; galería arriba, detalles debajo y barra de CTA fija abajo.
- **Galería:** carrusel con scroll horizontal y scroll-snap (se desliza con el dedo en móvil), flechas en escritorio, miniaturas, contador "1 / 3" y navegación con las teclas izquierda y derecha.
- **Detalles:** tipo, nombre, resumen, precio por pieza, pedido mínimo, tabla "Precio por volumen" con rangos ("6 a 23 pzas", "60 o más pzas"), descripción, especificaciones en `<dl>` y la nota de precios.
- Botones: "Cotizar este modelo" (WhatsApp con mensaje prellenado que incluye el nombre del modelo, el catálogo y el enlace directo) y "Copiar enlace" (con confirmación en `aria-live`).
- Botones para pasar al modelo anterior y siguiente (sobre la lista visible) sin cerrar.
- Animación de entrada y de salida (180 ms). Cierra con la X, Escape o clic fuera del panel. El scroll del fondo se bloquea solo en páginas de catálogo (`html:has(.catalog-root dialog[open])`).

**Enlace por producto:** el producto abierto vive en el `#hash` de la URL. Abrir con `window.location.hash = id` (no `pushState` con estado propio, para no chocar con el router de Next); el botón Atrás cierra el lightbox; entrar por un enlace con hash abre el lightbox directo; cambiar de modelo dentro del lightbox usa `replaceState`.

**Pie:** fondo ink con grano, mensaje "¿No ves el modelo que buscas? Lo conseguimos", la nota de precios y botón de WhatsApp. Sin enlaces a la landing.

## Imágenes

- Ruta: `public/images/catalogo/<slug>/<producto>-<n>.jpg` y `cover.jpg`. Fotos verticales 4:5 (1000x1250).
- Extiende `scripts/placeholders.mjs` para que lea los `.ts` de `content/catalogs/` y genere un placeholder por cada imagen citada que no exista (cover 1200x630, el resto 1000x1250), sin sobrescribir las existentes.

## Contenido de muestra del primer catálogo: árboles de Navidad

Slug `arboles-de-navidad`, `sample: true`. 8 modelos de ejemplo en 5 tipos (Clásico, Nevado, Slim, Preiluminado, De mesa), alturas de 60 cm a 2.40 m, precios de muestra entre 290 y 2,890 MXN, pedido mínimo entre 4 y 24 piezas, 3 fotos por modelo (vista completa, detalle y ambientado) y 3 escalones de precio por volumen. Todos los datos son inventados y quedan marcados como muestra para reemplazarlos por los reales.

## Calidad

- Totalmente responsive; revisa con Playwright a 375, 768, 1024, 1366 y 1920 px, incluyendo el lightbox abierto en cada ancho. El rango de tablet se diseña explícitamente.
- Accesibilidad AA: foco visible, `aria-labelledby` en el diálogo, `aria-pressed` en los chips, alt descriptivos, navegación completa por teclado, contraste verificado.
- `prefers-reduced-motion` respetado en todas las animaciones.
- Eventos de analítica con `track` de `lib/analytics.ts`: apertura de producto (`catalog_product_open`) y clics de WhatsApp.
- `npx tsc --noEmit`, `npm run lint` y `npm run build` sin errores.

## Criterios de terminado

- [ ] `/catalogo/arboles-de-navidad` funciona y se ve al nivel del resto del sitio.
- [ ] Filtros, orden, lightbox, galería, enlace directo por producto y botón Atrás funcionan.
- [ ] La landing no enlaza a la página, el sitemap y robots.txt no la mencionan, y responde con noindex.
- [ ] Agregar un catálogo nuevo requiere solo un archivo de datos y una línea en el registro.
- [ ] Capturas de Playwright revisadas en los 5 anchos.
- [ ] Al terminar, lista lo que debo completar: datos reales, fotos y la imagen `cover.jpg`.
