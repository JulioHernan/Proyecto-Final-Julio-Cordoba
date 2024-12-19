//consumir los fatos desde una api, creeun archivo JSON
async function cargarProductos() {
  try {
      const response = await fetch('../productos.json');
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
