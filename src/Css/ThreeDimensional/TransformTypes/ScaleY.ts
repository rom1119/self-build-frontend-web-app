import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';
import CssWithOneField from '../../CssWithOneField';


export default class ScaleY implements TransformType, CssWithOneField {
    public static PROP_NAME = 'scaleY'

    val: number = 1
    unit: Unit = new Named()

    getValue(): string {
        return `scaleY(${this.unit.getValue(this.val)})`
    }

    public getName(): string {
        return ScaleY.PROP_NAME
    }




}