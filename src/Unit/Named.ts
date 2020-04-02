import UnitColor from '~/src/Unit/UnitColor';

export default class Named extends UnitColor {
    
    public static PROP_NAME = 'named-unit'
    protected _name: string = Named.PROP_NAME
    protected _label: string = 'name'

    
    public getValue(val): string {
        return val
    }

    
}