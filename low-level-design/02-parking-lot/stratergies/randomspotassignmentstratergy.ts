import { VehicleType } from "../models/enums/vehicletype.enum";
import { Gate } from "../models/gate";
import { ParkingSpot } from "../models/parkingspot";
import { SpotAssignmentStrategy } from "./spotassignmentstratergy";

export class RandomSpotAssignmentStrategy implements SpotAssignmentStrategy{
    public assignSpot(vehicleType: VehicleType, gate: Gate): ParkingSpot {
        // code for assigining a random spot in the parking lot
        return null
    }
}