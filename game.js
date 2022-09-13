springConst = 0.3;
distToNext = 0;
ismus = false;
isPaused = false;
class particle {
  x = 0;
  y = 0;
  speedX = 0;
  speedY = 0;
  accelX = 0;
  accelY = 0;
  neighbors = [];
  constructor(x, y) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
  }
  updatePart() {
    this.speedX += this.accelX;
    this.speedY += this.accelY;
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

let particles = [];
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    particles.push(new particle(i * 6, j * 6));
  }
}
for (let i = 0; i < particles.length; i++) {
  if (i > 101 && i < 9899 && i % 100 != 0 && i % 100 != 99) {
    particles[i].neighbors.push(
      particles[i - 1],
      particles[i - 100],
      particles[i - 101],
      particles[i - 99]
    );

    try {
      particles[i].neighbors.push(
        particles[i + 1],
        particles[i + 101],
        particles[i + 99],
        particles[i + 100]
      );
    } catch (e) {}
  }
}
updates = 0;
function update() {
  if (!isPaused) {
    updates++;
    // particles[5050].x += 10 * Math.cos(updates / 10000);
    particles[5050].y += 10 * Math.sin(updates / 4);

    for (part of particles) {
      part.accelX = 0;
      part.accelY = 0;

      for (lol of part.neighbors) {
        try {
          part.accelX +=
            Math.cos(Math.atan2(part.y - lol.y, part.x - lol.x)) *
            (springConst * (6 - Math.hypot(part.x - lol.x, part.y - lol.y)));
          part.accelY +=
            Math.sin(Math.atan2(part.y - lol.y, part.x - lol.x)) *
            (springConst * (6 - Math.hypot(part.x - lol.x, part.y - lol.y)));
        } catch (e) {}
      }
    }
    for (part of particles) {
      // console.log(part.)
      part.updatePart();
    }
  }
}
selectedPart = 0;
function draw() {
  if (ismus) {
    // selectedPart.x = mouseX;
    // selectedPart.y = mouseY;
    particles[Math.round(mouseX / 6) * 100 + Math.round(mouseY / 6)].neighbors =
      [];
  }
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      // particles.push(new particle(i * 6, j * 6));
      whichPart = particles[Math.round(i) * 100 + Math.round(j)];
      if (whichPart.neighbors != 0) {
        context.globalAlpha =
          Math.hypot(
            whichPart.x - whichPart.startX,
            whichPart.y - whichPart.startY
          ) / 1;
      } else {
        context.globalAlpha = 1;
        context.fillStyle = "red";

        context.fillRect(i * 6, j * 6, 6, 6);
        context.fillStyle = "black";
      }
      context.fillRect(i * 6, j * 6, 6, 6);
    }
  }
  // for (part of particles) {
  //   context.globalAlpha =
  //     Math.hypot(part.x - part.startX, part.y - part.startY) / 1;
  //   context.fillRect(part.x, part.y, 10, 10);
  // }
}
function mouseup() {
  ismus = false;
}
function mousedown() {
  ismus = true;
  selectedPart =
    particles[Math.round(mouseX / 6) * 100 + Math.round(mouseY / 6)];
}
function keyup(key) {
  if (key == 32) {
    isPaused = !isPaused;
  }
}
