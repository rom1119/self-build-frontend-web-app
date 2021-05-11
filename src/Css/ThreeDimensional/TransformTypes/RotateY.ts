import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import CssWithOneValue from '../../CssWithOneValue';


export default class RotateY implements TransformType, CssWithOneValue
{
    public static PROP_NAME = 'rotateY'

    val: number = 45
    unit: UnitAngle = new UnitDeg()

    getValue(): string {
        return `rotateY(${this.unit.getValue(this.val)})`
    }

    public getName(): string  {
        return RotateY.PROP_NAME
    }

  


}