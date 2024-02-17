let indiceActual = 0;
const tarjetas = document.querySelectorAll(".tarjeta");
const totalTarjetas = tarjetas.length;
const carruselContenedor = document.querySelector(".carrusel-contenedor");
const puntosNavegacion = document.querySelectorAll(".punto");

function ajustarAltura() {
    const alturaActiva = tarjetas[indiceActual].offsetHeight; // Obtén la altura de la tarjeta actual
    carruselContenedor.style.height = `${alturaActiva}px`; // Ajusta la altura del contenedor
}

function actualizarCarrusel() {
    let desplazamiento = -indiceActual * carruselContenedor.clientWidth;
    carruselContenedor.style.transform = `translateX(${desplazamiento}px)`;
    actualizarPuntos();
    ajustarAltura(); // Ajusta la altura después de actualizar el carrusel
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

// Observador para ajustar la altura después de la transición
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
            ajustarAltura();
        }
    });
});

observer.observe(carruselContenedor, { attributes: true });

// Ajustar la altura cuando la página se carga y cuando se redimensiona
window.addEventListener('load', () => {
    ajustarAltura();
    actualizarCarrusel();
});
window.addEventListener('resize', () => {
    ajustarAltura();
    actualizarCarrusel();
});

// Ajustar la altura cuando la orientación del dispositivo cambia
window.addEventListener('orientationchange', ajustarAltura);

// Puedes comentar o descomentar la siguiente línea para habilitar o deshabilitar el cambio automático de tarjetas
// setInterval(moverDerecha, 5000); // Cambia de tarjeta cada 5 segundos
