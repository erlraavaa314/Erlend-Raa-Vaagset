// Theme Toggle with Icons
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const body = document.body;
        body.classList.toggle('dark-mode');

        const isDarkMode = body.classList.contains('dark-mode');
        const icon = isDarkMode ? '🌙' : '☀️';
        themeToggle.innerHTML = icon;
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Preserve Theme with Icons
    window.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '🌙';
        } else {
            themeToggle.innerHTML = '☀️';
        }
    });
}

// Mobile Menu Toggle
const burger = document.getElementById('menu-toggle');
const overlay = document.getElementById('overlay');
const closeOverlay = document.getElementById('close-overlay');

if (burger && overlay && closeOverlay) {
    burger.addEventListener('click', () => {
        overlay.classList.add('open');
    });

    closeOverlay.addEventListener('click', () => {
        overlay.classList.remove('open');
    });
}


// Load navigation bar
$(function(){
  $("#nav-placeholder").load("nav.html");
});