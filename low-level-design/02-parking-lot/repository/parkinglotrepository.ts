import { ParkingLot } from "../models/parkinglot";
//revisit
export class ParkingLotRepository {
    private parkingLotMap: Map<number, ParkingLot>;
    private id: number;

    constructor() {
        this.parkingLotMap = new Map();
        this.id = 0;
    }

    public save(parkingLot: ParkingLot): ParkingLot {
        this.id += 1;
        this.parkingLotMap.set(this.id, parkingLot);
        return parkingLot;
    }

    public findById(id: number): ParkingLot | null {
        return this.parkingLotMap.get(id) ?? null;
    }

    public findParkingLotByGateId(gateId: number): ParkingLot | null {
        for (const parkingLot of this.parkingLotMap.values()) {
            const found = parkingLot.getGates().some(gate => gate.getId() === gateId);
            if (found) return parkingLot;
        }
        return null;
    }
}
