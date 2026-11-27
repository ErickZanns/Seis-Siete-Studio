// =========================================================
// GENERADOR DE ARTE GENERATIVO - SCARLET GARCIA
// Propuesta: "ECLIPSE CARMESÍ & ABISMO ÍNDIGO"
// =========================================================

const canvas = document.getElementById("lienzo-generativo");
const ctx = canvas.getContext("2d");

// Dos paletas (negros, rojos oscuros, rojos y azules morados)
const paletaCarmesi = [
  "#09050d", // Negro profundo
  "#4a0416", // Rojo oscuro / vino
  "#d90429", // Rojo intenso
  "#3a0ca3", // Azul morado / índigo
  "#ff4d6d"  // Destello carmesí claro
];

const paletaAbismo = [
  "#05040a", // Negro abisal
  "#240046", // Morado azulado oscuro
  "#3f37c9", // Azul morado vibrante
  "#800f2f", // Rojo oscuro rubí
  "#c9184a"  // Rojo neón suave
];

let paletaActual = paletaCarmesi;
let nombrePaleta = "EDICIÓN CARMESÍ NOCTURNO";

// Función 1: Dibuja el fondo con degradado lineal y halo radial
function dibujarFondo(colores) {
  const degradado = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  degradado.addColorStop(0, colores[0]);
  degradado.addColorStop(0.55, colores[1]);
  degradado.addColorStop(1, colores[3]);

  ctx.fillStyle = degradado;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const halo = ctx.createRadialGradient(
    canvas.width * 0.5,
    canvas.height * 0.48,
    20,
    canvas.width * 0.5,
    canvas.height * 0.48,
    320
  );
  halo.addColorStop(0, "rgba(217, 4, 41, 0.22)");
  halo.addColorStop(1, "rgba(9, 5, 13, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Función auxiliar para trazar la ruta de una estrella de 5 puntas
function trazarEstrella(radioExterno, radioInterno) {
  const puntas = 5;
  let angulo = -Math.PI / 2;
  const paso = Math.PI / puntas;

  ctx.beginPath();
  for (let i = 0; i < puntas * 2; i++) {
    const r = i % 2 === 0 ? radioExterno : radioInterno;
    const px = Math.cos(angulo) * r;
    const py = Math.sin(angulo) * r;
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
    angulo += paso;
  }
  ctx.closePath();
}

// Función 2: Dibuja estrellas en 4 variaciones (concéntrica, rellena, contorno fino y contorno grueso)
function dibujarEstrellaVariada(x, y, radio, estilo, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((Math.random() - 0.5) * 0.6); // Ligera inclinación dinámica
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineJoin = "miter";
  ctx.globalAlpha = 0.88;

  const radioInterno = radio * 0.4;

  if (estilo === 0) {
    // Variación 1: Contorno exterior + espaciado + estrella interior rellena
    ctx.lineWidth = Math.max(2, radio * 0.11);
    trazarEstrella(radio, radioInterno);
    ctx.stroke();

    trazarEstrella(radio * 0.48, radioInterno * 0.48);
    ctx.fill();
  } else if (estilo === 1) {
    // Variación 2: Estrella sólida rellena
    trazarEstrella(radio, radioInterno);
    ctx.fill();
  } else if (estilo === 2) {
    // Variación 3: Estrella de contorno fino
    ctx.lineWidth = 1.8;
    trazarEstrella(radio, radioInterno);
    ctx.stroke();
  } else {
    // Variación 4: Contorno grueso hueco (doble estrella con espaciado)
    ctx.lineWidth = Math.max(2.2, radio * 0.13);
    trazarEstrella(radio, radioInterno);
    ctx.stroke();

    ctx.lineWidth = 1.5;
    trazarEstrella(radio * 0.58, radioInterno * 0.58);
    ctx.stroke();
  }

  ctx.restore();
}

// Función 3: Dibuja una espiral con cantidad variable de aros (corta o más larga)
function dibujarEspiral(x, y, radioMax, vueltas, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8 + Math.random() * 1.5;
  ctx.globalAlpha = 0.78;

  ctx.beginPath();
  const pasos = Math.floor(vueltas * 36);

  for (let i = 0; i <= pasos; i++) {
    const progreso = i / pasos;
    const angulo = progreso * vueltas * Math.PI * 2;
    const radioActual = progreso * radioMax;
    const px = x + Math.cos(angulo) * radioActual;
    const py = y + Math.sin(angulo) * radioActual;

    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }

  ctx.stroke();
  ctx.restore();
}

// Función 4: Dibuja cuadrados/rectángulos rotados mediante fillRect()
function dibujarCuadrado(x, y, tamano, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((Math.random() * Math.PI) / 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.48;
  ctx.fillRect(-tamano / 2, -tamano / 2, tamano, tamano);
  ctx.restore();
}

// Función 5: Dibuja título y subtítulo dentro del Canvas con fillText()
function dibujarTipografiaCanvas(colores) {
  ctx.save();
  ctx.textAlign = "center";

  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px 'Segoe UI', sans-serif";
  ctx.fillText("ECLIPSE CARMESÍ", canvas.width / 2, canvas.height / 2 - 8);

  ctx.fillStyle = colores[4];
  ctx.font = "600 13px monospace";
  ctx.fillText(
    `SCARLET GARCIA // ${nombrePaleta}`,
    canvas.width / 2,
    canvas.height / 2 + 22
  );

  ctx.restore();
}

// Función 6: Orquesta toda la composición (28 elementos con bucle for y condicional)
function generarComposicion() {
  dibujarFondo(paletaActual);

  const totalElementos = 28;

  for (let i = 0; i < totalElementos; i++) {
    const x = 60 + Math.random() * (canvas.width - 120);
    const y = 60 + Math.random() * (canvas.height - 120);
    const indiceColor = 1 + Math.floor(Math.random() * (paletaActual.length - 1));
    const colorElegido = paletaActual[indiceColor];

    // Condicional if / else para alternar entre estrellas variadas, espirales y cuadrados
    if (i % 3 === 0) {
      // Estrella: tamaño pequeño a grande y 4 estilos distintos
      const radioEstrella = 16 + Math.random() * 34;
      const estiloEstrella = Math.floor(Math.random() * 4);
      dibujarEstrellaVariada(x, y, radioEstrella, estiloEstrella, colorElegido);
    } else if (i % 3 === 1) {
      // Espiral: varía aleatoriamente entre pocos aros (2) y muchos aros (7)
      const aros = 2 + Math.random() * 5.5;
      const radioEspiral = 16 + Math.random() * 32;
      dibujarEspiral(x, y, radioEspiral, aros, colorElegido);
    } else {
      // Cuadrado rotado con fillRect()
      const tamanoCuadrado = 18 + Math.random() * 46;
      dibujarCuadrado(x, y, tamanoCuadrado, colorElegido);
    }
  }

  dibujarTipografiaCanvas(paletaActual);
}

// Eventos de botones con addEventListener()
document.getElementById("btn-paleta-1").addEventListener("click", () => {
  paletaActual = paletaCarmesi;
  nombrePaleta = "EDICIÓN CARMESÍ NOCTURNO";
  generarComposicion();
});

document.getElementById("btn-paleta-2").addEventListener("click", () => {
  paletaActual = paletaAbismo;
  nombrePaleta = "EDICIÓN ABISMO ÍNDIGO";
  generarComposicion();
});

document.getElementById("btn-generar").addEventListener("click", () => {
  generarComposicion();
});

document.getElementById("btn-guardar-png").addEventListener("click", () => {
  const enlace = document.createElement("a");
  enlace.download = "Scarlet_Garcia_ArteGenerativo.png";
  enlace.href = canvas.toDataURL("image/png");
  enlace.click();
});

// Dibuja la composición inicial al cargar la página
generarComposicion();