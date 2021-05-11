import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';
import CssWithTwoValue from '../../CssWithTwoValues';
import CssWithTwoValues from '../../CssWithTwoValues';


export default class Scale implements TransformType, CssWithTwoValues
{
    public static PROP_NAME = 'scale'

    val: number = 1
    unit: Unit = new Named()
    
    valSecond: number = 1
    unitSecond: Unit = new Named()

    getValue(): string {
        return `scale(${this.unit.getValue(this.val)}, ${this.unitSecond.getValue(this.valSecond)})`
    }

    public getName(): string  {
        return Scale.PROP_NAME
    }

  


}