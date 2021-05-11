import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';
import Pixel from '../../../Unit/Size/Pixel';


export default class Matrix implements TransformType
{
    public static PROP_NAME = 'matrix'

    val: number = 2
    valSecond: number = 2

    valThird: number = 2
    valFourth: number = 2
    valFiveth: number = 2
    valSixth: number = 2
    // unit: Unit = new Pixel()
    
    // unitSecond: Unit = new Pixel()

    getValue(): string {
        return `matrix(${this.val}, ${this.valSecond}, ${this.valThird}, ${this.valFourth}, ${this.valFiveth}, ${this.valSixth})`
    }

    public getName(): string  {
        return Matrix.PROP_NAME
    }

  


}