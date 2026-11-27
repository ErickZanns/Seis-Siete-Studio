// =========================================================
// 1. 9 ESTRELLAS INDIVIDUALES EN 3 ZONAS REACTIVAS AL SCROLL
// =========================================================
const gruposEstrellasIndividuales = [
  {
    contenedor: document.getElementById("rock-group-1"),
    baseTop: 5,
    baseX: 1.5,
    lado: "left",
    estrellas: [
      document.querySelector(".star-g1-a"),
      document.querySelector(".star-g1-b"),
      document.querySelector(".star-g1-c")
    ],
    tamanos: [44, 72, 122], // Pequeña, mediana y grande
    angulosBase: [-14, 12, 22]
  },
  {
    contenedor: document.getElementById("rock-group-2"),
    baseTop: 42,
    baseX: 1.5,
    lado: "right",
    estrellas: [
      document.querySelector(".star-g2-a"),
      document.querySelector(".star-g2-b"),
      document.querySelector(".star-g2-c")
    ],
    tamanos: [42, 68, 114],
    angulosBase: [-10, 18, -20]
  },
  {
    contenedor: document.getElementById("rock-group-3"),
    baseTop: 74,
    baseX: 2.0,
    lado: "left",
    estrellas: [
      document.querySelector(".star-g3-a"),
      document.querySelector(".star-g3-b"),
      document.querySelector(".star-g3-c")
    ],
    tamanos: [38, 64, 110],
    angulosBase: [8, -16, 25]
  }
];

// Combinaciones para que las 3 estrellas de cada grupo intercambien tamaños
const permutaciones = [
  [1, 2, 0], // Mediana, Grande, Pequeña
  [2, 0, 1], // Grande, Pequeña, Mediana
  [0, 1, 2], // Pequeña, Mediana, Grande
  [2, 1, 0], // Grande, Mediana, Pequeña
  [0, 2, 1], // Pequeña, Grande, Mediana
  [1, 0, 2]  // Mediana, Pequeña, Grande
];

let ultimoPasoScroll = -1;

function actualizarEstrellasIndividuales() {
  const scrollY = window.scrollY;
  const pasoActual = Math.floor(scrollY / 180);

  if (pasoActual === ultimoPasoScroll) return;
  ultimoPasoScroll = pasoActual;

  gruposEstrellasIndividuales.forEach((grupo, idxGrupo) => {
    // 1. Mantiene cada grupo en su costado, variando ligeramente su posición en esa zona
    if (grupo.contenedor) {
      const variacionTop = ((pasoActual * 5 + idxGrupo * 7) % 9) - 4; // Entre -4% y +4%
      const variacionX = ((pasoActual * 3 + idxGrupo * 2) % 4) * 0.6; // Entre 0% y +1.8%

      grupo.contenedor.style.top = `${grupo.baseTop + variacionTop}%`;
      if (grupo.lado === "left") {
        grupo.contenedor.style.left = `${grupo.baseX + variacionX}%`;
      } else {
        grupo.contenedor.style.right = `${grupo.baseX + variacionX}%`;
      }
    }

    // 2. Intercambia tamaños y ángulos de cada estrella individualmente
    const indicePermutacion = Math.abs(pasoActual + idxGrupo * 2) % permutaciones.length;
    const ordenTamanos = permutaciones[indicePermutacion];

    grupo.estrellas.forEach((estrella, idxEstrella) => {
      if (!estrella) return;

      const nuevoTamano = grupo.tamanos[ordenTamanos[idxEstrella]];
      const variacionGiro = (pasoActual + idxEstrella + idxGrupo) % 2 === 0 ? 18 : -18;
      const anguloFinal = grupo.angulosBase[idxEstrella] + variacionGiro;

      estrella.style.width = `${nuevoTamano}px`;
      estrella.style.transform = `rotate(${anguloFinal}deg)`;
    });
  });
}

window.addEventListener("scroll", actualizarEstrellasIndividuales, { passive: true });
actualizarEstrellasIndividuales();

// =========================================================
// 2. FORMULARIO DEMOSTRATIVO DE CONTACTO
// =========================================================
const formScarlet = document.getElementById("form-scarlet");
if (formScarlet) {
  formScarlet.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre-contacto").value;
    document.getElementById("respuesta-form").textContent =
      `¡Listo, ${nombre}! Tu mensaje de prueba fue registrado.`;
    formScarlet.reset();
  });
}