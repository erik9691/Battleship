import "./style.css";
import { createBoards, displayShips } from "./display";
import { Player } from "./logic";
import { addSquareListeners } from "./events";

const player = new Player();
const computer = new Player("PC", true);
player.board.placeShip(3, [5, 5]);
computer.board.placeShip(3, [2, 2], false);
computer.board.placeShip(5, [2, 4], false);
createBoards();
displayShips(player);
displayShips(computer);
addSquareListeners(player, computer);
