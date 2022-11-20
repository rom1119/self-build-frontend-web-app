import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import CssWithOneField from '../../CssWithOneField';


export default class RotateX implements TransformType, CssWithOneField {
    public static PROP_NAME = 'rotateX'

    val: number = 45
    unit: UnitAngle = new UnitDeg()

    getValue(): string {
        return `rotateX(${this.unit.getValue(this.val)})`
    }

    public getName(): string {
        return RotateX.PROP_NAME
    }




}