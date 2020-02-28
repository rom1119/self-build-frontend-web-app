import UnitColor from '../UnitColor';

export default class Hexadecimal extends UnitColor {

    public static PROP_NAME = 'hexadecimal-color-unit'
    protected _name: string = Hexadecimal.PROP_NAME


    constructor()
    {
        super()
    }
    
    public getValue(val): string {
        return val
    }
}