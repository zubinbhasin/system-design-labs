import { Cell } from "./cell";
import { Player } from "./player";

class Move {
    private player: Player;

    private cell: Cell;

    constructor(player: Player, cell: Cell) {
        this.player = player
        this.cell = cell
    }

    getPlayer(): Player { return this.player; }
    getCell(): Cell { return this.cell; }

    setPlayer(player: Player): void { this.player = player; }
    setCell(cell: Cell): void { this.cell = cell; }
}

export { Move }