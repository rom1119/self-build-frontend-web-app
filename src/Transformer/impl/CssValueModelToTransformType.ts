import StyleCssValue from '../../Api/StyleCssValue';
import TransformType from '../../Css/ThreeDimensional/TransformType';
import Rotate3D from '../../Css/ThreeDimensional/TransformTypes/Rotate3D';
import TransformTypeFactoryFromName from '../../Factory/TransformTypeFactoryFromName';
import UnitCssPropertyFactoryFromName from '../../Factory/UnitCssPropertyFactoryFromName';
import CssWithThreeFields from '../../Css/CssWithThreeFields';
import CssWithTwoFields from '../../Css/CssWithTwoFields';
import CssWithOneField from '~/src/Css/CssWithOneField';
import Matrix from '~/src/Css/ThreeDimensional/TransformTypes/Matrix';
import Matrix3D from '../../Css/ThreeDimensional/TransformTypes/Matrix3D';


export default class CssValueModelToTransformType {

    protected transformTypeFactory: TransformTypeFactoryFromName
    protected unitFactory: UnitCssPropertyFactoryFromName

    constructor() {
        this.transformTypeFactory = new TransformTypeFactoryFromName()
        this.unitFactory = new UnitCssPropertyFactoryFromName()

    }
    public transform(arg: StyleCssValue): TransformType {
        var transformType = this.transformTypeFactory.create(arg.getValueNinth())

        if (transformType instanceof Rotate3D) {
            return this.rotate3D(transformType, arg)
        } else if (transformType instanceof Matrix3D) {
            return this.matrix3d(transformType, arg)
        } else if (transformType instanceof Matrix) {
            return this.matrix(transformType, arg)
        } else if (this.instanceOfCssWithThreeValues(transformType)) {
            return <TransformType><unknown>this.transformThreeValues(<CssWithThreeFields><unknown>transformType, arg)
        } else if (this.instanceOfCssWithTwoValues(transformType)) {
            return <TransformType><unknown>this.transformTwoValues(<CssWithTwoFields><unknown>transformType, arg)
        } else if (this.instanceOfCssWithOneValue(transformType)) {
            return <TransformType><unknown>this.transformOneValue(<CssWithOneField><unknown>transformType, arg)
        }

        throw Error(`Unable to create TransformType from name ${arg.getValueNinth()}`)

    }

    protected transformOneValue(arg: CssWithOneField, el: StyleCssValue): CssWithOneField {
        arg.val = Number(el.getValue())

        var unit = this.unitFactory.create(el.getUnitName())

        arg.unit = unit

        return arg
    }

    protected transformTwoValues(arg: CssWithTwoFields, el: StyleCssValue): CssWithTwoFields {

        arg.val = Number(el.getValue())
        arg.valSecond = Number(el.getValueSecond())

        var unit = this.unitFactory.create(el.getUnitName())
        var unitSec = this.unitFactory.create(el.getUnitNameSecond())

        arg.unit = unit
        arg.unitSecond = unitSec

        return arg
    }

    protected transformThreeValues(arg: CssWithThreeFields, el: StyleCssValue): CssWithThreeFields {

        arg.val = Number(el.getValue())
        arg.valSecond = Number(el.getValueSecond())
        arg.valThird = Number(el.getValueThird())

        var unit = this.unitFactory.create(el.getUnitName())
        var unitSec = this.unitFactory.create(el.getUnitNameSecond())
        var unitThird = this.unitFactory.create(el.getUnitNameThird())

        arg.unit = unit
        arg.unitSecond = unitSec
        arg.unitThird = unitThird

        return arg
    }

    protected rotate3D(arg: Rotate3D, el: StyleCssValue): Rotate3D {
        arg.val = Number(el.getValue())
        arg.valSecond = Number(el.getValueSecond())
        arg.valThird = Number(el.getValueThird())
        arg.valFourth = Number(el.getValueFourth())

        var unit = this.unitFactory.create(el.getUnitNameFourth())

        arg.valForthUnit = unit


        return arg
    }
    protected matrix(arg: Matrix, el: StyleCssValue): Matrix {
        var vals = el.getValue().split(';')

        arg.val = Number(vals[0])
        arg.valSecond = Number(vals[1])
        arg.valThird = Number(vals[2])
        arg.valFourth = Number(vals[3])
        arg.valFiveth = Number(vals[4])
        arg.valSixth = Number(vals[5])


        return arg
    }

    protected matrix3d(arg: Matrix3D, el: StyleCssValue): Matrix3D {
        var vals = el.getValue().split(';')

        arg.val = Number(vals[0])
        arg.valSecond = Number(vals[1])
        arg.valThird = Number(vals[2])
        arg.valFourth = Number(vals[3])
        arg.valFiveth = Number(vals[4])
        arg.valSixth = Number(vals[5])
        arg.valSeventh = Number(vals[6])
        arg.valEighth = Number(vals[7])
        arg.valNinth = Number(vals[8])
        arg.valTenth = Number(vals[9])
        arg.valEleventh = Number(vals[10])
        arg.valTwelfth = Number(vals[11])
        arg.valThirteenth = Number(vals[12])
        arg.valFourteenth = Number(vals[13])
        arg.valFifteenth = Number(vals[14])
        arg.valSixteenth = Number(vals[15])

        return arg
    }

    instanceOfCssWithOneValue(object: any): boolean {
        return 'val' in object && 'unit' in object;
    }

    instanceOfCssWithTwoValues(object: any): boolean {
        return 'valSecond' in object && 'unitSecond' in object && this.instanceOfCssWithOneValue(object);
    }

    instanceOfCssWithThreeValues(object: any): boolean {
        return 'valThird' in object && 'unitThird' in object && this.instanceOfCssWithTwoValues(object);
    }
}