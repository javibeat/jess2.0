document.addEventListener('DOMContentLoaded', function() {
    // Referencias al botón del menú y al menú principal
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // Evento de clic para el botón del menú hamburguesa
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Excluir el enlace 'COACHING' del comportamiento de cerrar el menú
    document.querySelectorAll(".nav-menu > .nav-item > .nav-link:not(.toggle-submenu)").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // Manejar el submenú en versión móvil
    const toggleSubmenuLinks = document.querySelectorAll(".toggle-submenu");

    toggleSubmenuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            if (window.innerWidth <= 768) {
                let parentNavItem = link.parentElement;
                if (parentNavItem.classList.contains("has-submenu")) {
                    e.preventDefault();
                    parentNavItem.classList.toggle("active");
                    let submenu = parentNavItem.querySelector(".submenu");
                    submenu.classList.toggle("active");
                } else {
                    hamburger.classList.remove("active");
                    navMenu.classList.remove("active");
                }
            }
        });
    });

    // Función para filtrar posts según la categoría
    function filterPosts(category) {
        var posts = document.getElementsByClassName('post-card');
        Array.from(posts).forEach(function(post) {
            if (post.classList.contains(category) || category === 'all') {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    // Manejo de los acordeones
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const accordion = header.parentElement;
            if(accordion.classList.contains('active')) {
                accordion.classList.remove('active');
            } else {
                document.querySelectorAll('.accordion').forEach(acc => acc.classList.remove('active'));
                accordion.classList.add('active');
            }
        });
    });
});
