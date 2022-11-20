import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import CssWithTwoFields from '../../CssWithTwoFields';


export default class Skew implements TransformType, CssWithTwoFields {
    public static PROP_NAME = 'skew'

    val: number = 2
    unit: UnitAngle = new UnitDeg()

    valSecond: number = 2
    unitSecond: UnitAngle = new UnitDeg()

    getValue(): string {
        return `skew(${this.unit.getValue(this.val)}, ${this.unitSecond.getValue(this.valSecond)})`
    }

    public getName(): string {
        return Skew.PROP_NAME
    }




}