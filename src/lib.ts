interface XVelocityProps {
  position: Coordinate;
  maxRadius: number;
  min: number;
  max: number;
  canvasSize: ICanvasSize;
}

interface YVelocityProps {
  min: number;
  max: number;
  x: number;
  maxRadius: number;
  canvasSize: ICanvasSize;
}

export const getElement = (selector: string): HTMLInputElement => {
  if (!selector) {
    throw new Error("Parameter is not valid in getElement function. Should pass selector.");
  }

  const element: HTMLInputElement | null = document.querySelector(selector);

  if (!element) {
    throw new Error("Element does not exist.");
  }

  return element;
};

export const getRandomNumber = ([low, high]: number[]): number => {
  return Math.floor(Math.random() * (high - low + 1)) + low;
};

export const getRandomPosition = (maxRadius: number, canvasSize: ICanvasSize): Coordinate => {
  return {
    x: getRandomNumber([maxRadius, canvasSize.width - maxRadius]),
    y: getRandomNumber([maxRadius, canvasSize.height - maxRadius]),
  };
};

export const setEventListener = (event: string, func: () => any): void => {
  if (!event) {
    throw new Error("First parameter is not valid in setEventListener function. Should pass event name.");
  }

  if (typeof func !== "function") {
    throw new Error("Second parameter should be function.");
  }

  document.addEventListener(event, func);
};

const isValidXPosition = (sign: number, position: number, distance: number, radius: number, max: number): boolean => {
  let sum = 0;

  if (sign === -1) {
    sum = position + distance * sign + radius * sign;
    return sum > 0;
  }

  sum = position + distance + radius;
  return sum < max;
};

const getXVelocity = (props: XVelocityProps): number => {
  const { position, maxRadius, min, max, canvasSize } = props;
  const sign = [-1, 1][getRandomNumber([0, 1])];
  let x = getRandomNumber([Math.sqrt(min), Math.sqrt(max)]);

  while (!isValidXPosition(sign, position.x, x, maxRadius, canvasSize.width)) {
    x = getRandomNumber([Math.sqrt(min), Math.sqrt(max)]);
  }

  return x * sign;
};

const getYVelocity = (props: YVelocityProps): number => {
  const { min, max, x, maxRadius, canvasSize } = props;
  const sign = [-1, 1][getRandomNumber([0, 1])];
  const range = {
    min: min - x ** 2,
    max: max - x ** 2,
  };
  let y = getRandomNumber([range.min, range.max]) * sign;

  if (y > 0) {
    const radiusAddedY = y + maxRadius;
    y = radiusAddedY >= canvasSize.height ? canvasSize.height - maxRadius : y;
  } else {
    const radiusAddedY = y + maxRadius;
    y = radiusAddedY < 0 ? maxRadius : y;
  }

  return getRandomNumber([range.min, range.max]);
};

export const getRandomVelocity = (
  position: Coordinate,
  perPixel: number[],
  maxRadius: number,
  canvasSize: ICanvasSize
): Coordinate => {
  const min = Number((perPixel[0] / 60).toFixed(1));
  const max = Number((perPixel[1] / 60).toFixed(1));
  const x = getXVelocity({ position, maxRadius, min, max, canvasSize });
  const y = getYVelocity({ maxRadius, x, min, max, canvasSize });

  return { x, y };
};
