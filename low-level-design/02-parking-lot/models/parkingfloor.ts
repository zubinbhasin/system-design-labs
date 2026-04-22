import { BaseModel } from "./base-model";
import { ParkingFloorStatus } from "./enums/parkingfloorstatus";
import { ParkingSpot } from "./parkingspot";

export class ParkingFloor extends BaseModel {
    private parkingSpots!: ParkingSpot[];
    private parkingFloorStatus!: ParkingFloorStatus;
    private floorNumber!: number;

    public getParkingSpots(): ParkingSpot[] {
        return this.parkingSpots;
    }
    public setParkingSpots(value: ParkingSpot[]) {
        this.parkingSpots = value;
    }

    public getParkingFloorStatus(): ParkingFloorStatus {
        return this.parkingFloorStatus;
    }
    public setParkingFloorStatus(value: ParkingFloorStatus) {
        this.parkingFloorStatus = value;
    }

    public getFloorNumber(): number {
        return this.floorNumber;
    }
    public setFloorNumber(value: number) {
        this.floorNumber = value;
    }
}