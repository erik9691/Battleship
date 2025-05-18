export { createBoards, displayShips, updateSquare, updateTurnMessage, updateActionMessage };

function positionToId(position) {
	let id = -1;
	id += position[0] + 1 + 10 * position[1];
	return id;
}

function createBoards() {
	const playerBoard = document.getElementById("player");
	const opponentBoard = document.getElementById("opponent");
	for (let i = 0; i < 100; i++) {
		const playerSquare = document.createElement("div");
		playerSquare.classList.add("square");
		playerSquare.id = "p" + i;
		playerBoard.appendChild(playerSquare);

		const opponentSquare = document.createElement("div");
		opponentSquare.classList.add("square");
		opponentSquare.id = "o" + i;
		opponentBoard.appendChild(opponentSquare);
	}
}

function displayShips(player) {
	const board = player.board;
	for (let i = 0; i < board.ships.length; i++) {
		for (let u = 0; u < board.ships[i].coords.length; u++) {
			let id;
			if (player.computer) {
				id = "o" + positionToId(board.ships[i].coords[u]);
			} else {
				id = "p" + positionToId(board.ships[i].coords[u]);
			}
			const shipSquare = document.getElementById(id);
			shipSquare.classList.add("ship");
		}
	}
}

function updateSquare(squareId, hit = false) {
	const square = document.getElementById(squareId);
	if (hit) {
		square.classList.add("hit");
	} else {
		square.classList.add("miss");
	}
}

function updateTurnMessage(messageText) {
	const messageDiv = document.querySelector(".turn");
	messageDiv.innerText = messageText;
}

function updateActionMessage(messageText) {
	const messageDiv = document.querySelector(".message");
	messageDiv.innerText = messageText;
}
