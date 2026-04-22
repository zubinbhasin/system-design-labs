import { TicketController } from "./controllers/ticket-controller";
import { IssueTicketRequestDTO } from "./dtos/issueticketrequest.dto";
import { GateStatus } from "./models/enums/gatestatus.enum";
import { GateType } from "./models/enums/gatetype.enum";
import { VehicleType } from "./models/enums/vehicletype.enum";
import { Gate } from "./models/gate";
import { GateRepository } from "./repository/gaterepository";
import { ParkingLotRepository } from "./repository/parkinglotrepository";
import { TicketRepository } from "./repository/ticketrepository";
import { VehicleRepository } from "./repository/vehiclerepository";
import { TicketService } from "./services/ticketservice";

function main() {
    const gateRepository = new GateRepository();
    const vehicleRepository = new VehicleRepository();
    const parkingLotRepository = new ParkingLotRepository();
    const ticketRepository = new TicketRepository();

    const gate = new Gate();
    gate.setGateNumber(1);
    gate.setGateType(GateType.ENTRY);
    gate.setGateStatus(GateStatus.OPENED);
    const savedGate = gateRepository.save(gate);

    const ticketService = new TicketService(gateRepository, vehicleRepository, parkingLotRepository, ticketRepository);
    const ticketController = new TicketController(ticketService);

    const request = new IssueTicketRequestDTO(savedGate.getId(), "MH01AB1234", VehicleType.SMALL, "John Doe");
    const response = ticketController.issueTicket(request);

    console.log(response);
}

main();
