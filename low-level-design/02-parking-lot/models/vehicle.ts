import { VehicleType } from "./enums/vehicletype.enum";

export class Vehicle {
    private vehicleNumber!: string;
    private ownerName!: string;
    private vehicleType!: VehicleType;

    public getVehicleNumber(): string {
        return this.vehicleNumber;
    }
    public setVehicleNumber(value: string) {
        this.vehicleNumber = value;
    }

    public getOwnerName(): string {
        return this.ownerName;
    }
    public setOwnerName(value: string) {
        this.ownerName = value;
    }

    public get VehicleType(): VehicleType {
        return this.vehicleType;
    }
    public set VehicleType(value: VehicleType) {
        this.vehicleType = value;
    }
}