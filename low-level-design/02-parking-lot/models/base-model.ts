export class BaseModel {
    private id!: number;
    private createdAt!: Date;
    private updatedAt!: Date;

    public getId(): number {
        return this.id;
    }
    public setId(value: number) {
        this.id = value;
    }
    public getCreatedAt(): Date {
        return this.createdAt;
    }
    public setCreatedAt(value: Date) {
        this.createdAt = value;
    }
    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
    public setUpdatedAt(value: Date) {
        this.updatedAt = value;
    }
}