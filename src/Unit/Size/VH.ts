import UnitSize from "../UnitSize";

export default class VH extends UnitSize {
    public static PROP_NAME = 'vh-size-unit'
    protected _name: string = VH.PROP_NAME


    constructor()
    
    {
        super()
    }
    
    public getValue(val): string {
        return val + 'vh'
    }
}