/**
 * ============================================================================
 * GYM MILENIUM - JAVASCRIPT CORE & CONFIGURATION
 * Listo para producción en Hostinger
 * ============================================================================
 */

// CONFIGURACIÓN RÁPIDA (FÁCIL DE CAMBIAR PARA TU CLIENTE)
const GYM_CONFIG = {
  gymName: "Gym Milenium",
  // Cambia aquí el número principal de WhatsApp (código de país + número, sin espacios ni símbolos) WASAP GE
  whatsappDefault: "51906821944",
  currencySymbol: "S/",
  
  // Teléfonos directos por sede (si tienen números separados)
  sedes: {
    miraflores: {
      nombre: "Sede Miraflores",
      telefono: "51906821944",
      direccion: "Av. José Pardo 601"
    },
    sanBorja: {
      nombre: "Sede San Borja",
      telefono: "51904169584",
      direccion: "Av. Aviación 2536"
    },
    surco: {
      nombre: "Sede Surco",
      telefono: "51906821944",
      direccion: "Av. Primavera 886 (5to piso)"
    },
    lince: {
      nombre: "Sede Lince",
      telefono: "51906821945",
      direccion: "Jr. Coronel Domingo Casanova 157"
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initWhatsappLinks();
  initCalculatorIMC();
  initFaqAccordion();
  initModals();
  initFormSubmissions();
  initSmoothScroll();
});

/**
 * 1. Control del Navbar Sticky y detección de Scroll
 */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveMenuOnScroll();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Menú Móvil Lateral (Drawer)
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.querySelector('.mobile-close');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const navLinks = document.querySelectorAll('.mobile-menu-items .menu-link');

  if (!drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * 3. Enlaces inteligentes a WhatsApp para Planes y Sedes 
 */
function initWhatsappLinks() {
  // Configuración de botones de planes ("LO QUIERO")
  const planButtons = document.querySelectorAll('.btn-lo-quiero');
  planButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planName = btn.getAttribute('data-plan') || 'Membresía';
      const planPrice = btn.getAttribute('data-price') || '';
      
      const text = encodeURIComponent(
        `¡Hola Gym Milenium! 👋 Quisiera adquirir o pedir información sobre el plan *${planName}* (${planPrice}). ¿Me podrían brindar los detalles de inscripción?`
      );
      
      const url = `https://api.whatsapp.com/send?phone=${GYM_CONFIG.whatsappDefault}&text=${text}`;
      window.open(url, '_blank');
    });
  });

  // Configuración de botones de sedes ("INSCRIBIRME AHORA")
  const sedeButtons = document.querySelectorAll('.btn-inscribirme');
  sedeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sedeKey = btn.getAttribute('data-sede');
      const sedeInfo = GYM_CONFIG.sedes[sedeKey] || {
        nombre: btn.getAttribute('data-nombre') || 'Gym Milenium',
        telefono: GYM_CONFIG.whatsappDefault
      };

      const text = encodeURIComponent(
        `¡Hola! 👋 Quisiera consultar los planes y promociones vigentes para la sede *${sedeInfo.nombre}* de Gym Milenium.`
      );

      const phone = sedeInfo.telefono || GYM_CONFIG.whatsappDefault;
      const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
      window.open(url, '_blank');
    });
  });
}

/**
 * 4. Actualización activa del menú al navegar
 */
function updateActiveMenuOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const menuLink = document.querySelector(`.main-menu a[href*="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (menuLink) {
        document.querySelectorAll('.main-menu .menu-link').forEach(l => l.classList.remove('active'));
        menuLink.classList.add('active');
      }
    }
  });
}

/**
 * 5. Calculadora Fitness de IMC (Interactivo para valor añadido)
 */
function initCalculatorIMC() {
  const calcBtn = document.getElementById('btnCalcularIMC');
  if (!calcBtn) return;

  calcBtn.addEventListener('click', () => {
    const peso = parseFloat(document.getElementById('calcPeso').value);
    const altura = parseFloat(document.getElementById('calcAltura').value);
    const resultBox = document.getElementById('calcResult');
    const scoreEl = document.getElementById('calcScore');
    const statusEl = document.getElementById('calcStatus');
    const descEl = document.getElementById('calcDesc');
    const actionBtn = document.getElementById('calcActionBtn');

    if (!peso || !altura || peso <= 20 || altura <= 50) {
      alert('Por favor introduce un peso y altura válidos (ej: 70 kg, 175 cm).');
      return;
    }

    // Altura en metros
    const alturaMetros = altura / 100;
    const imc = (peso / (alturaMetros * alturaMetros)).toFixed(1);

    scoreEl.innerText = imc;
    resultBox.style.display = 'block';

    let estado = '';
    let recomendacion = '';
    let planRecomendado = '3 MESES';

    if (imc < 18.5) {
      estado = 'Bajo peso';
      recomendacion = 'Requieres un plan de hipertrofia muscular y nutrición hipercalórica supervisada para ganar masa magra saludablemente.';
      planRecomendado = '6 MESES';
    } else if (imc >= 18.5 && imc < 24.9) {
      estado = 'Peso Saludable';
      recomendacion = '¡Excelente! Estás en tu rango ideal. Nuestro plan de fuerza y acondicionamiento 360 potenciará tu definición y energía.';
      planRecomendado = '3 MESES';
    } else if (imc >= 25 && imc < 29.9) {
      estado = 'Sobrepeso';
      recomendacion = 'Recomendamos nuestro programa de circuitos metabólicos y quema de grasa guiado por nuestros coaches.';
      planRecomendado = '6 MESES';
    } else {
      estado = 'Obesidad';
      recomendacion = 'Nuestros entrenamientos de bajo impacto articular y plan nutricional personalizado te ayudarán a transformar tu vida de forma segura.';
      planRecomendado = '12 MESES VIP';
    }

    statusEl.innerText = `Diagnóstico: ${estado}`;
    descEl.innerText = `${recomendacion} Te sugerimos comenzar con el Plan de ${planRecomendado}.`;

    actionBtn.onclick = () => {
      const msg = encodeURIComponent(
        `¡Hola Gym Milenium! Realicé el test de IMC en su web (IMC: ${imc} - ${estado}) y me recomendaron el Plan de *${planRecomendado}*. ¿Me podrían dar asesoría?`
      );
      window.open(`https://api.whatsapp.com/send?phone=${GYM_CONFIG.whatsappDefault}&text=${msg}`, '_blank');
    };
  });
}

/**
 * 6. Acordeón de Preguntas Frecuentes
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Cerrar otros
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
      // Alternar actual
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/**
 * 7. Modales (Pase de prueba gratis y contacto)
 */
function initModals() {
  const modal = document.getElementById('leadModal');
  const openBtns = document.querySelectorAll('.trigger-free-pass');
  const closeBtn = document.querySelector('.modal-close');

  if (!modal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(b => b.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/**
 * 8. Envíos de Formulario directos a WhatsApp
 */
function initFormSubmissions() {
  const modalForm = document.getElementById('modalLeadForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('leadName').value.trim();
      const telefono = document.getElementById('leadPhone').value.trim();
      const sedeKey = document.getElementById('leadSede').value;

      if (!nombre || !telefono) {
        alert('Por favor completa tu nombre y teléfono.');
        return;
      }

      // Obtener la información y el teléfono directo de la sede elegida
      const sedeInfo = GYM_CONFIG.sedes[sedeKey] || {
        nombre: sedeKey,
        telefono: GYM_CONFIG.whatsappDefault
      };

      const telefonoDestino = sedeInfo.telefono || GYM_CONFIG.whatsappDefault;

      const mensaje = encodeURIComponent(
        `¡Hola Gym Milenium! 👋 Mi nombre es *${nombre}* (${telefono}). Me registré en la web para solicitar mi *CLASE DE PRUEBA GRATIS* en la *${sedeInfo.nombre}*. ¿Cómo coordinamos el horario?`
      );

      const url = `https://api.whatsapp.com/send?phone=${telefonoDestino}&text=${mensaje}`;
      window.open(url, '_blank');

      // Cerrar modal
      const modal = document.getElementById('leadModal');
      if (modal) modal.classList.remove('active');
      document.body.style.overflow = '';
      modalForm.reset();
    });
  }

  // Newsletter del footer
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por suscribirte a Gym Milenium! Pronto recibirás novedades y descuentos exclusivos.');
      newsletterForm.reset();
    });
  }
}

/**
 * 9. Desplazamiento Suave
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
