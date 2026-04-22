Designing a parking lot

ticket controller pick from - 1:05:00

## Needs Rework

- `controllers/ticket-controller.ts` — response DTO is readonly (constructor-based), can't use setters; service return type is `Ticket | Error | null`, needs proper narrowing
- `services/ticketservice.ts` — mixes error returns and throws; `vehicle.setOwnerName()` called with no args; return type is inconsistent
- `stratergies/cheapestspotassignmentstrategy.ts` — stub, logic not implemented
- `stratergies/randomspotassignmentstratergy.ts` — stub, logic not implemented; currently returns `null` which violates `ParkingSpot` return type