document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.getElementById('checkbox_toggle');
    var hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', function() {
        checkbox.checked = !checkbox.checked; // Esto alternará el estado del checkbox.
        document.querySelector('.menu').style.display = checkbox.checked ? 'flex' : 'none';
    });
});

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