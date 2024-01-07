const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Modifica este selector para excluir el enlace 'COACHING' del comportamiento de cerrar el menú.
document.querySelectorAll(".nav-menu > .nav-item > .nav-link:not(.toggle-submenu)").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// El código para manejar el submenú no necesita cambios.
const toggleSubmenuLinks = document.querySelectorAll(".toggle-submenu");

toggleSubmenuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        // Asegúrate de que este comportamiento solo se aplique en la versión móvil.
        if (window.innerWidth <= 768) {
            let parentNavItem = link.parentElement;
            if (parentNavItem.classList.contains("has-submenu")) {
                e.preventDefault(); // Evita el comportamiento por defecto si es el enlace de 'COACHING'.
                parentNavItem.classList.toggle("active");
                let submenu = parentNavItem.querySelector(".submenu");
                submenu.classList.toggle("active");
            } else {
                // Si no es el enlace de 'COACHING', cierra el menú como de costumbre.
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        }
    });
});

