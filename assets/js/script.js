const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu > .nav-item > .nav-link:not(.toggle-submenu)").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

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

// Cerrar el menú al desplazar en dispositivos móviles
window.addEventListener("scroll", () => {
    if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});
