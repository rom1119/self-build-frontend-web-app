import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';
import CssWithOneField from '../../CssWithOneField';


export default class ScaleX implements TransformType, CssWithOneField {
    public static PROP_NAME = 'scaleX'

    val: number = 1
    unit: Unit = new Named()

    getValue(): string {
        return `scaleX(${this.unit.getValue(this.val)})`
    }

    public getName(): string {
        return ScaleX.PROP_NAME
    }




}