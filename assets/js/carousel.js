// Código del carrusel
let indiceActual = 0;
const tarjetas = document.querySelectorAll(".tarjeta");
const totalTarjetas = tarjetas.length;
const carruselContenedor = document.querySelector(".carrusel-contenedor");
const puntosNavegacion = document.querySelectorAll(".punto");

function actualizarCarrusel() {
    let desplazamiento = -indiceActual * 100 / totalTarjetas;
    carruselContenedor.style.transform = `translateX(${desplazamiento}%)`;
    actualizarPuntos();
}

function actualizarPuntos() {
    puntosNavegacion.forEach((punto, indice) => {
        punto.classList.toggle("activo", indice === indiceActual);
    });
}

function moverA(indice) {
    indiceActual = indice;
    actualizarCarrusel();
}

function moverDerecha() {
    if (indiceActual < totalTarjetas - 1) {
        indiceActual++;
    } else {
        indiceActual = 0;
    }
    actualizarCarrusel();
}

function moverIzquierda() {
    if (indiceActual > 0) {
        indiceActual--;
    } else {
        indiceActual = totalTarjetas - 1;
    }
    actualizarCarrusel();
}

// // Cambio automático
// setInterval(moverDerecha, 5000);
