import UnitSize from "../UnitSize";

export default class EM extends UnitSize {
    protected _name: string = 'em'


    constructor()
    
    {
        super()
    }
    
    public getValue(val): string {
        return val + 'em'
    }
}