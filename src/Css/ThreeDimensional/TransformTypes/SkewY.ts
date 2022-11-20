import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import CssWithOneField from '../../CssWithOneField';


export default class SkewY implements TransformType, CssWithOneField {
    public static PROP_NAME = 'skewY'

    val: number = 2
    unit: UnitAngle = new UnitDeg()

    getValue(): string {
        return `skewY(${this.unit.getValue(this.val)})`
    }

    public getName(): string {
        return SkewY.PROP_NAME
    }




}