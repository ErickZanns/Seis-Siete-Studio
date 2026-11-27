{
  // =========================================================
  // GENERADOR DE ARTE GENERATIVO - ERICK SÁNCHEZ
  // Propuesta: "PULSO LUMÍNICO & TRAZOS ORBITALES"
  // =========================================================

  const canvasErick = document.getElementById("lienzo-erick");
  const ctxErick = canvasErick.getContext("2d");

  const paletaNebulosa = [
    "#0c0a18",
    "#27184e",
    "#4c3599",
    "#3b66c4",
    "#c43456"
  ];

  const paletaPulso = [
    "#090d1c",
    "#1c2c5e",
    "#5a2e8a",
    "#9e2a47",
    "#6875d6"
  ];

  let paletaActual = paletaNebulosa;
  let nombrePaleta = "NEBULOSA ÍNDIGO";

  function dibujarFondo(colores) {
    const gradiente = ctxErick.createLinearGradient(0, 0, canvasErick.width, canvasErick.height);
    gradiente.addColorStop(0, colores[0]);
    gradiente.addColorStop(0.45, colores[1]);
    gradiente.addColorStop(0.8, colores[2]);
    gradiente.addColorStop(1, colores[3]);

    ctxErick.fillStyle = gradiente;
    ctxErick.fillRect(0, 0, canvasErick.width, canvasErick.height);

    const luzAmbiente = ctxErick.createRadialGradient(
      canvasErick.width * 0.72,
      canvasErick.height * 0.32,
      15,
      canvasErick.width * 0.72,
      canvasErick.height * 0.32,
      340
    );
    luzAmbiente.addColorStop(0, "rgba(196, 52, 86, 0.24)");
    luzAmbiente.addColorStop(0.6, "rgba(76, 53, 153, 0.12)");
    luzAmbiente.addColorStop(1, "rgba(12, 10, 24, 0)");

    ctxErick.fillStyle = luzAmbiente;
    ctxErick.fillRect(0, 0, canvasErick.width, canvasErick.height);
  }

  function dibujarLineaGlow(color) {
    ctxErick.save();
    const horizontal = Math.random() > 0.35;
    let x1, y1, x2, y2;

    if (horizontal) {
      x1 = -20;
      y1 = Math.random() * canvasErick.height;
      x2 = canvasErick.width + 20;
      y2 = Math.random() * canvasErick.height;
    } else {
      x1 = Math.random() * canvasErick.width;
      y1 = -20;
      x2 = Math.random() * canvasErick.width;
      y2 = canvasErick.height + 20;
    }

    const grosor = 1.2 + Math.random() * 4.2;

    ctxErick.strokeStyle = color;
    ctxErick.lineWidth = grosor;
    ctxErick.globalAlpha = 0.65;
    ctxErick.shadowColor = color;
    ctxErick.shadowBlur = 14 + grosor * 3;

    ctxErick.beginPath();
    ctxErick.moveTo(x1, y1);
    ctxErick.lineTo(x2, y2);
    ctxErick.stroke();

    if (grosor > 3.2) {
      ctxErick.strokeStyle = "rgba(255, 255, 255, 0.55)";
      ctxErick.lineWidth = 0.9;
      ctxErick.stroke();
    }

    ctxErick.restore();
  }

  function dibujarResorte(x, y, largo, amplitud, color) {
    ctxErick.save();
    ctxErick.translate(x, y);
    ctxErick.rotate((Math.random() - 0.5) * Math.PI);

    ctxErick.strokeStyle = color;
    ctxErick.lineWidth = 1.8 + Math.random() * 1.4;
    ctxErick.globalAlpha = 0.8;
    ctxErick.shadowColor = color;
    ctxErick.shadowBlur = 8;

    const vueltas = 4 + Math.floor(Math.random() * 4);
    const pasos = vueltas * 24;

    ctxErick.beginPath();
    for (let i = 0; i <= pasos; i++) {
      const t = i / pasos;
      const angulo = t * vueltas * Math.PI * 2;
      const px = t * largo + Math.cos(angulo) * (amplitud * 0.42);
      const py = Math.sin(angulo) * amplitud;

      if (i === 0) {
        ctxErick.moveTo(px, py);
      } else {
        ctxErick.lineTo(px, py);
      }
    }

    ctxErick.stroke();
    ctxErick.restore();
  }

  function dibujarNodoOrbital(x, y, radio, color) {
    ctxErick.save();
    ctxErick.translate(x, y);
    ctxErick.shadowColor = color;
    ctxErick.shadowBlur = 14;

    ctxErick.strokeStyle = color;
    ctxErick.lineWidth = 1.5;
    ctxErick.globalAlpha = 0.72;
    ctxErick.beginPath();
    ctxErick.arc(0, 0, radio, 0, Math.PI * 2);
    ctxErick.stroke();

    ctxErick.lineWidth = 2.4;
    ctxErick.beginPath();
    ctxErick.arc(0, 0, radio * 0.65, -0.4, 1.8);
    ctxErick.stroke();

    const rCentro = radio * 0.28;
    ctxErick.fillStyle = "#ffffff";
    ctxErick.globalAlpha = 0.88;
    ctxErick.beginPath();
    ctxErick.moveTo(0, -rCentro);
    ctxErick.lineTo(rCentro, 0);
    ctxErick.lineTo(0, rCentro);
    ctxErick.lineTo(-rCentro, 0);
    ctxErick.closePath();
    ctxErick.fill();

    ctxErick.restore();
  }

  function dibujarTipografiaCanvas(colores) {
    ctxErick.save();
    ctxErick.textAlign = "left";

    ctxErick.strokeStyle = "rgba(255, 255, 255, 0.16)";
    ctxErick.lineWidth = 1.2;
    ctxErick.strokeRect(22, 22, canvasErick.width - 44, canvasErick.height - 44);

    ctxErick.fillStyle = "#f8fafc";
    ctxErick.font = "700 28px 'Segoe UI', system-ui, sans-serif";
    ctxErick.fillText("PULSO LUMÍNICO", 40, canvasErick.height - 54);

    ctxErick.fillStyle = colores[4];
    ctxErick.font = "600 13px monospace";
    ctxErick.fillText(
      `ERICK SÁNCHEZ // ${nombrePaleta}`,
      40,
      canvasErick.height - 34
    );

    ctxErick.restore();
  }

  function generarComposicion() {
    dibujarFondo(paletaActual);

    const totalElementos = 18;

    for (let i = 0; i < totalElementos; i++) {
      const x = 75 + Math.random() * (canvasErick.width - 150);
      const y = 65 + Math.random() * (canvasErick.height - 140);
      const indiceColor = 2 + Math.floor(Math.random() * (paletaActual.length - 2));
      const colorElegido = paletaActual[indiceColor];

      if (i % 3 === 0) {
        dibujarLineaGlow(colorElegido);
      } else if (i % 3 === 1) {
        const largo = 50 + Math.random() * 65;
        const amplitud = 7 + Math.random() * 10;
        dibujarResorte(x, y, largo, amplitud, colorElegido);
      } else {
        const radio = 16 + Math.random() * 24;
        dibujarNodoOrbital(x, y, radio, colorElegido);
      }
    }

    dibujarTipografiaCanvas(paletaActual);
  }

  document.getElementById("btn-erick-paleta-1").addEventListener("click", () => {
    paletaActual = paletaNebulosa;
    nombrePaleta = "NEBULOSA ÍNDIGO";
    generarComposicion();
  });

  document.getElementById("btn-erick-paleta-2").addEventListener("click", () => {
    paletaActual = paletaPulso;
    nombrePaleta = "PULSO CARMESÍ";
    generarComposicion();
  });

  document.getElementById("btn-erick-generar").addEventListener("click", () => {
    generarComposicion();
  });

  document.getElementById("btn-erick-png").addEventListener("click", () => {
    const enlace = document.createElement("a");
    enlace.download = "Erick_Sanchez_ArteGenerativo.png";
    enlace.href = canvasErick.toDataURL("image/png");
    enlace.click();
  });

  generarComposicion();
}