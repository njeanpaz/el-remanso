// ================================================
// NÚMERO DE WHATSAPP DEL HOSTAL
// ================================================
const WHATSAPP_NUMBER = '593963560568';


// ================================================
// NAVBAR: se vuelve blanco al hacer scroll
// ================================================
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {

    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

  }, { passive: true });
}


// ================================================
// MENÚ MÓVIL
// ================================================
const hamburger =
  document.getElementById('hamburger');

const navLinks =
  document.getElementById('navLinks');

if (hamburger && navLinks) {

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks
    .querySelectorAll('a')
    .forEach(link => {

      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });

    });

}


// ================================================
// IMPORTANTE
// ================================================
// El formulario de WhatsApp NO se maneja aquí.
//
// El mensaje profesional de reserva está
// dentro de index.html.
//
// Esto evita que se ejecuten DOS mensajes
// diferentes al mismo tiempo.
// ================================================


// ================================================
// LIMPIAR ERRORES DEL FORMULARIO
// ================================================
[
  'nombre',
  'habitacion',
  'llegada',
  'salida',
  'personas',
  'telefono'
].forEach(id => {

  const el =
    document.getElementById(id);

  if (el) {

    el.addEventListener(
      'input',
      function () {

        this.classList.remove('error');

      }
    );

  }

});


// ================================================
// FECHAS MÍNIMAS
// ================================================
const inputLlegada =
  document.getElementById('llegada');

const inputSalida =
  document.getElementById('salida');

if (inputLlegada && inputSalida) {

  const hoy =
    new Date()
      .toISOString()
      .split('T')[0];

  inputLlegada.min = hoy;
  inputSalida.min = hoy;


  inputLlegada.addEventListener(
    'change',
    function () {

      inputSalida.min =
        this.value;

      if (
        inputSalida.value &&
        inputSalida.value <= this.value
      ) {

        inputSalida.value = '';

      }

    }
  );

}


// ================================================
// ANIMACIONES AL HACER SCROLL
// ================================================
const style =
  document.createElement('style');

style.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

document.head.appendChild(style);


const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              'visible'
            );

            observer.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(
    '.room-card, .gallery-item, .section-header'
  )
  .forEach(el => {

    el.style.opacity = '0';

    el.style.transform =
      'translateY(24px)';

    el.style.transition =
      'opacity .6s ease, transform .6s ease';

    observer.observe(el);

  });