export { addSquareListeners };
import { updateSquare, updateTurnMessage, updateActionMessage } from "./display";

let playerTurn = true;

function addSquareListeners(player, opponent) {
	updateTurnMessage(player.name + "'s turn");
	const playerBoard = document.getElementById("player");
	const opponentBoard = document.getElementById("opponent");
	for (let i = 0; i < playerBoard.childNodes.length; i++) {
		playerBoard.childNodes[i].addEventListener("click", handleBoardClick(opponent, player));
		opponentBoard.childNodes[i].addEventListener("click", handleBoardClick(player, opponent));
	}
}

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

function processAttack(square, attacker, receiver) {
	console.log(square);
	const index = parseInt(square.id.substring(1));
	const attackPos = [index % 10, Math.floor(index / 10)];
	const attackRes = attacker.sendAttack(receiver, attackPos);
	console.log(attackRes);
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
		}
	} else {
		playerTurn = !playerTurn;
		updateActionMessage("Already attacked there!");
		updateTurnMessage(attacker.name + "'s turn");
	}
}
