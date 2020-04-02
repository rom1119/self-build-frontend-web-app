import UnitSize from "../UnitSize";

export default class VW extends UnitSize {
    public static PROP_NAME = 'vw-size-unit'

    protected _name: string = VW.PROP_NAME
    protected _label: string = 'vw'


    constructor()
    
    {
        super()
    }
    
    public getValue(val): string {
        return val + 'vw'
    }
}