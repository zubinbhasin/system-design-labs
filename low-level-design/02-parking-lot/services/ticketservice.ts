import { SpotAssignmentStrategyFactory } from "../factories/spotassignmentstrategyfactory";
import { VehicleType } from "../models/enums/vehicletype.enum";
import { Gate } from "../models/gate";
import { Ticket } from "../models/ticket";
import { Vehicle } from "../models/vehicle";
import { GateRepository } from "../repository/gaterepository";
import { ParkingLotRepository } from "../repository/parkinglotrepository";
import { TicketRepository } from "../repository/ticketrepository";
import { VehicleRepository } from "../repository/vehiclerepository";
import { SpotAssignmentStrategy } from "../stratergies/spotassignmentstratergy";

export class TicketService {
    private gateRepository: GateRepository;
    private vehicleRepository: VehicleRepository;
    private parkingLotRepository: ParkingLotRepository;
    private ticketRepository: TicketRepository; 

    constructor(gateRepository: GateRepository, vehicleRepository: VehicleRepository, parkingLotRepository: ParkingLotRepository, ticketRepository: TicketRepository){
        this.gateRepository = gateRepository
        this.vehicleRepository = vehicleRepository
        this.parkingLotRepository = parkingLotRepository
        this.ticketRepository = ticketRepository
    }
    public issueTicket(vehicleNumber: string, gateId:number, ownerName: string, vehicleType:VehicleType) {
        let ticket:Ticket = new Ticket()
        ticket.setEntryTime(new Date())
        
        let optionalGate = this.gateRepository.findById(gateId)

        if(!optionalGate){
            return new Error("Gate not found, please enter a valid gate number")
        }
        ticket.setGate(optionalGate)

        let optionalVehicle = this.vehicleRepository.findByVehicleNumber(vehicleNumber)

        let newvehicle: Vehicle = null

        if(!optionalVehicle){
            let vehicle = new Vehicle()
            vehicle.setVehicleNumber(vehicleNumber)
            vehicle.setVehicleType(vehicleType)
            vehicle.setOwnerName()
            newvehicle = this.vehicleRepository.save(vehicle)
            
        }else {
            newvehicle = optionalVehicle
        }

        ticket.setVehicle(newvehicle)
        ticket.setNumber("ticket-number")

        let parkingLot = this.parkingLotRepository.findParkingLotByGateId(gateId)
        if(!parkingLot){
            return new Error("Wrong")
        }

        let spotAssignmentStrategy: SpotAssignmentStrategy =  SpotAssignmentStrategyFactory.getSpotAssignmentStrategyByStrategy(parkingLot.getSpotAssignmentStrategyType())
        
        let parkingSpot = spotAssignmentStrategy.assignSpot(vehicleType, optionalGate)

        ticket.setParkingSpot(parkingSpot)

        return this.ticketRepository.save(ticket)
    }
}