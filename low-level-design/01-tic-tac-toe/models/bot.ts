import { BotPlayingStrategyFactory } from "../factories/botplayingstratergy";
import { BotPlayingStrategy } from "../stratergies/botplayingstratergy/botplayingstratergy";
import { Board } from "./board";
import { botdifficulty } from "./bot-difficulty.enum";
import { Move } from "./move";
import { Player } from "./player";
import { playertype } from "./player-type.enum";

class Bot extends Player {
    private botdifficultlevel: botdifficulty;
    private botPlayingStratergy: BotPlayingStrategy
    constructor(name: string, symbol: string, botdifficultlevel: botdifficulty) {
        super(name, symbol, playertype.BOT);
        this.botdifficultlevel = botdifficultlevel;
        this.botPlayingStratergy = BotPlayingStrategyFactory.getBotPlayingStratergyByDifficultyLevel(this.botdifficultlevel)
    }

    public decideMove(board: Board): Move {
        return this.botPlayingStratergy.decideMove(this, board)
    }
}

export { Bot }