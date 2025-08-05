let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch("data/data.json")
  .then((res) => res.json())
  .then((productos) => {
    const contenedor = document.getElementById("contenedor-productos");

    productos.forEach((producto) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="assets/img/${producto.imagen}" alt="${producto.nombre}" />
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
      `;
      contenedor.appendChild(card);
    });

    // Agregar evento a todos los botones
    const botones = document.querySelectorAll(".btn-agregar");
    botones.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idProducto = parseInt(e.target.dataset.id);
        const productoSeleccionado = productos.find((p) => p.id === idProducto);
        
        carrito.push(productoSeleccionado);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `"${productoSeleccionado.nombre}" agregado al carrito`,
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
      });
    });
  })
  .catch((error) => {
    console.error("Error cargando productos:", error);
  });

  // Botón para mostrar/ocultar el carrito
const btnVerCarrito = document.getElementById("btn-ver-carrito");
const carritoContenido = document.getElementById("carrito-contenido");
const carritoTotal = document.getElementById("carrito-total");

btnVerCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

// Función para mostrar el carrito en pantalla
function mostrarCarrito() {
  carritoContenido.innerHTML = "";

  if (carrito.length === 0) {
    carritoContenido.innerHTML = "<p>El carrito está vacío.</p>";
    carritoTotal.textContent = "Total: $0";
    return;
  }

  let total = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("item-carrito");
    item.innerHTML = `
      <p>${producto.nombre} - $${producto.precio}</p>
      <button class="btn-eliminar" data-index="${index}">Eliminar</button>
    `;
    carritoContenido.appendChild(item);
    total += producto.precio;
  });

  carritoTotal.textContent = `Total: $${total}`;
  
  // Eliminar productos del carrito
  const botonesEliminar = document.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito(); // Volver a renderizar el carrito
    });
  });
}
