import { Board } from "../../models/board";
import { Cell } from "../../models/cell";
import { cellstate } from "../../models/cell-state.enum";
import { Move } from "../../models/move";
import { Player } from "../../models/player";
import { BotPlayingStrategy } from "./botplayingstratergy";

export class RandomBotPlayingStratergy implements BotPlayingStrategy {
    public decideMove(player: Player, board: Board): Move {
        for (let i = 0; i < board.getSize(); i++) {
            for (let j = 0; j < board.getSize(); j++) {
                if (board.getBoard()[i][j].getCellState() === cellstate.EMPTY) {
                    return new Move(player, board.getBoard()[i][j])
                }
            }
        }
        throw new Error('No empty cell available on the board')
    }
}