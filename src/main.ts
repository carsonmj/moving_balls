import { getElement, getRandomNumber } from "./lib";
import { Ball } from "./ball";
import { Canvas } from "./canvas";
import { Store } from "./store";
import { Position } from "./position";

interface ICanvasSize {
  width: number;
  height: number;
}

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

  const balls = createBalls(detail);
  let state: IStore = new Store(canvas, balls);

  executeAnimation(() => {
    state = state.update();
    canvas.render(state);
  });
};

const createBalls = (details: BallProps) => {
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

const getRandomPosition = (maxRadius: number, canvasSize: ICanvasSize) => {
  return {
    x: getRandomNumber([maxRadius, canvasSize.width - maxRadius]),
    y: getRandomNumber([maxRadius, canvasSize.height - maxRadius]),
  };
};

const isVaildX = (sign: number, position: number, distance: number, radius: number, max: number) => {
  let sum = 0;

  if (sign === -1) {
    sum = position + distance * sign + radius * sign;
    return sum > 0;
  }

  sum = position + distance + radius;
  return sum < max;
};

const getXVelocity = (position: Coordinate, maxRadius: number, min: number, max: number, canvasSize: ICanvasSize) => {
  const sign = [-1, 1][getRandomNumber([0, 1])];
  let x = getRandomNumber([Math.sqrt(min), Math.sqrt(max)]);

  while (!isVaildX(sign, position.x, x, maxRadius, canvasSize.width)) {
    x = getRandomNumber([Math.sqrt(min), Math.sqrt(max)]);
  }

  return x * sign;
};

const getYVelocity = (min: number, max: number, x: number) => {
  const range = {
    min: min - x ** 2,
    max: max - x ** 2,
  };

  return getRandomNumber([range.min, range.max]);
};

const getRandomVelocity = (position: Coordinate, pixel: number[], maxRadius: number, canvasSize: ICanvasSize) => {
  const min = Number((pixel[0] / 60).toFixed(1));
  const max = Number((pixel[1] / 60).toFixed(1));
  const x = getXVelocity(position, maxRadius, min, max, canvasSize);
  const y = getYVelocity(min, max, x);

  return { x, y };
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
