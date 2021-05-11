import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import CssWithOneValue from '../../CssWithOneValue';


export default class SkewX implements TransformType, CssWithOneValue
{
    public static PROP_NAME = 'skewX'

    val: number = 2
    unit: UnitAngle = new UnitDeg()

    getValue(): string {
        return `skewX(${this.unit.getValue(this.val)})`
    }

    public getName(): string  {
        return SkewX.PROP_NAME
    }

  


}