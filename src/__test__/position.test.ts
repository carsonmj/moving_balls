import { Position } from "../position";

test("Instance of Position should have value x, y.", () => {
  const x = 100;
  const y = 300;
  const instance = new Position(x, y);

  expect(instance.x).toBe(x);
  expect(instance.y).toBe(y);
});

test("The add method should return the incremented x and y coordinates.", () => {
  const init = { x: 0, y: 0 };
  const distance = { x: 10, y: 20 };
  const instance = new Position(init.x, init.y);
  const result = instance.add(distance);

  expect(result.x).toBe(10);
  expect(result.y).toBe(20);
});

test("The magnitude method should return the distance between two points.", () => {
  const init = { x: 10, y: 10 };
  const point = { x: 8, y: 8 };
  const instance = new Position(init.x, init.y);
  const result = instance.subtract(point).magnitude;
  const expectedValue = Math.sqrt(2 ** 2 + 2 ** 2);

  expect(result).toBe(expectedValue);
});
