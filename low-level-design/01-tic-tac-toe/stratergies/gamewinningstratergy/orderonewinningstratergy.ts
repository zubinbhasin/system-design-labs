import { Board } from "../../models/board";
import { Move } from "../../models/move";
import { Player } from "../../models/player";

export class OrderOneWinningStratergy {
    private rowSymbolCounts: Map<string, number>[];
    private colSymbolCounts: Map<string, number>[];
    private diagSymbolCounts: Map<string, number>;
    private antiDiagSymbolCounts: Map<string, number>;

    constructor(size: number) {
        this.rowSymbolCounts = [];
        this.colSymbolCounts = [];
        this.diagSymbolCounts = new Map<string, number>();
        this.antiDiagSymbolCounts = new Map<string, number>();
        for (let i = 0; i < size; i++) {
            this.rowSymbolCounts.push(new Map<string, number>())
            this.colSymbolCounts.push(new Map<string, number>())
        }
    }

    private isCellOnTopLeftDiagonal(row: number, col: number) {
        return row === col
    }

    private isCellOnTopRightDiagonal(row: number, col: number, size: number) {
        return row + col == size - 1
    }

    public checkWinner(board: Board, moveCell: Move, player: Player) {
        let symbol = moveCell.getPlayer().getSymbol()
        let row = moveCell.getCell().getRow()
        let col = moveCell.getCell().getCol()

        let size = board.getSize()

        if (!this.rowSymbolCounts[row].get(symbol)) {
            this.rowSymbolCounts[row].set(symbol, 0)
        }

        //If already initialized
        this.rowSymbolCounts[row].set(symbol, this.rowSymbolCounts[row].get(symbol)! + 1)

        if (!this.colSymbolCounts[col].get(symbol)) {
            this.colSymbolCounts[col].set(symbol, 0)
        }

        //If already initialized

        this.colSymbolCounts[col].set(symbol, this.colSymbolCounts[col].get(symbol)! + 1)

        if (this.isCellOnTopLeftDiagonal(row, col)) {
            if (!this.diagSymbolCounts.get(symbol)) {
                this.diagSymbolCounts.set(symbol, 0)
            }
            this.diagSymbolCounts.set(symbol, this.diagSymbolCounts.get(symbol)! + 1)
        }


        //If already initialized
        if (this.isCellOnTopRightDiagonal(row, col, size)) {
            if (!this.antiDiagSymbolCounts.get(symbol)) {
                this.antiDiagSymbolCounts.set(symbol, 0)
            }
            this.antiDiagSymbolCounts.set(symbol, this.antiDiagSymbolCounts.get(symbol)! + 1)
        }

        if (this.rowSymbolCounts[row].get(symbol) === size || this.colSymbolCounts[col].get(symbol) === size) {
            return true
        }

        if (this.isCellOnTopRightDiagonal(row, col, size) && this.antiDiagSymbolCounts.get(symbol) === size){
            return true
        }


        if (this.isCellOnTopLeftDiagonal(row, col) && this.diagSymbolCounts.get(symbol) === size) {
            return true
        }

        return false
    }
}