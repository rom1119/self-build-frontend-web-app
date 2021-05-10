import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';
import Pixel from '../../../Unit/Size/Pixel';


export default class Translate3D implements TransformType
{
    public static PROP_NAME = 'translate3d'

    val: number = 200
    unit: Unit = new Pixel()
    
    valSecond: number = 20
    unitSecond: Unit = new Pixel()
    
    valThird: number = 10
    unitThird: Unit = new Pixel()

    getValue(): string {
        return `translate3d(${this.unit.getValue(this.val)}, ${this.unitSecond.getValue(this.valSecond)}, ${this.unitThird.getValue(this.valThird)})`
    }

    public getName(): string  {
        return Translate3D.PROP_NAME
    }

  


}