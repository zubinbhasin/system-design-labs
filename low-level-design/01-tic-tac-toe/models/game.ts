import { GameWinningStrategyFactory } from "../factories/gamewinningstratergy";
import { GameWinningStratergy } from "../stratergies/gamewinningstratergy/gamewinningstratergy";
import { OrderOneWinningStratergy } from "../stratergies/gamewinningstratergy/orderonewinningstratergy";
import { Board } from "./board";
import { cellstate } from "./cell-state.enum";
import { gamestate } from "./game-state.enum";
import { Move } from "./move";
import { Player } from "./player";

export class Game {
    private board!: Board;
    private players!: Player[];
    private gameState!: gamestate;
    private nextPlayerIndex!: number;
    private winner!: Player | null;
    private moves!: Move[];
    private gameWinningStratergy!: GameWinningStratergy
    constructor() { }

    setBoard(board: Board): void { this.board = board; }
    setPlayers(players: Player[]): void { this.players = players; }
    setGameState(state: gamestate): void { this.gameState = state; }
    setNextPlayerIndex(index: number): void { this.nextPlayerIndex = index; }
    setMoves(moves: Move[]): void { this.moves = moves; }
     
    getWinner(){
        return this.winner
    }

    displayBoard() {
        this.board.display()
    }
    getGameState(): gamestate {
        return this.gameState
    }
    makeNextMove() {
        //picking the player whose move it is
        let toMovePlayer: Player = this.players[this.nextPlayerIndex]

        console.log("It is " + toMovePlayer.getName() + "'s turn")

        let move: Move = toMovePlayer.decideMove(this.board)

        let isValidMove = this.validateCurrentMove(move)

        while (!isValidMove) {
            console.log("Enter valid move: ")
            move = toMovePlayer.decideMove(this.board)
            isValidMove = this.validateCurrentMove(move)
        }

        let row = move.getCell().getRow()
        let col = move.getCell().getCol()
        console.log("Move happened at: " + row + " " + col)

        this.board.getBoard()[row][col].setCellState(cellstate.FILLED)
        this.board.getBoard()[row][col].setPlayer(toMovePlayer)

        this.moves.push(move)


        if (this.gameWinningStratergy.checkWinner(this.board, move, toMovePlayer)) {
            this.gameState = gamestate.ENDED
            this.winner = toMovePlayer
        }

        this.nextPlayerIndex = (this.nextPlayerIndex + 1) % this.players.length

    }

    private validateCurrentMove(move: Move): Boolean {
        const cell = move.getCell()
        if (!cell) return false

        let row = cell.getRow()
        let col = cell.getCol()

        return row >= 0 && row < this.board.getSize() && col >= 0 && col < this.board.getSize() && cell.getCellState() === cellstate.EMPTY
    }

    public setGameWinningStratergy(gameWinningStratergy: GameWinningStratergy) {
        this.gameWinningStratergy = gameWinningStratergy
    }
}


export namespace Game {
    export class Builder {
        private size!: number;
        private players: Player[] = [];
        private gameWinningStratergy!: GameWinningStratergy
        setSize(size: number): Builder {
            this.size = size;
            return this;
        }

        setPlayers(players: Player[]): Builder {
            this.players = players;
            return this;
        }

        setGameWinningStratergy(winningStrategy: string) {
            this.gameWinningStratergy = GameWinningStrategyFactory.getGameWinningStratergy(winningStrategy, this.size)
            return this
        }

        build(): Game {
            this.validate();
            let game: Game = new Game();
            game.setBoard(new Board(this.size))
            game.setPlayers(this.players)
            game.setGameState(gamestate.IN_PROGRESS)
            game.setMoves([])
            game.setNextPlayerIndex(0)
            game.setGameWinningStratergy(this.gameWinningStratergy)
            return game
        }



        private validate(): void {
            if (this.players.length < 2) {
                throw new Error("Game requires at least 2 players");
            }
            if (this.size < 3) {
                throw new Error("Board size must be at least 3");
            }
        }


        public static getBuilder() {
            return new Builder()
        }
    }
}