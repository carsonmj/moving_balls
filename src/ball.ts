import { Position } from "./position";
import { v4 as uuidv4 } from "uuid";

interface BallProps {
  radius: number;
  color: string;
  position: IPosition;
  velocity: Coordinate;
}

export class Ball {
  id!: number;
  type!: string;
  position!: IPosition;
  velocity!: Coordinate;
  radius!: number;
  color!: string;
  collisions!: string[];

  constructor(config?: BallProps) {
    Object.assign(
      this,
      {
        id: uuidv4(),
        type: "circle",
        collisions: [],
      },
      config
    );
  }

  update(state: IStore, updateId: string) {
    const upperLimit = new Position(state.canvas.canvas.width - this.radius, state.canvas.canvas.height - this.radius);
    const lowerLimit = new Position(0 + this.radius, 0 + this.radius);

    if (this.position.x >= upperLimit.x || this.position.x <= lowerLimit.x) {
      this.velocity = new Position(-this.velocity.x, this.velocity.y);
    }

    if (this.position.y >= upperLimit.y || this.position.y <= lowerLimit.y) {
      this.velocity = new Position(this.velocity.x, -this.velocity.y);
    }

    for (let actor of state.actors) {
      if (this === actor || this.collisions.includes(actor.id + updateId)) {
        continue;
      }

      const distance = this.position.add(this.velocity).subtract(actor.position.add(actor.velocity)).magnitude;

      if (distance <= this.radius + actor.radius) {
        this.velocity = new Position(this.velocity.x * -1, this.velocity.y * -1);
        actor.velocity = new Position(actor.velocity.x * -1, actor.velocity.y * -1);

        this.collisions.push(actor.id + updateId);
        actor.collisions.push(this.id + updateId);
      }
    }

    const newX = Math.max(Math.min(this.position.x + this.velocity.x, upperLimit.x), lowerLimit.x);
    const newY = Math.max(Math.min(this.position.y + this.velocity.y, upperLimit.y), lowerLimit.y);

    return new Ball({
      ...this,
      position: new Position(newX, newY),
    });
  }
}
