import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';


export default class Rotate implements TransformType
{
    public static PROP_NAME = 'rotate'

    val: number = 90
    unit: UnitAngle = new UnitDeg()

    getValue(): string {
        return `rotate(${this.unit.getValue(this.val)})`
    }

    public getName(): string  {
        return Rotate.PROP_NAME
    }

  


}