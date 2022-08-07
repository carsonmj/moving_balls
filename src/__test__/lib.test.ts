import { getRandomNumber, getRandomPosition, getRandomVelocity } from "../lib";

beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.1);
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
});

test("getRandomNumber function should return random number.", () => {
  const randomNumber = getRandomNumber([10, 20]);
  const expectNumber = 11;

  expect(randomNumber).toBe(expectNumber);
});

test("getRandomPosition function should return x, y coordinate.", () => {
  const maxRadius = 10;
  const canvasSize = { width: 200, height: 100 };
  const randomPosition = getRandomPosition(maxRadius, canvasSize);
  const expectPosition = { x: 28, y: 18 };

  expect(randomPosition.x).toBe(expectPosition.x);
  expect(randomPosition.y).toBe(expectPosition.y);
});

test("getRandomPosition function should return x, y coordinate.", () => {
  const position = { x: 100, y: 100 };
  const perPixel = [10, 20];
  const maxRadius = 2;
  const canvasSize = { width: 200, height: 100 };
  const expected = { x: -0.4472, y: 0 };
  const randomVelocity = getRandomVelocity(position, perPixel, maxRadius, canvasSize);

  expect(randomVelocity.x).toBe(expected.x);
  expect(randomVelocity.y).toBe(expected.y);
});
