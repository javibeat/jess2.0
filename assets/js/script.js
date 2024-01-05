document.addEventListener('DOMContentLoaded', function() {
    // Nuevo código para el menú desplegable
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", function(e) {
        let parentListItem = this.parentNode;
        
        if (parentListItem.querySelector(".dropdown")) {
            e.preventDefault(); // Previene el comportamiento por defecto del enlace
            let dropdown = parentListItem.querySelector(".dropdown");
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        } else {
            // Colapsa el menú hamburguesa si es un enlace regular
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    }));

    // Función para filtrar posts según la categoría
    function filterPosts(category) {
        // Selecciona todos los posts
        var posts = document.getElementsByClassName('post-card');
        // Convierte la colección HTML a una matriz para su procesamiento
        Array.from(posts).forEach(function(post) {
            // Verifica si el post contiene la clase de categoría o si la categoría es 'all'
            if (post.classList.contains(category) || category === 'all') {
                post.style.display = 'block'; // Muestra el post
            } else {
                post.style.display = 'none'; // Oculta el post
            }
        });
    }

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
