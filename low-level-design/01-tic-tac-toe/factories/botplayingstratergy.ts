import { botdifficulty } from "../models/bot-difficulty.enum";
import { RandomBotPlayingStratergy } from "../stratergies/botplayingstratergy/randombotplayingstratergy";

export class BotPlayingStrategyFactory {
    public static getBotPlayingStratergyByDifficultyLevel (botdifficultlevel:botdifficulty){
        if(botdifficultlevel == botdifficulty.EASY){
            return new RandomBotPlayingStratergy()
        }
        throw new Error(`No strategy found for difficulty level: ${botdifficultlevel}`)
    }
}