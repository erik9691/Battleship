import "./style.css";
import { createBoards, displayShips } from "./display";
import { Player } from "./logic";

const player = new Player();
player.board.placeShip(3, [5, 5]);
createBoards();
displayShips(player.board);
