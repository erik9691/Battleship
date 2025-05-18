export { addSquareListeners };
import { updateSquare, updateTurnMessage, updateActionMessage } from "./display";

let playerTurn = true;
let playerHandler;
let opponentHandler;

function handleBoardClick(attacker, receiver) {
	return function (e) {
		if (attacker.computer) {
			if (playerTurn) {
				updateActionMessage("Can't attack yourself!");
			} else {
				playerTurn = true;
				updateTurnMessage(receiver.name + "'s turn");
				processAttack(e.target, attacker, receiver);
			}
		} else {
			if (!playerTurn) {
				updateActionMessage("Can't attack yourself!");
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
		playerBoard.childNodes[i].addEventListener("click", playerHandler);
		opponentBoard.childNodes[i].addEventListener("click", opponentHandler);
	}
}

function processAttack(square, attacker, receiver) {
	const index = parseInt(square.id.substring(1));
	const attackPos = [index % 10, Math.floor(index / 10)];
	const attackRes = attacker.sendAttack(receiver, attackPos);
	if (attackRes.valid) {
		if (attackRes.hit) {
			updateSquare(square.id, true);
			updateActionMessage("Hit!");
		} else {
			updateSquare(square.id);
			updateActionMessage("Miss!");
		}
		if (attackRes.sunk) {
			updateActionMessage("Sunk!");
		}
		if (attackRes.won) {
			updateActionMessage(attacker.name + " WON!");
			removeSquareListeners();
		}
	} else {
		playerTurn = !playerTurn;
		updateActionMessage("Already attacked there!");
		updateTurnMessage(attacker.name + "'s turn");
	}
}

function removeSquareListeners() {
	console.log("REMOVING");
	const playerBoard = document.getElementById("player");
	const opponentBoard = document.getElementById("opponent");
	for (let i = 0; i < playerBoard.childNodes.length; i++) {
		playerBoard.childNodes[i].removeEventListener("click", playerHandler);
		opponentBoard.childNodes[i].removeEventListener("click", opponentHandler);
	}
}
