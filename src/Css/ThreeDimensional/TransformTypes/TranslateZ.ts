import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';
import Pixel from '../../../Unit/Size/Pixel';
import CssWithOneValue from '../../CssWithOneValue';


export default class TranslateZ implements TransformType, CssWithOneValue
{
    public static PROP_NAME = 'translateZ'

    val: number = 2
    unit: Unit = new Named()


    getValue(): string {
        return `translateZ(${this.unit.getValue(this.val)})`
    }

    public getName(): string  {
        return TranslateZ.PROP_NAME
    }

  


}