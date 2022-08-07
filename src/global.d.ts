interface Coordinate {
  x: number;
  y: number;
}

interface IPosition extends Coordinate {
  add: (position: Coordinate) => IPosition;
  subtract: (position: Coordinate) => IPosition;
  magnitude: number;
}

interface IBall {
  id: number;
  type: string;
  position: PositionProps;
  velocity: Coordinate;
  radius: number;
  color: string;
  collisions: string[];
  update: (state, undateId: string) => IBall;
}

interface ICanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  drawCircle: ({ position: Coordinate, radius: number, color: string }) => void;
  drawActors: (actors: IBall[]) => void;
  clearDisplay: () => void;
  render: (state: IStore) => void;
}

interface IStore {
  canvas: ICanvas;
  actors: IBall[];
  update: () => IStore;
}

interface ICanvasSize {
  width: number;
  height: number;
}

interface GetRandomVelocityProps {
  position: Coordinate;
  pixel: number[];
  maxRadius: number;
  canvasSize: ICanvasSize;
}
