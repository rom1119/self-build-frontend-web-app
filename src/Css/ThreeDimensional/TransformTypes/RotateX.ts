import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import CssWithOneValue from '../../CssWithOneValue';


export default class RotateX implements TransformType, CssWithOneValue
{
    public static PROP_NAME = 'rotateX'

    val: number = 90
    unit: UnitAngle = new UnitDeg()

    getValue(): string {
        return `rotateX(${this.unit.getValue(this.val)})`
    }

    public getName(): string  {
        return RotateX.PROP_NAME
    }

  


}