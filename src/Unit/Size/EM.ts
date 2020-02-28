import UnitSize from "../UnitSize";

export default class EM extends UnitSize {
    public static PROP_NAME = 'em-size-unit'
    protected _name: string = EM.PROP_NAME


    constructor()
    
    {
        super()
    }
    
    public getValue(val): string {
        return val + 'em'
    }
}