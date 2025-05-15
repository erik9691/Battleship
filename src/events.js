export { addSquareListeners };

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
	console.log(player.sendAttack(opponent, attackPos));
}
