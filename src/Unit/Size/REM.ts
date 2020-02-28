import UnitSize from "../UnitSize";

export default class REM extends UnitSize {
    public static PROP_NAME = 'rem-size-unit'

    protected _name: string = REM.PROP_NAME


    constructor()
    
    {
        super()
    }
    
    public getValue(val): string {
        return val + 'rem'
    }
}