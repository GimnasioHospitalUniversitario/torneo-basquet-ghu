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