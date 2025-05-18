export { addSquareListeners };
import { updateSquare } from "./display";

function addSquareListeners(player, opponent) {
	const playerBoard = document.getElementById("player");
	const opponentBoard = document.getElementById("opponent");
	for (let i = 0; i < playerBoard.childNodes.length; i++) {
		playerBoard.childNodes[i].addEventListener("click", (e) => {
			squareClick(e.target, opponent, player);
		});
		opponentBoard.childNodes[i].addEventListener("click", (e) => {
			squareClick(e.target, player, opponent);
		});
	}
}

function squareClick(square, player, opponent) {
	console.log(square);
	const index = parseInt(square.id.substring(1));
	const attackPos = [index % 10, Math.floor(index / 10)];
	const attackRes = player.sendAttack(opponent, attackPos);
	console.log(attackRes);
	if (attackRes.valid) {
		if (attackRes.hit) {
			updateSquare(square.id, true);
		} else {
			updateSquare(square.id);
		}
	}
}
