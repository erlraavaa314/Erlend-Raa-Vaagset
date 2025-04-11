// ----------------------------
// Theme Toggle: Light → Dark → Terminal
// ----------------------------
function loadMatrixRain() {
  // Avoid loading multiple times
  if (document.getElementById('matrix-canvas')) return;

  // If already loaded, just run it
  if (typeof window.startMatrixRain === 'function') {
    window.startMatrixRain();
    return;
  }

  // Otherwise, load script and run after load
  const script = document.createElement('script');
  script.src = 'scripts/matrix-rain.js'; // ✅ path must be correct
  script.onload = () => {
    if (typeof window.startMatrixRain === 'function') {
      window.startMatrixRain();
    } else {
      console.error("startMatrixRain not found after loading.");
    }
  };
  script.onerror = () => {
    console.error("Matrix rain script failed to load.");
  };
  document.body.appendChild(script);
}


function removeMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    canvas.remove();
  }
}


// Apply the selected theme
function applyTheme(theme) {
  document.body.classList.remove('dark-mode', 'terminal-mode');
  localStorage.setItem('theme', theme);

  const themeToggle = document.getElementById('theme-toggle');

  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '🌙';
    removeMatrixRain();
  } else if (theme === 'terminal') {
    document.body.classList.add('terminal-mode');
    themeToggle.innerHTML = '🖥️';
    loadMatrixRain();
  } else {
    themeToggle.innerHTML = '☀️';
    removeMatrixRain();
  }
}

// Cycle through the 3 modes
function cycleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  const next = current === 'light' ? 'dark' : current === 'dark' ? 'terminal' : 'light';
  applyTheme(next);
}

// ----------------------------
// Load header, then set up theme
// ----------------------------
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const savedTheme = localStorage.getItem('theme') || 'light';
      applyTheme(savedTheme);
      themeToggle.addEventListener('click', cycleTheme);
    }

    // Mobile Menu Toggle
    const burger = document.getElementById('menu-toggle');
    const overlay = document.getElementById('overlay');
    const closeOverlay = document.getElementById('close-overlay');

    if (burger && overlay && closeOverlay) {
      burger.addEventListener('click', () => overlay.classList.add('open'));
      closeOverlay.addEventListener('click', () => overlay.classList.remove('open'));
    }
  });

// ----------------------------
// Load Nav and highlight active page
// ----------------------------
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

// ----------------------------
// Load footer
// ----------------------------
fetch("footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });

// ----------------------------
// Load subnav based on page
// ----------------------------
const page = window.location.pathname;
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
