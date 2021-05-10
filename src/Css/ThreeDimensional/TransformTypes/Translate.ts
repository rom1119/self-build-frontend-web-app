import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';
import Pixel from '../../../Unit/Size/Pixel';


export default class Translate implements TransformType
{
    public static PROP_NAME = 'translate'

    val: number = 2
    unit: Unit = new Pixel()
    
    valSecond: number = 2
    unitSecond: Unit = new Pixel()

    getValue(): string {
        return `translate(${this.unit.getValue(this.val)}, ${this.unitSecond.getValue(this.valSecond)})`
    }

    public getName(): string  {
        return Translate.PROP_NAME
    }

  


}