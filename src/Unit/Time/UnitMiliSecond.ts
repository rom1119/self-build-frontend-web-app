import Unit from "../Unit";
import UnitTime from '../UnitTime';

export default class UnitMiliSecond extends UnitTime {

    public static PROP_NAME = 'mili-second-unit'

    protected _name: string = UnitMiliSecond.PROP_NAME
    protected _label: string = 'milisecond'

    public getValue(val: any): string {
        var newVal = `${val}ms`

        return newVal

    }


}