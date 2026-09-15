// CARRITO DE COMPRAS (compartido entre todas las páginas)
const CLAVE_CARRITO = 'autocare-carrito';
 
function obtenerCarrito() {
  const datos = localStorage.getItem(CLAVE_CARRITO);
  return datos ? JSON.parse(datos) : [];
}
 
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}
 
function actualizarContador() {
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce(function (suma, item) {
    return suma + item.cantidad;
  }, 0);
  const contadorSpan = document.querySelector('#contador-carrito');
  if (contadorSpan) {
    contadorSpan.textContent = totalItems;
  }
}
 
function agregarProducto(nombre, precio) {
  const carrito = obtenerCarrito();
  const existente = carrito.find(function (item) {
    return item.nombre === nombre;
  });
 
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
  }
 
  guardarCarrito(carrito);
  actualizarContador();
}
 
// Botones "Agregar al carrito" (solo existen en index.html)
const botones = document.querySelectorAll('.agregar-carrito');
botones.forEach(function (boton) {
  boton.addEventListener('click', function () {
    const producto = boton.closest('.producto');
    const nombre = producto.querySelector('h3').textContent.trim();
    const precio = Number(producto.dataset.precio);
    agregarProducto(nombre, precio);
  });
});
 
// Esto corre en TODAS las páginas para que el número del menú esté siempre actualizado
actualizarContador();
 
// ============================
// PÁGINA DEL CARRITO (solo existe en carrito.html)
// ============================
const cuerpoCarrito = document.querySelector('#cuerpo-carrito');
 
if (cuerpoCarrito) {
  const tabla = document.querySelector('#tabla-carrito');
  const mensajeVacio = document.querySelector('#carrito-vacio-mensaje');
  const totalSpan = document.querySelector('#carrito-total');
  const botonVaciar = document.querySelector('#vaciar-carrito');
 
  function renderCarrito() {
    const carrito = obtenerCarrito();
 
    if (carrito.length === 0) {
      tabla.hidden = true;
      mensajeVacio.hidden = false;
      totalSpan.textContent = '$0';
      return;
    }
 
    tabla.hidden = false;
    mensajeVacio.hidden = true;
 
    cuerpoCarrito.innerHTML = carrito.map(function (item, indice) {
      const subtotal = item.precio * item.cantidad;
      return '<tr>' +
        '<td>' + item.nombre + '</td>' +
        '<td>$' + item.precio.toLocaleString('es-CL') + '</td>' +
        '<td>' + item.cantidad + '</td>' +
        '<td>$' + subtotal.toLocaleString('es-CL') + '</td>' +
        '<td><button type="button" class="eliminar-item" data-indice="' + indice + '">Eliminar</button></td>' +
        '</tr>';
    }).join('');
 
    const total = carrito.reduce(function (suma, item) {
      return suma + item.precio * item.cantidad;
    }, 0);
    totalSpan.textContent = '$' + total.toLocaleString('es-CL');
 
    document.querySelectorAll('.eliminar-item').forEach(function (boton) {
      boton.addEventListener('click', function () {
        const indice = Number(boton.dataset.indice);
        const carritoActual = obtenerCarrito();
        carritoActual.splice(indice, 1);
        guardarCarrito(carritoActual);
        actualizarContador();
        renderCarrito();
      });
    });
  }
 
  botonVaciar.addEventListener('click', function () {
    guardarCarrito([]);
    actualizarContador();
    renderCarrito();
  });
 
  renderCarrito();
}
 
// ============================
// VALIDACIÓN DEL FORMULARIO DE REGISTRO (solo existe en index.html)
// ============================
const formulario = document.querySelector('#form-registro');
 
if (formulario) {
  const mensajeError = document.querySelector('#mensaje-error');
  const campoNombre = document.querySelector('#nombre');
  const campoEmail = document.querySelector('#email');
  const campoClave = document.querySelector('#clave');
  const errorNombre = document.querySelector('#error-nombre');
  const errorEmail = document.querySelector('#error-email');
  const errorClave = document.querySelector('#error-clave');
 
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexClave = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
 
  const validarNombre = function () {
    const valor = campoNombre.value.trim();
    if (valor === '') {
      errorNombre.textContent = 'El nombre es obligatorio.';
      return false;
    }
    if (valor.length < 3) {
      errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
      return false;
    }
    if (/\d/.test(valor)) {
      errorNombre.textContent = 'El nombre no puede contener números.';
      return false;
    }
    errorNombre.textContent = '';
    return true;
  };
 
  const validarEmail = function () {
    const valor = campoEmail.value.trim();
    if (valor === '') {
      errorEmail.textContent = 'El correo es obligatorio.';
      return false;
    }
    if (!regexEmail.test(valor)) {
      errorEmail.textContent = 'Ingresa un correo válido, ej: nombre@dominio.com';
      return false;
    }
    errorEmail.textContent = '';
    return true;
  };
 
  const validarClave = function () {
    const valor = campoClave.value;
    if (valor === '') {
      errorClave.textContent = 'La contraseña es obligatoria.';
      return false;
    }
    if (!regexClave.test(valor)) {
      errorClave.textContent = 'Debe tener mínimo 8 caracteres, una mayúscula y un número.';
      return false;
    }
    errorClave.textContent = '';
    return true;
  };
 
  campoNombre.addEventListener('blur', validarNombre);
  campoEmail.addEventListener('blur', validarEmail);
  campoClave.addEventListener('blur', validarClave);
 
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
 
    const nombreOk = validarNombre();
    const emailOk = validarEmail();
    const claveOk = validarClave();
 
    if (!nombreOk || !emailOk || !claveOk) {
      mensajeError.textContent = 'Revisa los campos marcados en rojo.';
      mensajeError.className = 'mensaje-error';
      return;
    }
 
    mensajeError.textContent = '¡Registro exitoso! Bienvenido/a a AutoCare Pro.';
    mensajeError.className = 'mensaje-exito';
    formulario.reset();
  });
}
