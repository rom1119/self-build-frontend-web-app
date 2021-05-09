import Unit from "../Unit";
import UnitAngle from '../UnitAngle';

export default class UnitTurn extends UnitAngle {

    public static PROP_NAME = 'turn-unit'

    protected _name: string = UnitTurn.PROP_NAME
    protected _label: string = 'turn'

    public getValue(val: any): string {
        var newVal = `${val}turn`

        return newVal

    }


}