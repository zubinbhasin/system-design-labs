import { Ticket } from "../models/ticket"

export class TicketRepository {
    ticketMap = Map<number, Ticket>

    public save(ticket: Ticket){
        return null
    }
}