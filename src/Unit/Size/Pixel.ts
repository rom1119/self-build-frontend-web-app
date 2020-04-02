import UnitSize from "../UnitSize";

export default class Pixel extends UnitSize {
    public static PROP_NAME = 'pixel-size-unit'
    protected _name: string = Pixel.PROP_NAME
    protected _label: string = 'px'
    
    constructor()
    {
        super()
    }
    
    public getValue(val): string {
        return `${val}px`
    }

}