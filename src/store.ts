import { v4 as uuidv4 } from "uuid";

export class Store {
  canvas: ICanvas;
  actors: IBall[];

  constructor(canvas: ICanvas, actors: IBall[]) {
    this.canvas = canvas;
    this.actors = actors;
  }

  update() {
    const updateId = uuidv4();
    const actors = this.actors.map((actor) => {
      return actor.update(this, updateId);
    });

    return new Store(this.canvas, actors);
  }
}
