import { FeeCalculationStrategyType } from "./enums/feecalculationstrategytype";
import { SpotAssignmentStrategyType } from "./enums/spotassignmentstrategytype";
import { VehicleType } from "./enums/vehicletype.enum";
import { Gate } from "./gate";
import { ParkingFloor } from "./parkingfloor";

export class ParkingLot {
    private parkingFloors!: ParkingFloor[];
    private address!: string;
    private gates!: Gate[];
    private supportedVehicles!: VehicleType[];
    private feeCalculationStrategyType!: FeeCalculationStrategyType;
    private spotAssignmentStrategyType!: SpotAssignmentStrategyType;

    public getParkingFloors(): ParkingFloor[] {
        return this.parkingFloors;
    }
    public setParkingFloors(value: ParkingFloor[]) {
        this.parkingFloors = value;
    }

    public getAddress(): string {
        return this.address;
    }
    public setAddress(value: string) {
        this.address = value;
    }

    public getGates(): Gate[] {
        return this.gates;
    }
    public setGates(value: Gate[]) {
        this.gates = value;
    }

    public getSupportedVehicles(): VehicleType[] {
        return this.supportedVehicles;
    }
    public setSupportedVehicles(value: VehicleType[]) {
        this.supportedVehicles = value;
    }

    public getFeeCalculationStrategyType(): FeeCalculationStrategyType {
        return this.feeCalculationStrategyType;
    }
    public setFeeCalculationStrategyType(value: FeeCalculationStrategyType) {
        this.feeCalculationStrategyType = value;
    }

    public getSpotAssignmentStrategyType(): SpotAssignmentStrategyType {
        return this.spotAssignmentStrategyType;
    }
    public setSpotAssignmentStrategyType(value: SpotAssignmentStrategyType) {
        this.spotAssignmentStrategyType = value;
    }
}