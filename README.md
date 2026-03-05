# 🏡 Cabaña Escondida

Sitio web oficial de Cabaña Escondida - Tu refugio perfecto en la naturaleza.

## 📋 Descripción

Este es el sitio web de presentación y reservas para Cabaña Escondida, un alojamiento turístico ubicado en un entorno natural privilegiado. El sitio ofrece información completa sobre la cabaña, servicios, galería de imágenes, ubicación y un sistema de consulta de reservas.

## ✨ Características

- **Diseño Responsivo**: Adaptado a todos los dispositivos (móviles, tablets, desktop)
- **Navegación Intuitiva**: Menú fijo con scroll suave
- **Galería de Imágenes**: Visualización interactiva de los espacios
- **Sistema de Reservas**: Formulario de consulta con validación
- **Integración WhatsApp**: Envío directo de consultas
- **Animaciones**: Efectos visuales atractivos al hacer scroll
- **Optimizado para SEO**: Meta tags y estructura semántica

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS y Grid/Flexbox)
- JavaScript (Vanilla JS)
- Font Awesome (iconos)
- Google Fonts (opcional)

## 📁 Estructura del Proyecto

```
cabañaescondida/
│
├── index.html          # Página principal
├── styles.css          # Estilos globales
├── script.js           # Funcionalidad JavaScript
└── README.md           # Este archivo
```

## 🚀 Instalación y Uso

### Opción 1: Ver en GitHub Pages

El sitio está desplegado en: `https://braianruaimi.github.io/caba-aescondida/`

### Opción 2: Uso Local

1. Clona el repositorio:
```bash
git clone https://github.com/braianruaimi/caba-aescondida.git
```

2. Abre el archivo `index.html` en tu navegador

No se requiere instalación de dependencias ni servidor local, aunque se recomienda usar un servidor local para desarrollo.

## ⚙️ Configuración

### Personalización del Sitio

1. **Colores**: Modifica las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #2c5f2d;
    --secondary-color: #97bf0d;
    /* ... más colores */
}
```

2. **Información de Contacto**: Actualiza los datos en `index.html`:
   - Teléfono
   - Email
   - Redes sociales
   - Dirección

3. **WhatsApp**: Cambia el número en `script.js`:
```javascript
const numeroWhatsApp = '5491112345678'; // Tu número aquí
```

4. **Imágenes**: Reemplaza las URLs de Unsplash con tus propias imágenes:
   - Sube imágenes a una carpeta `/images/`
   - Actualiza las rutas en `index.html`

5. **Mapa**: Integra Google Maps en la sección de ubicación:
```html
<iframe src="TU_EMBED_DE_GOOGLE_MAPS"></iframe>
```

## 📱 Secciones del Sitio

1. **Hero**: Banner principal con imagen de fondo
2. **Sobre Nosotros**: Descripción de la cabaña y características
3. **Galería**: Imágenes de los diferentes espacios
4. **Servicios**: Comodidades y amenidades
5. **Ubicación**: Mapa e indicaciones de cómo llegar
6. **Reservas**: Formulario de consulta con tarifas
7. **Contacto**: Información de contacto y redes sociales

## 🎨 Personalización de Contenido

### Modificar Tarifas

Edita la sección de precios en `index.html`:

```html
<div class="price-item">
    <span>Lunes a Jueves</span>
    <strong>$8,000 / noche</strong>
</div>
```

### Cambiar Servicios

Agrega o modifica las tarjetas de servicio:

```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-tu-icono"></i>
    </div>
    <h3>Tu Servicio</h3>
    <p>Descripción del servicio</p>
</div>
```

## 🌐 Configurar Dominio Personalizado

1. En GitHub, ve a Settings → Pages
2. En "Custom domain", ingresa tu dominio
3. Configura los DNS de tu dominio:
   - Tipo A: `185.199.108.153`
   - Tipo A: `185.199.109.153`
   - Tipo A: `185.199.110.153`
   - Tipo A: `185.199.111.153`
   - CNAME: `braianruaimi.github.io`

## 📊 SEO y Optimización

- Meta tags configurados para búsqueda
- Imágenes con atributos alt
- Estructura semántica HTML5
- Lazy loading de imágenes
- Código minificable para producción

## 🔒 Seguridad

- Validación de formularios
- Sanitización de inputs
- Sin almacenamiento de datos sensibles

## 🐛 Solución de Problemas

### Las imágenes no cargan
- Verifica las URLs de las imágenes
- Asegúrate de tener buena conexión a internet (si usas URLs externas)

### El formulario no envía
- Verifica el número de WhatsApp en `script.js`
- Comprueba que el navegador permita ventanas emergentes

### El menú móvil no funciona
- Asegúrate de que `script.js` está cargado correctamente
- Verifica la consola del navegador para errores de JavaScript

## 📝 Próximas Mejoras

- [ ] Sistema de reservas en tiempo real
- [ ] Integración con calendar de disponibilidad
- [ ] Galería con lightbox
- [ ] Blog de noticias
- [ ] Sistema de reviews
- [ ] Múltiples idiomas

## 👥 Contribuir

Si deseas contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

## 📞 Contacto

**Cabaña Escondida**
- Email: info@cabanaescondida.com
- Teléfono: +54 9 11 1234-5678
- Instagram: [@cabanaescondida](https://instagram.com/cabanaescondida)
- Sitio Web: [cabanaescondida.com](https://braianruaimi.github.io/caba-aescondida/)

---

Desarrollado con ❤️ para Cabaña Escondida | © 2026
