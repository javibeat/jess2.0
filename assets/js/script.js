document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // Event listener para el menú hamburguesa
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Event listeners para los enlaces del menú
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", function(e) {
        const nextElement = this.nextElementSibling;
        if (nextElement && nextElement.classList.contains('dropdown')) {
            // Previene la navegación predeterminada si es un enlace de desplegable
            e.preventDefault();
            // Muestra u oculta el menú desplegable
            const isDropdownVisible = nextElement.style.display === 'block';
            // Oculta cualquier desplegable abierto
            document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.style.display = 'none');
            // Muestra u oculta el desplegable actual
            nextElement.style.display = isDropdownVisible ? 'none' : 'block';
        } else {
            // Si no es un desplegable, cierra el menú hamburguesa
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    }));

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

    // Funcionalidad para los acordeones
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
