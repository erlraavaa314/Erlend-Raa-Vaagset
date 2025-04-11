function startMatrixRain() {
    if (document.getElementById('matrix-canvas')) return; // Prevent duplicate canvas
  
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    document.body.appendChild(canvas);
  
    const ctx = canvas.getContext('2d');
  
    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
  
    const letters = '01';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }, () => Math.random() * canvas.height);
  
    function drawMatrixRain() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ff00ff';


      ctx.font = fontSize + 'px monospace';
  
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
  
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
  
        drops[i]++;
      }
    }
  
    setInterval(drawMatrixRain, 50);
  }
  
  window.startMatrixRain = startMatrixRain;
  