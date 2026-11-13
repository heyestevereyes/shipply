/**
 * Todo el copy de la landing vive aquí.
 *
 * Convenciones:
 * - En titulares, el texto entre *asteriscos* se renderiza como acento
 *   (Instrument Serif itálica o bloque lima, según la sección).
 * - Los datos por confirmar con el cliente llevan [XX], [X], [000] o [confirmar].
 * - Regla de estilo: sin guiones largos ni guiones como puntuación en texto visible.
 */

export const categories = [
  { id: "hogar-cocina", label: "Hogar y cocina", image: "/images/cat-hogar-cocina.jpg", alt: "Utensilios de cocina y artículos para el hogar sin marca sobre fondo crema" },
  { id: "ferreteria", label: "Ferretería y herramienta", image: "/images/cat-ferreteria.jpg", alt: "Herramientas manuales y piezas de ferretería sin marca sobre fondo crema" },
  { id: "empaque", label: "Empaque y embalaje", image: "/images/cat-empaque.jpg", alt: "Cajas de cartón, cinta y materiales de embalaje sobre fondo crema" },
  { id: "textil", label: "Textil y uniformes", image: "/images/cat-textil.jpg", alt: "Prendas y uniformes doblados sin marca sobre fondo crema" },
  { id: "electronica", label: "Electrónica y accesorios", image: "/images/cat-electronica.jpg", alt: "Accesorios electrónicos sin marca como cables y audífonos sobre fondo crema" },
  { id: "belleza", label: "Belleza y cuidado personal", image: "/images/cat-belleza.jpg", alt: "Envases de cosméticos y cuidado personal sin marca sobre fondo crema" },
  { id: "juguetes", label: "Juguetes y temporada", image: "/images/cat-juguetes.jpg", alt: "Juguetes y artículos de temporada sin marca sobre fondo crema" },
  { id: "mobiliario", label: "Mobiliario y decoración", image: "/images/cat-mobiliario.jpg", alt: "Silla y objetos decorativos sin marca sobre fondo crema" },
] as const;

export const site = {
  brand: {
    name: "Shipply",
    tagline: "Cualquier producto que imagines, en el volumen que tu negocio necesita.",
    description:
      "Shipply importa cualquier producto que imagines para tu negocio, desde tu primer pedido hasta contenedores completos, directo de fábricas verificadas en Asia: búsqueda de proveedor, negociación, inspección de calidad, logística y aduana con costo total aterrizado.",
    email: "hola@shipply.mx [confirmar]",
    city: "Ciudad de México [confirmar]",
  },

  seo: {
    title: "Shipply | Importa cualquier producto para tu negocio, en el volumen que necesitas",
    description:
      "Importa cualquier producto que imagines para tu negocio, desde tu primer pedido hasta contenedores completos. Encontramos la fábrica, negociamos, cuidamos la calidad y llevamos tu mercancía hasta México con costo total aterrizado.",
    ogTitle: "Importa cualquier producto que imagines para tu negocio | Shipply",
  },

  nav: {
    links: [
      { label: "Cómo funciona", href: "#proceso" },
      { label: "Servicios", href: "#servicios" },
      { label: "Modelos", href: "#modelos" },
      { label: "Preguntas", href: "#preguntas" },
    ],
    secondary: { label: "Agendar llamada", href: "#cotizar" },
    primary: { label: "Cotizar importación", href: "#cotizar" },
    mobileCta: "Cotizar",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },

  hero: {
    chipTag: "Nuevo",
    chip: "Cualquier producto. Cualquier volumen.",
    titleLead: "Importa cualquier producto que imagines",
    titleAccent: "para tu negocio.",
    subtitle:
      "En el volumen que necesites, desde tu primer pedido hasta contenedores completos. Encontramos la fábrica correcta, negociamos por ti, cuidamos la calidad y llevamos tu mercancía hasta México. Tú te enfocas en vender.",
    primary: { label: "Cotizar mi importación", href: "#cotizar" },
    secondary: { label: "Ver cómo funciona", href: "#proceso" },
    social: "[XX]+ empresas en México ya importan con nosotros",
    image: {
      src: "/images/hero-port.jpg",
      alt: "Vista aérea de un puerto moderno al atardecer con contenedores sin marca y grúas pórtico",
    },
    widget: {
      label: "Embarque",
      id: "MX-2048",
      status: "En tránsito",
      rows: [
        { k: "Origen", v: "Fábrica verificada, Asia" },
        { k: "Destino", v: "Manzanillo, Col. → Bodega CDMX" },
        { k: "Carga", v: "Consolidado · 6 m³ · 180 cajas" },
      ],
      steps: [
        { label: "Producción", note: "" },
        { label: "Inspección", note: "Reporte aprobado" },
        { label: "En tránsito", note: "ETA 18 días" },
        { label: "Aduana", note: "" },
        { label: "Entrega", note: "" },
      ],
      /** índice del paso activo (los anteriores quedan completos) */
      activeStep: 2,
      cta: "Ver reporte de inspección",
    },
  },

  metrics: [
    { value: 0, display: "[000]", suffix: "+", label: "productos distintos importados" },
    { value: 0, display: "[00]", suffix: "%", label: "entregas sin incidencias" },
    { value: 0, display: "[000]", suffix: "+", label: "pedidos entregados, de 1 caja a 1 contenedor" },
    { value: 0, display: "[00]", suffix: " días", label: "promedio de fábrica a tu negocio" },
  ],

  problem: {
    eyebrow: "El problema",
    title: "Conseguir el producto que imaginas no debería ser *tan complicado*.",
    items: [
      { icon: "factory", title: "No sabes quién lo fabrica.", text: "Tienes la idea o la referencia, pero no sabes qué fábrica lo hace bien ni cómo negociar con ella." },
      { icon: "boxes", title: "Mínimos que no te quedan.", text: "Proveedores que solo venden por contenedor y te obligan a comprar mucho más de lo que necesitas." },
      { icon: "package-x", title: "Calidad distinta a la muestra.", text: "Te das cuenta cuando la mercancía ya está en tu bodega y ya no hay nada que hacer." },
      { icon: "receipt", title: "Costos que nadie te explicó.", text: "Fletes, maniobras, impuestos y almacenajes que aparecen al final y se comen tu margen." },
    ],
  },

  benefits: {
    eyebrow: "Lo que obtienes",
    title: "Tú lo imaginas. *Nosotros lo traemos.*",
    items: [
      {
        title: "Cualquier producto, como lo imaginas.",
        text: "De catálogo o desarrollado a tu medida, con tu marca. Encontramos la fábrica que lo hace bien y negociamos precio de fábrica, no de intermediario.",
        image: "/images/qc-inspection.jpg",
        alt: "Inspector de calidad revisando muestras de producto con una tableta en una mesa de fábrica",
      },
      {
        title: "En el volumen que tu negocio necesita.",
        text: "Empieza con un pedido pequeño para probar y crece a contenedores completos cuando vendas más. Sin comprar de más.",
        image: "/images/container-loading.jpg",
        alt: "Personal cargando cajas en un contenedor sin marca en un andén",
      },
      {
        title: "Calidad y costo claros desde el día uno.",
        text: "Inspeccionamos antes de que pagues el saldo y tu cotización incluye producto, flete, aduana e impuestos puestos en tu negocio.",
        image: "/images/warehouse-pallets.jpg",
        alt: "Bodega moderna con racks altos y tarimas emplayadas de cajas de cartón",
      },
    ],
  },

  audience: {
    eyebrow: "Para quién es",
    title: "Para negocios de *todos los tamaños*.",
    profileLabel: "Perfil",
    items: [
      {
        title: "Tiendas, e-commerce y marcas propias.",
        text: "Haz tu primera importación con un pedido a tu medida, sin llenar un contenedor, y vende en tu tienda, Mercado Libre, Amazon o Shopify.",
        image: "/images/retail-shelf.jpg",
        alt: "Anaquel de tienda bien surtido con productos de hogar y cocina sin marca",
      },
      {
        title: "Distribuidores y mayoristas.",
        text: "Compra directo, mejora tu margen y crece de pedidos consolidados a contenedores completos cuando tu negocio lo pida.",
        image: "/images/distribution-team.jpg",
        alt: "Empresario latinoamericano revisando inventario con una colega en un centro de distribución",
      },
      {
        title: "Empresas e industria.",
        text: "Insumos, empaques, herramienta y refacciones con tus especificaciones, en el volumen exacto que consume tu operación.",
        image: "/images/industrial-supplies.jpg",
        alt: "Insumos industriales y materiales de empaque ordenados sobre tarimas",
      },
    ],
  },

  process: {
    id: "proceso",
    eyebrow: "Cómo funciona",
    title: "De tu idea a tu negocio *en 6 pasos*.",
    steps: [
      { n: "01", title: "Brief.", text: "Nos cuentas qué producto imaginas, cuánto necesitas, tu presupuesto y fecha objetivo.", tag: "Día 0" },
      { n: "02", title: "Búsqueda y cotización.", text: "Encontramos fábricas verificadas que pueden hacerlo en tu volumen y te presentamos opciones con costo total aterrizado.", tag: "Origen" },
      { n: "03", title: "Muestras.", text: "Validas producto, empaque y especificaciones antes de producir.", tag: "Validación" },
      { n: "04", title: "Producción e inspección.", text: "Damos seguimiento a la producción e inspeccionamos antes del embarque, con reporte fotográfico.", tag: "Calidad" },
      { n: "05", title: "Embarque.", text: "Consolidado para pedidos pequeños o contenedor completo según tu volumen, con seguimiento hasta México.", tag: "Tránsito" },
      { n: "06", title: "Aduana y entrega.", text: "Despacho aduanal y entrega en tu negocio o bodega, sin cargos sorpresa.", tag: "Destino" },
    ],
    cta: { label: "Empezar con mi brief", href: "#cotizar" },
  },

  services: {
    id: "servicios",
    eyebrow: "Servicios",
    title: "Todo lo que necesitas para importar, *en un solo lugar*.",
    featured: {
      label: "Destacado",
      title: "Seguimiento en tiempo real.",
      text: "Sabes dónde está tu mercancía en cada etapa, con fechas reales y un ejecutivo asignado.",
      dashboard: {
        title: "Tus embarques",
        live: "En vivo",
        shipments: [
          { id: "MX-2048", route: "Asia → CDMX", load: "40' HC", progress: 62, status: "En tránsito" },
          { id: "MX-2051", route: "Asia → GDL", load: "LCL · 14 m³", progress: 38, status: "Inspección" },
          { id: "MX-2039", route: "Asia → MTY", load: "20' GP", progress: 100, status: "Entregado" },
        ],
        exec: "Ejecutivo asignado",
        execName: "Andrea R. [ejemplo]",
      },
    },
    items: [
      { icon: "search", title: "Búsqueda y verificación de fábricas.", text: "Auditamos licencias, capacidad e historial antes de recomendarte un proveedor." },
      { icon: "handshake", title: "Negociación y contratos.", text: "Precio, tiempos, especificaciones y penalizaciones por escrito." },
      { icon: "clipboard", title: "Control de calidad.", text: "Inspección durante y antes del embarque, con criterios que tú apruebas." },
      { icon: "ship", title: "Logística a tu medida.", text: "Consolidado (LCL) para pedidos pequeños o contenedor completo (FCL) de 20' y 40' cuando tu volumen crece." },
      { icon: "file", title: "Aduana y cumplimiento.", text: "Despacho aduanal, revisión de NOM y etiquetado para que tu mercancía entre sin contratiempos." },
      { icon: "tag", title: "Desarrollo de producto y marca propia.", text: "Si lo imaginas, lo desarrollamos: producto, empaque y etiqueta con tu marca." },
    ],
    image: {
      src: "/images/customs-docs.jpg",
      alt: "Manos revisando documentos de embarque junto a una laptop con un tablero de logística",
    },
  },

  categories: {
    eyebrow: "Qué importamos",
    title: "Si lo puedes imaginar, *lo podemos traer*.",
    items: categories,
    footer: "¿Tu producto no está aquí?",
    footerLink: { label: "Cuéntanos qué imaginas.", href: "#cotizar" },
  },

  testimonials: {
    eyebrow: "Clientes",
    title: "Negocios que ya importan con *confianza*.",
    items: [
      {
        placeholder: true,
        quote:
          "Antes comprábamos a un distribuidor nacional. Ahora importamos directo y nuestro margen subió de forma importante desde el primer pedido.",
        name: "[Nombre]",
        role: "Director Comercial",
        company: "[Empresa]",
        city: "Guadalajara",
        chip: "[XX]% de ahorro vs. proveedor anterior",
        initials: "GD",
      },
      {
        placeholder: true,
        quote:
          "Lo que más valoro es el reporte de inspección. Sé exactamente qué viene en mi pedido antes de pagar el saldo.",
        name: "[Nombre]",
        role: "Compras",
        company: "[Empresa]",
        city: "Monterrey",
        chip: "[X] pedidos al año",
        initials: "MT",
      },
      {
        placeholder: true,
        quote:
          "Empezamos con un pedido pequeño para probar el producto y ya vamos por nuestro primer contenedor. Nos guiaron en cada paso, incluida la aduana.",
        name: "[Nombre]",
        role: "Fundadora",
        company: "[Marca]",
        city: "CDMX",
        chip: "Primera importación en [XX] días",
        initials: "CX",
      },
    ],
    rating: "[4.9]",
    ratingOutOf: "/5",
    reviews: "[XX] reseñas verificadas",
  },

  backing: {
    title: "Trabajamos con navieras, agentes aduanales e inspectores de calidad certificados.",
    logosNote: "Logos de ejemplo. Se reemplazan solo por aliados reales confirmados.",
    logoCount: 6,
    guarantees: [
      { icon: "wallet", title: "Pagos por etapas.", text: "Nunca pagas el 100% por adelantado." },
      { icon: "file-check", title: "Reporte antes del saldo.", text: "Liberas el pago final con evidencia en mano." },
      { icon: "badge", title: "Contrato y factura en México.", text: "Operación formal y transparente." },
    ],
  },

  plans: {
    id: "modelos",
    eyebrow: "Modelos de servicio",
    title: "El volumen que *tu negocio necesita*.",
    features: [
      "Búsqueda de proveedor",
      "Inspección de calidad",
      "Flete y aduana",
      "Entrega en tu bodega",
      "Contenedor de 20' o 40'",
      "Ejecutivo dedicado",
      "Inspección durante producción",
      "Prioridad en tiempos",
      "Calendario anual de embarques",
      "Condiciones preferentes con fábricas",
      "Reportes mensuales y bodega aliada",
    ],
    items: [
      {
        id: "lcl",
        name: "Pedido a tu medida",
        description: "Desde tu primer pedido. Ideal para probar productos o surtir tu negocio sin llenar un contenedor. Se envía en consolidado (LCL).",
        priceLabel: "Comisión desde",
        price: "[X]%",
        priceNote: "[confirmar]",
        includes: [0, 1, 2, 3],
        cta: { label: "Cotizar mi pedido", href: "#cotizar" },
        featured: false,
      },
      {
        id: "fcl",
        name: "Contenedor completo (FCL)",
        badge: "Menor costo por pieza",
        description: "Cuando tu volumen crece. Contenedor de 20' o 40' para tu propia mercancía.",
        priceLabel: "Comisión desde",
        price: "[X]%",
        priceNote: "[confirmar]",
        includes: [0, 1, 2, 3, 4, 5, 6, 7],
        cta: { label: "Cotizar contenedor", href: "#cotizar" },
        featured: true,
      },
      {
        id: "programa",
        name: "Programa de abasto",
        description: "Para empresas que importan de forma recurrente.",
        priceLabel: "Precio",
        price: "A la medida",
        priceNote: "",
        includes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        cta: { label: "Agendar llamada", href: "#cotizar" },
        featured: false,
      },
    ],
    included: "Incluido",
    notIncluded: "No incluido",
  },

  quote: {
    id: "cotizar",
    eyebrow: "Cotizador",
    title: "Cotiza tu importación en *2 minutos*.",
    subtitle: "Recibe una propuesta con costo total aterrizado en menos de [48] horas hábiles.",
    trust: [
      { icon: "check", text: "Sin compromiso. Cotizar no te obliga a nada." },
      { icon: "lock", text: "Tus datos están protegidos y no se comparten." },
      { icon: "user", text: "Te responde un especialista real, no un bot." },
    ],
    talk: {
      title: "¿Prefieres hablar?",
      text: "Escríbenos por WhatsApp o agenda una llamada de 20 minutos.",
      whatsapp: "WhatsApp",
      booking: "Agendar llamada",
    },
    loading: "Cargando el cotizador",
    stepLabel: "Paso",
    of: "de",
    back: "Atrás",
    next: "Continuar",
    submit: "Enviar y recibir mi cotización",
    sending: "Enviando…",
    error: "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.",
    steps: [
      { title: "¿Qué producto imaginas?", short: "Producto" },
      { title: "¿Cuánto necesitas?", short: "Volumen" },
      { title: "Tu operación.", short: "Operación" },
      { title: "Tus datos.", short: "Contacto" },
    ],
    fields: {
      category: { label: "Categoría", placeholder: "Selecciona una categoría", other: "Otro" },
      description: {
        label: "Describe tu producto",
        placeholder: "Ej. 300 termos de acero con mi logo, o 5,000 juegos de vasos con empaque personalizado",
      },
      volume: {
        label: "Volumen estimado",
        options: [
          { value: "consolidado", label: "Pedido a mi medida, no lleno un contenedor", hint: "Consolidado" },
          { value: "20", label: "1 contenedor de 20'", hint: "FCL" },
          { value: "40", label: "1 contenedor de 40'", hint: "FCL" },
          { value: "recurrente", label: "Compras recurrentes durante el año", hint: "Programa" },
        ],
      },
      budget: {
        label: "Presupuesto aproximado en USD",
        options: [
          { value: "lt10k", label: "Menos de $10,000" },
          { value: "10-30k", label: "$10,000 a $30,000" },
          { value: "30-80k", label: "$30,000 a $80,000" },
          { value: "gt80k", label: "Más de $80,000" },
        ],
      },
      imported: { label: "¿Ya has importado antes?", options: [{ value: "si", label: "Sí" }, { value: "no", label: "No" }] },
      padron: {
        label: "¿Cuentas con padrón de importadores?",
        options: [
          { value: "si", label: "Sí" },
          { value: "no", label: "No" },
          { value: "nose", label: "No sé" },
        ],
      },
      timeline: {
        label: "¿Para cuándo necesitas la mercancía?",
        options: [
          { value: "lt2", label: "Menos de 2 meses" },
          { value: "2-4", label: "2 a 4 meses" },
          { value: "gt4", label: "Más de 4 meses" },
        ],
      },
      name: { label: "Nombre", placeholder: "Tu nombre" },
      company: { label: "Empresa", placeholder: "Nombre de tu empresa" },
      whatsapp: { label: "WhatsApp", prefix: "+52", placeholder: "10 dígitos" },
      email: { label: "Correo", placeholder: "tu@empresa.com" },
      city: { label: "Ciudad", placeholder: "Ej. Guadalajara" },
      privacy: { before: "Acepto el ", link: "Aviso de Privacidad", after: " y el uso de mis datos para recibir mi cotización." },
    },
    errors: {
      category: "Selecciona una categoría.",
      description: "Cuéntanos un poco más (mínimo 10 caracteres).",
      volume: "Elige un volumen.",
      budget: "Elige un rango de presupuesto.",
      imported: "Elige una opción.",
      padron: "Elige una opción.",
      timeline: "Elige una opción.",
      name: "Escribe tu nombre.",
      company: "Escribe el nombre de tu empresa.",
      whatsapp: "Escribe un número de 10 dígitos.",
      email: "Escribe un correo válido.",
      city: "Escribe tu ciudad.",
      privacy: "Necesitamos tu aceptación para continuar.",
    },
    success: {
      title: "Listo, {name}.",
      text: "Un especialista revisará tu solicitud y te contactará por WhatsApp en menos de [48] horas hábiles.",
      lcl: "Por tu presupuesto, te recomendamos empezar con un pedido a tu medida en consolidado: no necesitas llenar un contenedor y pagas solo el espacio que ocupa tu mercancía.",
      booking: "Por el volumen que manejas, agenda ahora una llamada con un especialista y avanzamos más rápido.",
      bookingFallback: "Agenda tu llamada",
      bookingTitle: "Agenda una llamada con un especialista",
      bookingWhatsapp: "Hola, soy {name}. Acabo de enviar mi solicitud de cotización y quiero agendar una llamada.",
      again: "Enviar otra solicitud",
    },
  },

  faq: {
    id: "preguntas",
    eyebrow: "Preguntas frecuentes",
    title: "Lo que todos preguntan antes de *importar*.",
    items: [
      { q: "¿Qué tipo de productos pueden importar?", a: "Cualquier producto que imagines para tu negocio, de catálogo o desarrollado a tu medida: hogar, ferretería, empaque, textil, electrónica, belleza, juguetes, mobiliario y mucho más. Desde la cotización revisamos permisos y normas para confirmar que tu mercancía pueda entrar a México sin problema." },
      { q: "¿Cuál es el pedido mínimo?", a: "No necesitas llenar un contenedor. Importamos desde pedidos pequeños en consolidado, donde pagas solo el espacio que ocupa tu mercancía, hasta contenedores completos. El mínimo de producción lo define cada fábrica y te ayudamos a encontrar opciones que se ajusten a tu volumen. [confirmar mínimo]" },
      { q: "¿Necesito padrón de importadores?", a: "Si ya lo tienes, importamos a tu nombre. Si aún no lo tienes, te asesoramos para tramitarlo o te ofrecemos alternativas para que puedas importar mientras tanto. [confirmar esquema]" },
      { q: "¿Cuánto tarda una importación?", a: "Normalmente entre [X] y [X] semanas de fábrica a bodega, según el tiempo de producción y la ruta. Te damos fechas estimadas desde la cotización y te avisamos de cualquier cambio." },
      { q: "¿Cómo sé que la mercancía tendrá la calidad que pedí?", a: "Validas muestras antes de producir y hacemos inspección antes del embarque con reporte fotográfico. Si algo no cumple, se corrige antes de que salga de origen." },
      { q: "¿Qué incluye el costo total aterrizado?", a: "Producto, flete internacional, seguro, impuestos de importación, despacho aduanal y entrega en tu bodega. Así conoces el costo real por pieza antes de decidir." },
      { q: "¿Cómo se hacen los pagos?", a: "Por etapas: un anticipo para iniciar producción y el saldo después de aprobar la inspección. Nunca pagas el total por adelantado. [confirmar porcentajes]" },
      { q: "¿Pueden fabricar con mi marca?", a: "Sí. Desarrollamos producto, empaque y etiquetado con tu marca, cumpliendo la normatividad mexicana aplicable." },
      { q: "¿Qué pasa si hay un problema con el embarque?", a: "Tienes un ejecutivo asignado que da seguimiento de principio a fin y responde por la solución con la fábrica, la naviera o la aduana." },
    ],
  },

  finalCta: {
    title: "¿Qué producto imaginas para *tu negocio*?",
    subtitle: "Cuéntanos qué necesitas y cuánto, desde un pedido de prueba hasta contenedores, y recibe una propuesta clara con números reales.",
    primary: { label: "Cotizar mi importación", href: "#cotizar" },
    whatsapp: "Hablar por WhatsApp",
  },

  footer: {
    columns: {
      menu: "Menú",
      legal: "Legal",
      contact: "Contacto",
      social: "Redes",
    },
    legalLinks: [
      { label: "Aviso de privacidad", href: "/aviso-de-privacidad" },
      { label: "Términos y condiciones", href: "/aviso-de-privacidad#terminos" },
    ],
    socials: [
      { id: "linkedin", label: "LinkedIn", href: "#" },
      { id: "instagram", label: "Instagram", href: "#" },
      { id: "facebook", label: "Facebook", href: "#" },
      { id: "youtube", label: "YouTube", href: "#" },
    ],
    whatsapp: "WhatsApp",
    copyright: "© 2026 Shipply. Todos los derechos reservados.",
  },

  whatsappFab: "Escríbenos por WhatsApp",

  legal: { back: "Volver al inicio" },
} as const;

export type Site = typeof site;
