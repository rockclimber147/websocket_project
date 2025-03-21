import { Player, Enemy, Particle, Projectile } from "./Entities.js"

export class Game {
    canvas: HTMLCanvasElement;
    c: CanvasRenderingContext2D;
    scoreEl: HTMLElement;
    players: Map<string, Player> = new Map();
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

        this.addCanvasClickListener();
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
        });
      }

    addPlayer(player: Player) {
        if (player instanceof Player) {
            this.players.set(player.id, player);
        } else {
            console.error('Not a valid Player object');
        }
    }

    removePlayer(player: Player) {
        this.players.delete(player.id);
        console.log("Player class has been removed from the map.");
    }

    animate(): void {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.c.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.players.forEach(player => player.draw(this.c))
    }
}
