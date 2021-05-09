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


export default class TransformTypeToCssValueModel
{
    public transform(arg: TransformCssStruct): StyleCssValue
    {
        var transformType = arg.value
        var val = new StyleCssValue()
        val.id = arg.id

        if (transformType instanceof Rotate) {
            this.rotate(transformType, val)
        } else if (transformType instanceof Rotate3D) {
            this.rotate3D(transformType, val)
        } else if (transformType instanceof Translate) {
            this.translate(transformType, val)
        } else if (transformType instanceof Scale) {
            this.scale(transformType, val)
        } else if (transformType instanceof Skew) {
            this.skew(transformType, val)
        } else if (transformType instanceof Translate3D) {
            this.translate3D(transformType, val)
        }

        val.setValueNinth(transformType.getName())
        val.setUnitNameNinth(Named.PROP_NAME)

        return val

    }

    protected rotate(arg: Rotate, el: StyleCssValue): StyleCssValue {
        
        el.setValue(arg.val)
        el.setUnitName(arg.unit.name)

        return el
    }

    protected translate(arg: Translate, el: StyleCssValue): StyleCssValue {
        
        el.setValue(arg.val)
        el.setValueSecond(arg.valSecond)

        el.setUnitName(arg.unit.name)
        el.setUnitNameSecond(arg.unitSecond.name)

        return el
    }
    
    protected scale(arg: Scale, el: StyleCssValue): StyleCssValue {
        
        el.setValue(arg.val)
        el.setValueSecond(arg.valSecond)

        el.setUnitName(arg.unit.name)
        el.setUnitNameSecond(arg.unitSecond.name)

        return el
    }
    
    protected skew(arg: Skew, el: StyleCssValue): StyleCssValue {
        
        el.setValue(arg.val)
        el.setValueSecond(arg.valSecond)

        el.setUnitName(arg.unit.name)
        el.setUnitNameSecond(arg.unitSecond.name)

        return el
    }
    
    protected translate3D(arg: Translate3D, el: StyleCssValue): StyleCssValue {
        
        el.setValue(arg.val)
        el.setValueSecond(arg.valSecond)
        el.setValueThird(arg.valThird)

        el.setUnitName(arg.unit.name)
        el.setUnitNameSecond(arg.unitSecond.name)
        el.setUnitNameThird(arg.unitThird.name)

        return el
    }
    
    protected rotate3D(arg: Rotate3D, el: StyleCssValue): StyleCssValue {
        el.setValue(arg.val)
        el.setValueSecond(arg.valSecond)
        el.setValueThird(arg.valThird)
        el.setValueFourth(arg.valFourth)

        el.setUnitName(Named.PROP_NAME)
        el.setUnitNameSecond(Named.PROP_NAME)
        el.setUnitNameThird(Named.PROP_NAME)
        el.setUnitNameFourth(arg.valForthUnit.name)

        return el
    }
}