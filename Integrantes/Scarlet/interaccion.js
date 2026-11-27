const formulario = document.getElementById("form-scarlet");
const respuesta = document.getElementById("respuesta-form");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const tipo = document.getElementById("tipo").value;

  respuesta.textContent =
    "¡Gracias, " + nombre + "! Tu consulta demostrativa sobre '" + tipo + "' ha sido registrada correctamente (modo prueba).";

  formulario.reset();
});