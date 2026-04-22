import { PaymentMode } from "./enums/paymentmode.enum";
import { PaymentStatus } from "./enums/paymentstatus.enum";

export class Payment {
    private amount!: number;
    private time!: Date;
    private referenceNumber!: string;
    private paymentMode!: PaymentMode;
    private paymentStatus!: PaymentStatus;

    public getAmount(): number {
        return this.amount;
    }
    public setAmount(value: number) {
        this.amount = value;
    }

    public getTime(): Date {
        return this.time;
    }
    public setTime(value: Date) {
        this.time = value;
    }

    public getReferenceNumber(): string {
        return this.referenceNumber;
    }
    public setReferenceNumber(value: string) {
        this.referenceNumber = value;
    }

    public getPaymentMode(): PaymentMode {
        return this.paymentMode;
    }
    public setPaymentMode(value: PaymentMode) {
        this.paymentMode = value;
    }

    public getPaymentStatus(): PaymentStatus {
        return this.paymentStatus;
    }
    public setPaymentStatus(value: PaymentStatus) {
        this.paymentStatus = value;
    }
}