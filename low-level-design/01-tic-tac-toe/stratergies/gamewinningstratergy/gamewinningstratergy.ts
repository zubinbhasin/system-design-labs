import { Board } from "../../models/board";
import { Move } from "../../models/move";
import { Player } from "../../models/player";

export interface GameWinningStratergy{
    checkWinner(board: Board, moveCell: Move, player: Player): boolean,

}