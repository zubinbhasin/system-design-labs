import { VehicleType } from "../models/enums/vehicletype.enum";
import { Gate } from "../models/gate";
import { ParkingSpot } from "../models/parkingspot";

export interface SpotAssignmentStrategy{
    assignSpot(vehicleType: VehicleType, gate: Gate): ParkingSpot;
}