import "./style.css";
import { createBoards, displayShips, setNames } from "./display";
import { Player } from "./logic";
import { addSquareListeners, addModalListener } from "./events";

async function startGame() {
	const { p1Name, p2Name, p2AI } = await addModalListener();
	setNames(p1Name, p2Name);
	const player = new Player(p1Name, false);
	const computer = new Player(p2Name, true, p2AI);

	player.board.placeShip(3, [5, 5]);
	computer.board.placeShip(3, [2, 2], false);
	computer.board.placeShip(5, [2, 4], false);

	createBoards();
	displayShips(player);
	displayShips(computer);
	addSquareListeners(player, computer);
}

startGame();
