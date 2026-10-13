let ramaActual = "varonil";
let categoriaActual = "grupo-a";

function elegirRama(rama, boton) {
  ramaActual = rama;

  document.querySelectorAll("#grupoRamas .btn").forEach(b => b.classList.remove("active"));
  boton.classList.add("active");

  document.getElementById("categoriasVaronil").classList.toggle("d-none", rama !== "varonil");
  document.getElementById("categoriasFemenil").classList.toggle("d-none", rama !== "femenil");

  const grupoVisible = rama === "varonil" ? "categoriasVaronil" : "categoriasFemenil";
  const primerBoton = document.querySelector(`#${grupoVisible} .btn`);
  document.querySelectorAll("#categoriasVaronil .btn, #categoriasFemenil .btn").forEach(b => b.classList.remove("active"));
  primerBoton.classList.add("active");
  categoriaActual = primerBoton.dataset.categoria;

  abrirJornadaPorDefecto(rama);
  filtrar();
}

function elegirCategoria(categoria, boton) {
  categoriaActual = categoria;
  boton.parentElement.querySelectorAll(".btn").forEach(b => b.classList.remove("active"));
  boton.classList.add("active");
  filtrar();
}

function filtrar() {
  document.querySelectorAll("[data-rama]").forEach(el => {
    const coincide = el.dataset.rama === ramaActual && el.dataset.categoria === categoriaActual;
    el.classList.toggle("d-none", !coincide);
  });

  document.querySelectorAll(".separador-dia").forEach(separador => {
    let hayPartidoVisible = false;
    let fila = separador.nextElementSibling;

    while (fila && !fila.classList.contains("separador-dia")) {
      if (!fila.classList.contains("d-none")) {
        hayPartidoVisible = true;
        break;
      }
      fila = fila.nextElementSibling;
    }

    separador.classList.toggle("d-none", !hayPartidoVisible);
  });

  ocultarJornadasVacias("#acordeonResultados");
  ocultarJornadasVacias("#acordeonCalendario");
}

function ocultarJornadasVacias(selectorAcordeon) {
  document.querySelectorAll(`${selectorAcordeon} > .accordion-item`).forEach(jornada => {
    const hayAlgoVisible = Array.from(jornada.querySelectorAll('[data-rama]'))
      .some(el => !el.classList.contains('d-none'));
    jornada.classList.toggle('d-none', !hayAlgoVisible);
  });
}

function abrirJornadaPorDefecto(rama) {
  const mapaResultados = { varonil: "jornada6", femenil: "jornada1" };
  const mapaCalendario = { varonil: "calJornada6", femenil: "calJornada1" };

  const idResultadoAbrir = mapaResultados[rama];
  const idCalendarioAbrir = mapaCalendario[rama];

  document.querySelectorAll('#acordeonResultados .accordion-collapse').forEach(panel => {
    const instancia = bootstrap.Collapse.getOrCreateInstance(panel, { toggle: false });
    if (panel.id === idResultadoAbrir) instancia.show();
    else instancia.hide();
  });

  document.querySelectorAll('#acordeonCalendario .accordion-collapse').forEach(panel => {
    const instancia = bootstrap.Collapse.getOrCreateInstance(panel, { toggle: false });
    if (panel.id === idCalendarioAbrir) instancia.show();
    else instancia.hide();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-bs-target='#modalFoto']").forEach(img => {
    img.addEventListener("click", () => {
      document.getElementById("imagenModal").src = img.dataset.src;
    });
  });
});

window.addEventListener("scroll", () => {
  const boton = document.querySelector(".boton-subir");
  if (window.scrollY > 200) {
    boton.classList.add("visible");
  } else {
    boton.classList.remove("visible");
  }
});

document.addEventListener("DOMContentLoaded", filtrar);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".badge").forEach(badge => {
    const texto = badge.textContent.trim();

    if (/^-\s*partido$/i.test(texto)) {
      badge.remove();
      return;
    }

    const match = texto.match(/^(\d+)\s*(?:-\s*)?partidos?$/i);

    if (!match) return;

    const cantidad = parseInt(match[1], 10);

    badge.textContent = `${cantidad} ${cantidad === 1 ? "partido" : "partidos"}`;

    badge.classList.remove("bg-danger", "bg-success");

    if (cantidad >= 4) {
      badge.classList.add("bg-success");
    } else {
      badge.classList.add("bg-danger");
    }
  });
});
