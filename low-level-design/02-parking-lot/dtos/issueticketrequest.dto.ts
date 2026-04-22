import { VehicleType } from "../models/enums/vehicletype.enum";

export class IssueTicketRequestDTO {
    public readonly gateId: number;
    public readonly vehicleNumber: string;
    public readonly vehicleType: VehicleType;
    public readonly ownerName: string;

    constructor(gateId: number, vehicleNumber: string, vehicleType: VehicleType, ownerName: string) {
        this.gateId = gateId;
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
        this.ownerName = ownerName;
    }
}
