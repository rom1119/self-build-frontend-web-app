import UnitSize from "../UnitSize";

export default class VH extends UnitSize {
    protected _name: string = 'vh'


    constructor()
    
    {
        super()
    }
    
    public getValue(val): string {
        return val + 'vh'
    }
}