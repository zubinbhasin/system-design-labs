import { Board } from "./board";
import { Cell } from "./cell";
import { Move } from "./move";
import { playertype } from "./player-type.enum";
import readlineSync from 'readline-sync'
class Player {
    private name: string;
    private symbol: string; // single character
    private playerType: playertype;
    constructor(name: string, symbol: string, playerType: playertype) {
        this.name = name
        this.symbol = symbol
        this.playerType = playerType
    }

    getName(): string { return this.name; }
    getSymbol(): string { return this.symbol; }
    getPlayerType(): playertype { return this.playerType; }

    setName(name: string): void { this.name = name; }
    setSymbol(symbol: string): void { this.symbol = symbol; }
    setPlayerType(playerType: playertype): void { this.playerType = playerType; }
    decideMove(board: Board) {
        let row = readlineSync.questionInt(`Which row do you want to move from starting from 0: `)
        let col = readlineSync.questionInt(`Which col do you want to move from starting from 0: `)

        return new Move(this, board.getBoard()[row][col])
    }
}

export { Player }