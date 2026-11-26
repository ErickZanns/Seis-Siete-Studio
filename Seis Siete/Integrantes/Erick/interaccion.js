// =========================================================
// 1. FONDO INTERACTIVO DE PUNTOS CON ILUMINACIÓN SUAVE
// =========================================================
const canvas = document.getElementById("fondo-puntos");
const ctx = canvas.getContext("2d");

let ancho, alto;
let puntos = [];
const separacion = 34; // Distancia entre puntitos
const radioLuz = 160;  // Alcance de iluminación del mouse

const mouse = {
  x: -1000,
  y: -1000
};

function crearMatrizPuntos() {
  ancho = canvas.width = window.innerWidth;
  alto = canvas.height = window.innerHeight;
  puntos = [];

  for (let x = separacion / 2; x < ancho; x += separacion) {
    for (let y = separacion / 2; y < alto; y += separacion) {
      puntos.push({
        x: x,
        y: y,
        brillo: 0 // Intensidad actual (0 = apagado/opaco, 1 = iluminado)
      });
    }
  }
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
  mouse.x = -1000;
  mouse.y = -1000;
});

window.addEventListener("resize", crearMatrizPuntos);

function animarPuntos() {
  ctx.clearRect(0, 0, ancho, alto);

  for (let i = 0; i < puntos.length; i++) {
    const p = puntos[i];
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    // Calcular intensidad objetivo según cercanía al cursor
    let objetivo = 0;
    if (distancia < radioLuz) {
      objetivo = 1 - distancia / radioLuz;
    }

    // Interpolación suave para que encienda y se apague progresivamente
    p.brillo += (objetivo - p.brillo) * 0.1;

    // Tamaño y opacidad dinámicos
    const radio = 1.4 + p.brillo * 1.8;
    const opacidad = 0.12 + p.brillo * 0.78;

    ctx.beginPath();
    ctx.arc(p.x, p.y, radio, 0, Math.PI * 2);

    if (p.brillo > 0.02) {
      ctx.fillStyle = `rgba(0, 243, 255, ${opacidad})`;
      ctx.shadowBlur = p.brillo * 12;
      ctx.shadowColor = "rgba(0, 243, 255, 0.85)";
    } else {
      ctx.fillStyle = "rgba(148, 163, 184, 0.12)";
      ctx.shadowBlur = 0;
    }

    ctx.fill();
  }

  requestAnimationFrame(animarPuntos);
}

crearMatrizPuntos();
animarPuntos();

// =========================================================
// 2. ANIMACIONES DE ENTRADA REPETIBLES AL HACER SCROLL
// =========================================================
const elementosAnimados = document.querySelectorAll(".animar-entrada");

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada, indice) => {
      if (entrada.isIntersecting) {
        // Entra en pantalla: activa la animación con ligero escalonado
        setTimeout(() => {
          entrada.target.classList.add("visible");
        }, indice * 90);
      } else {
        // Sale de pantalla al subir o bajar: reinicia para volver a animarse
        entrada.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.1
  }
);

elementosAnimados.forEach((elemento) => {
  observador.observe(elemento);
});

// =========================================================
// 3. EFECTO DE ESCRITURA EN EL SUBTÍTULO
// =========================================================
const subtitulo = document.querySelector(".subtitulo");
if (subtitulo) {
  const textoOriginal = subtitulo.textContent.trim();
  subtitulo.textContent = "";
  let i = 0;

  function escribirTexto() {
    if (i < textoOriginal.length) {
      subtitulo.textContent += textoOriginal.charAt(i);
      i++;
      setTimeout(escribirTexto, 22);
    }
  }
  escribirTexto();
}

// =========================================================
// 4. FORMULARIO DEMOSTRATIVO
// =========================================================
const formErick = document.getElementById("form-erick");
const estadoEnvio = document.getElementById("estado-envio");

if (formErick) {
  formErick.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const modulo = document.getElementById("tipo").value;

    estadoEnvio.textContent =
      `>> TRANSMISIÓN COMPLETADA: Gracias, ${nombre}. Solicitud de prueba registrada para [${modulo}].`;

    formErick.reset();
  });
}

// =========================================================
// 5. CONTROL DEL CARRUSEL DE TRABAJOS CREATIVOS
// =========================================================
const pista = document.getElementById("carrusel-pista");
const cartas = document.querySelectorAll(".card-carrusel");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const contenedorInd = document.getElementById("carrusel-indicadores");

if (pista && cartas.length > 0) {
  let indiceActual = 0;
  let indicadores = [];

  if (contenedorInd) {
    contenedorInd.innerHTML = "";
    cartas.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = idx === 0 ? "punto-ind activo" : "punto-ind";
      dot.setAttribute("aria-label", `Ir al proyecto ${idx + 1}`);
      dot.addEventListener("click", () => irACarta(idx));
      contenedorInd.appendChild(dot);
    });
    indicadores = document.querySelectorAll(".punto-ind");
  }

  function actualizarEstadoVisual(indice) {
    cartas.forEach((carta, idx) => {
      carta.classList.toggle("activa", idx === indice);
    });
    indicadores.forEach((dot, idx) => {
      dot.classList.toggle("activo", idx === indice);
    });
  }

  function irACarta(indice) {
    if (indice < 0) indice = cartas.length - 1;
    if (indice >= cartas.length) indice = 0;
    indiceActual = indice;

    const cartaObjetivo = cartas[indiceActual];
    const posicionScroll =
      cartaObjetivo.offsetLeft - (pista.clientWidth - cartaObjetivo.clientWidth) / 2;

    pista.scrollTo({
      left: posicionScroll,
      behavior: "smooth"
    });

    actualizarEstadoVisual(indiceActual);
  }

  if (btnPrev) btnPrev.addEventListener("click", () => irACarta(indiceActual - 1));
  if (btnNext) btnNext.addEventListener("click", () => irACarta(indiceActual + 1));

  pista.addEventListener("scroll", () => {
    const centroPista = pista.scrollLeft + pista.clientWidth / 2;
    let masCercana = 0;
    let menorDistancia = Infinity;

    cartas.forEach((carta, idx) => {
      const centroCarta = carta.offsetLeft + carta.clientWidth / 2;
      const distancia = Math.abs(centroPista - centroCarta);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        masCercana = idx;
      }
    });

    if (masCercana !== indiceActual) {
      indiceActual = masCercana;
      actualizarEstadoVisual(indiceActual);
    }
  });
}

// =========================================================
// 6. ESPECTRO DE AUDIO DE BARRAS (WEB AUDIO API)
// =========================================================
const reproductorAudio = document.querySelector("audio");
const canvasEspectro = document.getElementById("espectro-audio");

if (reproductorAudio && canvasEspectro) {
  const ctxAudio = canvasEspectro.getContext("2d");
  let audioCtx;
  let analizador;
  let datosFrecuencia;
  let inicializado = false;

  function ajustarTamanoEspectro() {
    canvasEspectro.width = canvasEspectro.clientWidth;
    canvasEspectro.height = canvasEspectro.clientHeight;
  }

  ajustarTamanoEspectro();
  window.addEventListener("resize", ajustarTamanoEspectro);

  function iniciarAnalizador() {
    if (inicializado) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();

    const fuente = audioCtx.createMediaElementSource(reproductorAudio);
    analizador = audioCtx.createAnalyser();
    analizador.fftSize = 64; // Genera 32 bandas de frecuencia limpias

    fuente.connect(analizador);
    analizador.connect(audioCtx.destination);

    datosFrecuencia = new Uint8Array(analizador.frequencyBinCount);
    inicializado = true;
  }

  function dibujarEspectro() {
    requestAnimationFrame(dibujarEspectro);

    const w = canvasEspectro.width;
    const h = canvasEspectro.height;
    ctxAudio.clearRect(0, 0, w, h);

    const totalBarras = 28;
    const espacio = 4;
    const anchoBarra = (w - espacio * (totalBarras + 1)) / totalBarras;

    // Degradado cian a púrpura acorde al tema
    const gradiente = ctxAudio.createLinearGradient(0, h, 0, 0);
    gradiente.addColorStop(0, "#a855f7");
    gradiente.addColorStop(1, "#00f3ff");

    if (inicializado && !reproductorAudio.paused) {
      analizador.getByteFrequencyData(datosFrecuencia);
    }

    for (let i = 0; i < totalBarras; i++) {
      let valor = 0;

      if (inicializado && !reproductorAudio.paused) {
        valor = datosFrecuencia[i] || 0;
      }

      // Altura mínima en reposo (4px) y altura dinámica al sonar
      const alturaBarra = Math.max(4, (valor / 255) * (h - 12));
      const x = espacio + i * (anchoBarra + espacio);
      const y = h - alturaBarra - 4;

      ctxAudio.fillStyle = reproductorAudio.paused
        ? "rgba(0, 243, 255, 0.25)"
        : gradiente;

      ctxAudio.beginPath();
      ctxAudio.roundRect(x, y, anchoBarra, alturaBarra, 3);
      ctxAudio.fill();
    }
  }

  reproductorAudio.addEventListener("play", () => {
    iniciarAnalizador();
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  });

  dibujarEspectro();
}