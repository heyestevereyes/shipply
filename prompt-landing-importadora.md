# Prompt para Claude Code: Landing page de importación por volumen

> Las 4 imágenes de referencia ya están en `/references` (`01-blueprint.png`, `02-goodgood.png`, `03-mavrin.png`, `04-foryou.png`).

---

## Rol y objetivo

Actúa como diseñador de producto senior y desarrollador frontend senior. Vas a diseñar y construir una landing page de alta conversión para **Shipply**, una empresa mexicana que importa mercancía desde fábricas en Asia para clientes que compran por volumen: contenedores completos, consolidados y programas de abasto recurrente.

La landing es la entrada de un **funnel de ventas B2B**. Su único trabajo es convertir visitantes calificados en solicitudes de cotización (lead con datos de volumen, presupuesto y contacto) o en llamadas agendadas. Cada sección debe empujar hacia esa acción.

El resultado debe verse como si lo hubiera diseñado y codeado un estudio profesional: con criterio tipográfico, ritmo visual, espacios generosos y microinteracciones pulidas. Nada que se vea a plantilla genérica.

Si existe un `CLAUDE.md` en el proyecto, síguelo como estándar de desarrollo y calidad.

---

## Paso 0: Antes de escribir código

1. Revisa las 4 imágenes en `/references`:
   - `01-blueprint.png`: **estructura** de landing de alta conversión (navbar, hero con un CTA principal, 3 beneficios, para quién, features, testimonios, integraciones, pricing con plan destacado, FAQ, footer).
   - `02-goodgood.png`: **vibe** del hero. Degradado radial de verde profundo a lima, serif editorial grande, eyebrow en mayúsculas con tracking, botones tipo píldora (uno sólido, uno outline).
   - `03-mavrin.png`: **hero en dos columnas** con widget de producto flotante a la derecha, palabra clave resaltada con bloque lima detrás, prueba social con avatares, franja de logos "As featured on".
   - `04-foryou.png`: **energía gráfica**. Formas diagonales lima, cards de servicios con color sólido y flecha circular, números grandes en lima para métricas, títulos bold con una palabra en color.
2. Escríbeme en 5 a 8 líneas la dirección visual que vas a seguir y el plan de secciones. Luego construye sin esperar confirmación.
3. Construye sección por sección y verifica cada una visualmente antes de pasar a la siguiente.

---

## Stack y estándares técnicos

- **Next.js** (App Router) + TypeScript.
- **Tailwind v4** con tokens definidos vía `@theme` en `globals.css` (sin `tailwind.config.ts`).
- **Framer Motion** para entradas y microinteracciones; **GSAP + ScrollTrigger** para la animación de la ruta de embarque y momentos ligados al scroll.
- Componente reutilizable `AnimatedSection` (fade in + translateY al entrar en viewport) en lugar de animaciones ad hoc. Todo respeta `prefers-reduced-motion`.
- **react-hook-form + zod** para el formulario de cotización.
- **Todo el copy** vive en `/content/site.ts` (un solo objeto tipado) para poder editarlo sin tocar componentes. Los datos que deben confirmarse con el cliente llevan la marca `[confirmar]` o `[XX]` dentro del texto.
- `next/image` con AVIF/WebP, `sizes` correctos, `priority` solo en la imagen del hero.
- Idioma `es-MX`. Metadata completa, Open Graph, favicon, y JSON-LD de `Organization` y `FAQPage`.
- Accesibilidad WCAG 2.1 AA: contraste verificado (ojo: texto lima sobre crema NO pasa, úsalo solo sobre fondos oscuros), foco visible, navegación por teclado en FAQ, formulario y menú móvil, `alt` descriptivos.
- Rendimiento: Lighthouse 90+ en las cuatro categorías en móvil.
- Despliegue previsto en Vercel.

### Responsive

Totalmente responsive con escala fluida basada en `clamp()`. Diseña móvil y tablet con criterio propio de UX, no como un escritorio encogido. El rango de tablet (768 a 1024px) se diseña explícitamente con breakpoints `md:` y `lg:` en **todas** las secciones.

Verificación obligatoria: instala Playwright como devDependency y genera capturas de página completa a **375, 768, 1024, 1366 y 1920px**. Revisa cada captura, corrige lo que se vea roto o desbalanceado y repite hasta que todo esté limpio.

---

## Dirección visual

### Concepto

**"De la fábrica a tu bodega."** El hilo gráfico es una **ruta de embarque**: una línea (punteada o continua, en lima) que se dibuja con el scroll y conecta las secciones clave como si siguiera un contenedor desde el origen hasta la entrega. Debe sentirse sutil y elegante, no infantil.

### Paleta (tokens en `@theme`)

| Token | Hex | Uso |
|---|---|---|
| `--color-ink` | `#0A1F16` | Fondo oscuro principal, footer |
| `--color-forest` | `#12382A` | Secciones oscuras secundarias, cards sobre ink |
| `--color-moss` | `#1F5A3F` | Degradados, bordes en oscuro |
| `--color-lime` | `#C9F26B` | Acento, CTA principal, resaltados, números |
| `--color-lime-soft` | `#E6F8B8` | Fondos de chips y estados |
| `--color-cream` | `#F3F0E7` | Secciones claras |
| `--color-paper` | `#FAF9F5` | Cards sobre crema |
| `--color-stone` | `#6B7468` | Texto secundario |

Alterna secciones oscuras y claras para crear ritmo. El hero usa un **degradado radial** de `ink` a `moss` con un brillo lima difuso en la parte inferior, al estilo de la referencia de Good Good.

### Tipografía (Google Fonts vía `next/font`)

- **Geist** (o Inter Tight) para titulares y cuerpo. Titulares en 600/700 con tracking negativo (`-0.03em`) y line-height ajustado.
- **Instrument Serif** en itálica para palabras de acento dentro de titulares (mezcla editorial de la referencia Good Good).
- **Geist Mono** para eyebrows, etiquetas de datos, números de embarque y estados del tracking.
- Escala grande y con contraste: el H1 debe dominar la pantalla en escritorio.

### Lenguaje de componentes

- Botones tipo **píldora**. Primario: fondo lima, texto ink. Secundario: outline. Hover con flecha que se desplaza y un efecto magnético muy sutil.
- Cards con radio de 20 a 28px, sombras suaves y difusas, borde de 1px en oscuro (`moss` con opacidad).
- **Palabra resaltada** con bloque lima detrás (como "Sales Success." en Mavrin) que se "pinta" de izquierda a derecha al cargar.
- **Formas diagonales lima** (referencia ForYou y blueprint) usadas con moderación, máximo en 2 secciones: modelos de servicio y CTA final.
- Iconografía lineal consistente (Lucide), trazo de 1.5px.
- Grano o ruido muy sutil sobre los degradados oscuros para darles textura.

### Microinteracciones

- Contadores animados en las métricas al entrar en viewport.
- Marquee infinito y lento en la franja de categorías o aliados (pausa al hover).
- El widget de tracking del hero avanza sus estados en secuencia (Producción ✓, Inspección ✓, En tránsito activo con pulso).
- Cards con lift y cambio de borde al hover.
- FAQ con acordeón animado por altura.
- Navbar que se vuelve sólida con blur al hacer scroll.
- En móvil: barra fija inferior con CTA "Cotizar" que aparece después del hero.
- Botón flotante de WhatsApp con mensaje prellenado.

---

## Imágenes

Las imágenes deben comunicar comercio internacional, logística y volumen. **Nada que remita visualmente a China**: sin caracteres chinos, sin linternas rojas, sin banderas, sin pagodas ni arquitectura típica, sin estereotipos. Tampoco logos de navieras reales ni texto legible en contenedores. El protagonista es el producto, el volumen y la operación bien hecha.

Dirección fotográfica: luz natural, tonos fríos y neutros con un grade ligeramente verde para integrarse a la paleta, composición limpia, sensación premium y documental. Personas latinoamericanas o de apariencia diversa en contextos de bodega y oficina en México.

Usa placeholders en `/public/images/` con estos nombres exactos para que yo los reemplace con imágenes generadas. Mientras tanto, usa un fondo `forest` con el nombre del archivo centrado como placeholder.

| Archivo | Sección | Descripción / prompt sugerido |
|---|---|---|
| `hero-port.jpg` | Hero | Aerial view of a modern container port at dusk, stacked unbranded shipping containers in muted green, teal and white tones, gantry cranes, calm ocean, cinematic, soft haze, no text, no logos |
| `warehouse-pallets.jpg` | Beneficios | Clean modern warehouse in Mexico, tall racks with shrink wrapped pallets of cardboard boxes, forklift, natural skylight, cool neutral tones, no text |
| `qc-inspection.jpg` | Proceso / Calidad | Quality inspector with tablet checking product samples on a white table in a factory, measuring tape and checklist, hands and product in focus, documentary style, no text on products |
| `container-loading.jpg` | Proceso / Embarque | Workers loading boxes into an open unbranded 40ft container at a loading dock, organized stacking, golden hour light, no logos |
| `cargo-ship.jpg` | Modelos de servicio | Large cargo ship at sea from a low angle, unbranded containers, deep green ocean, overcast premium light, no text |
| `distribution-team.jpg` | Para quién | Latin American business owner reviewing inventory with a colleague in a distribution warehouse, confident, natural light, candid |
| `retail-shelf.jpg` | Para quién | Well stocked modern retail shelf with unbranded home and kitchen products, clean merchandising, soft light |
| `industrial-supplies.jpg` | Para quién | Industrial supplies and packaging materials neatly organized on pallets, cardboard, tools, rolls of film, neutral tones |
| `customs-docs.jpg` | Servicios | Close up of hands reviewing shipping documents and a laptop with a logistics dashboard on a desk, shallow depth of field, no readable text |
| `cat-*.jpg` (8) | Categorías | Producto unbranded sobre fondo crema liso, iluminación de estudio suave: hogar y cocina, ferretería, empaque, textil, electrónica, belleza, juguetes, mobiliario |

---

## Estructura y copy

Escribe el copy exactamente como está aquí (puedes ajustar longitudes si el diseño lo exige, sin cambiar el sentido). Tono: profesional, directo, cercano, en tuteo, sin exageraciones. **Regla de estilo: no uses guiones largos ni guiones como puntuación en ningún texto visible.** Usa puntos, comas o dos puntos.

### 1. Navbar

- Logo: wordmark `Shipply` en texto hasta tener el logo final.
- Links: Cómo funciona · Servicios · Modelos · Preguntas
- Secundario: "Agendar llamada" (outline). Primario: "Cotizar importación" (lima).
- Móvil: menú hamburguesa a pantalla completa en `ink` con links grandes.

### 2. Hero (oscuro, degradado radial)

Layout de dos columnas en escritorio (texto a la izquierda, widget a la derecha), apilado en móvil.

- Chip superior: `Nuevo` + "Importación B2B por contenedor"
- **H1:** "Importa por volumen. *Sin sorpresas.*" (la segunda parte con bloque lima detrás o en Instrument Serif itálica)
- **Subtítulo:** "Encontramos la fábrica correcta, negociamos por ti, inspeccionamos la calidad y llevamos tu mercancía hasta tu bodega en México. Tú te enfocas en vender."
- CTA primario: "Cotizar mi importación" → `#cotizar`
- CTA secundario: "Ver cómo funciona" → `#proceso`
- Prueba social: 4 avatares + "[XX]+ empresas en México ya importan con nosotros"

**Widget de tracking flotante** (card blanca o `paper` con sombra profunda y una línea lima curva que la atraviesa, como en Mavrin):

```
Embarque  MX-2048                  [En tránsito]
Origen     Fábrica verificada, Asia
Destino    Manzanillo, Col. → Bodega CDMX
Carga      Contenedor 40' HC · 1,240 cajas
───────────────────────────────────────────
● Producción     ✓
● Inspección     ✓  Reporte aprobado
● En tránsito    ◉  ETA 18 días
○ Aduana
○ Entrega
[ Ver reporte de inspección → ]
```

Debajo del hero, franja de métricas con contadores:

- "[000]+" contenedores entregados
- "[00]%" embarques sin incidencias
- "[000]+" fábricas verificadas
- "[00] días" promedio de fábrica a bodega

### 3. El problema (crema)

- Eyebrow: `EL PROBLEMA`
- **H2:** "Importar por tu cuenta suele salir más caro de lo que parece."
- 4 cards compactas con ícono:
  1. **Proveedores que no son fábrica.** Intermediarios que inflan el precio y dejan de responder después del anticipo.
  2. **Calidad distinta a la muestra.** Te das cuenta cuando la mercancía ya está en tu bodega y ya no hay nada que hacer.
  3. **Costos que nadie te explicó.** Fletes, maniobras, impuestos y almacenajes que aparecen al final y se comen tu margen.
  4. **Tiempos sin control.** Sin seguimiento, sin fechas reales y sin una persona responsable.

### 4. Beneficios (crema, 3 cards con imagen)

- Eyebrow: `LO QUE OBTIENES`
- **H2:** "Un socio de importación que responde por *cada contenedor*."
- 3 cards (imagen arriba, título y descripción abajo):
  1. **Precio de fábrica, no de intermediario.** Trabajamos directo con fábricas verificadas y negociamos condiciones por volumen a tu favor.
  2. **Calidad comprobada antes de pagar el saldo.** Inspeccionamos tu producción y recibes un reporte con fotos antes de liberar el pago final.
  3. **Costo total desde el primer día.** Tu cotización incluye producto, flete, aduana, impuestos y entrega. Sabes cuánto te cuesta cada pieza puesta en tu bodega.

### 5. Para quién (oscuro)

- Eyebrow: `PARA QUIÉN ES`
- **H2:** "Hecho para empresas que compran en serio."
- 3 cards con foto circular o recortada y texto de 1 a 2 líneas:
  1. **Distribuidores y mayoristas.** Mejora tu margen comprando directo y asegura inventario constante para tus clientes.
  2. **Retail, e-commerce y marcas propias.** Desarrolla productos con tu marca y abastece tus tiendas o canales como Mercado Libre, Amazon o Shopify.
  3. **Empresas e industria.** Insumos, empaques, herramienta y refacciones con especificaciones claras y entregas programadas.

### 6. Cómo funciona (oscuro, `id="proceso"`)

Aquí vive la **ruta de embarque animada**: una línea lima que se dibuja con el scroll y conecta los 6 pasos (vertical en móvil, en zigzag u horizontal en escritorio).

- Eyebrow: `CÓMO FUNCIONA`
- **H2:** "De la fábrica a tu bodega en 6 pasos."
- Pasos (número en Geist Mono):
  - **01 Brief.** Nos cuentas qué necesitas, volumen, presupuesto y fecha objetivo.
  - **02 Búsqueda y cotización.** Comparamos fábricas verificadas y te presentamos opciones con costo total aterrizado.
  - **03 Muestras.** Validas producto, empaque y especificaciones antes de producir.
  - **04 Producción e inspección.** Damos seguimiento a la producción e inspeccionamos antes del embarque, con reporte fotográfico.
  - **05 Embarque.** Consolidado o contenedor completo, con seguimiento hasta el puerto mexicano.
  - **06 Aduana y entrega.** Despacho aduanal y entrega en tu bodega, sin cargos sorpresa.
- CTA al final: "Empezar con mi brief" → `#cotizar`

### 7. Servicios (crema, bento grid, `id="servicios"`)

- Eyebrow: `SERVICIOS`
- **H2:** "Todo lo que necesitas para importar, *en un solo lugar*."
- Bento de 6 piezas (máximo 6, tamaños variados, una card grande con visual del dashboard de seguimiento):
  1. **Búsqueda y verificación de fábricas.** Auditamos licencias, capacidad e historial antes de recomendarte un proveedor.
  2. **Negociación y contratos.** Precio, tiempos, especificaciones y penalizaciones por escrito.
  3. **Control de calidad.** Inspección durante y antes del embarque, con criterios que tú apruebas.
  4. **Logística marítima.** Consolidado (LCL) o contenedor completo (FCL) de 20' y 40'.
  5. **Aduana y cumplimiento.** Despacho aduanal, revisión de NOM y etiquetado para que tu mercancía entre sin contratiempos.
  6. **Marca propia.** Personalización de producto, empaque y etiqueta con tu marca.
- Card grande destacada: **Seguimiento en tiempo real.** "Sabes dónde está tu mercancía en cada etapa, con fechas reales y un ejecutivo asignado." Incluye un mini dashboard ilustrado en UI (no imagen) con barra de progreso y estados.

### 8. Categorías (crema, marquee o grid)

- Eyebrow: `QUÉ IMPORTAMOS`
- **H2:** "Si se fabrica en volumen, lo podemos traer."
- 8 tiles con imagen y nombre: Hogar y cocina · Ferretería y herramienta · Empaque y embalaje · Textil y uniformes · Electrónica y accesorios · Belleza y cuidado personal · Juguetes y temporada · Mobiliario y decoración
- Línea final: "¿Tu producto no está aquí? Cuéntanos qué buscas." → `#cotizar`

### 9. Testimonios (bloque `forest` grande con acentos lima)

- Eyebrow: `CLIENTES`
- **H2:** "Empresas que ya importan con *confianza*."
- Carrusel o grid de 3 testimonios. **Son placeholders y deben marcarse como tales en `site.ts` con `placeholder: true`** para reemplazarse por testimonios reales:
  1. "Antes comprábamos a un distribuidor nacional. Ahora importamos directo y nuestro margen subió de forma importante desde el primer contenedor." **[Nombre], Director Comercial, [Empresa], Guadalajara.** Chip: "[XX]% de ahorro vs. proveedor anterior"
  2. "Lo que más valoro es el reporte de inspección. Sé exactamente qué viene en el contenedor antes de pagar el saldo." **[Nombre], Compras, [Empresa], Monterrey.** Chip: "[X] contenedores al año"
  3. "Lanzamos nuestra marca propia sin haber importado nunca. Nos guiaron en cada paso, incluida la aduana." **[Nombre], Fundadora, [Marca], CDMX.** Chip: "Primera importación en [XX] días"
- Debajo: calificación promedio "[4.9]/5" con estrellas y "[XX] reseñas verificadas".

### 10. Respaldo (crema)

- **H3:** "Trabajamos con navieras, agentes aduanales e inspectores de calidad certificados."
- Fila de logos en gris (placeholders `logoipsum`). Solo se reemplazan por aliados reales confirmados.
- 3 garantías con ícono:
  - **Pagos por etapas.** Nunca pagas el 100% por adelantado.
  - **Reporte antes del saldo.** Liberas el pago final con evidencia en mano.
  - **Contrato y factura en México.** Operación formal y transparente.

### 11. Modelos de servicio (crema con formas diagonales lima detrás, `id="modelos"`)

Adaptación de la sección de pricing del blueprint. Tres cards; la del centro destacada (más alta, fondo `ink`, badge "El más elegido").

- Eyebrow: `MODELOS DE SERVICIO`
- **H2:** "Elige cómo quieres importar."
- **Consolidado (LCL).** "Para tu primer pedido o volúmenes que no llenan un contenedor." Incluye: búsqueda de proveedor, inspección de calidad, flete consolidado, aduana y entrega. Precio: "Comisión desde [X]% [confirmar]". CTA: "Cotizar consolidado"
- **Contenedor completo (FCL)** ⭐ El más elegido. "El menor costo por pieza para compras de alto volumen." Incluye: todo lo de Consolidado, contenedor de 20' o 40', ejecutivo dedicado, inspección durante producción, prioridad en tiempos. Precio: "Comisión desde [X]% [confirmar]". CTA: "Cotizar contenedor"
- **Programa de abasto.** "Para empresas que importan de forma recurrente." Incluye: calendario anual de embarques, condiciones preferentes con fábricas, reportes mensuales, ejecutivo y bodega aliada. Precio: "A la medida". CTA: "Agendar llamada"
- Muestra con checks lima qué incluye cada modelo y marca con un check vacío lo que no incluye, para que las diferencias sean evidentes.

### 12. Cotizador (oscuro, `id="cotizar"`). LA SECCIÓN MÁS IMPORTANTE

- **H2:** "Cotiza tu importación en *2 minutos*."
- Subtítulo: "Recibe una propuesta con costo total aterrizado en menos de [48] horas hábiles."
- A un lado: 3 bullets de confianza (sin compromiso, tus datos están protegidos, respuesta de un especialista real) y un bloque de "¿Prefieres hablar?" con botón a WhatsApp y a agenda.

**Formulario multi paso** (barra de progreso, transición suave entre pasos, validación por paso, se puede regresar):

1. **¿Qué quieres importar?** Categoría (select con las 8 categorías + "Otro") y descripción del producto (textarea, placeholder: "Ej. 5,000 juegos de vasos de vidrio con empaque personalizado").
2. **¿De qué volumen hablamos?** Opciones en cards seleccionables: Primer pedido / consolidado · 1 contenedor de 20' · 1 contenedor de 40' · Varios contenedores al año. Presupuesto aproximado en USD: Menos de $10,000 · $10,000 a $30,000 · $30,000 a $80,000 · Más de $80,000.
3. **Tu operación.** ¿Ya has importado antes? (Sí / No). ¿Cuentas con padrón de importadores? (Sí / No / No sé). ¿Para cuándo necesitas la mercancía? (Menos de 2 meses · 2 a 4 meses · Más de 4 meses).
4. **Tus datos.** Nombre, empresa, WhatsApp (con lada +52), correo, ciudad. Checkbox de aceptación del Aviso de Privacidad (obligatorio).

- Botón final: "Enviar y recibir mi cotización"
- **Lógica de calificación:** si el presupuesto es "Menos de $10,000", el mensaje de éxito sugiere el modelo Consolidado. Si elige "Varios contenedores al año" o "Más de $80,000", el éxito muestra el embed de agenda (placeholder de Calendly / Cal.com vía `NEXT_PUBLIC_BOOKING_URL`) para agendar llamada de inmediato.
- **Envío:** API route `/api/lead` que valida con zod y hace POST a `process.env.LEAD_WEBHOOK_URL` (para conectar n8n, Make o CRM). Incluye honeypot anti spam, captura de UTMs y `referrer`, y timestamp.
- **Analítica:** eventos en `dataLayer` (`cta_click` con ubicación, `form_step` con número de paso, `generate_lead` con volumen y presupuesto). Deja preparados los scripts de GA4 y Meta Pixel vía variables de entorno, desactivados si la variable no existe.
- Estado de éxito con animación y mensaje: "Listo, [Nombre]. Un especialista revisará tu solicitud y te contactará por WhatsApp en menos de [48] horas hábiles."

### 13. Preguntas frecuentes (crema, `id="preguntas"`)

- Eyebrow: `PREGUNTAS FRECUENTES`
- **H2:** "Lo que todos preguntan antes de su primer contenedor."
- Acordeón (el primero abierto):
  1. **¿Cuál es el pedido mínimo?** Depende del producto y de la fábrica. Si tu volumen no llena un contenedor, lo enviamos en consolidado para que pagues solo el espacio que ocupas. [confirmar mínimo]
  2. **¿Necesito padrón de importadores?** Si ya lo tienes, importamos a tu nombre. Si aún no lo tienes, te asesoramos para tramitarlo o te ofrecemos alternativas para que puedas importar mientras tanto. [confirmar esquema]
  3. **¿Cuánto tarda una importación?** Normalmente entre [X] y [X] semanas de fábrica a bodega, según el tiempo de producción y la ruta. Te damos fechas estimadas desde la cotización y te avisamos de cualquier cambio.
  4. **¿Cómo sé que la mercancía tendrá la calidad que pedí?** Validas muestras antes de producir y hacemos inspección antes del embarque con reporte fotográfico. Si algo no cumple, se corrige antes de que salga de origen.
  5. **¿Qué incluye el costo total aterrizado?** Producto, flete internacional, seguro, impuestos de importación, despacho aduanal y entrega en tu bodega. Así conoces el costo real por pieza antes de decidir.
  6. **¿Cómo se hacen los pagos?** Por etapas: un anticipo para iniciar producción y el saldo después de aprobar la inspección. Nunca pagas el total por adelantado. [confirmar porcentajes]
  7. **¿Pueden fabricar con mi marca?** Sí. Desarrollamos producto, empaque y etiquetado con tu marca, cumpliendo la normatividad mexicana aplicable.
  8. **¿Qué pasa si hay un problema con el embarque?** Tienes un ejecutivo asignado que da seguimiento de principio a fin y responde por la solución con la fábrica, la naviera o la aduana.

### 14. CTA final (degradado radial verde a lima, formas diagonales)

- **H2:** "Tu próximo contenedor empieza con *una conversación*."
- Subtítulo: "Cuéntanos qué quieres importar y recibe una propuesta clara, con números reales."
- Botones: "Cotizar mi importación" (sólido `ink`) y "Hablar por WhatsApp" (outline).

### 15. Footer (`ink`)

- Wordmark `Shipply` + línea: "Importación por volumen, de la fábrica a tu bodega."
- Columnas: **Menú** (Cómo funciona, Servicios, Modelos, Preguntas) · **Legal** (Aviso de privacidad, Términos y condiciones) · **Contacto** (WhatsApp, correo [confirmar], ciudad [confirmar]) · **Redes** (íconos de LinkedIn, Instagram, Facebook, YouTube).
- Línea inferior: "© 2026 Shipply. Todos los derechos reservados."
- Crea la página `/aviso-de-privacidad` con un texto base conforme a la LFPDPPP marcado como borrador para revisión legal.

---

## Variables de entorno (`.env.example`)

```
LEAD_WEBHOOK_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=52XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola, quiero cotizar una importación
NEXT_PUBLIC_BOOKING_URL=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_SITE_URL=
```

---

## Criterios de terminado

- [ ] Las 15 secciones construidas con el copy de `site.ts`, sin guiones como puntuación en textos visibles.
- [ ] Ninguna imagen ni elemento gráfico remite visualmente a China.
- [ ] Formulario multi paso funcionando de punta a punta: validación, lógica de calificación, envío al webhook, estado de éxito y eventos de analítica.
- [ ] Ruta de embarque animada con GSAP, contadores, marquee, widget del hero y highlight del H1 funcionando, y desactivados con `prefers-reduced-motion`.
- [ ] Capturas de Playwright a 375, 768, 1024, 1366 y 1920px revisadas y sin problemas de layout.
- [ ] Contraste AA verificado, navegación completa por teclado.
- [ ] Lighthouse móvil 90+ en las cuatro categorías.
- [ ] `npm run build` sin errores ni warnings de TypeScript o ESLint.
- [ ] Al terminar, entrégame una lista de todos los `[XX]`, `[confirmar]` y placeholders de imagen y testimonios que debo completar.
