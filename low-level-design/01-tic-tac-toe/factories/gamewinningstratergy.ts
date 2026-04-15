import { GameWinningStratergy } from "../stratergies/gamewinningstratergy/gamewinningstratergy";
import { OrderOneWinningStratergy } from "../stratergies/gamewinningstratergy/orderonewinningstratergy";

export class GameWinningStrategyFactory {
   public static getGameWinningStratergy(winningStrategy: String, size: number): GameWinningStratergy {
        if (winningStrategy === "OrderOne") {
            return new OrderOneWinningStratergy(size)
        }
        throw new Error(`Unknown winning strategy: ${winningStrategy}`)
    }
}