document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", function(e) {
        const nextElement = this.nextElementSibling;
        if (hamburger.classList.contains("active") && nextElement && nextElement.classList.contains('dropdown')) {
            e.preventDefault();
            const isVisible = nextElement.style.display === 'block';
            document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.style.display = 'none');
            nextElement.style.display = isVisible ? 'none' : 'block';
        } else {
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
