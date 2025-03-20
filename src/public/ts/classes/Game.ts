import { Player, Enemy, Particle, Projectile } from "./Entities.js"

export class Game {
    canvas: HTMLCanvasElement;
    c: CanvasRenderingContext2D;
    scoreEl: HTMLElement;
    player: Player;
    projectiles: Projectile[] = [];
    enemies: Enemy[] = [];
    particles: Particle[] = [];
    score: number = 0;
    animationId: number = 0;

    constructor() {
        this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
        this.c = this.canvas.getContext('2d')!;
        this.scoreEl = document.querySelector('#scoreEl')!;

        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;

        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2;

        this.player = new Player(x, y, 10, 'white');
        this.addCanvasClickListener();
        this.spawnEnemies();
        this.animate();
    }

    private addCanvasClickListener() {
        this.canvas.addEventListener("click", (event) => {
          // Calculate the angle and velocity based on the mouse position
          const angle = Math.atan2(
            event.clientY - this.canvas.height / 2,
            event.clientX - this.canvas.width / 2
          );
          const velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
          };
    
          // Push a new projectile to the array
          this.projectiles.push(
            new Projectile(this.canvas.width / 2, this.canvas.height / 2, 5, "white", velocity)
          );
        });
      }

    spawnEnemies(): void {
        setInterval(() => {
            const radius = Math.random() * (30 - 4) + 4;

            let x: number;
            let y: number;

            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radius : this.canvas.width + radius;
                y = Math.random() * this.canvas.height;
            } else {
                x = Math.random() * this.canvas.width;
                y = Math.random() < 0.5 ? 0 - radius : this.canvas.height + radius;
            }

            const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

            const angle = Math.atan2(this.canvas.height / 2 - y, this.canvas.width / 2 - x);

            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            };

            this.enemies.push(new Enemy(x, y, radius, color, velocity));
        }, 1000);
    }

    animate(): void {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.c.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.draw(this.c);

        this.particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                this.particles.splice(index, 1);
            } else {
                particle.update(this.c);
            }
        });

        this.projectiles.forEach((projectile, index) => {
            projectile.update(this.c);

            if (
                projectile.x - projectile.radius < 0 ||
                projectile.x - projectile.radius > this.canvas.width ||
                projectile.y + projectile.radius < 0 ||
                projectile.y - projectile.radius > this.canvas.height
            ) {
                this.projectiles.splice(index, 1);
            }
        });

        this.enemies.forEach((enemy, index) => {
            enemy.update(this.c);

            const dist = Math.hypot(this.player.x - enemy.x, this.player.y - enemy.y);

            if (dist - enemy.radius - this.player.radius < 1) {
                cancelAnimationFrame(this.animationId);
            }

            this.projectiles.forEach((projectile, projectilesIndex) => {
                const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

                if (dist - enemy.radius - projectile.radius < 1) {
                    for (let i = 0; i < enemy.radius * 2; i++) {
                        this.particles.push(
                            new Particle(
                                projectile.x,
                                projectile.y,
                                Math.random() * 2,
                                enemy.color,
                                {
                                    x: (Math.random() - 0.5) * (Math.random() * 6),
                                    y: (Math.random() - 0.5) * (Math.random() * 6)
                                }
                            )
                        );
                    }

                    if (enemy.radius - 10 > 5) {
                        this.score += 100;
                        this.scoreEl.innerHTML = this.score.toString();
                        gsap.to(enemy, {
                            radius: enemy.radius - 10
                        });
                        this.projectiles.splice(projectilesIndex, 1);
                    } else {
                        this.score += 150;
                        this.scoreEl.innerHTML = this.score.toString();

                        this.enemies.splice(index, 1);
                        this.projectiles.splice(projectilesIndex, 1);
                    }
                }
            });
        });
    }
}
