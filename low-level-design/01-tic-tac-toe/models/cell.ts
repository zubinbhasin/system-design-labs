import { cellstate } from "./cell-state.enum";
import { Player } from "./player";

class Cell {
private row: number;
private col: number;
private player: Player | null;
private cellState: cellstate;

constructor(row:number, col:number){
    this.row = row
    this.col = col
    this.player = null
    this.cellState = cellstate.EMPTY
}

getRow(): number { return this.row; }
getCol(): number { return this.col; }
getPlayer(): Player | null { return this.player; }
getCellState(): cellstate { return this.cellState; }

setPlayer(player: Player): void { this.player = player; }
setCellState(cellState: cellstate): void { this.cellState = cellState; }
}

export { Cell };
