import Unit from "../Unit";
import UnitAngle from '../UnitAngle';

export default class UnitDeg extends UnitAngle {

    public static PROP_NAME = 'deg-unit'

    protected _name: string = UnitDeg.PROP_NAME
    protected _label: string = 'deg'

    public getValue(val: any): string {
        var newVal = `${val}deg`

        return newVal

    }


}