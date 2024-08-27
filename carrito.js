const productos = [
  { nombre: "Hamburguesa Clásica", precio: 3000, imagen: "img/clasica.jpeg" },
  { nombre: "Hamburguesa con Queso", precio: 3500, imagen: "img/queso.jpeg" },
  { nombre: "Hamburguesa BBQ", precio: 4000, imagen: "img/bbq.jpeg" },
  {
    nombre: "Hamburguesa Vegetariana",
    precio: 4000,
    imagen: "img/vegetariana.jpeg",
  },
  { nombre: "Hamburguesa Picante", precio: 3800, imagen: "img/picante.jpeg" },
  { nombre: "Papas Chicas", precio: 2000, imagen: "img/papasChicas.jpeg" },
  { nombre: "Papas Medianas", precio: 3250, imagen: "img/papasMedianas.jpeg" },
  { nombre: "Papas Grandes", precio: 4100, imagen: "img/papasGrandes.jpeg" },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarProductos() {
  const hamburguesasDiv = document.getElementById("hamburguesas");
  const papasDiv = document.getElementById("papas");

  productos.forEach((producto, index) => {
    const { nombre, precio, imagen } = producto;
    const img = `<img src="${imagen}" alt="${nombre}" style="width: 100px;">`;
    const btn = `<button onclick="agregarAlCarrito(${index})">Agregar</button>`;
    const productoHTML = `<div class="producto">${img}<p>${nombre} - $${precio}</p>${btn}</div>`;

    if (nombre.includes("Hamburguesa")) {
      hamburguesasDiv.innerHTML += productoHTML;
    } else {
      papasDiv.innerHTML += productoHTML;
    }
  });
}

function agregarAlCarrito(index) {
  const productoEnCarrito = carrito.find(
    (p) => p.nombre === productos[index].nombre
  );

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    const producto = { ...productos[index], cantidad: 1 };
    carrito.push(producto);
  }

  guardarCarrito();
  mostrarCarrito();
  calcularTotal();
}

function mostrarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  carritoDiv.innerHTML = "";

  carrito.forEach((producto, index) => {
    const { nombre, precio, cantidad } = producto;
    carritoDiv.innerHTML += `<p>${nombre} - $${precio} x ${cantidad} <button onclick="eliminarDelCarrito(${index})">Eliminar</button> <button onclick="cambiarCantidad(${index}, 1)">+</button> <button  onclick="cambiarCantidad(${index}, -1)">-</button></p>`;
  });
}

function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  guardarCarrito();
  mostrarCarrito();
  calcularTotal();
}

function calcularTotal() {
  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );
  document.getElementById("total").innerText = total;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
  calcularTotal();
}

mostrarProductos();
mostrarCarrito();
calcularTotal();



function comprar() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Añade productos antes de comprar.");
    return;
  }
  window.location.href = "formadepago.html";
}
