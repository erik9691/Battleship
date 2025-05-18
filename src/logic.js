export { Ship, Gameboard, Player };

class Ship {
	#hits = 0;
	#size;
	coords;
	constructor(size, coords) {
		this.#size = size;
		this.coords = coords;
	}
	hit() {
		this.#hits += 1;
	}
	isSunk() {
		if (this.#hits >= this.#size) {
			return true;
		} else {
			return false;
		}
	}
}

class Gameboard {
	ships = [];
	missesReceived = [];
	hitsReceived = [];
	constructor() {}
	placeShip(shipSize, position, isVertical = true) {
		if (position[1] - shipSize >= -1 && isVertical) {
			const shipCoords = this.#calculateShipCoords(shipSize, position, isVertical);
			this.ships.push(new Ship(shipSize, shipCoords));
			return true;
		} else if (position[0] + shipSize <= 10 && !isVertical) {
			const shipCoords = this.#calculateShipCoords(shipSize, position, isVertical);
			this.ships.push(new Ship(shipSize, shipCoords));
			return true;
		} else {
			return false;
		}
	}
	receiveAttack(attackPosition) {
		const returnObject = {
			valid: true,
			hit: false,
			sunk: false,
			won: false,
		};

		this.hitsReceived.forEach((hitReceived) => {
			if (attackPosition[0] === hitReceived[0] && attackPosition[1] === hitReceived[1]) {
				returnObject.valid = false;
			}
		});
		if (returnObject.valid === true) {
			this.missesReceived.forEach((missReceived) => {
				if (
					attackPosition[0] === missReceived[0] &&
					attackPosition[1] === missReceived[1]
				) {
					returnObject.valid = false;
				}
			});
		}
		if (returnObject.valid === false) {
			return returnObject;
		}

		for (let i = 0; i < this.ships.length; i++) {
			for (let u = 0; u < this.ships[i].coords.length; u++) {
				if (
					this.ships[i].coords[u][0] === attackPosition[0] &&
					this.ships[i].coords[u][1] === attackPosition[1]
				) {
					this.ships[i].hit();
					this.hitsReceived.push(attackPosition);
					returnObject.hit = true;
					if (this.ships[i].isSunk()) {
						returnObject.sunk = true;
						returnObject.won = true;
						this.ships.forEach((ship) => {
							if (!ship.isSunk()) {
								returnObject.won = false;
								return;
							}
						});
					}
				}
			}
		}

		this.missesReceived.push(attackPosition);
		return returnObject;
	}
	#calculateShipCoords(shipSize, position, isVertical) {
		const shipCoords = [];
		let currentPos = position;
		if (isVertical) {
			for (let i = 0; i < shipSize; i++) {
				shipCoords.push([currentPos[0], currentPos[1]]);
				currentPos[1] -= 1;
			}
		} else {
			for (let i = 0; i < shipSize; i++) {
				shipCoords.push([currentPos[0], currentPos[1]]);
				currentPos[0] += 1;
			}
		}
		return shipCoords;
	}
}

class Player {
	constructor(name = "Player", computer = false) {
		this.name = name;
		this.computer = computer;
	}
	sendAttack(opponent, attackPosition) {
		return opponent.board.receiveAttack(attackPosition);
	}
	board = new Gameboard();
}
