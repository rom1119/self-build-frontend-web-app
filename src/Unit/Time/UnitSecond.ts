import Unit from "../Unit";
import UnitTime from '../UnitTime';

export default class UnitSecond extends UnitTime {

    public static PROP_NAME = 'second-unit'

    protected _name: string = UnitSecond.PROP_NAME
    protected _label: string = 'second'

    public getValue(val: any): string {
        var newVal = `${val}s`

        return newVal

    }


}