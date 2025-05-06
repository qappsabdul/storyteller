// Common JavaScript functions
document.addEventListener('DOMContentLoaded', () => {
    // Add active class to current navigation item
    const currentPath = window.location.pathname;
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || 
            (linkPath !== '/' && currentPath.startsWith(linkPath))) {
            link.classList.add('active');
        }
    });
});