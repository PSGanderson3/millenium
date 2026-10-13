# 🏋️‍♂️ GYM MILENIUM - SITIO WEB & LANDING DE PLANES

Página web moderna, responsiva y de alto impacto para **GYM MILENIUM**, inspirada en el diseño y arquitectura de conversión de **AARMYGYM (#planes)**.

---

## 📁 Estructura del Proyecto

```text
gimnasio/
│
├── index.html          # Estructura principal y contenido de la web
├── .htaccess           # Optimización de velocidad, compresión GZIP y caché para Hostinger
├── css/
│   └── style.css       # Estilos visuales neón volt + negro, tipografías y diseño móvil
├── js/
│   └── main.js         # Lógica interactiva, calculadora IMC, modales y WhatsApp dinámico
└── assets/
    ├── logo.svg        # Logotipo vectorial oficial de Gym Milenium
    └── favicon.svg     # Icono para la pestaña del navegador
```

---

## 🚀 Cómo publicar en Hostinger paso a paso

Tu proyecto está desarrollado en **HTML5, CSS3 y JavaScript moderno puro (Vanilla)**, por lo que no requiere ningún comando de compilación, servidor Node.js ni bases de datos complicadas. Se carga al instante y es 100% compatible con **Hostinger**.

### Método 1: Administrador de Archivos de Hostinger (El más rápido - 3 minutos)

1. Ingresa a tu panel de control de **Hostinger (hPanel)**: [hostinger.com](https://hostinger.com).
2. En la sección **Sitios web**, selecciona tu dominio y haz clic en **Administrar**.
3. En el buscador o menú lateral, haz clic en **Administrador de Archivos** (`File Manager`).
4. Haz clic en **Acceder a los archivos de [tu-dominio]**.
5. Abre la carpeta llamada:
   ```text
   public_html
   ```
6. **(Opcional pero recomendado)** Comprime todos los archivos de esta carpeta (`gimnasio.zip`) en tu computadora:
   - Selecciona: `index.html`, `.htaccess`, la carpeta `css/`, la carpeta `js/` y la carpeta `assets/`.
   - Haz clic derecho > *Comprimir en archivo ZIP*.
7. En el Administrador de Archivos de Hostinger, haz clic en el botón **Subir** (ícono de flecha arriba) y sube el archivo `.zip`.
8. Haz clic derecho sobre el `.zip` en Hostinger y selecciona **Extraer** en la carpeta `public_html`.
9. ¡Listo! Abre tu dominio en el navegador (ejemplo: `https://tudominio.com` o `https://tudominio.com/#planes`) y la página ya estará visible en internet.

---

## ⚙️ Cómo personalizar los datos para tu cliente

### 1. Cambiar el número de WhatsApp
Abre el archivo [js/main.js](file:///c:/Users/anderson/Downloads/gimnasio/js/main.js):
En las primeras líneas verás el objeto de configuración:

```javascript
const GYM_CONFIG = {
  gymName: "Gym Milenium",
  // Cambia aquí el número principal (código de país + número, ej: 51 para Perú)
  whatsappDefault: "51904118326",
  currencySymbol: "S/",
  ...
```
Solo cambia `"51904118326"` por el número de WhatsApp de tu cliente. Todos los botones de **"LO QUIERO"** y el botón flotante se actualizarán automáticamente.

### 2. Cambiar Precios de los Planes
Abre el archivo [index.html](file:///c:/Users/anderson/Downloads/gimnasio/index.html) y busca la sección `#planes`. Cada tarjeta tiene su precio visible y en el botón:

```html
<div class="price-main"><span class="currency">S/</span>250</div>
...
<button class="btn-lo-quiero" data-plan="1 MES" data-price="S/ 250">
  LO QUIERO
</button>
```
Puedes editar el texto y el atributo `data-price` con el valor que tu cliente desee cobrar.

### 3. Modificar o Agregar Sedes
En [index.html](file:///c:/Users/anderson/Downloads/gimnasio/index.html) busca la sección `<section id="sedes">`. Ahí puedes cambiar los nombres de las avenidas, distritos, horarios de atención o agregar nuevas sedes.

---

## ✨ Características Incluidas
- ⚡ **Diseño Ultra Rápido**: Carga inmediata sin dependencias pesadas.
- 📱 **100% Responsivo**: Diseñado para lucir impecable en teléfonos celulares, tablets y pantallas de computadora.
- 💬 **Integración Nativa con WhatsApp**: Cada botón envía un mensaje predefinido con el plan o sede solicitada para acelerar las ventas.
- 🧮 **Calculadora de IMC y Recomendación de Plan**: Herramienta interactiva que calcula el índice corporal del socio y le recomienda la mejor membresía.
- 🛡️ **Archivo .htaccess listo**: Optimizado para LiteSpeed / Apache de Hostinger con compresión GZIP y cabeceras de caché.
- ⭐ **Estética Visual AARMYGYM Personalizada**: Paleta en negro azabache (`#0a0a0c`), tipografía atlética en negrita y acentos en **verde deportivo (`#70d40e`)** derivado del tono `#87f515` solicitado.
