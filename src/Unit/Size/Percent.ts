import UnitSize from "../UnitSize";

export default class Percent extends UnitSize {

    protected _name: string = 'percent'

    constructor()
    {
        super()
    }
    
    public getValue(val): string {
        return val+ '%'
    }

}