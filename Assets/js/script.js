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
            // 'this' se refiere a la cabecera del panel que fue clicado.
            const clickedHeader = this;
            const clickedContent = this.nextElementSibling; // El contenido del panel clicado

            // Cierra todos los otros paneles del acordeón.
            accordionHeaders.forEach(otherHeader => {
                // Si la cabecera actual en la iteración NO es la cabecera que se clicó.
                if (otherHeader !== clickedHeader) {
                    otherHeader.classList.remove('active'); // Quita la clase 'active' de la cabecera
                    otherHeader.nextElementSibling.classList.remove('open'); // Cierra el contenido
                }
            });

            // Alterna el estado del panel clicado (abre si está cerrado, cierra si está abierto).
            clickedHeader.classList.toggle('active'); // Alterna la clase 'active' en la cabecera
            clickedContent.classList.toggle('open'); // Alterna la clase 'open' en el contenido
        });
    });
}


// =========================================================================
// Carga de Fuentes (Opcional, si no se usan @import en CSS)
// Esto asegura que las fuentes se carguen antes de que el contenido sea completamente visible
// y evita "flash of unstyled text" (FOUT).
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Puedes añadir aquí código para animaciones de carga, etc.
    // Opcional: Para el scroll suave, ya está en CSS `html { scroll-behavior: smooth; }`
});