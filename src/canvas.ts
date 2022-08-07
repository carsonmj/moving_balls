interface CanvasProps {
  parent: HTMLElement;
  width: number;
  height: number;
}

interface DrawDetails {
  position: Coordinate;
  radius: number;
  color: string;
}

export class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  constructor(props: CanvasProps) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = props.width;
    this.canvas.height = props.height;
    props.parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }

  drawCircle({ position, radius, color }: DrawDetails) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
  }

  drawActors(actors: IBall[]) {
    for (let actor of actors) {
      if (actor.type === "circle") {
        this.drawCircle(actor);
      }
    }
  }

  clearDisplay() {
    if (this.ctx) {
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  render(state: IStore) {
    this.clearDisplay();
    this.drawActors(state.actors);
  }
}
