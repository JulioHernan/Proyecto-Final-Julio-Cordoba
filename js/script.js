//consumir los fatos desde una api, creeun archivo JSON
async function cargarProductos() {
  try {
      const response = await fetch('./productos.json');
      if (!response.ok) {
          throw new Error(`¡Error HTTP! status: ${response.status}`);
      }
      const data = await response.json();

      for (const categoria in data) {
          const section = document.getElementById(categoria);
          if (!section) {
            console.error(`No se encontró la sección con ID: ${categoria}`);
            continue; // Continua con la siguiente iteración
          }
          section.innerHTML = `
            <div class="title">
              <h1>${categoria}</h1>
              <a class="arrow" href="#">
                <img src="./img/arrow-up-to-line-svgrepo-com.svg" alt="Flecha para subir">
              </a>
            </div>
          `;

          data[categoria].forEach(producto => {
              const cardHTML = `
                  <div class="card">
                      <img src="${producto.imagen}" alt="${producto.nombre}">
                      <h3>${producto.nombre}</h3>
                      <p>${producto.descripcion}</p>
                      <p class="precio">$${producto.precio}</p>
                      <a class="btn" href="#">Comprá Ahora</a>
                  </div>
              `;
              section.innerHTML += cardHTML; // Usa += para agregar contenido, no reemplazarlo
          });
      }
  } catch (error) {
      console.error('Error al cargar los productos:', error);
      const main = document.querySelector('main');
      if (main) { // Verifica que el elemento main existe
          main.innerHTML = `<p class="error-message">Error al cargar los productos. Por favor, inténtelo de nuevo más tarde.</p>`;
      }
  }
}
cargarProductos();

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Actualiza el contador del carrito
function actualizarContador() {
  const cartCount = document.getElementById('cart-count');
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  cartCount.textContent = totalItems;
}

// Actualiza la visualización del carrito
function actualizarCarrito() {
  const cartItems = document.getElementById('cart-items');
  const totalPrice = document.getElementById('total-price');
  cartItems.innerHTML = '';

  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio * producto.cantidad;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h4>${producto.nombre}</h4>
      <div class="quantity">
        <button class="decrease" data-index="${index}">-</button>
        <span>${producto.cantidad}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
      <p>$${(producto.precio * producto.cantidad).toFixed(2)}</p>
      <button class="remove" data-index="${index}">❌</button>
    `;
    cartItems.appendChild(cartItem);
  });

  totalPrice.textContent = total.toFixed(2);

  // Guardar el carrito en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
}

// Agregar producto al carrito
function agregarAlCarrito(producto) {
  const existe = carrito.find(item => item.nombre === producto.nombre);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
}

// Manejar clics en el carrito
document.getElementById('cart-items').addEventListener('click', (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains('increase')) {
    carrito[index].cantidad++;
  } else if (e.target.classList.contains('decrease')) {
    carrito[index].cantidad--;
    if (carrito[index].cantidad === 0) {
      carrito.splice(index, 1);
    }
  } else if (e.target.classList.contains('remove')) {
    carrito.splice(index, 1);
  }
  actualizarCarrito();
});

// Vaciar carrito
document.getElementById('clear-cart').addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
});

// Mostrar/Ocultar carrito
document.getElementById('cart-button').addEventListener('click', () => {
  const cart = document.getElementById('cart');
  cart.style.display = cart.style.display === 'none' || cart.style.display === '' ? 'block' : 'none';
});

// Agregar funcionalidad a los botones "Comprá Ahora"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    const card = e.target.closest('.card');
    const producto = {
      nombre: card.querySelector('h3').textContent,
      descripcion: card.querySelector('p').textContent,
      precio: parseFloat(card.querySelector('.precio').textContent.replace('$', '')),
      imagen: card.querySelector('img').src,
    };
    agregarAlCarrito(producto);
  }
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  actualizarCarrito();
  actualizarContador();
});
