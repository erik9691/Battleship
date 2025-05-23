export { addSquareListeners, addModalListener };
import { updateSquare, updateTurnMessage, updateActionMessage, positionToId } from "./display";

let playerTurn = true;
let playerHandler;
let opponentHandler;

function addModalListener() {
	return new Promise((resolve) => {
		const startModal = document.querySelector(".start-modal");
		startModal.showModal();
		const submitBtn = startModal.querySelector('button[type="submit"]');
		submitBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const p1NameInput = startModal.querySelector('input[name="p1Name"]');
			const p2NameInput = startModal.querySelector('input[name="p2Name"]');
			const p2AICheckbox = startModal.querySelector('input[name="p2AI"]');
			startModal.close();

			resolve({
				p1Name: p1NameInput.value || "Player 1",
				p2Name: p2NameInput.value || "Player 2",
				p2AI: p2AICheckbox.checked,
			});
		});
	});
}

function handleBoardClick(attacker, receiver) {
	return function (e) {
		if (attacker.p2) {
			if (playerTurn) {
				updateActionMessage("Can't attack yourself!", 1);
			} else {
				playerTurn = true;
				updateTurnMessage(receiver.name + "'s turn");
				processAttack(e.target, attacker, receiver);
			}
		} else {
			if (!playerTurn) {
				updateActionMessage("Can't attack yourself!", 2);
			} else {
				playerTurn = false;
				updateTurnMessage(receiver.name + "'s turn");
				processAttack(e.target, attacker, receiver);
			}
		}
	};
}

function addSquareListeners(player, opponent) {
	updateTurnMessage(player.name + "'s turn");
	const playerBoard = document.getElementById("player");
	const opponentBoard = document.getElementById("opponent");
	playerHandler = handleBoardClick(opponent, player);
	opponentHandler = handleBoardClick(player, opponent);
	for (let i = 0; i < playerBoard.childNodes.length; i++) {
		opponentBoard.childNodes[i].addEventListener("click", opponentHandler);
		if (!opponent.computer) {
			playerBoard.childNodes[i].addEventListener("click", playerHandler);
		}
	}
}

function computerAttack(attacker, receiver) {
	let attackIndex = "p" + Math.floor(Math.random() * 100);
	let square = document.getElementById(attackIndex);
	while (true) {
		attackIndex = "p" + Math.floor(Math.random() * 100);
		square = document.getElementById(attackIndex);
		if (processAttack(square, attacker, receiver)) {
			break;
		}
	}
	playerTurn = true;
	updateTurnMessage(receiver.name + "'s turn");
}

function processAttack(square, attacker, receiver) {
	let messageLocation;
	if (receiver.p2) {
		messageLocation = 2;
	} else {
		messageLocation = 1;
	}
	const index = parseInt(square.id.substring(1));
	const attackPos = [index % 10, Math.floor(index / 10)];
	const attackRes = attacker.sendAttack(receiver, attackPos);
	if (attackRes.valid) {
		if (attackRes.hit) {
			updateSquare(square.id, "hit");
			updateActionMessage("Hit!", messageLocation);
		} else {
			updateSquare(square.id, "miss");
			updateActionMessage("Miss!", messageLocation);
		}
		if (attackRes.sunk) {
			updateActionMessage("Sunk!", messageLocation);
			receiver.board.ships.forEach((ship) => {
				if (ship.isSunk()) {
					ship.coords.forEach((coord) => {
						let id = square.id.charAt(0);
						id += positionToId(coord);
						updateSquare(id, "sunk");
					});
					console.log(ship.coords);
				}
			});
		}
		if (attackRes.won) {
			removeSquareListeners();
			updateTurnMessage(attacker.name + " WON!");
		} else if (receiver.computer) {
			computerAttack(receiver, attacker);
		}
	} else {
		playerTurn = !playerTurn;
		updateActionMessage("Already attacked there!", messageLocation);
		updateTurnMessage(attacker.name + "'s turn", messageLocation);
	}
	return attackRes.valid;
}

function removeSquareListeners() {
	const playerBoard = document.getElementById("player");
	const opponentBoard = document.getElementById("opponent");
	for (let i = 0; i < playerBoard.childNodes.length; i++) {
		playerBoard.childNodes[i].removeEventListener("click", playerHandler);
		opponentBoard.childNodes[i].removeEventListener("click", opponentHandler);
	}
}
