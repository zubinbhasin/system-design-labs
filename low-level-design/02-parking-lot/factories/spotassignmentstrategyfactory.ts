import { SpotAssignmentStrategyType } from "../models/enums/spotassignmentstrategytype";
import { CheapestSpotAssignmentStrategy } from "../stratergies/cheapestspotassignmentstrategy";
import { RandomSpotAssignmentStrategy } from "../stratergies/randomspotassignmentstratergy";
import { SpotAssignmentStrategy } from "../stratergies/spotassignmentstratergy";

export class SpotAssignmentStrategyFactory {
    public static getSpotAssignmentStrategyByStrategy(spotAssignmentStrategyType: SpotAssignmentStrategyType) : SpotAssignmentStrategy | undefined {
        if (spotAssignmentStrategyType === SpotAssignmentStrategyType.CHEAPEST){
            return new CheapestSpotAssignmentStrategy()
        } else if (spotAssignmentStrategyType === SpotAssignmentStrategyType.RANDOM){
            return new RandomSpotAssignmentStrategy()
        }
    }
}