// Esto es solo para PROBAR que el link entre HTML y JS funciona.
console.log("AutoCare Pro cargado ✅");

// CARRITO DE COMPRAS
const botones = document.querySelectorAll('.agregar-carrito');
let contadorCarrito = 0;
let totalCarrito = 0;
const contadorSpan = document.querySelector('#contador-carrito');
const listaCarrito = document.querySelector('#lista-carrito');
const totalSpan = document.querySelector('#carrito-total');
const carritoItems = [];
 
botones.forEach(function (boton) {
  boton.addEventListener('click', function () {
    const producto = boton.closest('.producto');
    const nombre = producto.querySelector('h3').textContent;
    const precio = Number(producto.dataset.precio);
 
    carritoItems.push({ nombre, precio });
    contadorCarrito++;
    totalCarrito += precio;
    contadorSpan.textContent = contadorCarrito;
 
    renderCarrito();
  });
});
 
function renderCarrito() {
  if (carritoItems.length === 0) {
    listaCarrito.innerHTML = '<li class="carrito-vacio">Aún no has agregado productos.</li>';
  } else {
    listaCarrito.innerHTML = carritoItems
      .map(function (item) {
        return '<li><span>' + item.nombre + '</span><span>$' + item.precio.toLocaleString('es-CL') + '</span></li>';
      })
      .join('');
  }
  totalSpan.textContent = 'Total: $' + totalCarrito.toLocaleString('es-CL');
}
 
renderCarrito();

// VALIDACIÓN DEL FORMULARIO DE REGISTRO
const formulario = document.querySelector('#form-registro');
const mensajeError = document.querySelector('#mensaje-error');
 
const campoNombre = document.querySelector('#nombre');
const campoEmail = document.querySelector('#email');
const campoClave = document.querySelector('#clave');
 
const errorNombre = document.querySelector('#error-nombre');
const errorEmail = document.querySelector('#error-email');
const errorClave = document.querySelector('#error-clave');
 
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexClave = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
 
function validarNombre() {
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
}
 
function validarEmail() {
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
}
 
function validarClave() {
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
}
 
// Validación en tiempo real: apenas el usuario sale del campo
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
