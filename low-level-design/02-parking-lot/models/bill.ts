import { BaseModel } from "./base-model";
import { BillStatus } from "./enums/billstatus.enum";
import { FeeCalculationStrategyType } from "./enums/feecalculationstrategytype";
import { Gate } from "./gate";
import { Payment } from "./payment";
import { Ticket } from "./ticket";

export class Bill extends BaseModel {
    private amount!: number;
    private exitTime!: Date;
    private ticket!: Ticket;
    private paymentList!: Payment[];
    private gate!: Gate;
    private billStatus!: BillStatus;
    private feeCalculationStrategyType!: FeeCalculationStrategyType;

    public getAmount(): number {
        return this.amount;
    }
    public setAmount(value: number) {
        this.amount = value;
    }

    public getExitTime(): Date {
        return this.exitTime;
    }
    public setExitTime(value: Date) {
        this.exitTime = value;
    }

    public getTicket(): Ticket {
        return this.ticket;
    }
    public setTicket(value: Ticket) {
        this.ticket = value;
    }

    public getPaymentList(): Payment[] {
        return this.paymentList;
    }
    public setPaymentList(value: Payment[]) {
        this.paymentList = value;
    }

    public getGate(): Gate {
        return this.gate;
    }
    public setGate(value: Gate) {
        this.gate = value;
    }

    public getBillStatus(): BillStatus {
        return this.billStatus;
    }
    public setBillStatus(value: BillStatus) {
        this.billStatus = value;
    }

    public getFeeCalculationStrategyType(): FeeCalculationStrategyType {
        return this.feeCalculationStrategyType;
    }
    public setFeeCalculationStrategyType(value: FeeCalculationStrategyType) {
        this.feeCalculationStrategyType = value;
    }
}