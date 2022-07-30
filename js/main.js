/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 900;
const numOfEnemies = 50;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = './img/enemy3.png';
        this.speed = Math.random() * 3 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = Math.random() * 500;
        this.angleSpeed = Math.random() * 0.5 + 0.5;
    }
    update() {
        this.x = canvas.width / 2 * Math.cos(this.angle * Math.PI / 200) + (canvas.width * 0.5 - this.width / 2);
        this.y = canvas.height * Math.sin(this.angle * Math.PI / 300) + (canvas.height / 2 - this.height / 2);
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas.width;
        //animate sprites across sprite sprite sheet
        if (gameFrame % this.flapSpeed === 0) { // slow down sprite animation frame rate
            this.frame > 4 ? this.frame = 0 : this.frame++; // ternary amount of frames
        }

    }
    draw() {
        // ctx.strokeStyle = '#FFF';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numOfEnemies; i++) {
    enemiesArray.push(new Enemy());
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();