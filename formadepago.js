// formadepago.js
function realizarCompra() {
    const metodoPagoSeleccionado = document.querySelector('input[name="metodoPago"]:checked').value;
    alert(`Su compra fue realizada con éxito usando ${metodoPagoSeleccionado}.`);
    // Aquí podrías redirigir al usuario a una página de confirmación o a la página principal
    window.location.href = "index.html";
    return false; // Evita que el formulario realice el envío real y recargue la página
}
