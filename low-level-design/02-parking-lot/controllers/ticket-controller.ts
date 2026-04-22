import { IssueTicketRequestDTO } from "../dtos/issueticketrequest.dto";
import { IssueTicketResponseDto } from "../dtos/issueticketresponse.dto";
import { ResponseStatus } from "../models/enums/responsestatus.enum";
import { Ticket } from "../models/ticket";
import { TicketService } from "../services/ticketservice";

export class TicketController {
    private ticketService: TicketService;

    constructor(ticketService: TicketService) {
        this.ticketService = ticketService
    }

    public issueTicket(request: IssueTicketRequestDTO): IssueTicketResponseDto {
        const response = new IssueTicketResponseDto()
        try {
            const ticket: Ticket = this.ticketService.issueTicket(
                request.vehicleNumber,
                request.gateId,
                request.ownerName,
                request.vehicleType)

                response.setResponseStatus(ResponseStatus.SUCCESS)
                response.setTicket(ticket)
        } catch (err) {
            response.setResponseStatus(ResponseStatus.FAILURE)
        }

        return response
    }
}