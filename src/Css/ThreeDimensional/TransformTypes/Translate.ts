import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';


export default class Translate implements TransformType
{
    public static PROP_NAME = 'translate'

    val: number = 2
    unit: Unit = new Named()
    
    valSecond: number = 2
    unitSecond: Unit = new Named()

    getValue(): string {
        return `translate(${this.unit.getValue(this.val)}, ${this.unitSecond.getValue(this.valSecond)})`
    }

    public getName(): string  {
        return Translate.PROP_NAME
    }

  


}