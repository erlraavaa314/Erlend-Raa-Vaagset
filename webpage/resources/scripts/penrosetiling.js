const theCanvas = document.getElementById('canvas');
const phi = (1 + Math.sqrt(5)) / 2;
const frameLimit = 600;
const maxGenerations = 10;
const minGenerations = 2;
let frame = 0;
let generations = 4;
let totalFrames = 0;
let mousePos = {};
let percent = frame / frameLimit;
let drawCount = 0;

ready(init());

document.onmousemove = (e) => {
  const rect = theCanvas.getBoundingClientRect();
  mousePos = {
      x: (e.clientX - rect.left) - (theCanvas.width/2),
      y: e.clientY - rect.top - (theCanvas.height/2)
    };
  //console.log(mousePos);
}

document.onmouseup = (e) => {
  addGen();
}

document.ontouchstart = (e) => {
  addGen();
}

function addGen() {
  if (generations < maxGenerations) {
    generations++
  } else {
    generations = minGenerations;
  }
  draw();  
}

function draw() {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  let size = height;
  let moveDir = 1;

  theCanvas.width = width;
  theCanvas.height = height;
  percent = frame / frameLimit;
  drawCount = 0;
  
  if (theCanvas.getContext) {
    const ctx = theCanvas.getContext('2d');
    ctx.translate(theCanvas.width/2, theCanvas.height/2);
    
    if (mousePos.y > width/2) {
      moveDir = 1;
    } else {
      moveDir = -1;  
    }
    
    for(let i = 0; i < 5; i++) {
      deflateKite(generations, ctx, 0, 0, size, (72 * i));
    }
    
    if (frame >= frameLimit) {
        frame = 0;
    } else {
        frame++;
    }
    totalFrames++;
    
    //window.requestAnimationFrame(() => {
      //draw();
    //});
    
  }
}

function drawDart (ctx, x=0, y=0, size=100, ang=0) {
  ctx.lineWidth = 1;
  strokey(ctx);
  gradient2(ctx);
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x + size * Math.sin((36 + ang) * Math.PI / 180),
    y - size * Math.cos((36 + ang) * Math.PI / 180)
  );
  ctx.lineTo(
    x + size * Math.sin(ang * Math.PI / 180) / phi,
    y - size * Math.cos(ang * Math.PI / 180) / phi
  );
  ctx.lineTo(
    x - size * Math.sin((36 - ang) * Math.PI / 180),
    y - size * Math.cos((36 - ang) * Math.PI / 180)
  );
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x + size * Math.sin((36 + ang) * Math.PI / 180),
    y - size * Math.cos((36 + ang) * Math.PI / 180)
  );
  ctx.lineTo(
    x + size * Math.sin(ang * Math.PI / 180) / phi,
    y - size * Math.cos(ang * Math.PI / 180) / phi
  );
  ctx.lineTo(
    x - size * Math.sin((36 - ang) * Math.PI / 180),
    y - size * Math.cos((36 - ang) * Math.PI / 180)
  );
  ctx.closePath();
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(x, y, (size/(phi*1.61)), tooRad(-126 + ang), tooRad(-54 + ang));
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(x + size * Math.sin(ang * Math.PI / 180) / phi, y - size * Math.cos(ang * Math.PI / 180) / phi, (size/(phi*2.62)), tooRad(-18 + ang), tooRad(-162 + ang));
  ctx.stroke();
}

function drawRightDart (ctx, x=0, y=0, size=100, ang=0) {
  strokey(ctx);
  gradient2(ctx);
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x + size * Math.sin((36 + ang) * Math.PI / 180),
    y - size * Math.cos((36 + ang) * Math.PI / 180)
  );
  ctx.lineTo(
    x + size * Math.sin(ang * Math.PI / 180) / phi,
    y - size * Math.cos(ang * Math.PI / 180) / phi
  );
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x + size * Math.sin((36 + ang) * Math.PI / 180),
    y - size * Math.cos((36 + ang) * Math.PI / 180)
  );
  ctx.lineTo(
    x + size * Math.sin(ang * Math.PI / 180) / phi,
    y - size * Math.cos(ang * Math.PI / 180) / phi
  );
  ctx.closePath();
  ctx.stroke();
  
  strokey(ctx);
  ctx.beginPath();
  ctx.arc(x, y, (size/(phi*1.61)), tooRad(-90 + ang), tooRad(-54 + ang));
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(x + size * Math.sin(ang * Math.PI / 180) / phi, y - size * Math.cos(ang * Math.PI / 180) / phi, (size/(phi*2.62)), tooRad(-18 + ang), tooRad(90 + ang));
  ctx.stroke();
}

function drawLeftDart (ctx, x=0, y=0, size=100, ang=0) {
  strokey(ctx);
  gradient2(ctx);
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x + size * Math.sin(ang * Math.PI / 180) / phi,
    y - size * Math.cos(ang * Math.PI / 180) / phi
  );
  ctx.lineTo(
    x - size * Math.sin((36 - ang) * Math.PI / 180),
    y - size * Math.cos((36 - ang) * Math.PI / 180)
  );
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x + size * Math.sin(ang * Math.PI / 180) / phi,
    y - size * Math.cos(ang * Math.PI / 180) / phi
  );
  ctx.lineTo(
    x - size * Math.sin((36 - ang) * Math.PI / 180),
    y - size * Math.cos((36 - ang) * Math.PI / 180)
  );
  ctx.closePath();
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(x, y, (size/(phi*1.61)), tooRad(-126 + ang), tooRad(-90 + ang));
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(x + size * Math.sin(ang * Math.PI / 180) / phi, y - size * Math.cos(ang * Math.PI / 180) / phi, (size/(phi*2.62)) , tooRad(90 + ang), tooRad(-162 + ang));
  ctx.stroke();
}

function drawKite(ctx, x=0, y=0, size=100, ang=0) {
  strokey(ctx);
  gradient1(ctx);
  
  ctx.beginPath();
  ctx.moveTo(x,y)
  ctx.lineTo(
    x + size * Math.sin((36 + ang) * Math.PI / 180),
    y - size * Math.cos((36 + ang) * Math.PI / 180)
  );
  ctx.lineTo(
    x + size * Math.sin(ang * Math.PI / 180),
    y - size * Math.cos(ang * Math.PI / 180)
  );
  ctx.lineTo(
    x - size * Math.sin((36 - ang) * Math.PI / 180),
    y - size * Math.cos((36 - ang) * Math.PI / 180)
  );
  ctx.fill();  
  ctx.beginPath();
  ctx.moveTo(x, y)
  ctx.lineTo(
    x + size * Math.sin((36 + ang) * Math.PI / 180),
    y - size * Math.cos((36 + ang) * Math.PI / 180)
  );
  ctx.lineTo(
    x + size * Math.sin(ang * Math.PI / 180),
    y - size * Math.cos(ang * Math.PI / 180)
  );
  ctx.lineTo(
    x - size * Math.sin((36 - ang) * Math.PI / 180),
    y - size * Math.cos((36 - ang) * Math.PI / 180)
  );
  ctx.closePath();
  ctx.stroke();
  
  
  ctx.beginPath();
  ctx.arc(x, y, (size/phi), tooRad(-126 + ang), tooRad(-54 + ang));
  ctx.stroke();
  
  /*ctx.arc(x, y, (size/phi), 0, 2 * Math.PI);
  gradient3(ctx, x, y, size);
  ctx.fill();*/
  
  ctx.beginPath();
  ctx.arc(x + size * Math.sin(ang * Math.PI / 180), y - size * Math.cos(ang * Math.PI / 180), (size - size/phi), tooRad(18 + ang), tooRad(162 + ang));
  ctx.stroke();
  
  /*ctx.beginPath();
  ctx.arc(x + size * Math.sin(ang * Math.PI / 180), y - size * Math.cos(ang * Math.PI / 180), (size - size/phi), 0, 2 * Math.PI);
  gradient3(ctx, x, y, size);
  ctx.fill();*/
}

function deflateDart(gens, ctx, x=0, y=0, size=100, ang=0) {
  ctx.save();
  ctx.translate(x, y);
  let dest = lineToAngle(ctx, x, y, -size, 1 * (ang + 54));
  let dest2 = lineToAngle(ctx, x, -y, -size, -1 * (ang + 126));
  ctx.restore();

  drawDart(ctx, x, y, size, ang);
  size = size / phi;

  if (gens > 1) {
    deflateKite(gens-1, ctx, x, y, size, ang + 72 * 5);
    deflateDart(gens-1, ctx, dest.x, dest.y, size, ang + 72 * 2);
    deflateDart(gens-1, ctx, dest2.x, -dest2.y, size, ang + 72 * 3);
  }
}

function deflateLeftDart(gens, ctx, x=0, y=0, size=100, ang=0) {
  ctx.save();
  ctx.translate(x, y);
  let dest = lineToAngle(ctx, -x, y, size, -1 * (ang + 54));
  let dest2 = lineToAngle(ctx, x, -y, -size, -1 * (ang + 126));
  ctx.restore();

  drawLeftDart(ctx, x, y, size, ang);
  size = size / phi;

  if (gens > 1) {
    deflateKite(gens-1, ctx, x, y, size, ang + 72 * 5);
  }
}

function deflateRightDart(gens, ctx, x=0, y=0, size=100, ang=0) {
  ctx.save();
  ctx.translate(x, y);
  let dest = lineToAngle(ctx, -x, y, size, -1 * (ang + 54));
  let dest2 = lineToAngle(ctx, x, -y, -size, -1 * (ang + 126));
  ctx.restore();

  drawRightDart(ctx, x, y, size, ang);
  size = size / phi;

  if (gens > 1) {
    deflateKite(gens-1, ctx, x, y, size, ang + 72 * 5);
  }
}

function deflateKite(gens, ctx, x=0, y=0, size=100, ang=0) {
  gens--;
  if (gens >= 0) {
    ctx.save();
    ctx.translate(x, y);
    let dest = lineToAngle(ctx, -x, y, size, -1 * (ang + 54));
    let dest2 = lineToAngle(ctx, x, -y, -size, -1 * (ang + 126));
    let dest3 = lineToAngle(ctx, x, y, size/phi, ang - 90);
    let dest4 = lineToAngle(ctx, x, y, size/phi, ang - 90 - 72);
    ctx.restore();
    
    drawCount++;
    drawKite(ctx, x, y, size, ang);
    size = size / phi;
    
    //ctx.rotate(tooRad((drawCount * 36) + percent));
    
    if (gens > 0) {
      drawCount++;
      deflateLeftDart(gens, ctx, x, y, size, ang + 36);
      deflateRightDart(gens, ctx, x, y, size, ang - 36);
      
      drawCount++;
      deflateKite(gens, ctx, -dest.x, dest.y, size, ang + 36 * 3);
      drawCount++;
      deflateKite(gens, ctx, dest2.x, -dest2.y, size, ang + 36 * 7);
    }
    
    if (gens > 1) {
      drawCount++;
      deflateDart(gens-1, ctx, dest3.x, dest3.y, size/phi, ang + 36 * 5);
    }
  }
}

function gradient1(ctx) {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  
  let mX = mousePos.x || theCanvas.width/2;
  let mY = mousePos.y || theCanvas.height/2;
  //let mX = theCanvas.width/2;
  //let mY = theCanvas.height/2;
  
  //ctx.globalCompositeOperation = 'luminosity';
  let grd = ctx.createLinearGradient(0, height, 0, -height*.3/3);
  
  grd.addColorStop(0.000, `hsla(${232}, 18%, 83%, 1)`);
  grd.addColorStop(0.206, `hsla(${242}, 22%, 65%, 1)`);
  grd.addColorStop(0.392, `hsla(${236}, 24%, 48%, 1)`);
  grd.addColorStop(0.580, `hsla(${235}, 35%, 34%, 1)`);
  grd.addColorStop(0.803, `hsla(${235}, 42%, 24%, 1)`);
  grd.addColorStop(0.993, `hsla(${232}, 51%, 17%, 1)`);
  
  ctx.fillStyle = grd;
}

function gradient2(ctx) {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  
  //ctx.globalCompositeOperation = 'luminosity';
  let grd = ctx.createLinearGradient(0, -height/5, 0, height*.6);
  
  grd.addColorStop(0.000, `hsla(${232}, 51%, 17%, 1)`);
  grd.addColorStop(0.118, `hsla(211, 35%, 19%, 1)`);
  grd.addColorStop(0.217, `hsla(216, 31%, 25%, 1)`);
  grd.addColorStop(0.379, `hsla(220, 30%, 33%, 1)`);
  grd.addColorStop(0.702, `hsla(213, 13%, 52%, 1)`);
  grd.addColorStop(0.924, `hsla(24, 69%, 49%, 1)`);
  grd.addColorStop(1.000, `hsla(17, 69%, 43%, 1)`);

  ctx.rotate(tooRad(90 + (drawCount * 3)));
  ctx.fillStyle = grd;
  ctx.rotate(tooRad(-90 - (drawCount * 3)));
}

function gradient3(ctx, x=0, y=0, size = 100) {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  grd = ctx.createRadialGradient(x,y,0,0,0,size);
      
  grd.addColorStop(0.000, `hsla(0,100%,100%,0)`);
  grd.addColorStop(1.000, `hsla(${232+(drawCount*16)}, 100%, 80%, .03)`);
  ctx.fillStyle = grd;
}
function init() {
  window.requestAnimationFrame(() => {
    draw();
  });
}

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function lineToAngle(ctx, x, y, length, angle) {
    angle *= Math.PI / 180;

    let x2 = x + length * Math.cos(angle),
        y2 = y + length * Math.sin(angle);
  
    return {x: x2, y: y2};
}

function strokey(ctx) {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  let grd = ctx.createLinearGradient(0,0,0,-height*2);
  let hue = 360*percent+(drawCount+frame);

  //ctx.globalCompositeOperation = 'source-over';
  grd.addColorStop(0, `hsla(${0 + (drawCount * 3) - ((1 - percent) * 360)}, 100%, 80%, .4)`);
  grd.addColorStop(1, `hsla(${180 + (drawCount * 3) + (percent * 360)}, 100%, 90%, .8)`);

  ctx.strokeStyle = grd;
  ctx.lineWidth = .5;
  //ctx.strokeStyle = `hsla(180, 100%, 80%, ${(.4)})`;
  
  //ctx.fillStyle = `hsla(${16*drawCount*percent/4}, 100%, 50%, ${Math.abs(percent - .3)})`;
  //ctx.fill();
}

function tooRad (ang) {
  return ang * (Math.PI / 180);
}