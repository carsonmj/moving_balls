interface CanvasAttributes {
  parent: HTMLElement;
  width: number;
  height: number;
}

interface PositionProps {
  x: number;
  y: number;
}

interface DrawDetails {
  position: PositionProps;
  radius: number;
  color: string;
}

interface IStore {
  canvas: any;
  actors: any[];
  update: (time: number) => IStore;
}

export class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  constructor(attribyes: CanvasAttributes) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = attribyes.width;
    this.canvas.height = attribyes.height;
    attribyes.parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  drawCircle({position, radius, color}: DrawDetails) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
  }

  sync(state: IStore) {
    this.clearDisplay();
    this.drawActors(state.actors);
  }

  drawActors(actors: any[]) {
    for (let actor of actors) {
      if (actor.type === 'circle') {
        this.drawCircle(actor);
      }
    }
  }

  clearDisplay () {
    if (this.ctx) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
