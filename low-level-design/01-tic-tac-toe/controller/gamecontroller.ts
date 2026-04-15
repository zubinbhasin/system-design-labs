import { Board } from "../models/board";
import { Game } from "../models/game";
import { gamestate } from "../models/game-state.enum";
import { Player } from "../models/player";

export class GameController {
    public static createGame(size: number, players: Player[], gameWinningStratergy: string): Game {
        try {
            return Game.Builder.getBuilder().setSize(size).setPlayers(players).setGameWinningStratergy(gameWinningStratergy).build()

        }
        catch (err) {
            throw err;
        }
    }

    public static display(game: Game) {
        game.displayBoard()
    }

    public static getGameState(game: Game): gamestate {
        return game.getGameState()
    }

    public static executeGame(game: Game) {
        game.makeNextMove()
    }

    public static getWinner(game: Game) {
        return game.getWinner()?.getName()
    }
}