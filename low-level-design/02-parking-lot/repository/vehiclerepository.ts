import { Vehicle } from "../models/vehicle";
//revisit
export class VehicleRepository {
    private vehicleMap: Map<number, Vehicle>;
    private vehicleNumberMap: Map<string, Vehicle>;
    private id: number;

    constructor() {
        this.vehicleMap = new Map();
        this.vehicleNumberMap = new Map();
        this.id = 0;
    }

    public findByVehicleNumber(vehicleNumber: string): Vehicle | null {
        return this.vehicleNumberMap.get(vehicleNumber) ?? null;
    }

    public findById(vehicleId: number): Vehicle | null {
        return this.vehicleMap.get(vehicleId) ?? null;
    }

    public save(vehicle: Vehicle): Vehicle {
        this.id += 1;
        this.vehicleMap.set(this.id, vehicle);
        this.vehicleNumberMap.set(vehicle.getVehicleNumber(), vehicle);
        return vehicle;
    }
}
