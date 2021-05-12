import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';
import Pixel from '../../../Unit/Size/Pixel';


export default class Matrix implements TransformType
{
    public static PROP_NAME = 'matrix'

    val: number = 1
    valSecond: number = 0

    valThird: number = 0
    valFourth: number = 1
    valFiveth: number = 200
    valSixth: number = 200
    // unit: Unit = new Pixel()
    
    // unitSecond: Unit = new Pixel()

    getValue(): string {
        return `matrix(${this.val}, ${this.valSecond}, ${this.valThird}, ${this.valFourth}, ${this.valFiveth}, ${this.valSixth})`
    }

    public getName(): string  {
        return Matrix.PROP_NAME
    }

  


}