// =========================================================================
// SCRIPT.JS PARA COMPARSA CARDO NEGRO
// Este archivo contiene toda la lógica JavaScript para la página web.
// =========================================================================

// =========================================================================
// MENÚ HAMBURGUESA
// Controla la apertura y cierre del menú de navegación en pantallas pequeñas.
// =========================================================================

// Obtiene referencias a los elementos del DOM.
const hamburgerBtn = document.getElementById('hamburger-btn');
const navUl = document.querySelector('nav#main-nav ul');
const navLinks = document.querySelectorAll('nav#main-nav ul li a'); // Todos los enlaces del menú

// Se asegura de que el botón de hamburguesa y el menú existan antes de añadir event listeners.
if (hamburgerBtn && navUl) {
    // Event listener para el clic en el botón de hamburguesa.
    hamburgerBtn.addEventListener('click', () => {
        // Alterna la clase 'open' en el menú (para mostrar/ocultar) y en el botón (para animación).
        navUl.classList.toggle('open');
        hamburgerBtn.classList.toggle('open');
        // También alterna 'aria-expanded' para accesibilidad.
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true' || false;
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    });

    // Cierra el menú al hacer clic en un enlace de navegación (para mejorar la UX móvil).
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('open')) { // Solo si el menú está abierto
                navUl.classList.remove('open');
                hamburgerBtn.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Cierra el menú al hacer clic fuera de él.
    document.addEventListener('click', (e) => {
        // Si el clic no fue dentro del botón de hamburguesa ni dentro del menú de navegación.
        if (!hamburgerBtn.contains(e.target) && !navUl.contains(e.target)) {
            navUl.classList.remove('open');
            hamburgerBtn.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Opcional: Cierra el menú si se redimensiona la ventana y el ancho es mayor al breakpoint móvil.
    // Esto previene que el menú quede "abierto" si el usuario cambia el tamaño de la ventana
    // y el CSS de responsividad lo muestra en desktop.
    window.addEventListener('resize', () => {
        // Asumiendo que el breakpoint para ocultar el menú de hamburguesa es 768px (o el que uses en CSS).
        if (window.innerWidth > 768 && navUl.classList.contains('open')) {
            navUl.classList.remove('open');
            hamburgerBtn.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
}


// =========================================================================
// ACORDEÓN DE GALERÍA
// Controla la funcionalidad de expansión/contracción de los paneles del acordeón.
// =========================================================================

// Obtiene todas las cabeceras de los paneles del acordeón.
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Se asegura de que existan cabeceras de acordeón antes de añadir event listeners.
if (accordionHeaders.length > 0) {
    // Itera sobre cada cabecera para añadir un event listener de clic.
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const clickedHeader = this;
            const clickedContent = this.nextElementSibling;
            const isOpening = !clickedHeader.classList.contains('active');

            // Cierra todos los otros paneles del acordeón.
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== clickedHeader) {
                    otherHeader.classList.remove('active');
                    const otherContent = otherHeader.nextElementSibling;
                    otherContent.classList.remove('open');
                    otherContent.style.maxHeight = '0px';
                }
            });

            // Alterna el estado del panel clicado
            clickedHeader.classList.toggle('active');
            clickedContent.classList.toggle('open');

            if (isOpening) {
                clickedContent.style.maxHeight = clickedContent.scrollHeight + 'px';
            } else {
                clickedContent.style.maxHeight = '0px';
            }
        });
    });
}


// =========================================================================
// CARRUSEL DE HÉROE (HERO CAROUSEL)
// Controla la rotación automática y manual de imágenes en la Hero Section.
// =========================================================================

const heroCarousel = document.getElementById('hero-carousel');
const carouselPrevBtn = document.getElementById('carousel-prev');
const carouselNextBtn = document.getElementById('carousel-next');
const carouselDotsContainer = document.getElementById('carousel-dots');

// Array de imágenes para el carrusel
const carouselImages = [
    { src: 'assets/img/carousel/comparsa_cardo_negro_1.jpg', alt: 'Comparsa Cardo Negro en acción vibrante', caption: 'Cardo Negro: Ritmo que Vibra' },
    { src: 'assets/img/carousel/comparsa_cardo_negro_2.jpg', alt: 'Danza y música en un carnaval', caption: 'La Pasión en Cada Movimiento' },
    { src: 'assets/img/carousel/comparsa_cardo_negro_3.jpg', alt: 'Percusión afro en vivo', caption: 'Sonidos de Nuestra Herencia' }
];

let currentSlide = 0;
let carouselInterval; // Variable para almacenar el ID del intervalo del carrusel

// Función para renderizar el carrusel y los puntos de navegación
function renderCarousel() {
    if (!heroCarousel || carouselImages.length === 0) return; // Salir si no hay carrusel o imágenes

    heroCarousel.innerHTML = ''; // Limpiar carrusel existente
    carouselDotsContainer.innerHTML = ''; // Limpiar puntos existentes

    carouselImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (index === currentSlide) {
            item.classList.add('active'); // Marcar el primer ítem como activo
        }
        item.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
        heroCarousel.appendChild(item);

        // Crear punto de navegación
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

// Llama a la función renderCarousel() para que se muestre el primer slide al cargar la página.
renderCarousel();

// Configura los botones de navegación del carrusel
if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide === 0) ? carouselImages.length - 1 : currentSlide - 1;
        renderCarousel();
        clearInterval(carouselInterval); // Detiene el auto-avance al navegar manualmente
        carouselInterval = setInterval(nextSlide, 5000); // Reinicia el auto-avance
    });
}

if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide === carouselImages.length - 1) ? 0 : currentSlide + 1;
        renderCarousel();
        clearInterval(carouselInterval); // Detiene el auto-avance al navegar manualmente
        carouselInterval = setInterval(nextSlide, 5000); // Reinicia el auto-avance
    });
}

// Función para avanzar al siguiente slide automáticamente
function nextSlide() {
    currentSlide = (currentSlide === carouselImages.length - 1) ? 0 : currentSlide + 1;
    renderCarousel();
}

// Inicia el avance automático del carrusel (cada 5 segundos)
carouselInterval = setInterval(nextSlide, 5000);