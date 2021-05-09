import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';


export default class Rotate3D implements TransformType
{
    public static PROP_NAME = 'rotate3d'

    val: number = 1
    valSecond: number = 1
    valThird: number = 1
    valFourth: number = 45
    valForthUnit: UnitAngle = new UnitDeg()

    getValue(): string {
        return `rotate3d(${this.val}, ${this.valSecond}, ${this.valThird}, ${this.valForthUnit.getValue(this.valFourth)})`
    }

    public getName(): string  {
        return Rotate3D.PROP_NAME
    }

  


}