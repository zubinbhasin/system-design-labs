import { Cell } from './cell';
import { cellstate } from './cell-state.enum';

class Board {
    private size: number;
    private board: Cell[][];

    constructor(size: number) {
        this.size = size;
        this.board = [];

        for (let i = 0; i < size; i++) {
            this.board[i] = [];
            for (let j = 0; j < size; j++) {
                this.board[i][j] = new Cell(i, j);
            }
        }
    }

    getSize(): number {
        return this.size;
    }

    getBoard(): Cell[][] {
        return this.board;
    }

    display() {
        for (let i = 0; i < this.size; i++) {
            let row = "|";
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j].getCellState() == cellstate.EMPTY)
                    row += "   |";
                else
                    row += " " + this.board[i][j].getPlayer()?.getSymbol() + " |";
            }
            console.log(row);
        }
    }
}

export { Board };
