let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosGlobal = []; // para guardar todos los productos cargados

const contenedor = document.getElementById("contenedor-productos");
const inputBuscador = document.getElementById("buscador");

fetch("data/data.json")
  .then((res) => res.json())
  .then((productos) => {
    productosGlobal = productos;
    mostrarProductos(productosGlobal);
  })
  .catch((error) => {
    console.error("Error cargando productos:", error);
  });

// Función para renderizar productos
function mostrarProductos(lista) {
  contenedor.innerHTML = "";

  lista.forEach((producto) => {
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

  // Agregar evento a botones
  const botones = document.querySelectorAll(".btn-agregar");
  botones.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idProducto = parseInt(e.target.dataset.id);
      const productoSeleccionado = productosGlobal.find((p) => p.id === idProducto);

      carrito.push(productoSeleccionado);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `"${productoSeleccionado.nombre}" agregado al carrito`,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
      actualizarContadorCarrito();
    });
  });
}

// Buscador
inputBuscador.addEventListener("input", () => {
  const texto = inputBuscador.value.toLowerCase();

  const productosFiltrados = productosGlobal.filter((producto) =>
    producto.nombre.toLowerCase().includes(texto)
  );

  mostrarProductos(productosFiltrados);
});

// Mostrar carrito y eliminar productos
const btnVerCarrito = document.getElementById("btn-ver-carrito");
const carritoContenido = document.getElementById("carrito-contenido");
const carritoTotal = document.getElementById("carrito-total");

btnVerCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

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

  // Botones para eliminar productos
  const botonesEliminar = document.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
      actualizarContadorCarrito();
    });
  });
}

// Contador en botón Ver Carrito 
function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (contador) contador.textContent = carrito.length;
}
actualizarContadorCarrito();

// Modo oscuro
const btnModoOscuro = document.getElementById("modo-oscuro-toggle");

btnModoOscuro.addEventListener("click", () => {
  document.body.classList.toggle("modo-oscuro");

  if (document.body.classList.contains("modo-oscuro")) {
    localStorage.setItem("modoOscuro", "true");
  } else {
    localStorage.setItem("modoOscuro", "false");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const modoOscuroGuardado = localStorage.getItem("modoOscuro");
  if (modoOscuroGuardado === "true") {
    document.body.classList.add("modo-oscuro");
  }
});


