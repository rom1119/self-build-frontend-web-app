import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import CssWithOneValue from '../../CssWithOneValue';


export default class RotateZ implements TransformType, CssWithOneValue
{
    public static PROP_NAME = 'rotateZ'

    val: number = 45
    unit: UnitAngle = new UnitDeg()

    getValue(): string {
        return `rotateZ(${this.unit.getValue(this.val)})`
    }

    public getName(): string  {
        return RotateZ.PROP_NAME
    }

  


}