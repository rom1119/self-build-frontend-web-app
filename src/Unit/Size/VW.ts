import UnitSize from "../UnitSize";

export default class VW extends UnitSize {
    protected _name: string = 'vw'


    constructor()
    
    {
        super()
    }
    
    public getValue(val): string {
        return val + 'vw'
    }
}