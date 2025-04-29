// ----------------------------
// Theme Toggle: Light → Dark → Terminal → Fjord
// ----------------------------

function loadMatrixRain() {
  if (document.getElementById('matrix-canvas')) return;
  if (typeof window.startMatrixRain === 'function') {
    window.startMatrixRain();
    return;
  }
  const script = document.createElement('script');
  script.src = 'scripts/matrix-rain.js';
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
  document.body.classList.remove('dark-mode', 'terminal-mode', 'fjord-mode');
  localStorage.setItem('theme', theme);

  const themeToggle = document.getElementById('theme-toggle');

  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '🖍️'; // Crayon for blackboard dark mode
    removeMatrixRain();
  } else if (theme === 'terminal') {
    document.body.classList.add('terminal-mode');
    themeToggle.innerHTML = '🖥️'; // Monitor for terminal mode
    loadMatrixRain();
  } else if (theme === 'fjord') {
    document.body.classList.add('fjord-mode');
    themeToggle.innerHTML = '🏔️'; // Mountain for fjord mode
    removeMatrixRain();
  } else {
    themeToggle.innerHTML = '🪶'; // Feather for light (paper) mode
    removeMatrixRain();
  }
}


// Cycle through the 4 modes
function cycleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  let next;
  if (current === 'light') {
    next = 'dark';
  } else if (current === 'dark') {
    next = 'terminal';
  } else if (current === 'terminal') {
    next = 'fjord';
  } else {
    next = 'light';
  }
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
