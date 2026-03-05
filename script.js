// Toggle del menú móvil
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Botón scroll to top
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animación de elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas de servicios y galería
document.querySelectorAll('.service-card, .gallery-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Formulario de reservas
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        personas: document.getElementById('personas').value,
        checkin: document.getElementById('checkin').value,
        checkout: document.getElementById('checkout').value,
        mensaje: document.getElementById('mensaje').value
    };
    
    // Validar fechas
    const checkinDate = new Date(formData.checkin);
    const checkoutDate = new Date(formData.checkout);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkinDate < today) {
        alert('La fecha de entrada no puede ser anterior a hoy');
        return;
    }
    
    if (checkoutDate <= checkinDate) {
        alert('La fecha de salida debe ser posterior a la fecha de entrada');
        return;
    }
    
    // Calcular noches
    const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    
    if (nights < 2) {
        alert('La estadía mínima es de 2 noches');
        return;
    }
    
    // Aquí puedes integrar con tu sistema de reservas
    // Por ahora mostramos un mensaje de confirmación
    
    // Crear mensaje de WhatsApp
    const mensaje = `¡Hola! Quiero hacer una consulta de reserva:%0A%0A` +
                   `Nombre: ${formData.nombre}%0A` +
                   `Email: ${formData.email}%0A` +
                   `Teléfono: ${formData.telefono}%0A` +
                   `Personas: ${formData.personas}%0A` +
                   `Check-in: ${formData.checkin}%0A` +
                   `Check-out: ${formData.checkout}%0A` +
                   `Noches: ${nights}%0A` +
                   `Mensaje: ${formData.mensaje || 'Sin mensaje adicional'}`;
    
    // Reemplaza con tu número de WhatsApp (sin +, sin espacios, sin guiones)
    const numeroWhatsApp = '5491112345678';
    
    // Preguntar si quiere enviar por WhatsApp
    if (confirm(`Tu consulta está lista. ¿Deseas enviarla por WhatsApp?\n\nEstadía: ${nights} noche(s)`)) {
        window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
    }
    
    // Limpiar formulario
    bookingForm.reset();
    
    // Mostrar mensaje de éxito
    showNotification('¡Consulta enviada! Te contactaremos pronto.', 'success');
});

// Validación de fecha en tiempo real
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

// Establecer fecha mínima como hoy
const today = new Date().toISOString().split('T')[0];
checkinInput.setAttribute('min', today);

checkinInput.addEventListener('change', () => {
    const checkinDate = new Date(checkinInput.value);
    const minCheckout = new Date(checkinDate);
    minCheckout.setDate(minCheckout.getDate() + 2);
    checkoutInput.setAttribute('min', minCheckout.toISOString().split('T')[0]);
    
    if (checkoutInput.value) {
        const checkoutDate = new Date(checkoutInput.value);
        if (checkoutDate <= checkinDate) {
            checkoutInput.value = '';
        }
    }
});

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Agregar estilos si no existen
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.innerHTML = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 400px;
            }
            
            .notification.success {
                border-left: 4px solid #2c5f2d;
            }
            
            .notification.error {
                border-left: 4px solid #ff6b35;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-content button {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 480px) {
                .notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Efecto parallax en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Contador de caracteres para el textarea
const mensajeTextarea = document.getElementById('mensaje');
if (mensajeTextarea) {
    const maxLength = 500;
    
    const counter = document.createElement('div');
    counter.style.textAlign = 'right';
    counter.style.fontSize = '0.9rem';
    counter.style.marginTop = '0.5rem';
    counter.style.color = 'rgba(255, 255, 255, 0.7)';
    counter.textContent = `0/${maxLength}`;
    
    mensajeTextarea.setAttribute('maxlength', maxLength);
    mensajeTextarea.parentElement.appendChild(counter);
    
    mensajeTextarea.addEventListener('input', () => {
        const length = mensajeTextarea.value.length;
        counter.textContent = `${length}/${maxLength}`;
        
        if (length > maxLength * 0.9) {
            counter.style.color = '#ff6b35';
        } else {
            counter.style.color = 'rgba(255, 255, 255, 0.7)';
        }
    });
}

// Lazy loading para imágenes
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Efecto de cursor en las tarjetas
document.querySelectorAll('.service-card, .contact-item, .gallery-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Inicializar tooltips si existen
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.cssText = `
            position: fixed;
            top: ${rect.top - tooltip.offsetHeight - 10}px;
            left: ${rect.left + (rect.width - tooltip.offsetWidth) / 2}px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 0.9rem;
            z-index: 10001;
            pointer-events: none;
        `;
        
        this.tooltipElement = tooltip;
    });
    
    element.addEventListener('mouseleave', function() {
        if (this.tooltipElement) {
            this.tooltipElement.remove();
            this.tooltipElement = null;
        }
    });
});

// Para debugging (puedes comentar en producción)
console.log('🏡 Cabaña Escondida - Website cargado correctamente');
console.log('📧 Para consultas: info@cabanaescondida.com');
