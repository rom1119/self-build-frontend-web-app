import Unit from "../Unit";
import UnitAngle from '../UnitAngle';

export default class UnitRad extends UnitAngle {

    public static PROP_NAME = 'rad-unit'

    protected _name: string = UnitRad.PROP_NAME
    protected _label: string = 'rad'

    public getValue(val: any): string {
        var newVal = `${val}rad`

        return newVal

    }


}