import TransformType from '../TransformType';
import UnitAngle from '../../../Unit/UnitAngle';
import UnitDeg from '../../../Unit/UnitAngle/UnitDeg';
import Unit from '../../../Unit/Unit';
import Named from '../../../Unit/Named';
import CssWithThreeFields from '../../CssWithThreeFields';


export default class Scale3D implements TransformType, CssWithThreeFields {
    public static PROP_NAME = 'scale3d'

    val: number = 1
    unit: Unit = new Named()

    valSecond: number = 1
    unitSecond: Unit = new Named()

    valThird: number = 1
    unitThird: Unit = new Named()

    getValue(): string {
        return `scale3d(${this.unit.getValue(this.val)}, ${this.unitSecond.getValue(this.valSecond)}, ${this.unitThird.getValue(this.valThird)})`
    }

    public getName(): string {
        return Scale3D.PROP_NAME
    }




}