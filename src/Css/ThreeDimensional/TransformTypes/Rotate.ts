import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import CssWithOneField from '../../CssWithOneField';


export default class Rotate implements TransformType, CssWithOneField {
    public static PROP_NAME = 'rotate'

    val: number = 45
    unit: UnitAngle = new UnitDeg()

    getValue(): string {
        return `rotate(${this.unit.getValue(this.val)})`
    }

    public getName(): string {
        return Rotate.PROP_NAME
    }




}