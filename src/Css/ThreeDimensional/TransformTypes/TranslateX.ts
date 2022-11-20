import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';
import Pixel from '../../../Unit/Size/Pixel';
import CssWithOneField from '../../CssWithOneField';


export default class TranslateX implements TransformType, CssWithOneField {
    public static PROP_NAME = 'translateX'

    val: number = 2
    unit: Unit = new Pixel()


    getValue(): string {
        return `translateX(${this.unit.getValue(this.val)})`
    }

    public getName(): string {
        return TranslateX.PROP_NAME
    }




}