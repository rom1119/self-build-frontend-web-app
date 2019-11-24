import UnitSize from "../UnitSize";

export default class Pixel extends UnitSize {
    
    protected _name: string = 'pixel'
    
    constructor()
    {
        super()
    }
    
    public getValue(val): string {
        return `${val}px`
    }

}