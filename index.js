const canvas = document.getElementById("fallingStarsCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Star {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y += this.speed;
    if (this.y - this.radius > canvas.height) {
      this.y = -this.radius;
      this.x = Math.random() * canvas.width;
    }
  }
}

const stars = [];

function initStars(count) {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 2 + 1;
    const speed = Math.random() * 2 + 1;
    stars.push(new Star(x, y, radius, speed));
  }
}

function animate() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    star.update();
    star.draw();
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars.length = 0;
  initStars(100);
});

initStars(100);
animate();