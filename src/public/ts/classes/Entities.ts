interface Drawable {
    draw(context: CanvasRenderingContext2D): void;
}

class VelocityVector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

abstract class Entity implements Drawable {
    x: number;
    y: number;
    radius: number;
    color: string;

    constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color
        context.fill()
    }
}

abstract class EntityWithVelocity extends Entity {
    velocity: VelocityVector;

    constructor(
        x: number,
        y: number,
        radius: number,
        color: string,
        velocity: VelocityVector
        ) {
        super(x, y, radius, color)
        this.velocity = velocity
    }

    update(context: CanvasRenderingContext2D) {
        this.draw(context)
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

export class Player extends Entity {

}

export class Enemy extends EntityWithVelocity {

}

export class Projectile extends EntityWithVelocity {

}

export class Particle extends EntityWithVelocity {
    static readonly friction: number = 0.99;

    alpha: number = 1;

    draw(context: CanvasRenderingContext2D): void {
        context.save()
        context.globalAlpha = this.alpha
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color
        context.fill()
        context.restore()
    }

    update(context: CanvasRenderingContext2D) {
        this.draw(context)
        this.velocity.x *= Particle.friction
        this.velocity.y *= Particle.friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}