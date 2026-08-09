// ================================================
// NÚMERO DE WHATSAPP DEL HOSTAL
// Solo cambia el número aquí y funciona en todo el sitio
// ================================================
const WHATSAPP_NUMBER = '593963560568';

// ── NAVBAR: se vuelve blanco al hacer scroll ────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── MENÚ MÓVIL ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── FORMULARIO → WHATSAPP ───────────────────────
const btnReservar = document.getElementById('btnReservar');

btnReservar.addEventListener('click', () => {
  const nombre     = document.getElementById('nombre').value.trim();
  const habitacion = document.getElementById('habitacion').value;
  const llegada    = document.getElementById('llegada').value;
  const salida     = document.getElementById('salida').value;
  const personas   = document.getElementById('personas').value;
  const telefono   = document.getElementById('telefono').value.trim();
  const mensaje    = document.getElementById('mensaje').value.trim();

  // Validación
  let valido = true;
  ['nombre', 'habitacion', 'llegada', 'salida'].forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.classList.add('error');
      valido = false;
    } else {
      el.classList.remove('error');
    }
  });

  if (!valido) {
    alert('Por favor completa: nombre, habitación y fechas.');
    return;
  }

  // Formatear fechas
  const formatearFecha = (f) => {
    if (!f) return 'Sin fecha';
    const [y, m, d] = f.split('-');
    const meses = ['enero','febrero','marzo','abril','mayo','junio',
                   'julio','agosto','septiembre','octubre','noviembre','diciembre'];
    return `${parseInt(d)} de ${meses[parseInt(m)-1]} de ${y}`;
  };

  // Calcular noches
  let noches = '';
  if (llegada && salida) {
    const diff = (new Date(salida) - new Date(llegada)) / (1000 * 60 * 60 * 24);
    if (diff > 0) noches = ` (${diff} noche${diff !== 1 ? 's' : ''})`;
  }

  // Construir mensaje
  let texto = `🌴 *Reserva – El Remanso*\n\n`;
  texto += `👤 *Nombre:* ${nombre}\n`;
  texto += `🛏️ *Habitación:* ${habitacion}\n`;
  texto += `📅 *Llegada:* ${formatearFecha(llegada)}\n`;
  texto += `📅 *Salida:* ${formatearFecha(salida)}${noches}\n`;
  if (personas) texto += `👥 *Personas:* ${personas}\n`;
  if (telefono) texto += `📱 *Mi WhatsApp:* ${telefono}\n`;
  if (mensaje)  texto += `\n💬 *Mensaje:* ${mensaje}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`, '_blank');
});

// Limpiar errores al escribir
['nombre','habitacion','llegada','salida'].forEach(id => {
  document.getElementById(id).addEventListener('input', function() {
    this.classList.remove('error');
  });
});

// ── FECHAS MÍNIMAS ──────────────────────────────
const inputLlegada = document.getElementById('llegada');
const inputSalida  = document.getElementById('salida');
const hoy = new Date().toISOString().split('T')[0];
inputLlegada.min = hoy;
inputSalida.min  = hoy;
inputLlegada.addEventListener('change', function() {
  inputSalida.min = this.value;
  if (inputSalida.value && inputSalida.value <= this.value) {
    inputSalida.value = '';
  }
});

// ── ANIMACIONES AL HACER SCROLL ─────────────────
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.room-card, .gallery-item, .section-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});