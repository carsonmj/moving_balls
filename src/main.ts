import { getElement, getRandomNumber, getRandomPosition, getRandomVelocity } from "./lib";
import { Ball } from "./ball";
import { Canvas } from "./canvas";
import { Store } from "./store";
import { Position } from "./position";

interface BallProps {
  totalBall: number;
  canvasSize: ICanvasSize;
  range: {
    radius: number[];
    speed: number[];
  };
  colors: string[];
}

window.onload = () => {
  const detail = {
    totalBall: getRandomNumber([10, 20]),
    canvasSize: {
      width: 1000,
      height: 500,
    },
    range: {
      radius: [10, 20],
      speed: [200, 400],
    },
    colors: ["#54a992", "#8fb59c", "#eddbc3", "#e8c571", "#d94c3a"],
  };

  const canvas: ICanvas = new Canvas({
    parent: getElement(".container"),
    width: detail.canvasSize.width,
    height: detail.canvasSize.height,
  });

  const balls: IBall[] = createBalls(detail);
  let state: IStore = new Store(canvas, balls);

  executeAnimation(() => {
    state = state.update();
    canvas.render(state);
  });
};

const createBalls = (details: BallProps): IBall[] => {
  const { totalBall, canvasSize, range, colors } = details;
  const maxRadius = range.radius[1];
  const balls = [];

  for (let i = 0; i < totalBall; i++) {
    const position = getRandomPosition(maxRadius, canvasSize);
    const velocity = getRandomVelocity(position, range.speed, maxRadius, canvasSize);

    balls.push(
      new Ball({
        radius: getRandomNumber([...range.radius]),
        color: colors[getRandomNumber([0, colors.length])],
        position: new Position(
          getRandomNumber([maxRadius, canvasSize.width - maxRadius]),
          getRandomNumber([maxRadius, canvasSize.height - maxRadius])
        ),
        velocity: new Position(velocity.x, velocity.y),
      })
    );
  }

  return balls;
};

const executeAnimation = (animation: () => void) => {
  let timestamp: number | null = null;

  const render = (time: number) => {
    if (!timestamp || time - timestamp >= 16) {
      timestamp = time;
      animation();
    }
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};
