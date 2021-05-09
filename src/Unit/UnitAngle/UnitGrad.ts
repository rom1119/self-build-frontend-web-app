import Unit from "../Unit";
import UnitAngle from '../UnitAngle';

export default class UnitGrad extends UnitAngle {

    public static PROP_NAME = 'grad-unit'

    protected _name: string = UnitGrad.PROP_NAME
    protected _label: string = 'grad'

    public getValue(val: any): string {
        var newVal = `${val}grad`

        return newVal

    }


}