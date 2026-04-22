import { BaseModel } from "./base-model";
import { ParkingSpotStatus } from "./enums/parkingspotstatus.enum";
import { VehicleType } from "./enums/vehicletype.enum";

export class ParkingSpot extends BaseModel {
    private parkingSpotNumber!: number;
    private parkingSpotStatus!: ParkingSpotStatus;
    private supportedVechileTypes!: VehicleType[];

    public getParkingSpotNumber(): number {
        return this.parkingSpotNumber;
    }
    public setParkingSpotNumber(value: number) {
        this.parkingSpotNumber = value;
    }

    public getParkingSpotStatus(): ParkingSpotStatus {
        return this.parkingSpotStatus;
    }
    public setParkingSpotStatus(value: ParkingSpotStatus) {
        this.parkingSpotStatus = value;
    }

    public getSupportedVehicleTypes(): VehicleType[] {
        return this.supportedVechileTypes;
    }
    public setSupportedVehicleTypes(value: VehicleType[]) {
        this.supportedVechileTypes = value;
    }
}