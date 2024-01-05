document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const coachingNavItem = document.querySelector(".nav-item.has-submenu");
    const coachingLink = coachingNavItem.querySelector(".nav-link");
    const coachingSubmenu = coachingNavItem.querySelector(".submenu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        // Asegurarse de que el submenú se cierra si el menú hamburguesa se está cerrando
        if (!hamburger.classList.contains("active") && window.innerWidth <= 768) {
            coachingSubmenu.classList.remove("active");
            coachingNavItem.classList.remove("active");
        }
    });

    // Manejar el clic en el enlace "COACHING" para dispositivos móviles
    coachingLink.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevenir que el enlace navegue a "#"
            coachingSubmenu.classList.toggle("active");
            coachingNavItem.classList.toggle("active");
        }
    });

    // Cerrar el submenú cuando se hace clic en un elemento del mismo
    coachingSubmenu.querySelectorAll('.nav-link').forEach(submenuLink => {
        submenuLink.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                coachingSubmenu.classList.remove("active");
                coachingNavItem.classList.remove("active");
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
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
