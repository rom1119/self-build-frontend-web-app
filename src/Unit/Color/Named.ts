import UnitColor from '~/src/Unit/UnitColor';

export default class Named extends UnitColor {
    
    protected _name: string = 'named'

    
    public getValue(val): string {
        return val
    }

    
}