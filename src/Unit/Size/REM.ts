import UnitSize from "../UnitSize";

export default class REM extends UnitSize {
    protected _name: string = 'rem'


    constructor()
    
    {
        super()
    }
    
    public getValue(val): string {
        return val + 'rem'
    }
}