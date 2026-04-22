import { BaseModel } from "./base-model";
import { Gate } from "./gate";
import { ParkingSpot } from "./parkingspot";
import { Vehicle } from "./vehicle";

export class Ticket extends BaseModel{
    private number!: string;
    private entryTime!: Date;
    private vehicle!: Vehicle;
    private parkingSpot!: ParkingSpot;
    private gate!: Gate;

    public getNumber(): string {
        return this.number;
    }
    public setNumber(value: string) {
        this.number = value;
    }

    public getEntryTime(): Date {
        return this.entryTime;
    }
    public setEntryTime(value: Date) {
        this.entryTime = value;
    }

    public getVehicle(): Vehicle {
        return this.vehicle;
    }
    public setVehicle(value: Vehicle) {
        this.vehicle = value;
    }

    public getParkingSpot(): ParkingSpot {
        return this.parkingSpot;
    }
    public setParkingSpot(value: ParkingSpot) {
        this.parkingSpot = value;
    }

    public getGate(): Gate {
        return this.gate;
    }
    public setGate(value: Gate) {
        this.gate = value;
    }
}