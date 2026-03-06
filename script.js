// Toggle del menú móvil
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Cerrar menú al hacer click en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Cerrar menú al hacer scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('active')) {
        const currentScroll = window.pageYOffset;
        if (Math.abs(currentScroll - lastScrollTop) > 50) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
        lastScrollTop = currentScroll;
    }
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
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        checkin: document.getElementById('checkin').value,
        checkout: document.getElementById('checkout').value,
        mensaje: document.getElementById('mensaje').value.trim()
    };
    
    // Validar fechas
    const checkinDate = new Date(formData.checkin);
    const checkoutDate = new Date(formData.checkout);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkinDate < today) {
        alert('La fecha de check-in no puede ser anterior a hoy');
        return;
    }
    
    if (checkoutDate <= checkinDate) {
        alert('La fecha de check-out debe ser posterior a la fecha de check-in');
        return;
    }
    
    // Calcular noches
    const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    
    if (nights < 1) {
        alert('La estadía mínima es de 1 noche');
        return;
    }
    
    // Formatear fechas para mostrar
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate() + 1).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    // Crear mensaje para WhatsApp
    const mensaje = `🏡 *CONSULTA DE RESERVA - LA ESCONDIDA*%0A%0A` +
                   `👤 *Nombre:* ${formData.nombre}%0A` +
                   `📧 *Email:* ${formData.email}%0A` +
                   `📱 *Teléfono:* ${formData.telefono}%0A%0A` +
                   `📅 *Check-in:* ${formatDate(formData.checkin)}%0A` +
                   `📅 *Check-out:* ${formatDate(formData.checkout)}%0A` +
                   `🌙 *Noches:* ${nights}%0A%0A` +
                   `${formData.mensaje ? `💬 *Mensaje:*%0A${encodeURIComponent(formData.mensaje)}%0A%0A` : ''}` +
                   `_Consulta enviada desde la web de La Escondida_`;
    
    // Reemplaza con tu número de WhatsApp (sin +, sin espacios, sin guiones)
    const numeroWhatsApp = '5492215047962';
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
    
    // Mostrar mensaje de éxito
    showNotification('¡Consulta enviada! Te redirigimos a WhatsApp...', 'success');
    
    // Limpiar formulario después de 2 segundos
    setTimeout(() => {
        bookingForm.reset();
    }, 2000);
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
    minCheckout.setDate(minCheckout.getDate() + 1);
    checkoutInput.setAttribute('min', minCheckout.toISOString().split('T')[0]);
    
    if (checkoutInput.value) {
        const checkoutDate = new Date(checkoutInput.value);
        if (checkoutDate <= checkinDate) {
            checkoutInput.value = '';
        }
    }
});

// Botón "Chatea con Nosotros" - Envía datos del formulario si están completos
const chatDirectBtn = document.getElementById('chatDirectBtn');

chatDirectBtn.addEventListener('click', () => {
    const numeroWhatsApp = '5492215047962';
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const mensajeTexto = document.getElementById('mensaje').value.trim();
    
    // Si hay datos en el formulario, enviarlos
    if (nombre || email || telefono || checkin || checkout || mensajeTexto) {
        // Formatear fechas si existen
        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            const day = String(date.getDate() + 1).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };
        
        // Calcular noches si hay ambas fechas
        let nightsText = '';
        if (checkin && checkout) {
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);
            const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
            if (nights > 0) {
                nightsText = `🌙 *Noches:* ${nights}%0A%0A`;
            }
        }
        
        // Crear mensaje con los datos disponibles
        let mensaje = `🏡 *CONSULTA - LA ESCONDIDA*%0A%0A`;
        
        if (nombre) mensaje += `👤 *Nombre:* ${nombre}%0A`;
        if (email) mensaje += `📧 *Email:* ${email}%0A`;
        if (telefono) mensaje += `📱 *Teléfono:* ${telefono}%0A`;
        if (nombre || email || telefono) mensaje += `%0A`;
        
        if (checkin) mensaje += `📅 *Check-in:* ${formatDate(checkin)}%0A`;
        if (checkout) mensaje += `📅 *Check-out:* ${formatDate(checkout)}%0A`;
        if (checkin || checkout) mensaje += nightsText;
        
        if (mensajeTexto) mensaje += `💬 *Mensaje:*%0A${encodeURIComponent(mensajeTexto)}%0A%0A`;
        
        mensaje += `_Consulta enviada desde la web de La Escondida_`;
        
        // Abrir WhatsApp con el mensaje
        window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
        
        // Limpiar formulario después de 2 segundos
        setTimeout(() => {
            bookingForm.reset();
        }, 2000);
    } else {
        // Si no hay datos, abrir WhatsApp sin mensaje pre-cargado
        window.open(`https://wa.me/${numeroWhatsApp}`, '_blank');
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

// Admin Panel Access
const adminDot = document.getElementById('adminAccess');
if (adminDot) {
    adminDot.addEventListener('click', () => {
        const password = prompt('Ingrese la contraseña de administrador:');
        if (password === '1234') {
            // Registrar acceso al dashboard
            trackEvent('dashboard_access', { timestamp: new Date().toISOString() });
            window.location.href = 'dashboard.html';
        } else if (password !== null) {
            alert('Contraseña incorrecta');
        }
    });
}

// Analytics tracking - Almacenamiento local
function trackEvent(eventType, data = {}) {
    const events = JSON.parse(localStorage.getItem('cabana_analytics') || '[]');
    events.push({
        type: eventType,
        timestamp: new Date().toISOString(),
        ...data
    });
    localStorage.setItem('cabana_analytics', JSON.stringify(events));
}

// Track page views
trackEvent('page_view', { 
    page: window.location.pathname,
    referrer: document.referrer 
});

// Track clicks en elementos importantes
document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (target) {
        const href = target.getAttribute('href');
        const text = target.textContent.trim();
        
        // Track clicks en botones de WhatsApp como conversiones
        if (href && href.includes('wa.me')) {
            trackEvent('conversion', { 
                type: 'whatsapp_click',
                text: text,
                url: href
            });
        } else if (target.classList.contains('btn')) {
            trackEvent('button_click', { 
                text: text,
                classes: target.className
            });
        }
    }
});

// Track tiempo en página
let timeOnPage = 0;
setInterval(() => {
    timeOnPage += 5;
}, 5000);

window.addEventListener('beforeunload', () => {
    trackEvent('time_on_page', { seconds: timeOnPage });
});

// ==================== CHATBOT IA ====================
const aiChatButton = document.getElementById('aiChatButton');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// Base de conocimiento del chatbot
const chatbotKnowledge = {
    'ubicacion|donde|lugar|ubicada': {
        response: '🗺️ La Escondida está ubicada en una isla en Arana, La Plata. Es un lugar verdaderamente escondido, a aproximadamente 1 hora en auto desde la ciudad. Es súper seguro y aislado de todo.',
        keywords: ['ubicacion', 'donde', 'lugar', 'arana', 'ubicada', 'está']
    },
    'precio|costo|tarifa|cuanto': {
        response: '💰 Para consultar precios y disponibilidad, te recomiendo contactarnos directamente por WhatsApp haciendo clic en el botón "Reservar Ahora" o escribiéndonos al 221 5047962.',
        keywords: ['precio', 'costo', 'tarifa', 'cuanto', 'vale']
    },
    'horario|check-in|check-out|entrada|salida': {
        response: '⏰ Check-in: 10:00 AM | Check-out: 11:00 AM. Puedes entrar y salir de la cabaña libremente durante tu estadía.',
        keywords: ['horario', 'check-in', 'check-out', 'entrada', 'salida', 'hora']
    },
    'servicios|amenities|incluye|cuenta|tiene': {
        response: '🏡 La cabaña cuenta con todo lo necesario para dos personas: cama matrimonial, baño privado, cocina equipada, calefacción, WiFi, y zona de estar. Es exclusiva para parejas.',
        keywords: ['servicios', 'amenities', 'incluye', 'cuenta', 'tiene', 'equipada']
    },
    'comida|proveeduria|almacen|supermercado|comer': {
        response: '🍽️ NO hay proveeduría en el lugar. Cada uno debe traer su propia comida y todo lo que vaya a necesitar durante su estadía. La cabaña tiene cocina totalmente equipada para que prepares tus comidas.',
        keywords: ['comida', 'proveeduria', 'almacen', 'supermercado', 'comer', 'cocina']
    },
    'reserva|reservar|disponibilidad|fechas': {
        response: '📅 Puedes reservar completando el formulario en la sección "Reservas" o contactándonos directamente por WhatsApp al 221 5047962. La estadía mínima es de 1 noche.',
        keywords: ['reserva', 'reservar', 'disponibilidad', 'fechas', 'libro']
    },
    'mascotas|perro|gato|animales': {
        response: '🐾 Para consultas sobre mascotas, te recomendamos contactarnos directamente por WhatsApp al 221 5047962. Así podemos darte información específica.',
        keywords: ['mascotas', 'perro', 'gato', 'animales', 'mascota']
    },
    'pareja|parejas|solo|exclusivo': {
        response: '💑 La Escondida es un refugio exclusivo SOLO para parejas. Es un lugar íntimo pensado para que se pierdan sin horarios, sin miradas ajenas, sin interrupciones.',
        keywords: ['pareja', 'parejas', 'solo', 'exclusivo', 'dos']
    },
    'seguridad|seguro|aislado|privado': {
        response: '🔒 El lugar es súper seguro y completamente aislado de todo. Están solos en la isla, con total privacidad. Es un ambiente natural privilegiado donde nadie los encuentra.',
        keywords: ['seguridad', 'seguro', 'aislado', 'privado', 'segura']
    },
    'contacto|telefono|whatsapp|comunicar': {
        response: '📱 Puedes contactarnos por WhatsApp al 221 5047962. ¡Te respondemos al instante! También puedes completar el formulario de reserva en nuestra página.',
        keywords: ['contacto', 'telefono', 'whatsapp', 'comunicar', 'numero']
    },
    'naturaleza|patos|fauna|silvestre': {
        response: '🦆 Están rodeados de vida silvestre con patos caminando libres en la isla, silencio real y noches que se sienten distintas. Es un refugio en plena naturaleza.',
        keywords: ['naturaleza', 'patos', 'fauna', 'silvestre', 'animales']
    }
};

// Toggle chatbot
aiChatButton.addEventListener('click', () => {
    chatbotContainer.classList.add('active');
    aiChatButton.style.display = 'none';
    
    // Mostrar mensaje inicial si está vacío
    if (chatbotMessages.children.length === 0) {
        showWelcomeMessage();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
    aiChatButton.style.display = 'flex';
});

// Función para mostrar mensaje de bienvenida
function showWelcomeMessage() {
    const welcomeMessages = [
        '¡Hola! 👋 Soy el asistente virtual de La Escondida.',
        '🏡 La cabaña cuenta con todo lo necesario para dos personas durante la estadía.',
        '⚠️ IMPORTANTE: NO hay proveeduría en el lugar. Cada uno debe traer su propia comida y todo lo que vaya a utilizar.',
        '🚪 Pueden entrar y salir de la cabaña libremente. Es un lugar súper seguro y aislado de todo.',
        '💬 ¿En qué puedo ayudarte?'
    ];
    
    welcomeMessages.forEach((msg, index) => {
        setTimeout(() => {
            addBotMessage(msg);
        }, index * 800);
    });
}

// Agregar mensaje del bot
function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">${message}</div>
    `;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Agregar mensaje del usuario
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">${message}</div>
    `;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Función para encontrar respuesta
function findResponse(userMessage) {
    const normalizedMessage = userMessage.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Quitar acentos
    
    // Buscar coincidencias en la base de conocimiento
    for (const [pattern, data] of Object.entries(chatbotKnowledge)) {
        const keywords = pattern.split('|');
        if (keywords.some(keyword => normalizedMessage.includes(keyword))) {
            return data.response;
        }
    }
    
    // Respuesta por defecto
    return '🤔 No estoy seguro de cómo responder a eso. Te recomiendo contactarnos directamente por WhatsApp al 221 5047962 para obtener información más específica. ¿Hay algo más en lo que pueda ayudarte?';
}

// Procesar mensaje del usuario
function processUserMessage() {
    const message = chatbotInput.value.trim();
    
    if (message === '') return;
    
    // Agregar mensaje del usuario
    addUserMessage(message);
    chatbotInput.value = '';
    
    // Track evento
    trackEvent('chatbot_interaction', { message: message });
    
    // Simular "escribiendo..."
    setTimeout(() => {
        const response = findResponse(message);
        addBotMessage(response);
    }, 800);
}

// Event listeners
chatbotSend.addEventListener('click', processUserMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processUserMessage();
    }
});
