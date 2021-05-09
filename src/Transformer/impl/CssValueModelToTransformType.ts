import StyleCssValue from '../../Api/StyleCssValue';
import TransformType from '../../Css/ThreeDimensional/TransformType';
import Rotate from '../../Css/ThreeDimensional/TransformTypes/Rotate';
import Rotate3D from '../../Css/ThreeDimensional/TransformTypes/Rotate3D';
import Named from '../../Unit/Named';
import { TransformCssStruct } from '../../Css/ThreeDimensional/TransformCss';
import Translate from '../../Css/ThreeDimensional/TransformTypes/Translate';
import Translate3D from '../../Css/ThreeDimensional/TransformTypes/Translate3D';
import Scale from '../../Css/ThreeDimensional/TransformTypes/Scale';
import Skew from '../../Css/ThreeDimensional/TransformTypes/Skew';
import TransformTypeFactoryFromName from '../../Factory/TransformTypeFactoryFromName';
import UnitCssPropertyFactoryFromName from '../../Factory/UnitCssPropertyFactoryFromName';


export default class CssValueModelToTransformType
{

    protected transformTypeFactory: TransformTypeFactoryFromName
    protected unitFactory: UnitCssPropertyFactoryFromName

    constructor() {
        this.transformTypeFactory = new TransformTypeFactoryFromName()
        this.unitFactory = new UnitCssPropertyFactoryFromName()

    }
    public transform(arg: StyleCssValue): TransformType
    {
        var transformType =  this.transformTypeFactory.create(arg.getValueNinth())

        if (transformType instanceof Rotate) {
            return this.rotate(transformType, arg)
        } else if (transformType instanceof Rotate3D) {
            return this.rotate3D(transformType, arg)
        } else if (transformType instanceof Translate) {
            return this.translate(transformType, arg)
        } else if (transformType instanceof Scale) {
            return this.scale(transformType, arg)
        } else if (transformType instanceof Skew) {
            return this.skew(transformType, arg)
        } else if (transformType instanceof Translate3D) {
            return this.translate3D(transformType, arg)
        }

        throw Error(`Unable to create TransformType from name ${arg.getValueNinth()}` )

    }

    protected rotate(arg: Rotate, el: StyleCssValue): Rotate {
        arg.val = Number(el.getValue())

        var unit = this.unitFactory.create(el.getUnitName())

        arg.unit = unit

        return arg
    }

    protected translate(arg: Translate, el: StyleCssValue): Translate {
        
        arg.val = Number(el.getValue())
        arg.valSecond = Number(el.getValueSecond())

        var unit = this.unitFactory.create(el.getUnitName())
        var unitSec = this.unitFactory.create(el.getUnitNameSecond())

        arg.unit = unit
        arg.unitSecond = unitSec

        return arg
    }
    
    protected scale(arg: Scale, el: StyleCssValue): Scale {
        
        arg.val = Number(el.getValue())
        arg.valSecond = Number(el.getValueSecond())

        var unit = this.unitFactory.create(el.getUnitName())
        var unitSec = this.unitFactory.create(el.getUnitNameSecond())

        arg.unit = unit
        arg.unitSecond = unitSec

        return arg
    }
    
    protected skew(arg: Skew, el: StyleCssValue): Skew {
        
        arg.val = Number(el.getValue())
        arg.valSecond = Number(el.getValueSecond())

        var unit = this.unitFactory.create(el.getUnitName())
        var unitSec = this.unitFactory.create(el.getUnitNameSecond())

        arg.unit = unit
        arg.unitSecond = unitSec

        return arg
    }
    
    protected translate3D(arg: Translate3D, el: StyleCssValue): Translate3D {
        
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

        var unit = this.unitFactory.create(el.getUnitName())

        arg.valForthUnit = unit


        return arg
    }
}