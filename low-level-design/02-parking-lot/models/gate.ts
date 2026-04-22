import { BaseModel } from "./base-model";
import { GateStatus } from "./enums/gatestatus.enum";
import { GateType } from "./enums/gatetype.enum";
import { Operator } from "./operator";

export class Gate extends BaseModel{
    private gateStatus!: GateStatus;
    private gateType!: GateType;
    private operator!: Operator;
    private gateNumber!: number;

    public getGateStatus(): GateStatus {
        return this.gateStatus;
    }
    public setGateStatus(value: GateStatus) {
        this.gateStatus = value;
    }

    public getGateType(): GateType {
        return this.gateType;
    }
    public setGateType(value: GateType) {
        this.gateType = value;
    }

    public getOperator(): Operator {
        return this.operator;
    }
    public setOperator(value: Operator) {
        this.operator = value;
    }

    public getGateNumber(): number {
        return this.gateNumber;
    }
    public setGateNumber(value: number) {
        this.gateNumber = value;
    }
}