import { Ball } from "../ball";
import { Position } from "../position";

const ballInstance = new Ball({
  radius: 10,
  color: "#eddbc3",
  position: new Position(10, 10),
  velocity: new Position(2, 2),
});

test("Ball instance should have update method.", () => {
  expect(typeof ballInstance.update).toBe("function");
});

test("Ball instance properties test.", () => {
  expect(ballInstance.radius).toBe(10);
  expect(ballInstance.color).toBe("#eddbc3");
  expect(ballInstance.position).toBeInstanceOf(Position);
  expect(ballInstance.position.x).toBe(10);
  expect(ballInstance.position.y).toBe(10);
  expect(ballInstance.velocity).toBeInstanceOf(Position);
  expect(ballInstance.velocity.x).toBe(2);
  expect(ballInstance.velocity.y).toBe(2);
});
