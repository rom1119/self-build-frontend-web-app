import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import CssWithOneField from '../../CssWithOneField';


export default class RotateY implements TransformType, CssWithOneField {
    public static PROP_NAME = 'rotateY'

    val: number = 45
    unit: UnitAngle = new UnitDeg()

    getValue(): string {
        return `rotateY(${this.unit.getValue(this.val)})`
    }

    public getName(): string {
        return RotateY.PROP_NAME
    }




}