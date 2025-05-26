/* =========================================================================
   SCRIPT.JS PARA COMPARSA CARDO NEGRO
   Este archivo contiene toda la lógica JavaScript para la página web.
   Incluye funcionalidades para:
   - Menú hamburguesa responsivo
   - Acordeón de galería
   - Carrusel de imágenes en la sección hero
   ========================================================================= */

/* =========================================================================
   MENÚ HAMBURGUESA
   Controla la apertura y cierre del menú de navegación en pantallas pequeñas.
   Implementa un menú desplegable que se activa en dispositivos móviles.
   ========================================================================= */

// Selección de elementos del DOM necesarios para el menú hamburguesa
const hamburgerBtn = document.getElementById('hamburger-btn');  // Botón que activa el menú
const navUl = document.querySelector('nav#main-nav ul');        // Lista de navegación
const navLinks = document.querySelectorAll('nav#main-nav ul li a');  // Enlaces individuales

// Verificación de existencia de elementos antes de agregar funcionalidad
if (hamburgerBtn && navUl) {
    // Event listener para el clic en el botón hamburguesa
    hamburgerBtn.addEventListener('click', () => {
        // Toggle de clases para mostrar/ocultar menú y animar el botón
        navUl.classList.toggle('open');
        hamburgerBtn.classList.toggle('open');
        
        // Manejo de accesibilidad: actualiza el atributo aria-expanded
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true' || false;
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    });

    // Cierre del menú al hacer clic en cualquier enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Solo cierra si el menú está abierto
            if (navUl.classList.contains('open')) {
                navUl.classList.remove('open');
                hamburgerBtn.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Cierre del menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        // Verifica si el clic fue fuera del menú y del botón
        if (!hamburgerBtn.contains(e.target) && !navUl.contains(e.target)) {
            navUl.classList.remove('open');
            hamburgerBtn.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Manejo del redimensionamiento de ventana
    window.addEventListener('resize', () => {
        // Cierra el menú si la ventana es más ancha que el breakpoint móvil
        if (window.innerWidth > 768 && navUl.classList.contains('open')) {
            navUl.classList.remove('open');
            hamburgerBtn.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/* =========================================================================
   ACORDEÓN DE GALERÍA
   Implementa un acordeón para mostrar/ocultar secciones de la galería.
   Permite que solo una sección esté abierta a la vez.
   ========================================================================= */

// Selección de todos los encabezados del acordeón
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Verificación de existencia de elementos del acordeón
if (accordionHeaders.length > 0) {
    // Agrega funcionalidad a cada encabezado
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Referencias a elementos relacionados
            const clickedHeader = this;
            const clickedContent = this.nextElementSibling;
            const isOpening = !clickedHeader.classList.contains('active');

            // Cierra todos los otros paneles
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== clickedHeader) {
                    otherHeader.classList.remove('active');
                    const otherContent = otherHeader.nextElementSibling;
                    otherContent.classList.remove('open');
                    otherContent.style.maxHeight = '0px';
                }
            });

            // Toggle del panel actual
            clickedHeader.classList.toggle('active');
            clickedContent.classList.toggle('open');

            // Ajusta la altura del contenido
            if (isOpening) {
                clickedContent.style.maxHeight = clickedContent.scrollHeight + 'px';
            } else {
                clickedContent.style.maxHeight = '0px';
            }
        });
    });
}

/* =========================================================================
   CARRUSEL DE HÉROE (HERO CAROUSEL)
   Implementa un carrusel de imágenes con navegación automática y manual.
   Incluye controles de navegación y puntos indicadores.
   ========================================================================= */

// Selección de elementos del carrusel
const heroCarousel = document.getElementById('hero-carousel');          // Contenedor principal
const carouselPrevBtn = document.getElementById('carousel-prev');       // Botón anterior
const carouselNextBtn = document.getElementById('carousel-next');       // Botón siguiente
const carouselDotsContainer = document.getElementById('carousel-dots'); // Contenedor de puntos

// Array de imágenes con metadatos
const carouselImages = [
    { 
        src: 'assets/img/carousel/comparsa_cardo_negro_1.jpg', 
        alt: 'Comparsa Cardo Negro en acción vibrante', 
        caption: 'Cardo Negro: Ritmo que Vibra' 
    },
    { 
        src: 'assets/img/carousel/comparsa_cardo_negro_2.jpg', 
        alt: 'Danza y música en un carnaval', 
        caption: 'La Pasión en Cada Movimiento' 
    },
    { 
        src: 'assets/img/carousel/comparsa_cardo_negro_3.jpg', 
        alt: 'Percusión afro en vivo', 
        caption: 'Sonidos de Nuestra Herencia' 
    }
];

// Variables de control del carrusel
let currentSlide = 0;                    // Índice del slide actual
let carouselInterval;                    // ID del intervalo para auto-avance

/**
 * Renderiza el carrusel y sus controles de navegación
 * Crea los elementos del DOM necesarios y establece el estado inicial
 */
function renderCarousel() {
    // Verificación de elementos necesarios
    if (!heroCarousel || carouselImages.length === 0) return;

    // Limpieza de contenido existente
    heroCarousel.innerHTML = '';
    carouselDotsContainer.innerHTML = '';

    // Creación de elementos para cada imagen
    carouselImages.forEach((image, index) => {
        // Creación del ítem del carrusel
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (index === currentSlide) {
            item.classList.add('active');
        }
        item.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
        heroCarousel.appendChild(item);

        // Creación del punto de navegación
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === currentSlide) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentSlide = index;
            renderCarousel();
        });
        carouselDotsContainer.appendChild(dot);
    });
}

// Inicialización del carrusel
renderCarousel();

// Configuración de botones de navegación
if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', () => {
        // Navegación al slide anterior
        currentSlide = (currentSlide === 0) ? carouselImages.length - 1 : currentSlide - 1;
        renderCarousel();
        // Reinicio del auto-avance
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 5000);
    });
}

if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', () => {
        // Navegación al siguiente slide
        currentSlide = (currentSlide === carouselImages.length - 1) ? 0 : currentSlide + 1;
        renderCarousel();
        // Reinicio del auto-avance
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 5000);
    });
}

/**
 * Avanza automáticamente al siguiente slide
 * Se ejecuta cada 5 segundos si no hay interacción manual
 */
function nextSlide() {
    currentSlide = (currentSlide === carouselImages.length - 1) ? 0 : currentSlide + 1;
    renderCarousel();
}

// Inicio del auto-avance del carrusel
carouselInterval = setInterval(nextSlide, 5000);