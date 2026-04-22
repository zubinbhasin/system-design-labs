import { Gate } from "../models/gate";

export class GateRepository {
    private gateMap: Map<number, Gate>;
    private id: number

    constructor() {
        this.gateMap = new Map()
        this.id = 0
    }

    public save(gate:Gate): Gate{
        if(gate.getId()==0){
            this.id = this.id + 1 
            gate.setId(this.id)
            this.gateMap.set(this.id, gate)
            return gate
        }
        this.gateMap.set(gate.getId(), gate)
        return gate
       }

    public findById(gateId:number) {
        if(this.gateMap.get(gateId)){
            return this.gateMap.get(gateId)
        }
        return null
    }
}