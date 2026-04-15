import readlineSync from 'readline-sync';
import {
    Player

} from './models/player';
import { Bot } from './models/bot';
import { playertype } from './models/player-type.enum';
import { botdifficulty } from './models/bot-difficulty.enum';
import { Game } from './models/game';
import { GameController } from './controller/gamecontroller';
import { gamestate } from './models/game-state.enum';
class tictactoe {
    main() {
        //game = GameController.startGame() //should take care internally instead of game = Game.getBuilder.setBoard().build()
        console.log("Welcome to tic tac toe")

        const size = readlineSync.questionInt("Input size of the game: ");
        const isBotString = readlineSync.question("Will there be a bot? (y/n): ");

        const players: Player[] = []

        let toIterate = size - 1

        console.log(isBotString)
        if (isBotString == 'y') {
            toIterate -= 1
        }

        for (let i = 1; i <= toIterate; i++) {

            let playerName = readlineSync.question(`what is the name of the player? ${i}`)

            let playerSymbol = readlineSync.question(`what is the symbol of the player? ${i}`)

            players.push(new Player(playerName, playerSymbol, playertype.HUMAN))
        }

        if (isBotString == 'y') {
            let botName = readlineSync.question("what is the name of the bot?")

            let botSymbol = readlineSync.question("what is the symbol of the bot?")

            players.push(new Bot(botName, botSymbol, botdifficulty.EASY))

        }
        //we just have order one in place as of now
        let gameWinning = "OrderOne"

        const game: Game = GameController.createGame(size, players, gameWinning)

        //if game status === in progress continue game
        //else come out of while loop
        while (GameController.getGameState(game) === gamestate.IN_PROGRESS) {
            console.log("This is your current board")
            game.displayBoard()

            game.makeNextMove()
        }

        console.log("Game has ended and result was ")

        if (GameController.getGameState(game) !== gamestate.DRAW) {
            console.log("Winner is : ", GameController.getWinner(game))
            game.displayBoard()
        }
    }
}
new tictactoe().main();   