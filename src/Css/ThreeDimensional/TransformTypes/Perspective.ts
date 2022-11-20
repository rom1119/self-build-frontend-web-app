import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Pixel from '../../../Unit/Size/Pixel';
import CssWithOneField from '../../CssWithOneField';


export default class Perspective implements TransformType, CssWithOneField {
    public static PROP_NAME = 'perspective'

    val: number = 90
    unit: Unit = new Pixel()

    getValue(): string {
        return `perspective(${this.unit.getValue(this.val)})`
    }

    public getName(): string {
        return Perspective.PROP_NAME
    }




}