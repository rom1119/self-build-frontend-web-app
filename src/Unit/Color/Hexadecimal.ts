import UnitColor from '../UnitColor';

export default class Hexadecimal extends UnitColor {

    protected _name: string = 'hexadecimal'


    constructor()
    {
        super()
    }
    
    public getValue(val): string {
        return val
    }
}