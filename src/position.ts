export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(position: Coordinate) {
    return new Position(this.x + position.x, this.y + position.y);
  }

  subtract(position: Coordinate) {
    return new Position(this.x - position.x, this.y - position.y);
  }

  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}
