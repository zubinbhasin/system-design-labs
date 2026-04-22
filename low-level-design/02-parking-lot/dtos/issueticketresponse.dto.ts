import { ResponseStatus } from "../models/enums/responsestatus.enum";
import { Ticket } from "../models/ticket";

export class IssueTicketResponseDto {
    public readonly ticket: Ticket | null;
    public readonly responseStatus: ResponseStatus;

    constructor(ticket: Ticket | null, responseStatus: ResponseStatus) {
        this.ticket = ticket;
        this.responseStatus = responseStatus;
    }
}
