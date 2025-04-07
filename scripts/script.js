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


  // Load header
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
    });

  // Load nav + highlight active link
  fetch("nav.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("nav-placeholder").innerHTML = data;

      const currentPage = window.location.pathname.split("/").pop();
      const links = document.querySelectorAll('nav a, .overlay-menu-items a');
      links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });
    });

  // Load footer
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });


    const page = window.location.pathname;

    // Load Header
    fetch("header.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;
      });
  
    // Load Main Nav
    fetch("nav.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("nav-placeholder").innerHTML = data;
      });
  
    // Load Footer
    fetch("footer.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
      });
  
    // Load correct subnav based on page
    if (page.includes("research")) {
      fetch("subnav-research.html")
        .then(res => res.text())
        .then(data => {
          document.getElementById("subnav-placeholder").innerHTML = data;
        });
    } else if (page.includes("teaching")) {
      fetch("subnav-teaching.html")
        .then(res => res.text())
        .then(data => {
          document.getElementById("subnav-placeholder").innerHTML = data;
        });
    }
