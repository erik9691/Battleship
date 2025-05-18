export { addSquareListeners };
import { updateSquare, updateTurnMessage, updateActionMessage } from "./display";

let playerTurn = true;
let playerHandler;
let opponentHandler;

function handleBoardClick(attacker, receiver) {
	return function (e) {
		if (attacker.computer) {
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
	if (receiver.computer) {
		messageLocation = 2;
	} else {
		messageLocation = 1;
	}
	const index = parseInt(square.id.substring(1));
	const attackPos = [index % 10, Math.floor(index / 10)];
	const attackRes = attacker.sendAttack(receiver, attackPos);
	if (attackRes.valid) {
		if (attackRes.hit) {
			updateSquare(square.id, true);
			updateActionMessage("Hit!", messageLocation);
		} else {
			updateSquare(square.id);
			updateActionMessage("Miss!", messageLocation);
		}
		if (attackRes.sunk) {
			updateActionMessage("Sunk!", messageLocation);
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
