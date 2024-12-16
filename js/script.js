// Para validar el formulario de contacto

const contactForm = document.getElementById('contact-form');

// Función para validar el formulario
function validateForm(event) {
  event.preventDefault(); // Evita el envío del formulario por defecto


  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Validaciones básicas
  if (name === '') {
    alert('Por favor, ingresa tu nombre.');
    return false;
  }

  if (email === '' || !isValidEmail(email)) {
    alert('Por favor, ingresa una dirección de correo electrónico válida.');
    return false;
  }

  if (message === '') {
    alert('Por favor, escribe un mensaje.');
    return false;
  }

  // Si todas las validaciones pasan, envía el formulario
  contactForm.submit();
}

// Función para validar el formato de un correo electrónico
function isValidEmail(email) {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

contactForm.addEventListener('submit', validateForm);