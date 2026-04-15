import { Board } from "../../models/board";
import { Move } from "../../models/move";
import { Player } from "../../models/player";

export interface BotPlayingStrategy {
    decideMove(player: Player, board: Board): Move
}