/* =======================================
   FUTBOLSHOP - HOME JAVASCRIPT
   Funcionalidad interactiva de la página
   ======================================= */

// === ELEMENTOS DEL DOM ===
const galleryItems = document.querySelectorAll('.gallery-item');
const mainProductImg = document.getElementById('mainProductImg');
const productName = document.getElementById('productName');
const productDesc = document.getElementById('productDesc');
const background = document.getElementById('background');
const sizeButtons = document.querySelectorAll('.size-btn');
const favoriteBtn = document.getElementById('favoriteBtn');

// === FUNCIÓN: CAMBIAR PRODUCTO ===
function changeProduct(team, product) {
    // Actualizar producto actual global
    currentProduct = team;
    
    // Animación de salida
    mainProductImg.style.opacity = '0';
    mainProductImg.style.transform = 'scale(0.85) rotate(-15deg)';
    
    setTimeout(() => {
        // Actualizar contenido
        mainProductImg.src = product.img;
        productName.textContent = product.name;
        productDesc.textContent = product.desc;
        background.style.background = product.gradient;
        
        // Animación de entrada
        setTimeout(() => {
            mainProductImg.style.opacity = '1';
            mainProductImg.style.transform = 'scale(1) rotate(-10deg)';
        }, 50);
    }, 400);
}

// === GALERÍA: CAMBIO DE PRODUCTO ===
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Quitar active de todos
        galleryItems.forEach(i => i.classList.remove('active'));
        
        // Agregar active al clickeado
        item.classList.add('active');
        
        // Obtener datos y cambiar producto
        const team = item.dataset.team;
        const product = products[team];
        changeProduct(team, product);
    });
});

// === TALLAS: SELECCIÓN ===
sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Quitar active de todos
        sizeButtons.forEach(b => b.classList.remove('active'));
        
        // Agregar active al clickeado
        btn.classList.add('active');
        
        // Efecto visual
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    });
});

// === BOTÓN FAVORITOS ===
let isFavorite = false;
favoriteBtn.addEventListener('click', () => {
    isFavorite = !isFavorite;
    
    if (isFavorite) {
        favoriteBtn.querySelector('.btn-icon').textContent = '♥';
        favoriteBtn.style.background = 'white';
        favoriteBtn.style.color = '#ff4757';
        
        // Animación de "me gusta"
        favoriteBtn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            favoriteBtn.style.transform = '';
        }, 300);
        
        showNotification('Agregado a favoritos ♥', 'success');
    } else {
        favoriteBtn.querySelector('.btn-icon').textContent = '♡';
        favoriteBtn.style.background = 'rgba(255, 255, 255, 0.12)';
        favoriteBtn.style.color = 'white';
        
        showNotification('Removido de favoritos', 'info');
    }
});

// === ANIMACIÓN INICIAL ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 FutbolShop cargado correctamente');
    
    // Pequeña animación de entrada para el producto
    setTimeout(() => {
        mainProductImg.style.opacity = '1';
    }, 100);

    // Navegación activa
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Si es un archivo HTML externo, dejar que navegue normalmente
            if (href.endsWith('.html')) {
                // No prevenir default, dejar que navegue
                return;
            }
            
            // Para links internos con #
            e.preventDefault();
            const section = href.replace('#', '');
            
            if (section === 'home') {
                // Ya estamos en home
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            } else {
                // Para equipos y ofertas (aún no creadas)
                navLinks.forEach(l => l.classList.remove('active'));
                alert(`La sección "${section.toUpperCase()}" estará disponible próximamente.\n\n¡Estamos trabajando en ello! 🚀`);
                // Volver a activar Home
                document.querySelector('.nav-link[href="#home"]').classList.add('active');
            }
        });
    });
});

// === EFECTO PARALLAX AL MOVER EL MOUSE ===
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Mover suavemente el producto
    const productShowcase = document.querySelector('.product-showcase');
    if (productShowcase && window.innerWidth > 1024) {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        productShowcase.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});