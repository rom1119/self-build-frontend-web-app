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

    valSeventh: number = 2
    valEighth: number = 2

    valNinth: number = 2
    valTenth: number = 2
    valEleventh: number = 2
    valTwelfth: number = 2

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