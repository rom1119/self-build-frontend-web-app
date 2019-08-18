import BaseModel from "~/types/BaseModel";

export default abstract class AggregateRoot extends BaseModel{

    private _id
    private _hashCode: number

    get id() : number {
        return this._id
    }

    set id(value) {
        this._id = value;
    }


    constructor() {
        super()
        this._hashCode = Math.floor(Math.random() * 1000000000);
    }

    get hashCode(): number {
        return this._hashCode;
    }

    public equals(el: AggregateRoot): boolean
    {
        return this.id === el.id
    }


}
