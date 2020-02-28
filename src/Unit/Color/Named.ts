import UnitColor from '~/src/Unit/UnitColor';

export default class Named extends UnitColor {
    
    public static PROP_NAME = 'named-color-unit'
    protected _name: string = Named.PROP_NAME

    
    public getValue(val): string {
        return val
    }

    
}