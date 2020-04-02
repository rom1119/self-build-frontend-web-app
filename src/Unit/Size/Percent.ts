import UnitSize from "../UnitSize";

export default class Percent extends UnitSize {
    public static PROP_NAME = 'percent-size-unit'
    protected _name: string = Percent.PROP_NAME
    protected _label: string = '%'


    constructor()
    {
        super()
    }
    
    public getValue(val): string {
        return val+ '%'
    }

}