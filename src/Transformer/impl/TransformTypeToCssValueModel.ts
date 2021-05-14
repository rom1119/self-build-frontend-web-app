import StyleCssValue from '../../Api/StyleCssValue';
import TransformType from '../../Css/ThreeDimensional/TransformType';
import Rotate3D from '../../Css/ThreeDimensional/TransformTypes/Rotate3D';
import Named from '../../Unit/Named';
import { TransformCssStruct } from '../../Css/ThreeDimensional/TransformCss';
import Matrix3D from '../../Css/ThreeDimensional/TransformTypes/Matrix3D';
import Matrix from '~/src/Css/ThreeDimensional/TransformTypes/Matrix';
import CssWithThreeValues from '../../Css/CssWithThreeValues';
import CssWithTwoValues from '../../Css/CssWithTwoValues';
import CssWithOneValue from '../../Css/CssWithOneValue';


export default class TransformTypeToCssValueModel
{
    public transform(arg: TransformCssStruct): StyleCssValue
    {
        var transformType = arg.value
        var val = new StyleCssValue()
        val.id = arg.id

        if (transformType instanceof Rotate3D) {
            this.rotate3D(transformType, val)
        } else if (transformType instanceof Matrix3D) {
            this.matrix3d (transformType, val)
        } else if (transformType instanceof Matrix) {
            this.matrix(transformType, val)
        } else if (this.instanceOfCssWithThreeValues(transformType)) {
            <TransformType><unknown>this.transformThreeValues(<CssWithThreeValues><unknown>transformType, val)
        } else if (this.instanceOfCssWithTwoValues(transformType)) {
            <TransformType><unknown>this.transformTwoValues(<CssWithTwoValues><unknown>transformType, val)
        } else if (this.instanceOfCssWithOneValue(transformType)) {
            <TransformType><unknown>this.transformOneValue(<CssWithOneValue><unknown>transformType, val)
        } 

        val.setValueNinth(transformType.getName())
        val.setUnitNameNinth(Named.PROP_NAME)

        return val

    }

    protected transformOneValue(arg: CssWithOneValue, el: StyleCssValue): StyleCssValue {
        
        el.setValue(arg.val)
        el.setUnitName(arg.unit.name)

        return el
    }

    
    protected transformTwoValues(arg: CssWithTwoValues, el: StyleCssValue): StyleCssValue {
        
        el.setValue(arg.val)
        el.setValueSecond(arg.valSecond)

        el.setUnitName(arg.unit.name)
        el.setUnitNameSecond(arg.unitSecond.name)

        return el
    }
    
    protected transformThreeValues(arg: CssWithThreeValues, el: StyleCssValue): StyleCssValue {
        
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

    protected matrix(arg: Matrix, el: StyleCssValue): StyleCssValue {
        var strVal = `
        ${arg.val};
        ${arg.valSecond};
        ${arg.valThird};
        ${arg.valFourth};
        ${arg.valFiveth};
        ${arg.valSixth}
        `

        el.setValue(strVal)
        
        el.setUnitName(Named.PROP_NAME)

        return el
    }
    
    protected matrix3d(arg: Matrix3D, el: StyleCssValue): StyleCssValue {
        var strVal = `
        ${arg.val};
        ${arg.valSecond};
        ${arg.valThird};
        ${arg.valFourth};
        ${arg.valFiveth};
        ${arg.valSixth};
        ${arg.valSeventh};
        ${arg.valEighth};
        ${arg.valNinth};
        ${arg.valTenth};
        ${arg.valEleventh};
        ${arg.valTwelfth};
        ${arg.valThirteenth};
        ${arg.valFourteenth};
        ${arg.valFifteenth};
        ${arg.valSixteenth}
        `

        var arr = strVal.split(';')
        var res = ''
        for (var elLoop of arr) {
            elLoop = elLoop.replace(/"\n"/, "")
            elLoop = elLoop.trim()
            res += `${elLoop};`
        }
        el.setValue(res)

        el.setUnitName(Named.PROP_NAME)

        return el
    }

    instanceOfCssWithOneValue(object: any): boolean {
        return 'val' in object &&  'unit' in object ;
    }
    
    instanceOfCssWithTwoValues(object: any): boolean {
        return 'valSecond' in object &&  'unitSecond' in object && this.instanceOfCssWithOneValue(object) ;
    }
    
    instanceOfCssWithThreeValues(object: any): boolean {
        return 'valThird' in object &&  'unitThird' in object && this.instanceOfCssWithTwoValues(object) ;
    }
}