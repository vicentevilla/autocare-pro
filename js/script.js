// Esto es solo para PROBAR que el link entre HTML y JS funciona.
console.log("AutoCare Pro cargado ✅");

const botones = document.querySelectorAll('.agregar-carrito');
let contadorCarrito = 0;
const contadorSpan = document.querySelector('#contador-carrito');
let totalCarrito = 0;

botones.forEach(function (boton) {
  boton.addEventListener('click', function () {
  const producto = boton.closest('.producto');
  const precio = Number(producto.dataset.precio);

  contadorCarrito++;
  totalCarrito += precio;
  contadorSpan.textContent = `${contadorCarrito} - $${totalCarrito}`;
    });
});

const formulario = document.querySelector('#form-registro');
const mensajeError = document.querySelector('#mensaje-error');

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault(); // evita que la página se recargue

  const clave = document.querySelector('#clave').value;

  if (clave.length < 8) {
    mensajeError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
    return;
  }

  mensajeError.textContent = '';
  console.log('Formulario válido, registrando usuario...');
});