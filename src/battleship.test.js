/* eslint-disable no-undef */
import { Ship, Gameboard } from "./battleship";

test("ship sunk", () => {
	const ship = new Ship(3);
	ship.hit();
	ship.hit();
	ship.hit();
	expect(ship.isSunk()).toBe(true);
});
test("ship not sunk", () => {
	const ship = new Ship(3);
	ship.hit();
	ship.hit();
	expect(ship.isSunk()).toBe(false);
});

test("place valid vertical ship", () => {
	const board = new Gameboard();
	expect(board.placeShip(3, [5, 5], true)).toBe(true);
});
test("place invalid vertical ship", () => {
	const board = new Gameboard();
	expect(board.placeShip(3, [5, 0], true)).toBe(false);
});
test("place valid horizontal ship", () => {
	const board = new Gameboard();
	expect(board.placeShip(3, [5, 5], false)).toBe(true);
});
test("place invalid horizontal ship", () => {
	const board = new Gameboard();
	expect(board.placeShip(3, [9, 5], false)).toBe(false);
});

test("hit ship", () => {
	const board = new Gameboard();
	board.placeShip(3, [0, 2], true);
	expect(board.recieveAttack([0, 2])).toBe(true);
});
test("not hit ship", () => {
	const board = new Gameboard();
	board.placeShip(3, [0, 2], true);
	expect(board.recieveAttack([0, 3])).toBe(false);
});
