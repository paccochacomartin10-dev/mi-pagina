/* =======================================
   MENÚ HAMBURGUESA - JAVASCRIPT
   ======================================= */

// === ELEMENTOS DEL DOM ===
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.getElementById('menuOverlay');
const navLinks = document.querySelectorAll('.nav-link');

// === FUNCIÓN: TOGGLE MENÚ ===
function toggleMenu() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Prevenir scroll cuando el menú está abierto
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// === FUNCIÓN: CERRAR MENÚ ===
function closeMenu() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// === EVENT LISTENERS ===

// Click en botón hamburguesa
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Click en overlay
if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
}

// Click en links del menú
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Cerrar menú cuando se hace click en un link
        closeMenu();
    });
});

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Cerrar menú al cambiar tamaño de ventana
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

console.log('📱 Menú móvil cargado');