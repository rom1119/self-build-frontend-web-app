import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';
import Pixel from '../../../Unit/Size/Pixel';
import Matrix from './Matrix';


export default class Matrix3D extends Matrix
{
    public static PROP_NAME = 'matrix3d'

    val: number = 1
    valSecond: number = 0
    valThird: number = 0
    valFourth: number = 0

    valFiveth: number = 0
    valSixth: number = 1
    valSeventh: number = 0
    valEighth: number = 0

    valNinth: number = 0
    valTenth: number = 0
    valEleventh: number = 1
    valTwelfth: number = 0

    valThirteenth: number = 200
    valFourteenth: number = 200
    valFifteenth: number = 2
    valSixteenth: number = 2
    // unit: Unit = new Pixel()
    
    // unitSecond: Unit = new Pixel()

    getValue(): string {
        return `matrix3d(${this.val}, ${this.valSecond}, ${this.valThird}, ${this.valFourth}, ${this.valFiveth}, ${this.valSixth}, ${this.valSeventh}, ${this.valEighth}, ${this.valNinth}, ${this.valTenth}, ${this.valEleventh}, ${this.valTwelfth}, ${this.valThirteenth}, ${this.valFourteenth}, ${this.valFifteenth}, ${this.valSixteenth})`
    }

    public getName(): string  {
        return Matrix3D.PROP_NAME
    }

  


}